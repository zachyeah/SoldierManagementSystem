import {combineReducers} from 'redux';
import registryList from './registryList';
import editRegistryList from './editRegistryList';
import addRegistryList from './addRegistryList';

const reducers = combineReducers({registryList, editRegistryList, addRegistryList});
export default reducers