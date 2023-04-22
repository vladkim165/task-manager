import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type taskDateFilterVariants = 'ASC' | 'DESC';

interface IDateFilterState {
  dateFilter: taskDateFilterVariants;
}

const initialState: IDateFilterState = {
  dateFilter: 'DESC',
};

const filtersSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setDateFilter: (state, action: PayloadAction<taskDateFilterVariants>) => {
      state.dateFilter = action.payload;
    },
  },
});

export const { setDateFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
