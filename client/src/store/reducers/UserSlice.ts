import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";

const initialState:IUser = {
    id: 0,
    name: "",
    email: "",
    isAuth: false
} 

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.isAuth = true
            const user = action.payload
            state.id = user.id
            state.name = user.name
            state.email = user.email
        }
    }
})

export default userSlice.reducer