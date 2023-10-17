import { createAsyncThunk } from "@reduxjs/toolkit";
import { PropertyItem } from "../propertySlice.interface";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";

export const createProperty = createAsyncThunk(
  "property/createProperty",
  async (data: PropertyItem, thunkAPI) => {
    try {
      const response = await axios.post("/property", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Immobilier créé avec succès",
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
