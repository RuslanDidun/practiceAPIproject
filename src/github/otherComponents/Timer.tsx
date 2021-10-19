import {useEffect, useState} from "react";

export type TimerPropsType = {
    seconds: number
    onChange: (actualSeconds: number) => void
    timerKey: string
}
export const Timer = (props: TimerPropsType) => {
    const [seconds, setSeconds] = useState(props.seconds)

    useEffect(() => {
        setSeconds(props.seconds)
    }, [props.seconds])
    useEffect(() => {
        props.onChange(seconds)
    }, [seconds])
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prev) => prev - 1)
        }, 1000)
        //cleanup for UseEffect
        return () => {
            clearInterval(intervalId)
        }
    }, [props.timerKey])

    return <div>{seconds}</div>
}