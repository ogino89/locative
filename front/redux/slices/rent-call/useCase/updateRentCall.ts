import { createAsyncThunk } from "@reduxjs/toolkit";
import {  RentCallItem } from "../rentCallSlice.interface";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";

export const updateRentCall = createAsyncThunk(
  "rentCall/updateRentCall",
  async (data: { id: string; rentCall: RentCallItem }, thunkAPI) => {
    try {
      delete data.rentCall.id
      const response = await axios.patch(
        `/rent-call/${data.id}`,
        data.rentCall
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Rappel de location a été mis à jour avec succès",
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
