import React, { useEffect} from 'react'
import {AppRegistry} from 'react-native';
import App from './src/components/App';
import AppProvider from './src/store'
import DataService from './src/api/services'
import {name as appName} from './app.json';

const AppWrapper = (props) => {
    useEffect(() => {
        const api = new DataService();
        api.getCategories().then(data => {
            console.log(data)
        }).finally(() => {
            console.log("Categories - All Done")
        });
      },[DataService]);
      
    return  <AppProvider>
                <App/>
            </AppProvider>
};
AppRegistry.registerComponent(appName, () => AppWrapper);
