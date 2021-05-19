const initState = {
    soldierList: [],
    rowLimit: 20,
    allfetched: false,
    scrollDown: 1,
    sortBy: '*',
    orderBy: 0,
    searchQuery: '*',
    fetchedAll: false,
    shouldSkipRow: true,

    screenType: '*',
    screen_id: '*',

    isLoading: false,
    error: null,
}

const registryList = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_SOLDIERLIST_START':
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case 'FETCH_SOLDIERLIST_SUCCESS':
            //console.log(`in reducer ${JSON.stringify(action.listInfo)}`)
            return {

                ...state,
                isLoading: false,
                error: null,
                soldierList: [...state.soldierList, ...action.listInfo.soldierList],
                rowLimit: action.listInfo.rowLimit,
                allfetched: action.listInfo.allfetched,
                scrollDown: action.listInfo.scrollDown,
                sortBy: action.listInfo.sortBy,
                orderBy: action.listInfo.orderBy,
                searchQuery: action.listInfo.searchQuery,
                fetchedAll: action.listInfo.fetchedAll,
                screenType: action.listInfo.screenType,
                screen_id: action.listInfo.screen_id
            };

        case 'FETCH_SOLDIERLIST_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.err
            }

        case 'SEARCH_SOLDIERLIST_START':
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case 'SEARCH_SOLDIERLIST_SUCCESS':
            //console.log(`in reducer ${JSON.stringify(action.listInfo)}`)
            return {

                ...state,
                isLoading: false,
                error: null,
                soldierList: action.listInfo.soldierList,
                rowLimit: action.listInfo.rowLimit,
                allfetched: action.listInfo.allfetched,
                scrollDown: action.listInfo.scrollDown,
                sortBy: action.listInfo.sortBy,
                orderBy: action.listInfo.orderBy,
                searchQuery: action.listInfo.searchQuery,
                fetchedAll: action.listInfo.fetchedAll,
                screenType: action.listInfo.screenType,
                screen_id: action.listInfo.screen_id
            };

        case 'SEARCH_SOLDIERLIST_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.err
            }

        case 'DELETE_SOLDIERLIST_START':
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case 'DELETE_SOLDIERLIST_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: null
            }

        case 'DELETE_SOLDIERLIST_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.err
            }

        // case 'SEARCH_SUPERIOR_START':
        //     return {
        //         ...state,
        //         isLoading: true,
        //         error: null
        //     }

        // case 'SEARCH_SUPERIOR_SUCCESS':
        //     return {
        //         ...initState,
        //         soldierList: [action.soldierInfo.theSoldier],
        //         isLoading: false,
        //         error: null
        //     }

        // case 'SEARCH_SUPERIOR_ERROR':
        //     return {
        //         ...state,
        //         isLoading: false,
        //         error: action.err
        //     }

        // case 'SEARCH_SUBORDINATE_START':
        //     return {
        //         ...state,
        //         isLoading: true,
        //         error: null
        //     }

        // case 'SEARCH_SUBORDINATE_SUCCESS':

        //     if (action.soldierInfo.theSoldier.subo.length > 1) {
        //         return {
        //             ...initState,

        //             soldierList: [...action.soldierInfo.theSoldier.subo],
        //             isLoading: false,
        //             error: null
        //         }
        //     } else {
        //         return {
        //             ...initState,

        //             soldierList: [action.soldierInfo.theSoldier.subo],
        //             isLoading: false,
        //             error: null
        //         }
        //     }

        // case 'SEARCH_SUBORDINATE_ERROR':
        //     return {
        //         ...state,
        //         isLoading: false,
        //         error: action.err
        //     }

        case 'CLEAR_ALL':
            return {
                ...initState
            }

        default:
            return state
    }
}

export default registryList