/**
 * This component is part of the buttons group in the Action Bar.
 * It is used to start the current timer and is disabled when the timer
 * is already running.
 *
 * @author Enze Development <enzecs@proton.me>
 * @since 1.0.0-alpha.1
 */

import { useContext } from 'react';
import { ActionContext } from '../../contexts/ActionContext';
import { BsFillPlayFill } from 'react-icons/bs';
import classNames from 'classnames';

export default function StartButton() {
    const { handleStart, isRunning } = useContext(ActionContext);
    return (
        <button
            onClick={handleStart}
            className={classNames(
                'flex flex-row items-center gap-1 border-2 duration-200 font-semibold rounded-md px-2 py-1 text-lg',
                {
                    'border-dashed border-red-600 bg-red-50 text-red-300 hover:bg-red-50':
                        isRunning,
                },
                {
                    'border-solid border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100':
                        !isRunning,
                }
            )}
        >
            <BsFillPlayFill className="w-5 h-5" />
            <div className="-mt-0.5">Run</div>
        </button>
    );
}
