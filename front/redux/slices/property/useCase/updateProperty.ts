import { createAsyncThunk } from "@reduxjs/toolkit";
import { PropertyItem } from "../propertySlice.interface";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";

export const updateProperty = createAsyncThunk(
  "property/updateProperty",
  async (data: { id: string; property: PropertyItem }, thunkAPI) => {
    try {
      delete data.property.id
      const response = await axios.patch(
        `/property/${data.id}`,
        data.property
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Immobilier mis à jour avec succès",
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
