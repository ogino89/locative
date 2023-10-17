import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";


export const deleteRentCall = createAsyncThunk(
  "rentCall/deleteRentCall",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/rent-call/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Rappel de location a été supprimé avec succès",
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
