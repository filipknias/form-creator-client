import { configureStore } from '@reduxjs/toolkit';
import FormCreatorReducer from '@/redux/features/formCreatorSlice';

export const store = configureStore({
  reducer: {
    formCreator: FormCreatorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch