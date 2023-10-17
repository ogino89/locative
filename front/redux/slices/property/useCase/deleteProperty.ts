import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";


export const deleteProperty = createAsyncThunk(
  "property/deleteProperty",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/property/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Immobilier supprimé avec succès",
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
