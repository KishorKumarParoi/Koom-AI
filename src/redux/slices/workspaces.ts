import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
  workspaces: {
    type: "PERSONAL" | "PUBLIC" | "PRIVATE";
    name: string;
    id: string;
  }[];
};

const initialState: initialStateProps = {
  workspaces: [],
};

export const Workspaces = createSlice({
  name: "Workspaces",
  initialState,
  reducers: {
    WORKSPACES: (state, action: PayloadAction<initialStateProps>) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACES } = Workspaces.actions;
export default Workspaces.reducer;
