import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './tasks';
import authorsReducer from './authors';
import filtersReducer from './filters';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    authors: authorsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
