import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type resultState = {
  ok: boolean;
  data: resultSummary | null;
};

export interface resultSummary {
  is_damage_mode: boolean;
  char_names: string[];
  damage_by_char: { [key: string]: resultStats }[];
  char_active_time: resultStats[];
  abil_usage_count_by_char: { [key: string]: resultStats }[];
  reactions_triggered: { [key: string]: resultStats };
  particle_count: { [key: string]: resultStats };
  sim_duration: resultStats;
  damage: resultStats;
  dps: resultStats;
  iter: number;
  text: string;
  debug: string;
  runtime: number;
}

export interface resultStats {
  mean: number;
  min: number;
  max: number;
  sd?: number;
}

const initialState: resultState = {
  ok: false,
  data: null,
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setResult: (state, action: PayloadAction<resultSummary>) => {
      state.data = action.payload;
    },
  },
});

export const { setResult } = resultSlice.actions;

export default resultSlice.reducer;
