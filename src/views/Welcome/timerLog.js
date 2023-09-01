import { useEffect, useState } from "react"

function TimerLog() {
    const [start, setStart] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect( () => {
        let interval;
        if(!start){
            return () => {};
        }
        interval = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)

        return () => {
            clearInterval(interval);
        }

    }, [start])
    const startTimer = () => {
        setStart(!start);
    }
    const stopTimer = () => {
        setStart(false);
        setTimer(0);
    }
    return(
        <>
            <div>
                Timer: {timer} 
            </div>
            <div>
                <button onClick={startTimer}>{start ? "Pause" : "Start"}</button>
                <button onClick={stopTimer}>Reset</button>
            </div>
        </>
    )
}

export default TimerLog;