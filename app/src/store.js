import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { generateContractsInitialState } from '@drizzle/store'

import drizzleOptions from './drizzleOptions'
import reducer from './reducer'
import rootSaga from './rootSaga'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware()

const initialState = {
    contracts: generateContractsInitialState(drizzleOptions)
}

const store = createStore(
    reducer,
    initialState,
    compose (
        applyMiddleware(
            sagaMiddleware
        )
    )
)

sagaMiddleware.run(rootSaga)

export { history }

export default store