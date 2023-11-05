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
    version: string;
}

export default function Heading({ title, version }: HeadingProps): JSX.Element {
    return (
        <Fragment>
            <img src="/timer.png" alt="Clock Icon" className="w-[45px] h-[45px]" />
            <h1 className="text-2xl font-bold mb-5 flex flex-col items-center">
                {title}
                <span className="bg-gray-200 text-gray-500 rounded-full px-2 text-xs font-medium lowercase">
                    v{version}
                </span>
            </h1>
        </Fragment>
    );
}
