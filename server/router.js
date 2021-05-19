const express = require('express');
const router = express.Router();
const SoldierList = require('./soldierListSchema');
// const Superior = require('./superiorSchema')
const multer = require('multer');
const fs = require('fs');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log( path.join(__dirname, './uploads'));
    
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + '-' + file.originalname)
      }
})

const uploads = multer({
    storage: storage}
)




router.get('/', (req, res) => {
    res.json({ message: 'welcome' })
})



router.get(`/soldierList/:screenType/:screen_id/:shouldSkipRow/:rowLimit/:scrollDown/:sortBy/:orderBy/:searchQuery`, (req, res) => {
    const listInfo = {
        soldierList: [],
        rowLimit: Number(req.params.rowLimit),
        scrollDown: Number(req.params.scrollDown),
        sortBy: req.params.sortBy,
        orderBy: Number(req.params.orderBy),
        searchQuery: req.params.searchQuery,
        fetchedAll: false,
        screenType: req.params.screenType,
        screen_id: req.params.screen_id
    };
    console.log(`req.params.screen_id: ${req.params.screen_id}`);
    console.log(`screen_id: ${listInfo.screen_id}`);
const shouldSkipRow = req.params.shouldSkipRow === 'true';

let sort_order = {};
if (listInfo.sortBy !== '*') {
    sort_order = {[listInfo.sortBy]: listInfo.orderBy};
}


let screenQuery = [];
if (listInfo.searchQuery !== '*') {
    if (parseInt(listInfo.searchQuery) >= 0 && listInfo.searchQuery.length === 10 && !isNaN(listInfo.searchQuery)) {
        screenQuery = [ {phone: listInfo.searchQuery} ]
    }
else {
        screenQuery = [ {name: new RegExp(listInfo.searchQuery, 'i')},
                         {rank: listInfo.searchQuery}]
    }
}
let search = {};
const screenSoldier = {[listInfo.screenType]: listInfo.screen_id}
if (listInfo.screenType !== '*' && 
    listInfo.searchQuery !== '*') {
   search = {$and:[
    screenSoldier,
        {$or: screenQuery}
    ]}
} else if (listInfo.searchQuery !== '*') {
    search = {$or: screenQuery}
} else if (listInfo.screenType !== '*') {
    search = screenSoldier
}



// if (listInfo.searchQuery !== '*') {
//     if (parseInt(listInfo.searchQuery) >= 0 && listInfo.searchQuery.length === 10 && !isNaN(listInfo.searchQuery)) {
//         search = {$or: [ {phone: listInfo.searchQuery} ]}
//     }
// else {
//         search = {$or: [ {name: new RegExp(listInfo.searchQuery, 'i')},
//                          {rank: listInfo.searchQuery},
//                         //  {email: new RegExp(listInfo.searchQuery, 'i')}
//                          ]}
//     }
// }

    SoldierList.countDocuments(search)
    .then(num => {
        if (Math.ceil( num / listInfo.rowLimit) <= listInfo.scrollDown) {
            listInfo.fetchedAll = true
        } })
    .then(() => {
        SoldierList.find(search).populate('subo').populate('superior_id')
        .skip(shouldSkipRow? listInfo.rowLimit * (listInfo.scrollDown - 1) : 0)
        .limit(shouldSkipRow? listInfo.rowLimit : listInfo.rowLimit * (listInfo.scrollDown))
        .sort(listInfo.sortBy !== '*'? sort_order : {_id: -1})
        .then(soldierList => {
            //console.log(`in router.get ${JSON.stringify(soldierList)}`);
            listInfo.soldierList = [...soldierList];
            res.status(200).json(listInfo)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    })
})







// final final
router.get('/soldierList/:_id', (req, res) => {
    let soldierInfo = {
theSoldier: {},
avaiSuperior: ''
    };
if (req.params._id !== '*') {
    SoldierList.findById(req.params._id).populate('subo').populate('superior_id')
    .then(data => {
        soldierInfo.theSoldier = data;
        SoldierList.find({
            $and: [
                {superior_id: {$ne: req.params._id}}, 
                {_id: {$ne: req.params._id}}
            ]
        }
        )
        .then(avaiSuperior => {
            // console.log(avaiSuperior);
            soldierInfo.avaiSuperior = avaiSuperior;
            // console.log(`theSoldier ${JSON.stringify(soldierInfo)}`)
            res.status(200).json(soldierInfo)
        })
        .catch(err => {
            res.status(500).send(err)
        })

    }) } else {
        SoldierList.find()
        .then(avaiSuperior => {
            // console.log(avaiSuperior);
            soldierInfo.avaiSuperior = avaiSuperior;
            // console.log(`theSoldier ${JSON.stringify(soldierInfo)}`)
            res.status(200).json(soldierInfo)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }
       
    
})






router.post(`/soldierList`, uploads.single('photo'), (req, res) => {
    const listInfo = {
        soldierList: [],
    }


    const newSoldier = new SoldierList;
    // console.log(newSoldier);
    newSoldier.name = req.body.name;
    newSoldier.sex = req.body.sex;
    newSoldier.rank = req.body.rank;
    newSoldier.startDate = req.body.startDate;
    newSoldier.phone = Number(req.body.phone);
    newSoldier.email = req.body.email;
    {req.file? newSoldier.photoUrl = req.file.path : newSoldier.photoUrl = 'uploads/defaultSoldierPortrait_00fsdfsdfsdf00.png'};
   if(req.body.superior_id) {newSoldier.superior_id = req.body.superior_id};
    // newSoldier.superior.superiorName = req.body.superiorName;
    // newSoldier.superior.superior_id = req.body.superior_id;
    // if (req.body.DS_id) { newSoldier.DS_id.push(req.body.DS_id) };
    //console.log(newSoldier);
    newSoldier.save()
    .then(() => {
        listInfo.soldierList = newSoldier;
        res.status(200).json(listInfo)
}) 
       
    .catch(err =>
            res.status(500).send(err))
})



// /:name/:sex/:rank/:startDate/:phone/:email/:superiorName/:superior_id/:DS_id


router.put(`/soldierList/:_id`, uploads.single('photo'), (req, res) => {
    SoldierList.findById(req.params._id)
        .then(soldier => {
            console.log(`in router.put 1 ${JSON.stringify(soldier)}`)
            soldier.name = req.body.name;
            soldier.sex = req.body.sex;
            soldier.rank = req.body.rank;
            soldier.startDate = req.body.startDate;
            soldier.phone = Number(req.body.phone);
            soldier.email = req.body.email;
            if(req.file) {
                if (soldier.photoUrl !== 'uploads/defaultSoldierPortrait_00fsdfsdfsdf00.png') {
                fs.unlink(soldier.photoUrl, err => console.log(err));
                }
                soldier.photoUrl = req.file.path 
                };
  
            soldier.superior_id = req.body.superior_id;
            if (req.body.DS_id) { soldier.DS_id.push(req.body.DS_id) };
console.log(`in router.put 2 ${JSON.stringify(soldier)}`)

            soldier.save()
                .then(() => {
                    res.status(200).json(soldier)
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        })
        .catch(err => {
            res.status(500).send(err)
        })

})



// delete and change superior
router.delete(`/soldierList/:_id`, (req, res) => {
    let deletePhotoUrl = '';
    let newSuperior_id = '';

    SoldierList.findById(req.params._id).populate('subo')
    .then(theSoldier => {
       if(theSoldier.photoUrl && 
        theSoldier.photoUrl !== 'uploads/defaultSoldierPortrait_00fsdfsdfsdf00.png') 
        { deletePhotoUrl = theSoldier.photoUrl };
        newSuperior_id = theSoldier.superior_id;

        // console.log(`newSuperior_id: ${newSuperior_id}`);

        SoldierList.find({superior_id: req.params._id})
        .then(soldierList => {
            // console.log(`type of soldierList: ${ typeof soldierList}`);
            // console.log(`soldierList: ${ soldierList}`);
            soldierList.forEach(theSoldier => {
                theSoldier.superior_id = newSuperior_id;
                theSoldier.save()
            })
        })
    } )

    SoldierList.deleteOne({ _id: req.params._id })
        .then(() => {
          if (deletePhotoUrl) { fs.unlink(deletePhotoUrl, err => console.log(err))};
            res.status(200).json({message: 'deleted'})
        })
        .catch(err => {
            res.status(500).send(err)
        })
})




// router.delete(`/soldierList/:_id`, (req, res) => {
//     let deletePhotoUrl = '';
//     SoldierList.findById(req.params._id)
//     .then(theSoldier => {
//         deletePhotoUrl = theSoldier.photoUrl;
//     } );
//     SoldierList.deleteOne({ _id: req.params._id })
//         .then(() => {
//             fs.unlink(deletePhotoUrl, err => console.log(err));
//             res.status(200).json({message: 'deleted'})
//         })
//         .catch(err => {
//             res.status(500).send(err)
//         })
// })

module.exports = router