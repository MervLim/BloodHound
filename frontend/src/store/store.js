import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import searchReducer from '../reducers/searchReducer'
import updateChartReducer from '../reducers/updateChartReducer'
import userReducer from '../reducers/userReducer'
import thunk from 'redux-thunk';

export let initStore = () => {

  const reducer = combineReducers( {
      JSONresult: searchReducer,
      UpdateChart: updateChartReducer,
      UserReducer: userReducer
  });

  const store = createStore( reducer,
    compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
