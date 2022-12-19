import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { sagaMiddleware } from './middleware';
import staticReducers, { history } from './reducers';
import staticSagas from './sagas';

const createReducer = (asyncReducers) => combineReducers({
    ...staticReducers,
    ...asyncReducers
  });

function createSagaInjector(runSaga, rootSaga) {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();
  const isInjected = (key) => injectedSagas.has(key);

  const injectSaga = (key, saga) => {
    // We won't run saga if it is already injected
    if (isInjected(key)) return;

    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(saga);

    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task);
  };

  // Inject the root saga as it a statically loaded file,
  injectSaga('root', rootSaga);

  return injectSaga;
}

const configureStore = (preloadedState = {}) => {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(createReducer(), preloadedState, composedEnhancers);

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  // Add injectSaga method to our store
  store.injectSaga = createSagaInjector(sagaMiddleware.run, staticSagas);

  // enable hot reloading for reducers in the development mode
  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers', () => store.replaceReducer(createReducer()));
  // }

  // Return the modified store
  return store;
};

export default configureStore();
