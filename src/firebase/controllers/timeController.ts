import { collection, doc, updateDoc, deleteField, setDoc, deleteDoc, getDocs, query, where, addDoc, onSnapshot } from "firebase/firestore";
import { IReserveItem, ITimeItem } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DB } from "../index";
import useReserve from "./reserveController";
import useAuth from "./userController";

export default function useTime() {
  const reduxDispatch = useAppDispatch();
  const appState = useAppSelector(store => store.AppStore);

  const { addReserve, deleteReserve } = useReserve();

  const dayRef = collection(DB, 'day');
  const freeTimeRef = collection(DB, 'freeTime');
  const reservesRef = collection(DB, 'reserves');
  const waitingRef = collection(DB, 'waiting');
  const userRef = collection(DB, "user");

  const errorHandler = (error: any) => {
    interface IError {
      code: string;
    }
    console.log(error);
    const isApiError = (x: any): x is IError => {
      return x.code ? x.code : false;
    };
    if (isApiError(error)) {
      const errorCode = error.code;
      console.log(errorCode);
    }
  };

  // глубокое обраение в объекте
  // ['timeList.' + [time.id]]: deleteField()

  // ADD TIME FUNCS
  // 
  const setTimeToDay = async (time: ITimeItem) => {
    try {
      const id = time.id;
      const date = time.date.full.toString();
      const timeRef = doc(dayRef, date);
      await updateDoc(timeRef, {
        ['timeList.' + [id]]: time
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  const setTimeToFreeTime = async (time: ITimeItem) => {
    try {
      const id = time.id;
      const date = time.date.full.toString();
      const timeRef = doc(freeTimeRef, date);
      await updateDoc(timeRef, {
        ['timeList.' + [id]]: time
      })
    } catch (e) {
      errorHandler(e);
    }
  };

  const setTimeToReserves = async (time: ITimeItem) => {
    try {
      const id = time.id;
      const date = time.date.full.toString();
      const timeRef = doc(reservesRef, date);
      await updateDoc(timeRef, {
        ['timeList.' + [id]]: time
      })
    } catch (e) {
      errorHandler(e);
    }
  };

  const setTimeToWaiting = async (time: ITimeItem) => {
    try {
      const id = time.id;
      const date = time.date.full.toString();
      const timeRef = doc(waitingRef, date);
      await updateDoc(timeRef, {
        ['timeList.' + [id]]: time
      })
    } catch (e) {
      errorHandler(e);
    }
  };

  // REMOVE TIME FUNCS
  // 
  const removeTimeFromDay = async (time: ITimeItem) => {
    try {
      const date = time.date.full.toString();
      const timeRef = doc(dayRef, date);
      await updateDoc(timeRef, {
        ['timeList.' + [time.id]]: deleteField()
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  const removeTimeFromFreeTime = async (time: ITimeItem) => {
    try {
      const date = time.date.full.toString();
      const timeRef = doc(freeTimeRef, date);
      await updateDoc(timeRef, {
        ['timeList.' + [time.id]]: deleteField()
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  const removeTimeFromReserves = async (time: ITimeItem) => {
    try {
      const date = time.date.full.toString();
      const timeRef = doc(reservesRef, date);
      await updateDoc(timeRef, {
        ['timeList.' + [time.id]]: deleteField()
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  const removeTimeFromWaiting = async (time: ITimeItem) => {
    try {
      const date = time.date.full.toString();
      const timeRef = doc(waitingRef, date);
      await updateDoc(timeRef, {
        ['timeList.' + [time.id]]: deleteField()
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  //
  //
  const getAllReserves = async () => {
    try {
      const data: IReserveItem[] = [];
      const snap = await getDocs(collection(DB, 'reserves'));
      snap.forEach(el => {
        data.push(el.data() as IReserveItem);
      });
      return data;
    } catch (e) {
      errorHandler(e);
    }
  };


  //
  //
  const getFreeTime = async () => {
    try {
      const data: IReserveItem[] = [];
      const snap = await getDocs(collection(DB, 'freeTime'));
      snap.forEach(el => {
        data.push(el.data() as IReserveItem);
      });
      return data;
    } catch (e) {
      errorHandler(e);
    }
  };

  const bookATime = async (time: ITimeItem) => {
    try {
      await setTimeToDay(time);
      await setTimeToWaiting(time);
      await removeTimeFromFreeTime(time);
    } catch (e) {
      errorHandler(e);
    }
  }

  return {
    setTimeToDay,
    setTimeToFreeTime,
    setTimeToReserves,
    setTimeToWaiting,

    removeTimeFromDay,
    removeTimeFromFreeTime,
    removeTimeFromReserves,
    removeTimeFromWaiting,

    getAllReserves,
    getFreeTime,

    bookATime,
  }
}