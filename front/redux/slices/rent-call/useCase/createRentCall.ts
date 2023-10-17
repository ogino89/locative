import { createAsyncThunk } from "@reduxjs/toolkit";
import {  RentCallItem } from "../rentCallSlice.interface";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";

export const createRentCall = createAsyncThunk(
  "rentCall/createRentCall",
  async (data: RentCallItem, thunkAPI) => {
    try {
      const response = await axios.post("/rent-call", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Rappel de location a été créé avec succès",
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
