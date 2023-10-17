import { createAsyncThunk } from "@reduxjs/toolkit";
import {  TenantItem } from "../tenantSlice.interface";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";

export const createTenant = createAsyncThunk(
  "tenant/creatTenant",
  async (data: TenantItem, thunkAPI) => {
    try {
      const response = await axios.post("/tenant", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Locataire créé avec succès",
          options: {
            variant: "success",
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
