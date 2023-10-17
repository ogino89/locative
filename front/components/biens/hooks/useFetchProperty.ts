import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getPropertyList } from "../../../redux/slices/property";


const useFetchProperty = () => {

  const dispatch = useAppDispatch();

  return async () => {
    dispatch(getPropertyList({  }));
  };
};

export default useFetchProperty;
