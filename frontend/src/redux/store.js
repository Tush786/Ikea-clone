import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { UserReducer } from "./User/UserReducer"
import { CommonReducer } from "./CommonReducer"


export const store = configureStore({
    reducer: {
        "common": CommonReducer,
        "user": UserReducer,
    },
    middleware: [thunk]
})