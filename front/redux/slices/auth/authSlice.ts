import { createSlice } from '@reduxjs/toolkit';
// import UserDTO from '../../../data/dto/User.dto';
import { fetchSelectedUser } from './useCases/fetchSelectedUser';
import { axios } from '../../../axios';
import { login } from './useCases/login';
import { fetchConnectedUser } from './useCases/fetchConnectedUser';
import { logout } from './useCases/logout';
import { UserItem } from './authSlice.interface';
import { relogedConnectedUser } from './useCases/relogedConnectedUser';

export type AuthInitialState = {
  isLogedIn: boolean;
  user: UserItem | undefined;
  isLoading: boolean;
  error: string;
  users: UserItem[];
};

const initialState: AuthInitialState = {
  isLogedIn: false,
  user: undefined,
  isLoading: false,
  error: '',
  users: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogedIn = false;
      state.user = undefined;
      localStorage.removeItem('at');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state) => {
      state.isLogedIn = true;
    },
    [login.rejected.type]: (state) => {
      state.isLogedIn = false;
    },

    // fetch connected user
    [fetchConnectedUser.fulfilled.type]: (state, action) => {
      state.user = action.payload;
    },
    [fetchConnectedUser.rejected.type]: (state) => {
      state.user = undefined;
    },
    [relogedConnectedUser.fulfilled.type]: (state) => {
        state.isLogedIn = true;
      },



    // get selected user
    [fetchSelectedUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchSelectedUser.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.user = actions.payload;
    },
    [fetchSelectedUser.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    [logout.pending.type]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled.type]: (state) => {
      state.isLogedIn = false;
      state.user = undefined;
    },
    [logout.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});
