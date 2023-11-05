import { createContext } from 'react';

interface TimeContextProps {
    hours: number;
    setHours: (hours: number) => void;
    minutes: number;
    setMinutes: (minutes: number) => void;
    seconds: number;
    setSeconds: (seconds: number) => void;
}

export const TimeContext = createContext<TimeContextProps>({} as TimeContextProps);
