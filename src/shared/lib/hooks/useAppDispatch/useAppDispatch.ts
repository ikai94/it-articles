import { AppDispatch } from 'app/providers/StoreProvider';
import { useDispatch } from 'react-redux';

// типизируем юсдиспатч, для полученя автокомплида и правильной подстановки
export const useAppDispatch = () => useDispatch<AppDispatch>();
