import {useEffect, useState} from "react";
import axios from "axios";
import s from "../styles.module.css";
import {SearchResult, SearchUserType} from "../Github";

export type UsersListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}
export const UsersList = (props: UsersListPropsType) => {
    const [users, setUsers] = useState<SearchUserType[]>([])
    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term])

    return <ul>
        {users.map(u => <li
            key={u.id}
            className={props.selectedUser === u ? s.selected : ''}
            onClick={() => {
                props.onUserSelect(u)
            }}>{u.login}</li>)}
    </ul>
}