import { useMemo, useRef, useState } from "react";
import "./App.css";
import cat from "./assets/muach.gif";
import cry from "./assets/cry.gif";
import love from "./assets/love.gif";

const NAME = "Chemaine";

// Escalating replies each time "No" is pressed.
const NO_PHRASES = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance...",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart 💔",
];

// After this many "No"s, the No button starts running away.
const DODGE_AFTER = 4;

type Heart = { id: number; left: number; delay: number; duration: number; size: number; emoji: string };

function makeHearts(count: number): Heart[] {
    const emojis = ["💖", "💗", "💕", "💘", "❤️", "🌸"];
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        size: 14 + Math.random() * 22,
        emoji: emojis[i % emojis.length],
    }));
}

function FloatingHearts({ count }: { count: number }) {
    const hearts = useMemo(() => makeHearts(count), [count]);
    return (
        <div className="hearts" aria-hidden="true">
            {hearts.map((h) => (
                <span
                    key={h.id}
                    className="heart"
                    style={{
                        left: `${h.left}%`,
                        fontSize: `${h.size}px`,
                        animationDelay: `-${h.delay}s`,
                        animationDuration: `${h.duration}s`,
                    }}
                >
                    {h.emoji}
                </span>
            ))}
        </div>
    );
}

function App() {
    const [noCount, setNoCount] = useState(0);
    const [isAccepted, setIsAccepted] = useState(false);
    const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
    const noRef = useRef<HTMLButtonElement>(null);

    const dodging = noCount >= DODGE_AFTER;
    const yesScale = Math.min(1 + noCount * 0.25, 3);
    const noText = NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];

    const moveNo = () => {
        const btn = noRef.current;
        const w = btn?.offsetWidth ?? 120;
        const h = btn?.offsetHeight ?? 48;
        const pad = 16;
        const maxX = Math.max(pad, window.innerWidth - w - pad);
        const maxY = Math.max(pad, window.innerHeight - h - pad);
        setNoPos({
            x: pad + Math.random() * (maxX - pad),
            y: pad + Math.random() * (maxY - pad),
        });
    };

    const handleNo = () => {
        const next = noCount + 1;
        setNoCount(next);
        if (next >= DODGE_AFTER) moveNo();
    };

    if (isAccepted) {
        return (
            <main className="page accepted">
                <FloatingHearts count={40} />
                <div className="card pop">
                    <img className="gif" src={love} alt="Cats hugging" />
                    <h1>Yay! You're my valentine, {NAME}! ❤️</h1>
                    <p className="sub">Thank you for saying yes. I can't wait. 🥰</p>
                </div>
            </main>
        );
    }

    return (
        <main className="page">
            <FloatingHearts count={18} />
            <div className="card">
                <img
                    className="gif"
                    src={noCount > 0 ? cry : cat}
                    alt={noCount > 0 ? "Sad cat" : "Cute cat blowing a kiss"}
                />
                <h1>
                    {noCount === 0
                        ? `Hi ${NAME}, will you be my valentine?`
                        : `Please, ${NAME}? Think about it again... 🥺`}
                </h1>

                <div className="buttons">
                    <button
                        className="btn yes"
                        style={{ fontSize: `${1.05 * yesScale}rem` }}
                        onClick={() => setIsAccepted(true)}
                    >
                        {noCount === 0 ? "Yes" : "Yes, please! 💕"}
                    </button>

                    <button
                        ref={noRef}
                        className={`btn no${dodging && noPos ? " dodging" : ""}`}
                        style={dodging && noPos ? { left: noPos.x, top: noPos.y } : undefined}
                        onClick={handleNo}
                        onPointerEnter={(e) => {
                            if (dodging && e.pointerType === "mouse") moveNo();
                        }}
                    >
                        {noText}
                    </button>
                </div>
            </div>
        </main>
    );
}

export default App;
