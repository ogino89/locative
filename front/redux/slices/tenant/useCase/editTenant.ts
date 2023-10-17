import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editTenant = createAsyncThunk(
  "tenant/editTenant",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/tenant/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

