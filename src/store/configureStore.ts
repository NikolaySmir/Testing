import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./taskSlice";
import { loadState, saveState } from "src/utils/persist";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
  },
  devTools: true,
  preloadedState: persistedState,
});

export const createTestStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      taskList: taskListReducer,
    },
    devTools: true,
    preloadedState,
  });
};

store.subscribe(() => {
  saveState({
    ...store.getState(),
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
