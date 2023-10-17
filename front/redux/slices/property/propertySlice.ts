import { createSlice } from "@reduxjs/toolkit";
import {  createProperty } from "./useCase/createProperty";
import {  deleteProperty } from "./useCase/deleteProperty";
import {  editProperty } from "./useCase/editProperty";
import {  getProperty } from "./useCase/getProperty";
import {  getPropertyList } from "./useCase/getPropertyList";
import {  updateProperty } from "./useCase/updateProperty";
import { PropertyInitialState } from "./propertySlice.interface";

const initialState: PropertyInitialState = {
  propertyList: [],
  property: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.property = {};
    },
  },
  extraReducers: {
    [getProperty.pending.type]: (state) => {
      state.loading = true;
    },
    [getProperty.fulfilled.type]: (state, action) => {
      state.property = action.payload;
      state.loading = false;
    },
    [getProperty.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [getPropertyList.pending.type]: (state) => {
      state.loading = true;
    },
    [getPropertyList.fulfilled.type]: (state, action) => {
      state.propertyList = action.payload;
      state.loading = false;
    },
    [getPropertyList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [createProperty.pending.type]: (state) => {
      state.loading = true;
    },
    [createProperty.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createProperty.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateProperty.pending.type]: (state) => {
      state.loading = true;
    },
    [updateProperty.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.property = {};
    },
    [updateProperty.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [deleteProperty.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteProperty.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteProperty.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editProperty.pending.type]: (state) => {
      state.loading = true;
    },
    [editProperty.fulfilled.type]: (state, action) => {
      state.property = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editProperty.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = propertySlice.actions;
