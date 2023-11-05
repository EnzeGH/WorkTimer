import { createContext } from 'react';

interface ActionContextProps {
    handleStart: () => void;
    handlePause: () => void;
    handleReset: () => void;
    isRunning: boolean;
    isPaused: boolean;
}

export const ActionContext = createContext<ActionContextProps>({} as ActionContextProps);
