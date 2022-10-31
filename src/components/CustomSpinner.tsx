import { FC } from "react";
import { Spinner } from 'native-base';
import { color } from "../constants";

interface ICustomSpinner {
  isActive: boolean,
}

const CustomSpinner: FC<ICustomSpinner> = ({ isActive }) => {
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
          display: isActive ? 'flex' : 'none'
        }} />
  )
};

export default CustomSpinner;
