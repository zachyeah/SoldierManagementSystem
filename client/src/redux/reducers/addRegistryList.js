const initState = {
    
    avaiSuperior: [],

    isLoading: false,
    error: null,
}

const addRegistryList = (state=initState, action) => {
    switch(action.type) {
        case 'FETCH_AVAISUPERIOR_START':
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case 'FETCH_AVAISUPERIOR_SUCCESS':
            return {
                ...state,
                avaiSuperior: [...action.soldierInfo.avaiSuperior],
                isLoading: false,
                error: null
            }

        case 'FETCH_AVAISUPERIOR_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.err
            }


            case 'ADD_REGISTRYLIST_START':
                return ({
                    ...state,
                    isLoading: true,
                    error: null
                })
            case 'ADD_REGISTRYLIST_SUCCESS':
                return ({
                    ...state,
                    isLoading: false,
                    error: null
                })
            case 'ADD_REGISTRYLIST_ERROR':
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

export default addRegistryList