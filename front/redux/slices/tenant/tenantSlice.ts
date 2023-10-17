import { createSlice } from "@reduxjs/toolkit";
import { createTenant } from "./useCase/createTenant";
import { deleteTenant } from "./useCase/deleteTenant";
import { editTenant } from "./useCase/editTenant";
import { getTenant } from "./useCase/getTenant";
import { getTenantList } from "./useCase/getPropertyList";
import { updateTenant } from "./useCase/updateTenant";
import { TenantInitialState } from "./tenantSlice.interface";

const initialState: TenantInitialState = {
  tenantList: [],
  tenant: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const tenatSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.tenant = {};
    },
  },
  extraReducers: {
    [getTenant.pending.type]: (state) => {
      state.loading = true;
    },
    [getTenant.fulfilled.type]: (state, action) => {
      state.tenant = action.payload;
      state.loading = false;
    },
    [getTenant.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [getTenantList.pending.type]: (state) => {
      state.loading = true;
    },
    [getTenantList.fulfilled.type]: (state, action) => {
      state.tenantList = action.payload;
      state.loading = false;
    },
    [getTenantList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [createTenant.pending.type]: (state) => {
      state.loading = true;
    },
    [createTenant.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createTenant.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateTenant.pending.type]: (state) => {
      state.loading = true;
    },
    [updateTenant.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.tenant = {};
    },
    [updateTenant.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [deleteTenant.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteTenant.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteTenant.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editTenant.pending.type]: (state) => {
      state.loading = true;
    },
    [editTenant.fulfilled.type]: (state, action) => {
      state.tenant = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editTenant.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = tenatSlice.actions;
