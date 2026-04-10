import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  latitude: number | null;
  longitude: number | null;
}

const initialState: OnboardingState = {
  latitude: null,
  longitude: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{ lat: number; long: number }>
    ) => {
      state.latitude = action.payload.lat;
      state.longitude = action.payload.long;
    },
   
  },
});

export const { setLocation, } = onboardingSlice.actions;
export default onboardingSlice.reducer;