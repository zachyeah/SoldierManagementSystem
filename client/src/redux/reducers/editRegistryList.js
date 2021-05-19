const initState = {
    theSoldier: {},
    avaiSuperior: [],

    isLoading: false,
    error: null,
}

const editRegistryList = (state=initState, action) => {
    switch(action.type) {
        case 'FETCH_EDITREGISTRYLIST_START':
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case 'FETCH_EDITREGISTRYLIST_SUCCESS':
            return {
                ...state,
                theSoldier: action.soldierInfo.theSoldier,
                avaiSuperior: [...action.soldierInfo.avaiSuperior],
                isLoading: false,
                error: null
            }

        case 'FETCH_EDITREGISTRYLIST_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.err
            }


            case 'UPDATE_EDITREGISTRYLIST_START':
                return ({
                    ...state,
                    isLoading: true,
                    error: null
                })
            case 'UPDATE_EDITREGISTRYLIST_SUCCESS':
                return ({
                    ...state,
                    isLoading: false,
                    error: null
                })
            case 'UPDATE_EDITREGISTRYLIST_ERROR':
                return ({
                    ...state,
                    isLoading: false,
                    error: action.error
                })



            case 'CLEAR_ALL':
                return {
                    ...initState
                }    
                
        default:
            return state
    }
}

export default editRegistryList