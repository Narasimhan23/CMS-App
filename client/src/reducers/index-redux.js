import { combineReducers} from 'redux'
import alert from './alert-reducer';
import auth from "./auth-reducer"
import post from "./post-reducer"

export default combineReducers({alert,auth,post}); 