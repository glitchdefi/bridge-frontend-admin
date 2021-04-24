import { combineReducers } from 'redux';
import alert from './alert.reducer';
import utils from './utils.reducer';
const reducers = combineReducers({
    alert,
    utils
});

export default reducers;