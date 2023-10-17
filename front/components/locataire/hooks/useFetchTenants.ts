import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getTenantList } from "../../../redux/slices/tenant";


const useFetchTenant = () => {

  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    args.include = {
      property: true,
    };
    dispatch(getTenantList({ args }));
  };
};

export default useFetchTenant;
