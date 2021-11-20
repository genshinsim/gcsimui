import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import configSlice from "~/src/features/sim/configSlice";
import teamSlice from "~/src/features/team/teamSlice";
import importSlice from "~/src/features/import/importSlice";
import resultSlice from "~/src/features/result/resultSlice";

export const store = configureStore({
  reducer: {
    settings: configSlice,
    team: teamSlice,
    import: importSlice,
    result: resultSlice,
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
