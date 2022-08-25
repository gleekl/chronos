import { Button } from '@mui/material';
import { useState, useEffect } from 'react'

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    
    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    return (
        <div className="stopwatch">
            <div className="numbers">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className="Buttons">
                <Button variant="outlined" color="success" onClick={() => setRunning(true)}>Start</Button>
                <Button variant="outlined" color="error" onClick={() => setRunning(false)}>Stop</Button>
                <Button variant="outlined" color="error" onClick={() => setTime(0)}>Reset</Button>
                <Button>Submit</Button>
            </div>
        </div>
    );
};

export default Stopwatch