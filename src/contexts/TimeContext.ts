import { createContext } from 'react';

/**
 * This context is used to provide the input groups
 * the necessary handlers and states.
 *
 * @property hours - The hours value.
 * @property setHours - Function to set the hours value.
 * @property minutes - The minutes value.
 * @property setMinutes - Function to set the minutes value.
 * @property seconds - The seconds value.
 * @property setSeconds - Function to set the seconds value.
 */
interface TimeContextProps {
    hours: number;
    setHours: (hours: number) => void;
    minutes: number;
    setMinutes: (minutes: number) => void;
    seconds: number;
    setSeconds: (seconds: number) => void;
}

export const TimeContext = createContext<TimeContextProps>({} as TimeContextProps);
