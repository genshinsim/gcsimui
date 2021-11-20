import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

export const importSlice = createSlice({
  name: "import",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setJSON: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return action.payload;
    },
  },
});

export const { setJSON } = importSlice.actions;

export default importSlice.reducer;
