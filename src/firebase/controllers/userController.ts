import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "firebase/firestore";
import { setCurrentUserInfo } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ITimeItem } from "../../types";
import { authentification, DB } from "../index";
import { History, User, userConverter } from "../services/userService";
import useReserve from "./reserveController";

export default function useAuth() {
    const appState = useAppSelector(s => s.AppStore);
    const reduxDispatch = useAppDispatch();
    const auth = authentification;

    const userRef = collection(DB, "user");
    const dayRef = collection(DB, 'day');

    const { deleteReserve } = useReserve();

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

            if (errorCode === 'auth/user-not-found') {

            } else if (errorCode === 'auth/wrong-password') {

            } else if (errorCode === 'auth/invalid-email') {

            } else if (errorCode === 'auth/too-many-requests') {

            } else if (errorCode === 'auth/email-already-in-use') {

            } else {

            }
        }
    };

    const getCurrentUser = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userSnap = await getDoc(doc(userRef, user.uid).withConverter(userConverter));
                if (userSnap.exists()) {
                    reduxDispatch(setCurrentUserInfo(userSnap.data()));
                    return;
                } else {
                    const newUser = new User(user.uid, user.phoneNumber || '');
                    await setDoc(doc(userRef, user.uid), { ...newUser });
                    getCurrentUser();
                }
            }
        } catch (e) {
            errorHandler(e);
        }
    };

    const getUserInfo = async (uid: string) => {
        try {
            const userSnap = await getDoc(doc(userRef, uid).withConverter(userConverter));
            if (userSnap.exists()) {
                return userSnap.data();
            }
        } catch (e) {
            errorHandler(e);
        }
    };

    const setName = async (uid: string, value: string) => {
        try {
            await updateDoc(doc(userRef, uid), {
                ['name']: value,
            });
        } catch (e) {
            errorHandler(e);
        }
    };

    const setInst = async (uid: string, value: string) => {
        try {
            await updateDoc(doc(userRef, uid), {
                ['instagram']: value,
            });
        } catch (e) {
            errorHandler(e);
        }
    };


    const addHistoryItem = async (
        uid: string,
        timeItem: ITimeItem,
    ) => {
        try {
            const newHistoryItem = new History(timeItem);
            await updateDoc(doc(userRef, uid), {
                ['history.' + [newHistoryItem.id]]: { ...newHistoryItem }
            });
        } catch (e) {
            errorHandler(e);
        }
    };

    const setHictoryStatus = async (uid: string, itemID: string, status: 'canceled' | 'success' | 'await') => {
        try {
            await updateDoc(doc(userRef, uid), {
                ['history.' + [itemID] + '.status']: status
            });
        } catch (e) {
            errorHandler(e);
        }
    };

    return {
        getUserInfo,
        getCurrentUser,
        setName,
        setInst,
    }
}
