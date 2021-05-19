import axios from 'axios';

const fetchTheSoldierStart = () => ({type: 'FETCH_EDITREGISTRYLIST_START'});
const fetchTheSoldierSuccess = soldierInfo => ({type: 'FETCH_EDITREGISTRYLIST_SUCCESS', soldierInfo: soldierInfo})
const fetchTheSoldierError = err => ({type:'FETCH_EDITREGISTRYLIST_ERROR', err: err});

export const clearAll = () => ({type: 'CLEAR_ALL'});

export const fetchTheSoldier = (_id, history) => {
    return (dispatch) => {
        dispatch(fetchTheSoldierStart())
        axios.get(`http://localhost:8800/api/soldierList/${_id}`)
        .then(res => {
            console.log(`in get action ${JSON.stringify(res.data.avaiSuperior)}`);
            // console.log(`in get action ${history}`);
            dispatch(fetchTheSoldierSuccess(res.data));
            history.push('/editSoldierList');
        })
        .catch(err => dispatch(fetchTheSoldierError(err)))
    }
}



const updateEditTheSoldierStart = () => ({type: 'UPDATE_EDITREGISTRYLIST_START'});
const updateEditTheSoldierSuccess = () => {
    console.log('updateSuccess');
    return({type: 'UPDATE_EDITREGISTRYLIST_SUCCESS'})
};
const updateEditTheSoldierError = err => ({type: 'UPDATE_EDITREGISTRYLIST_ERROR', error: err.data});




export const updateTheSoldier = (_id, formData, config, history) => {
return (dispatch) => {
    dispatch(updateEditTheSoldierStart())
    axios.put(`http://localhost:8800/api/soldierList/${_id}`, formData, config)
    .then(res => {
        dispatch(updateEditTheSoldierSuccess());
        history.push('/soldierList')
    })
    .catch(err => {
        dispatch(updateEditTheSoldierError(err))
    })
}
}



