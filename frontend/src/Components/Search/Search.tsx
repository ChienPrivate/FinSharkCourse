import React, { 
    ChangeEvent, 
    JSX, 
    useState, 
    MouseEvent,
    SyntheticEvent, 
    FormEvent} from 'react'

interface Props {
    onClick : (e: SyntheticEvent) => void;
    search: string | undefined;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search : React.FC<Props> = ({
    onClick, 
    search, 
    handleChange
} : Props) : JSX.Element  => {
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