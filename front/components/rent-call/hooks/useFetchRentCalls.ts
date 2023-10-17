import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getRentCallList } from "../../../redux/slices/rent-call";


const useFetchRentCalls = () => {

  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    args.include = {
      tenant: true,
    };
    dispatch(getRentCallList({ args }));
  };
};

export default useFetchRentCalls;
