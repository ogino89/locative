import { createAsyncThunk } from "@reduxjs/toolkit";
import {  TenantItem } from "../tenantSlice.interface";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";

export const updateTenant = createAsyncThunk(
  "tenant/updateTenant",
  async (data: { id: string; tenant: TenantItem }, thunkAPI) => {
    try {
      delete data.tenant.id
      const response = await axios.patch(
        `/tenant/${data.id}`,
        data.tenant
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Locataire mis à jour avec succès",
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
