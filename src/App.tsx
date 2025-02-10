import { useState, useEffect } from "react";
import "./App.css";
import cat from "./assets/muach.gif";
import cry from "./assets/cry.gif";
import love from "./assets/love.gif"

function App() {
    const [noCount, setNoCount] = useState(0);
    const [position, setPosition] = useState({ top: "76%", left: "50%" });
    const [isAccepted, setIsAccepted] = useState(false);

    useEffect(() => {
        console.log(noCount);
    }, [noCount]);

    const moveButton = () => {
        const randomX = Math.random() * 80;
        const randomY = Math.random() * 80;
        setPosition({ top: `${randomY}%`, left: `${randomX}%` });
    };

    const handleLove = () => {
        setIsAccepted(true);
    };

    if (isAccepted) {
        return (
            <div className="container">
                <h1>You are now my valentine Tine. Thank you! ❤️</h1>
                <img src={love} alt="Love" height={400}/>
            </div>
        );
    }

    if (noCount > 0) {
        return (
            <div className="container">
                <h1>Are you sure, please think again?</h1>
                <img src={cry} alt="Sad Cat" height={400} />
                <div className="buttons">
                    <button className="yes" style={{marginRight: "10rem"}} onClick={handleLove}>Yes, Please</button>
                    <button
                        className="no"
                        onMouseEnter={moveButton}
                        style={{
                            position: "absolute",
                            top: position.top,
                            left: position.left,
                            transition: "top 0.2s, left 0.2s",
                        }}
                        onClick={moveButton}
                    >
                        No
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Hi Tine, will you be my valentine?</h1>
            <img src={cat} alt="Cute Cat" height={400} />
            <div className="buttons">
                <button className="yes" onClick={handleLove}>Yes</button>
                <button className="no" onClick={() => setNoCount(noCount + 1)}>
                    No
                </button>
            </div>
        </div>
    );
}

export default App;
