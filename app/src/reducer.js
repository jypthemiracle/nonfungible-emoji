import { combineReducers } from 'redux'
import { drizzleReducers } from '@drizzle/store'
import customReducer from "./reducers/customReducer"

const reducer = combineReducers({
    customReducer: customReducer,
    ...drizzleReducers
})

export default reducer