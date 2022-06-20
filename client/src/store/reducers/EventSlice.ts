import { createSlice } from "@reduxjs/toolkit";
import {IEvent} from "../../models/IEvent";

interface Events {
    events: IEvent[]
}

const initialState:Events = {
    events: []
} 

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        addEvent(state, action) {
            console.log(state.events)
            state.events.push(action.payload)
        },

        addManyEvents(state, action) {
            state.events = [...state.events, ...action.payload]
        }
    }
})

export default eventSlice.reducer