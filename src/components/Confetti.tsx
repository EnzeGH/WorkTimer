/**
 * This component handles confettis. It is launched when the timer
 * reaches 0. Just for fun.
 *
 * @author Enze Development <enzecs@proton.me>
 * @since 1.0.0-alpha.1
 */

import confetti from 'canvas-confetti';

export default class Confetti {
    private static readonly COUNT = 200;
    private static readonly DEFAULTS = { origin: { y: 0.7 } };

    public static fire = (particleRatio: any, opts: any) => {
        confetti(
            Object.assign({}, Confetti.DEFAULTS, opts, {
                particleCount: Math.floor(Confetti.COUNT * particleRatio),
            })
        );
    };

    public static launch = () => {
        Confetti.fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        Confetti.fire(0.2, {
            spread: 60,
        });
        Confetti.fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });
        Confetti.fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });
        Confetti.fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };
}
