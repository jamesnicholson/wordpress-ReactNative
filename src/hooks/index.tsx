import React, {useState, useContext, useRef, ReactNode} from 'react';
import {Input} from 'native-base'
export const useInput = (): [string,ReactNode] => {
    const [value, setValue] = useState<string>("");
    const inputRef = useRef(null)
    const input:ReactNode = <Input
                                value={value}
                                ref={inputRef}
                                onChange={e => setValue(e.target.value)}
                                type="text"
                                placeholder="Search..."
                            />;
    return [value, input];
};
export default useInput


