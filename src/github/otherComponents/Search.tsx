import {useEffect, useState} from "react";

export type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}
export const Search = (props: SearchPropsType) => {

    const [search, setSearch] = useState('')
    useEffect(() => {
        setSearch(props.value)
    }, [props.value])


    return (
        <div>
            <input placeholder='search'
                   value={search}
                   onChange={(e) => {
                       setSearch(e.currentTarget.value)
                   }}/>
            <button onClick={() => {
                props.onSubmit(search)
            }}>find
            </button>
        </div>
    )
}