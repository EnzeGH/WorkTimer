// Create alarm to run every second:
chrome.alarms.create('workTimer', { periodInMinutes: 1 / 60 });

// Listen for the alarm to fire:
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'workTimer') {
        chrome.storage.local.get(['timer', 'bools'], (result) => {
            console.log(result);
            if (result.bools.isRunning) {
                countdown();
            }
        });
    }
});

// If there is no timer, set the default values:
chrome.storage.local.get(['timer', 'bools'], (result) => {
    chrome.storage.local.set({
        timer:
            'timer' in result && result.timer
                ? {
                      hours: Number(result.timer.hours),
                      minutes: Number(result.timer.minutes),
                      seconds: Number(result.timer.seconds),
                  }
                : { hours: 0, minutes: 25, seconds: 0 },
        bools: {
            isRunning: 'bools' in result ? result.bools.isRunning : false,
            isFinished: 'bools' in result ? result.bools.isFinished : false,
            isPaused: 'bools' in result ? result.bools.isPaused : false,
            playVolume: 'bools' in result ? result.bools.playVolume : true,
        },
    });
});

// Function to countdown to 0:
function countdown() {
    chrome.storage.local.get(['timer', 'bools'], (result) => {
        if (result.timer && result.bools.isRunning) {
            const hours = result.timer.hours;
            const minutes = result.timer.minutes;
            const seconds = result.timer.seconds;

            // Subtract down
            if (seconds > 0) {
                chrome.storage.local.set({ timer: { hours, minutes, seconds: seconds - 1 } });
            } else if (minutes > 0) {
                chrome.storage.local.set({ timer: { hours, minutes: minutes - 1, seconds: 59 } });
            } else if (hours > 0) {
                chrome.storage.local.set({ timer: { hours: hours - 1, minutes: 59, seconds: 59 } });
            } else {
                chrome.storage.local.set({
                    bools: {
                        isRunning: false,
                        isFinished: true,
                        isPaused: false,
                        playVolume: result.bools.playVolume,
                    },
                    timer: { hours: 0, minutes: 0, seconds: 0 },
                });

                if (result.bools.playVolume) {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        if (tabs.length) {
                            chrome.scripting.executeScript(
                                {
                                    // @ts-ignore
                                    target: { tabId: tabs[0].id },
                                    func: playSound,
                                    args: [chrome.runtime.getURL('audio.mp3')],
                                },
                                (injectionResults) => {
                                    // Handle any errors from the content script here
                                    if (chrome.runtime.lastError || injectionResults.length === 0) {
                                        console.error(
                                            'Failed to inject script for playing sound:',
                                            chrome.runtime.lastError
                                        );
                                    }
                                }
                            );
                        }
                    });
                }
            }
        }
    });
}

function playSound(audioFileUrl: string) {
    const audio = new Audio(audioFileUrl);
    audio.volume = 0.1;
    audio.play().catch((e) => console.error('Error playing sound:', e));
}
