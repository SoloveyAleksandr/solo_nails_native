import { configureStore, createSlice } from '@reduxjs/toolkit';
import { IDay, IDayItem, ISelectedDate, IUser } from '../types';

const month: number = 0;
const year: number = 0;
const selectedDate: ISelectedDate = {
  full: 0,
  formate: '',
};
const selectedMonth: IDayItem[] = [];

const isLoading: boolean = false;

const currentUserInfo: IUser = {
  uid: '',
  name: '',
  phone: '',
  instagram: '',
  refferals: [],
  history: {},
  privateKey: '',
  inviteKey: '',
  description: '',
};

const isLogged: boolean = false;

const selectedDay: IDay = {
  date: {
    full: 0,
    formate: '',
  },
  timeList: {},
};

const currentUserUID: string = '';

const AppStore = createSlice({
  name: 'AppStore',

  initialState: {
    month,
    year,
    selectedDate,
    selectedMonth,
    isLoading,
    currentUserInfo,
    isLogged,
    selectedDay,
    currentUserUID,
  },

  reducers: {
    setMonth(state, action: { payload: number }) {
      state.month = action.payload;
    },

    setYear(state, action: { payload: number }) {
      state.year = action.payload;
    },

    setNextMonth(state) {
      if (state.month < 11) {
        state.month = state.month + 1;
      } else {
        state.month = 0;
        state.year = state.year + 1;
      }
    },

    setPrevMonth(state) {
      if (state.month > 0) {
        state.month = state.month - 1;
      } else {
        state.month = 11;
        state.year = state.year - 1;
      }
    },

    setSelectedDate(state, action: { payload: ISelectedDate }) {
      state.selectedDate = action.payload;
    },

    setSelectedMonth(state, action: { payload: IDayItem[] }) {
      state.selectedMonth = action.payload;
    },

    setLoading(state, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },

    setCurrentUserInfo(state, action: { payload: IUser }) {
      state.currentUserInfo = action.payload;
    },

    resetCurrentUserInfo(state) {
      state.currentUserInfo = {
        uid: '',
        name: '',
        phone: '',
        instagram: '',
        refferals: [],
        history: {},
        privateKey: '',
        inviteKey: '',
        description: '',
      };
    },

    setIsLogged(state, action: { payload: boolean }) {
      state.isLogged = action.payload;
    },

    setSelectedDay(state, action: { payload: IDay }) {
      state.selectedDay = action.payload;
    },

    setCurrentUserUID(state, action: { payload: string }) {
      state.currentUserUID = action.payload;
    },

  },
});

export const {
  setMonth,
  setYear,
  setNextMonth,
  setPrevMonth,
  setSelectedDate,
  setSelectedMonth,
  setLoading,
  setCurrentUserInfo,
  resetCurrentUserInfo,
  setIsLogged,
  setSelectedDay,
  setCurrentUserUID,
} = AppStore.actions;

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    AppStore: AppStore.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch