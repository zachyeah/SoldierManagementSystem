import axios from 'axios';



export const clearAll = () => ({type: 'CLEAR_ALL'});


const fetchAvaiSuperiorStart = () => ({type: 'FETCH_AVAISUPERIOR_START'});
const fetchAvaiSuperiorSuccess = soldierInfo => ({type: 'FETCH_AVAISUPERIOR_SUCCESS', soldierInfo: soldierInfo})
const fetchAvaiSuperiorError = err => ({type:'FETCH_AVAISUPERIOR_ERROR', err: err});


export const fetchAvaiSuperior = (history) => {
    return (dispatch) => {
        dispatch(fetchAvaiSuperiorStart())
        axios.get(`http://localhost:8800/api/soldierList/*`)
        .then(res => {
             console.log(`in get action avaiSuperior: ${JSON.stringify(res.data)}`);
            // console.log(`in get action ${history}`);
            dispatch(fetchAvaiSuperiorSuccess(res.data));
            history.push('/addSoldierList');
        })
        .catch(err => dispatch(fetchAvaiSuperiorError(err)))
    }
}

const addTheSoldierStart = () => ({type: 'ADD_REGISTRYLIST_START'});
const addTheSoldierSuccess = () => {
    console.log('add Success');
    return({type: 'ADD_REGISTRYLIST_SUCCESS'})
};
const addTheSoldierError = err => ({type: 'ADD_REGISTRYLIST_ERROR', error: err.data});




export const addTheSoldier = (formData, config, history) => {
return (dispatch) => {
    dispatch(addTheSoldierStart())
    axios.post(`http://localhost:8800/api/soldierList`, formData, config)
    .then(res => {
        dispatch(addTheSoldierSuccess());
        history.push('/soldierList')
    })
    .catch(err => {
        dispatch(addTheSoldierError(err))
    })
}
}



