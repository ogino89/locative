import { createSlice } from "@reduxjs/toolkit";
import { createRentCall } from "./useCase/createRentCall";
import { deleteRentCall } from "./useCase/deleteRentCall";
import { editRentCall } from "./useCase/editRentCall";
import { getRentCall } from "./useCase/getRentCall";
import { getRentCallList } from "./useCase/getRentCallList";
import { updateRentCall } from "./useCase/updateRentCall";
import { RentCallInitialState } from "./rentCallSlice.interface";

const initialState: RentCallInitialState = {
  rentCallList: [],
  rentCall: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const rentCallSlice = createSlice({
  name: "rentCall",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.rentCall = {};
    },
  },
  extraReducers: {
    [getRentCall.pending.type]: (state) => {
      state.loading = true;
    },
    [getRentCall.fulfilled.type]: (state, action) => {
      state.rentCall = action.payload;
      state.loading = false;
    },
    [getRentCall.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [getRentCallList.pending.type]: (state) => {
      state.loading = true;
    },
    [getRentCallList.fulfilled.type]: (state, action) => {
      state.rentCallList = action.payload;
      state.loading = false;
    },
    [getRentCallList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [createRentCall.pending.type]: (state) => {
      state.loading = true;
    },
    [createRentCall.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createRentCall.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateRentCall.pending.type]: (state) => {
      state.loading = true;
    },
    [updateRentCall.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.rentCall = {};
    },
    [updateRentCall.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [deleteRentCall.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteRentCall.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteRentCall.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editRentCall.pending.type]: (state) => {
      state.loading = true;
    },
    [editRentCall.fulfilled.type]: (state, action) => {
      state.rentCall = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editRentCall.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = rentCallSlice.actions;
