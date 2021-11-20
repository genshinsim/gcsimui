import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OptionState {
  debug: boolean;
  i: number;
  d: number;
  w: number;
  multi: boolean;
  calc: boolean;
  useBuilder: boolean;
}
export interface ConfigState {
  config: string;
  options: OptionState;
}

const initialState: ConfigState = {
  config: "",
  options: {
    debug: true,
    i: 1000,
    d: 90,
    w: 24,
    multi: false,
    calc: false,
    useBuilder: true,
  },
};

export const configSlice = createSlice({
  name: "settings",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setConfig: (state, action: PayloadAction<string>) => {
      state.config = action.payload;
    },
    setOption: (state, action: PayloadAction<OptionState>) => {
      state.options = action.payload;
    },
  },
});

export const { setConfig, setOption } = configSlice.actions;

export default configSlice.reducer;
