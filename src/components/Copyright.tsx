/**
 * This component renders the footer of the page.
 * It contains the credits for all resources used
 * in this project.
 */

export default function Copyright() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="mt-5 text-gray-400 text-xs">
            <div className="flex flex-row items-center justfiy-between gap-2">
                <span>&copy; {currentYear} Enze</span>
                <span className="w-1 h-4 border-l border-gray-300"></span>
                <a className="text-link" href="https://github.com/EnzeGH/WorkTimer">
                    GitHub
                </a>
                &bull;
                <a className="text-link" href="https://iconscout.com/contributors/superndre">
                    Timer Icon
                </a>
                &bull;
                <a className="text-link" href="https://www.youtube.com/watch?v=adoemk6ZjNo">
                    Used audio
                </a>
            </div>
        </div>
    );
}
