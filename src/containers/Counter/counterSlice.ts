import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";

interface CounterState {
  value: number;
  loading: boolean;
  error: boolean;
  updateLoading: boolean;
}

const initialState: CounterState = {
  value: 0,
  loading: false,
  error: false,
  updateLoading: false,
}

export const fetchCounter = createAsyncThunk<number>(
  'counter/fetch', async () => {
    const response = await axiosApi.get<number | null>('/counter.json');
    return response.data ?? 0;
  },
)

export const incrementCounter = createAsyncThunk<void, undefined, {state: RootState}>(
  'counter/increment',
  async (arg, thunkAPI) => {
    const counter = thunkAPI.getState().counter.value;
    await axiosApi.put('/counter.json', counter + 1);
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
    increaseBy: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decreaseBy: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCounter.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCounter.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(fetchCounter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(incrementCounter.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(incrementCounter.fulfilled, (state) => {
      state.updateLoading = false;
    });
  },
});

export const counterReducer = counterSlice.reducer;
export const {increment, decrement, increaseBy, decreaseBy} = counterSlice.actions;