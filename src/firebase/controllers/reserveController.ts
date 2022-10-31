import { collection, doc, setDoc, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import { ITimeItem } from "../../types";
import { DB } from "../index";
import { sortReserves } from "../services/dayService";
// import { timeConverter } from "../services/timeService";

export default function useReserve() {
  const reserveRef = collection(DB, 'reserve');

  const errorHandler = (error: any) => {
    interface IError {
      code: string;
    }
    const isApiError = (x: any): x is IError => {
      return x.code ? x.code : false;
    };
    if (isApiError(error)) {
      const errorCode = error.code;
    }
  };

  const addReserve = async (id: string, time: ITimeItem) => {
    try {
      const reserveItemRef = doc(reserveRef, id);
      await setDoc(reserveItemRef, time);
    } catch (e) {
      errorHandler(e);
    }
  };

  const deleteReserve = async (id: string) => {
    try {
      const reserveItemRef = doc(reserveRef, id);
      await deleteDoc(reserveItemRef);
    } catch (e) {
      errorHandler(e);
    }
  };

  // const getAllReserves = async () => {
  //   try {
  //     const arr: ITimeItem[] = [];
  //     const reserves = await getDocs(reserveRef.withConverter(timeConverter));
  //     reserves.forEach(item => {
  //       arr.push(item.data());
  //     });
  //     return arr.sort(sortReserves);
  //   } catch (e) {
  //     errorHandler(e);
  //   }
  // };

  // const setReserve = async (id: string, comment: string) => {
  //   try {
  //     const reserveItemRef = doc(reserveRef, id);
  //     await updateDoc(reserveItemRef, {
  //       [`client.uid`]: appState.currentUser.uid,
  //       [`client.comment`]: comment,
  //       [`isReserved`]: true,
  //     });
  //   } catch (e) {
  //     errorHandler(e);
  //   }
  // }

  return {
    addReserve,
    deleteReserve,
  }
}