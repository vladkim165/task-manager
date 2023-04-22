import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ITask } from '@/models/ITask';

interface ITasksState {
  data: ITask[];
  currentTask: ITask | null;
}

const initialState: ITasksState = {
  data: [],
  currentTask: null,
};

const tasksSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.data = action.payload;
    },
    setCurrentTask: (state, action: PayloadAction<ITask | null>) => {
      state.currentTask = action.payload;
    },
  },
});

export const { setTasks, setCurrentTask } = tasksSlice.actions;

export default tasksSlice.reducer;
