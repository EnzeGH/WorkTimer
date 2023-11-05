import { ActionContext } from '../../contexts/ActionContext';
import { BsRepeat } from 'react-icons/bs';
import { useContext } from 'react';
import classNames from 'classnames';

export default function ResetButton() {
    const { handleReset } = useContext(ActionContext);

    return (
        <button
            onClick={handleReset}
            className={classNames(
                'flex flex-row items-center gap-1 border-2 duration-200 font-semibold rounded-md px-2 py-1 text-lg',
                'border-solid border-indigo-600 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
            )}
        >
            <BsRepeat className="w-5 h-5" />
            <div className="-mt-0.5">Reset</div>
        </button>
    );
}
