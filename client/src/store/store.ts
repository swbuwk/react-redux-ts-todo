import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice"
import eventReducer from "./reducers/EventSlice"


const rootReducer = combineReducers({
    userReducer,
    eventReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
})}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]