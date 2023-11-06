/**
 * The main entry point of the application. This is the
 * page that is rendered when the extension is opened.
 * It contains the timer and the settings for the timer.
 *
 * @author Enze Development <enzecs@proton.me>
 * @since 1.0.0-alpha.1
 */

import { useEffect, useState } from 'react';
import { TimeContext } from './contexts/TimeContext';
import { ActionContext } from './contexts/ActionContext';

/* Components Imports */
import Heading from './components/Heading';
import HoursInput from './components/inputs/HoursInput';
import MinutesInput from './components/inputs/MinutesInput';
import SecondsInput from './components/inputs/SecondsInput';
import StartButton from './components/buttons/StartButton';
import PauseButton from './components/buttons/PauseButton';
import ResetButton from './components/buttons/ResetButton';
import Confetti from './components/Confetti';
import Copyright from './components/Copyright';

export default function WorkTimerApp() {
    const [playVolume, setPlayVolume] = useState<boolean>(true);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(25);
    const [seconds, setSeconds] = useState<number>(0);

    /**
     * This function will play the audio file
     * that is used to notify the user that
     * the timer has finished.
     */
    const playAudio = () => {
        const audio = new Audio('audio.mp3');
        audio.volume = 0.1;
        audio.play();
    };

    /**
     * Handles the start of the timer.
     * This function is called when the user clicks
     * the "Start" button. It sets the `isRunning`
     * state to `true`, which will cause the timer
     * to start.
     */
    const handleStart = () => {
        setIsRunning(true);
        setIsPaused(false);
        setIsFinished(false);

        chrome.storage.local.set({
            bools: {
                isRunning: true,
                isPaused: false,
                isFinished: false,
                playVolume: playVolume,
            },
            timer: {
                hours: Number(hours),
                minutes: Number(minutes),
                seconds: Number(seconds),
            },
        });
    };

    /**
     * Handles the pause of the timer.
     * This function is called when the user clicks
     * the "Pause" button. It sets the `isRunning`
     * state to `false`, which will cause the timer
     * to pause.
     */
    const handlePause = () => {
        setIsRunning(false);
        setIsPaused(true);
        setIsFinished(false);

        chrome.storage.local.set({
            isRunning: false,
            isPaused: true,
            isFinished: false,
        });
    };

    /**
     * Handles the reset of the timer.
     * This function is called when the user clicks
     * the "Reset" button. It sets the `isRunning`,
     * `isPaused`, and `isFinished` states to `false`,
     * which will cause the timer to reset.
     */
    const handleReset = () => {
        setIsRunning(false);
        setIsPaused(false);
        setIsFinished(false);
        setHours(0);
        setMinutes(25);
        setSeconds(0);

        chrome.storage.local.set({
            bools: {
                isRunning: false,
                isPaused: false,
                isFinished: false,
                playVolume: playVolume,
            },
            timer: {
                hours: 0,
                minutes: 25,
                seconds: 0,
            },
        });
    };

    /**
     * Handles the finish of the timer.
     * This function is called when the timer reaches
     * 0. It sets the `isRunning` state to `false`,
     * which will cause the timer to stop.
     */
    const handleFinish = () => {
        if (playVolume) playAudio();
        setIsRunning(false);
        setIsPaused(false);
        setIsFinished(true);

        chrome.storage.local.set({
            bools: {
                isRunning: false,
                isPaused: false,
                isFinished: true,
                playVolume: playVolume,
            },
        });
    };

    /**
     * The effect that handles the timer. It is
     * called whenever the `isRunning` state is
     * changed. It will start the timer and count
     * down the time until it reaches 0.
     *
     * It will re-render whenever the `isRunning`,
     * `hours`, `minutes`, or `seconds` state is
     * changed.
     */
    useEffect(() => {
        // If the background script has set the timer, use that
        if (chrome.storage) {
            chrome.storage.local.get(['timer', 'bools'], (result) => {
                if (result.bools.isRunning && result.timer) {
                    setHours(result.timer.hours);
                    setMinutes(result.timer.minutes);
                    setSeconds(result.timer.seconds);

                    setIsFinished(result.bools.isFinished);
                    setIsPaused(result.bools.isPaused);
                    setIsRunning(result.bools.isRunning);
                    setPlayVolume(result.bools.playVolume);
                }
            });
        }

        let timerId: NodeJS.Timeout;
        if (isRunning && !isPaused) {
            if (seconds > 0) {
                timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
            } else if (seconds === 0 && minutes > 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
            } else if (seconds === 0 && minutes === 0 && hours > 0) {
                setSeconds(59);
                setMinutes(59);
                setHours(hours - 1);
            } else {
                handleFinish();
                Confetti.launch();
            }
        }

        // Clear the timeout if the component unmounts or the timer is paused
        return () => clearTimeout(timerId);
    }, [isRunning, hours, minutes, seconds]);

    // Properties to pass to the TimeContext:
    const timeProps = {
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
    };

    // Properties to pass to the ActionContext:
    const buttonProps = {
        handleStart,
        handlePause,
        handleReset,
        isRunning,
        isPaused,
    };

    return (
        <div className="min-w-[500px] max-w-sm mx-auto flex flex-col items-center justify-center p-10">
            <Heading title="WorkTimer" playVolume={playVolume} setPlayVolume={setPlayVolume} />

            <div className="flex flex-col gap-1 w-full text-center mb-3">
                <label htmlFor="time" className="text-sm font-medium">
                    How long would you like to focus?
                </label>
                <div className="flex flex-row items-center justify-center gap-4 border w-full rounded-md p-2 text-lg font-semibold">
                    <TimeContext.Provider value={timeProps}>
                        <HoursInput />
                        <MinutesInput />
                        <SecondsInput />
                    </TimeContext.Provider>
                </div>
            </div>

            {isFinished && (
                <span className="mb-3 text-center text-base font-normal py-1 text-green-100 bg-green-700 w-full rounded-md">
                    Your time is up! You can reset and start below.
                </span>
            )}

            <div className="flex flex-row items-center justify-center gap-3 w-full">
                <ActionContext.Provider value={buttonProps}>
                    <StartButton />
                    <PauseButton />
                    <ResetButton />
                </ActionContext.Provider>
            </div>

            <Copyright />
        </div>
    );
}
