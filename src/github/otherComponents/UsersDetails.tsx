import {useEffect, useState} from "react";
import axios from "axios";
import {SearchUserType, UserType} from "../Github";
import { Timer } from "./Timer";

type UsersDetailsPropsType = {
    selectedUser: SearchUserType | null
}
const startTimerSeconds = 10
export const UsersDetails = (props: UsersDetailsPropsType) => {
    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    //useState для таймера (хранение секунд)
    const [seconds, setSeconds] = useState(startTimerSeconds)
    useEffect(() => {
        if (!!props.selectedUser)
            axios
                .get<UserType>(`https://api.github.com/users/${props.selectedUser?.login}`)
                .then(res => {
                    //сбрасываем таймер при смене юзера
                    setSeconds(startTimerSeconds)
                    setUserDetails(res.data)
                })
    }, [props.selectedUser])
    //юзэфект убивает таймер по истечению времени
    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
        }
    }, [seconds])

    return <div>
        {userDetails && <div>
            <Timer seconds={seconds}
                   onChange={setSeconds}
                   timerKey={userDetails.id.toString()}/>
            <h2>{userDetails?.login}</h2>
            <img src={userDetails.avatar_url}/>
            <br/>
            {userDetails.login},
            followers: {userDetails.followers}
        </div>}
    </div>

}