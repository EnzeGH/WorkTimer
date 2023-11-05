import { useContext } from 'react';
import { TimeContext } from '../../contexts/TimeContext';
import classNames from 'classnames';

export default function MinutesInput() {
    const { minutes, setMinutes } = useContext(TimeContext);

    return (
        <span className="flex flex-col items-center">
            <input
                type="number"
                value={minutes}
                onChange={(e: any) => setMinutes(e.target.value)}
                className={classNames('w-10 text-center text-2xl outline-none border-none', {
                    'text-gray-400': minutes === 0,
                })}
            />
            <span className={classNames('text-xs', { 'text-gray-400': minutes === 0 })}>
                minutes
            </span>
        </span>
    );
}
