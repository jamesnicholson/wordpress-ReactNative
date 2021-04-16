import React, {useState, useContext, useRef, ReactNode} from 'react';
import {Input} from 'native-base'
import DataService from '../api/services';
import post from '../api/models/post';

export const useInput = (): [string, ReactNode, post[]] => {
    const [value, setValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<post[]>([]);

    const inputRef = useRef(null)
    const api = new DataService();
    const submit = (e) => {
        api.searchPosts(e.nativeEvent.text).then(data => {
        setSearchResults(data) 
        }).catch(error =>{
        console.log("Posts - error", error)
        }).finally(() => {
        console.log("Posts - All Done")
        });
    } 
    const input:ReactNode = <Input
                                value={value}
                                ref={inputRef}
                                onChange={e => setValue(e.target.value)}
                                onSubmitEditing={e => submit(e)}
                                type="text"
                                placeholder="Search..."
                            />;
    return [value, input, searchResults];
};
export default useInput


