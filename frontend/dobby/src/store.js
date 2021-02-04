import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { imageCreateReducer, imageDetailsReducer, imageListReducer, imageUpdateReducer } from './reducers/imageReducers'
import { userListReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const reducer = combineReducers({

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    imageList: imageListReducer,
    imageCreate: imageCreateReducer,
    imageUpdate: imageUpdateReducer,
    imageDetails: imageDetailsReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : []

const initialState = {
  userLogin: { userInfo: userInfoFromStorage, },
}

const middleware = [thunk]

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const store = createStore(
    reducer,
    initialState,
    enhancer
)

export default store;