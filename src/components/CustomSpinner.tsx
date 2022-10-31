import { FC } from "react";
import { Spinner } from 'native-base';
import { color } from "../constants";
import { useAppSelector } from "../store/hooks";

const CustomSpinner: FC = () => {
  const appState = useAppSelector(store => store.AppStore);
  return (
    <Spinner
      size={50}
      color={'rgb(192, 109, 130)'}
      style={
        {
          position: 'absolute',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color.black80,
          zIndex: 1000,
          display: appState.isLoading ? 'flex' : 'none'
        }} />
  )
};

export default CustomSpinner;
