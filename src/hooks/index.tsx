import React, {useState, useContext, useRef, ReactNode} from 'react';
import {Input} from 'native-base'
import DataService from '../api/services';
import post from '../api/models/post';
import WebView from 'react-native-webview';
import LoadingIndicator from '../components/LoadingIndicator';

export const useInput = (): [string, ReactNode, boolean, post[]] => {
    const [value, setValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<post[]>([]);
    const [submited, setSubmited] = useState<boolean>(false)
    const inputRef = useRef(null)
    const api = new DataService();
    
    const submit = (e) => {
        if(e.nativeEvent.text !== ""){
            setSubmited(true);
            setSearchResults([]);
            api.searchPosts(e.nativeEvent.text).then(data => {
                setSearchResults(data) 
            }).catch(error =>{
                console.log("Posts Search - error", error)
            }).finally(() => {
                setSubmited(false)
                console.log("Posts Search - All Done")
            });
        }
    }
    const input:ReactNode = <Input
                                value={value}
                                ref={inputRef}
                                onChange={e => setValue(e.target.value)}
                                onSubmitEditing={e => submit(e)}
                                type="text"
                                placeholder="Search..."
                            />;
    return [value, input, submited, searchResults];
};

export default useInput


