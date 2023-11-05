import { useContext } from 'react';
import { TimeContext } from '../../contexts/TimeContext';
import classNames from 'classnames';

export default function SecondsInput() {
    const { seconds, setSeconds } = useContext(TimeContext);

    return (
        <span className="flex flex-col items-center">
            <input
                type="number"
                value={seconds}
                onChange={(e: any) => setSeconds(e.target.value)}
                className={classNames('w-10 text-center text-2xl outline-none border-none', {
                    'text-gray-400': seconds === 0,
                })}
            />
            <span className={classNames('text-xs', { 'text-gray-400': seconds === 0 })}>
                seconds
            </span>
        </span>
    );
}
