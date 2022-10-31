import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useStorage } from "../../store";
import { ISelectedDate } from "../../types";
import { DB } from "../index";
import { Day, dayConverter } from "../services/dayService";
import { Reserve } from "../services/timeService";

export default function useDay() {
  const { getData } = useStorage();
  const dayRef = collection(DB, 'day');
  const freeTimeRef = collection(DB, 'freeTime');
  const reservesRef = collection(DB, 'reserves');
  const waitingRef = collection(DB, 'waiting');

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

  const addDay = async (date: {
    full: number,
    formate: string
  }) => {
    try {
      await setDoc(doc(dayRef, date.full.toString()), { ...new Day(date) });
      await setDoc(doc(freeTimeRef, date.full.toString()), { ...new Reserve(date) });
      await setDoc(doc(reservesRef, date.full.toString()), { ...new Reserve(date) });
      await setDoc(doc(waitingRef, date.full.toString()), { ...new Reserve(date) });
    } catch (e) {
      errorHandler(e);
    }
  };

  const getDay = async () => {
    try {
      const date = await getData('selectedDate') as ISelectedDate;
      const ref = doc(dayRef, date.full.toString());
      const daySnap = await getDoc(ref.withConverter(dayConverter));
      if (daySnap.exists()) {
        return daySnap.data();
      } else {
        await addDay({
          full: date.full,
          formate: date.formate,
        });
        await getDay();
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    getDay,
  }
}