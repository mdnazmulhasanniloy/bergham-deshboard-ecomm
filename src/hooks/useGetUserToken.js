import { useAppSelector } from "./redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";

const useGetUserToken = () => {
  const token = useAppSelector(useCurrentToken);
  return { token };
};

export default useGetUserToken;
