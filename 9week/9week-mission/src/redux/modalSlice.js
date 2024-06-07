
import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showModal: true,
  },
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = modalSlice.actions;

export default modalSlice.reducer;
