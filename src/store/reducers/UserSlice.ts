import {IUser} from 'models/User';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import LocalStorageService from "../../services/LocalStorageService";

interface UserState {
    user: IUser | null,
    loading: boolean,
    error: string
}

const initialState: UserState = {
    user: LocalStorageService.get('user'),
    loading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
            LocalStorageService.save('user', state.user );
        },
        logout(state) {
            state.user = null;
            LocalStorageService.remove('user');
        }
    }
})

export default userSlice.reducer;