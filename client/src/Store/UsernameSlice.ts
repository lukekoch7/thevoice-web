import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsernameState {
    value: string
}

const initialState = {value: "unknown"} as UsernameState;

const usernameSlice = createSlice({
    name: "username",
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state = {value: action.payload};
        }
    },
})

export const {setUsername} = usernameSlice.actions;
export default usernameSlice.reducer;