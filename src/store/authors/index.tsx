import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IAuthor } from '@/models/IAuthor';

interface IAuthorsState {
  data: IAuthor[];
}

const initialState: IAuthorsState = {
  data: [],
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthors: (state, action: PayloadAction<IAuthor[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setAuthors } = authorsSlice.actions;

export default authorsSlice.reducer;
