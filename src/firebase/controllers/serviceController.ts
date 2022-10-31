import { collection, doc, setDoc, deleteDoc, getDocs, updateDoc, deleteField, getDoc } from "firebase/firestore";
import { IService } from "../../types";
import { DB } from "../index";

export const useService = () => {
  const priceRef = doc(collection(DB, 'other'), 'price');

  const setService = async (item: IService) => {
    await updateDoc(priceRef, {
      [item.id]: item,
    })
  };

  const removeService = async (item: IService) => {
    await updateDoc(priceRef, {
      [item.id]: deleteField(),
    });
  };

  const getServices = async () => {
    const snap = await getDoc(priceRef);
    const data = snap.data() as {
      [key: string]: IService
    }
    return data;
  }

  return {
    setService,
    removeService,
    getServices,
  }
}