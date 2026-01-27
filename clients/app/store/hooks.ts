import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Appstore, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useSelector.withTypes<Appstore>()