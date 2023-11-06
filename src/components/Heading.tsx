/**
 * The heading of the panel. It includes the image
 * of the extension as well as the title and version
 * of this application.
 *
 * @author Enze Development <enzecs@proton.me>
 * @since 1.0.0-alpha.1
 */

import { Fragment } from 'react';

interface HeadingProps {
    title: string;
    playVolume: boolean;
    setPlayVolume: (value: boolean) => void;
}

export default function Heading({ title, playVolume, setPlayVolume }: HeadingProps): JSX.Element {
    return (
        <Fragment>
            <img src="/timer.png" alt="Clock Icon" className="w-[45px] h-[45px]" />
            <h1 className="text-2xl font-bold mb-5 flex flex-col items-center">
                {title}
                <div className="cursor-pointer flex items-center gap-2 text-sm -mt-1">
                    <label className="cursor-pointer hover:text-gray-600 relative flex justify-between items-center group p-2 gap-2">
                        <input
                            checked={playVolume}
                            onChange={() => {
                                setPlayVolume(!playVolume);
                                chrome.storage.local.set({ playVolume: !playVolume });
                            }}
                            type="checkbox"
                            className="cursor-pointer absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                        />
                        <span className="cursor-pointer w-8 h-4 flex items-center flex-shrink-0 py-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-600 after:w-4 after:h-4 after:bg-white after:border after:border-black after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
                        <span className="cursor-pointer duration-200 tracking-tighter">
                            Play audio on finish? 🎉
                        </span>
                    </label>
                </div>
            </h1>
        </Fragment>
    );
}
