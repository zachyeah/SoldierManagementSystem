import axios from 'axios';

const fetchSoldierListStart = () => ({type: 'FETCH_SOLDIERLIST_START'});
const fetchSoldierListSuccess = listInfo => ({type: 'FETCH_SOLDIERLIST_SUCCESS', listInfo: listInfo})
const fetchSoldierListError = err => ({type:'FETCH_SOLDIERLIST_ERROR', err: err});

export const fetchSoldierList = (shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id) => {
    return (dispatch) => {
        dispatch(fetchSoldierListStart())
        axios.get(`http://localhost:8800/api/soldierList/${screenType}/${screen_id}/${shouldSkipRow}/${rowLimit}/${scrollDown}/${sortBy}/${orderBy}/${searchQuery}`)
        .then(res => {
           // console.log(`in get action ${JSON.stringify(res.data)}`);
            dispatch(fetchSoldierListSuccess(res.data))})
        .catch(err => dispatch(fetchSoldierListError(err)))
    }
}



const searchSoldierListStart = () => ({type: 'SEARCH_SOLDIERLIST_START'});
const searchSoldierListSuccess = listInfo => ({type: 'SEARCH_SOLDIERLIST_SUCCESS', listInfo: listInfo})
const searchSoldierListError = err => ({type:'SEARCH_SOLDIERLIST_ERROR', err: err});

export const searchSoldierList = (shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id) => {
    return (dispatch) => {
        dispatch(searchSoldierListStart())
        axios.get(`http://localhost:8800/api/soldierList/${screenType}/${screen_id}/${shouldSkipRow}/${rowLimit}/${scrollDown}/${sortBy}/${orderBy}/${searchQuery}`)
        .then(res => {
           // console.log(`in get action ${JSON.stringify(res.data)}`);
            dispatch(searchSoldierListSuccess(res.data))})
        .catch(err => dispatch(searchSoldierListError(err)))
    }
}

const deleteSoldierListStart = () => ({type: 'DELETE_SOLDIERLIST_START'});
const deleteSoldierListSuccess = () => ({type: 'DELETE_SOLDIERLIST_SUCCESS'});
const deleteSoldierListError = (err) => ({type: 'DELETE_SOLDIERLIST_ERROR', err: err})

export const deleteSoldierList = (_id, shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id) => {
return (dispatch) => {
    dispatch(deleteSoldierListStart());
    axios.delete(`http://localhost:8800/api/soldierList/${_id}`)
    .then(() => {
        dispatch(deleteSoldierListSuccess())
        dispatch(searchSoldierList(shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id))
    })
    .catch(err => {dispatch(deleteSoldierListError(err))
    })
}
}


// const searchSuperiorStart = () => ({type: 'SEARCH_SUPERIOR_START'});
// const searchSuperiorSuccess = soldierInfo => ({type: 'SEARCH_SUPERIOR_SUCCESS', soldierInfo: soldierInfo})
// const searchSuperiorError = err => ({type: 'SEARCH_SUPERIOR_ERROR', err: err})

// export const searchSuperior = (_id) => {
//     return (dispatch) => {
//         dispatch(searchSuperiorStart())
//         axios.get(`http://localhost:8800/api/soldierList/${_id}`)
//         .then(res => {
//             dispatch(searchSuperiorSuccess(res.data))
//         })
//         .catch(err => {dispatch(searchSuperiorError(err))})
//     }
// }

// const searchSubordinateStart = () => ({type: 'SEARCH_SUBORDINATE_START'})
// const searchSubordinateSuccess = soldierInfo => ({type: 'SEARCH_SUBORDINATE_SUCCESS', soldierInfo: soldierInfo})
// const searchSubordinateError = err => ({type: 'SEARCH_SUBORDINATE_ERROR', err: err});

// export const searchSubordinate = (_id) => {
//     return (dispatch) => {
//         dispatch(searchSubordinateStart());
//         axios.get(`http://localhost:8800/api/soldierList/${_id}`)
//         .then(res => {
//             dispatch(searchSubordinateSuccess(res.data))
//         })
//         .catch(err => dispatch(searchSubordinateError(err)))
//     }
// }



export const clearAll = () => ({type: 'CLEAR_ALL'})
