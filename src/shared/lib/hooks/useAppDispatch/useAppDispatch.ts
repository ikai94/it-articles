import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/StoreProvider';

// типизируем юсдиспатч, для полученя автокомплида и правильной подстановки
export const useAppDispatch = () => useDispatch<AppDispatch>();
