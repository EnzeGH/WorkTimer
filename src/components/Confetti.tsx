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

    public static launchMore = () => {
        console.log('Launching...');
        var end = Date.now() + 15 * 1000;

        // go Buckeyes!
        var colors = ['#bb0000', '#ffffff'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();

        var defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ['star'],
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
        };

        function shoot() {
            confetti({
                ...defaults,
                particleCount: 40,
                scalar: 1.2,
                shapes: ['star'],
            });

            confetti({
                ...defaults,
                particleCount: 10,
                scalar: 0.75,
                shapes: ['circle'],
            });
        }

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    };

    public static snow = () => {
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var skew = 1;

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        (function frame() {
            var timeLeft = animationEnd - Date.now();
            var ticks = Math.max(200, 500 * (timeLeft / duration));
            skew = Math.max(0.8, skew - 0.001);

            confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: ticks,
                origin: {
                    x: Math.random(),
                    // since particles fall down, skew start toward the top
                    y: Math.random() * skew - 0.2,
                },
                colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
                shapes: ['circle'],
                gravity: randomInRange(0.4, 0.6),
                scalar: randomInRange(0.4, 1),
                drift: randomInRange(-0.4, 0.4),
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };
}
