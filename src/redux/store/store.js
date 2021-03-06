import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore as reduxCreateStore } from 'redux';
import thunk from 'redux-thunk';

import { CategoriesReducer } from '../category/reducers';
import { TransactionReducer } from '../transactions/reducers';
import { UserReducer } from '../users/reducers';

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            category: CategoriesReducer,
            transaction: TransactionReducer,
            user: UserReducer
        }),
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            )
        )
    )
}