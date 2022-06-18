import { createAsyncThunk, createSlice, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";
// import { createSelector } from "reselect";
import { RootState } from "../../app/store";

export interface ReqResUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  toggled?: boolean;
}

interface entityUser {
  [id: string]: ReqResUser;
}

interface responseReqResUsers {
  page: string;
  per_page: string;
  total: string;
  total_pages: string;
  data: ReqResUser[];
}

export interface onOffState {
  value: boolean;
  entities: entityUser;
}

const usersAdapter = createEntityAdapter<ReqResUser>();
const initialState = usersAdapter.getInitialState({
  //entities
  //ids
  value: false,
});

export const fetchUsers = createAsyncThunk("onOff/fetchUsers", async (amount: number) => {
  const response = await fetch(`https://reqres.in/api/users?per_page=${amount ?? 3}`);
  const responseJson = (await response.json()) as responseReqResUsers;
  return responseJson;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setOnOffVal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    toggleUser: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const user = state.entities[id];
      if (user) user.toggled = !user.toggled;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const { data } = action.payload;

      const newEntities: entityUser = {};
      data.forEach((dataUser: ReqResUser, index) => {
        newEntities[dataUser.id] = dataUser;
      });

      usersAdapter.upsertMany(state, newEntities);
    });
  },
});
export const { setOnOffVal, toggleUser } = usersSlice.actions;

export const selectOnOffVal = (state: RootState) => state.users.value;

export const {
  selectAll: selectUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export default usersSlice.reducer;
