import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blankChar, Character } from "../../util";

export type Team = Array<Character>;

const initialState: Team = [];

export const teamSlice = createSlice({
  name: "team",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCharacter: (
      state,
      action: PayloadAction<{ index: number; data: Character }>
    ) => {
      if (action.payload.index > 0 && action.payload.index < state.length) {
        state[action.payload.index] = action.payload.data;
      }
    },
    addCharacter: (state) => {
      //add new if length < 4
      if (state.length < 4) {
        state.push(blankChar());
      }
    },
  },
});

export const { setCharacter, addCharacter } = teamSlice.actions;

export default teamSlice.reducer;
