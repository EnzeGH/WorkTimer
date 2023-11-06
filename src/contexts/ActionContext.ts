import { createContext } from 'react';

/**
 * This context is used to provide the action buttons
 * the necessary handlers and states.
 *
 * @property handleStart - Function to start the timer.
 * @property handlePause - Function to pause the timer.
 * @property handleReset - Function to reset the timer.
 * @property isRunning - Boolean to indicate if the timer is running.
 * @property isPaused - Boolean to indicate if the timer is paused.
 */
interface ActionContextProps {
    handleStart: () => void;
    handlePause: () => void;
    handleReset: () => void;
    isRunning: boolean;
    isPaused: boolean;
}

export const ActionContext = createContext<ActionContextProps>({} as ActionContextProps);
