import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { customizationSlice } from './slices/customizationSlice';
import { notificationSlice } from './notification/notificationSlice';
import { authSlice } from './slices/auth/authSlice';
import { propertySlice } from './slices/property/propertySlice';
import { tenatSlice } from './slices/tenant/tenantSlice';
import { rentCallSlice } from './slices/rent-call/rentCallSlice';

export const store = configureStore({
  reducer: {
    customization: customizationSlice.reducer,
    notification: notificationSlice.reducer,
    auth: authSlice.reducer,
    property: propertySlice.reducer,
    tenant: tenatSlice.reducer,
    rentCall: rentCallSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;