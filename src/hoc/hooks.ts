// hooks.ts (un fișier separat pentru hook-urile tipizate)
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../components/redux/redux.store.ts'; // Asigură-te că calea e corectă

// Folosește-le în întreaga ta aplicație în loc de useDispatch și useSelector vanilla
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;