import React, { 
    ChangeEvent, 
    JSX, 
    useState, 
    MouseEvent,
    SyntheticEvent } from 'react'

type Props = {}

const Search : React.FC<Props> = (
    props: Props) : JSX.Element  => {
        const [search, setSearch] = useState("");

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            console.log(e);
        }

        const onClick = (e: SyntheticEvent) => {
            console.log(e);
        }
        return (
            <div>
                <input 
                type="text" 
                name="" 
                id="" 
                value={search} 
                placeholder='' 
                onChange={(e) => handleChange(e)} />
                <button onClick = {(e) => onClick(e)} />
            </div>
        )
}

export default Search