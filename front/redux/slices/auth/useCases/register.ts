import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../../../axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';
import { UserItem } from '../authSlice.interface';

export const register = createAsyncThunk(
  'auth/register',
  async (data: UserItem, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Compte créer avec succès, veuillez vous connectez.',
          options: {
            variant: 'success',
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error?.response) {
        if (error.response.status === 409) {
          thunkAPI.dispatch(
            enqueueSnackbar({
              message: 'Erreur lors de la création du compte',
              options: {
                variant: 'error',
              },
            })
          );
        }
      }
    }
  }
);
