/**
 * This component is part of the buttons group in the Action Bar.
 * It is used to pause the current timer and is disabled when the timer
 * is not running and also when the timer is already paused.
 *
 * @author Enze Development <enzecs@proton.me>
 * @since 1.0.0-alpha.1
 */

import { useContext } from 'react';
import { ActionContext } from '../../contexts/ActionContext';
import { BsPauseFill } from 'react-icons/bs';
import classNames from 'classnames';

export default function PauseButton() {
    const { handlePause, isRunning, isPaused } = useContext(ActionContext);
    return (
        <button
            onClick={handlePause}
            className={classNames(
                'flex flex-row items-center gap-1 border-2 duration-200 font-semibold rounded-md px-2 py-1 text-lg',
                {
                    'border-dashed border-red-600 bg-red-50 text-red-300 hover:bg-red-50 cursor-not-allowed':
                        !isRunning,
                },
                {
                    'border-solid border-purple-600 bg-purple-50 text-purple-800 hover:bg-purple-100':
                        isRunning && !isPaused,
                }
            )}
        >
            <BsPauseFill className="w-5 h-5" />
            <div className="-mt-0.5">Pause</div>
        </button>
    );
}
