import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk'


const store = createStore(reducer, applyMiddleware(thunkMiddleware));  // т.к componrntDidMount не может принять метод(функцию передачи логики в редюсер) необходимо применять промежуточное ПО

export default store