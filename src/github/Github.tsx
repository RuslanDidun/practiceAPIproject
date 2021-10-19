import s from './styles.module.css'
import {useEffect, useState} from "react"
import {Search} from "./otherComponents/Search";
import {UsersList} from './otherComponents/UserList';
import {UsersDetails} from './otherComponents/UsersDetails';

export type SearchUserType = {
    login: string
    id: number
}
export type SearchResult = {
    items: SearchUserType[]
}
export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}




const Github = () => {

    let initialSearchState = 'it-kamasutra'
    const [selectedUser, setSelectedUsers] = useState<SearchUserType | null>(null)
    const [searchTerm, setSearchTerm] = useState(initialSearchState)

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return <div className={s.container}>
        <div>
            <Search value={searchTerm}
                //прокидываем колбэк от родителя
                    onSubmit={(value: string) => {
                        setSearchTerm(value)
                    }}/>
            <button onClick={() => setSearchTerm(initialSearchState)}> reset</button>
            <UsersList term={searchTerm}
                       selectedUser={selectedUser}
                //прокидываем колбэк от родителя
                       onUserSelect={setSelectedUsers}/>
        </div>

        <div>
            <UsersDetails selectedUser={selectedUser}/>
        </div>
    </div>
}


export default Github