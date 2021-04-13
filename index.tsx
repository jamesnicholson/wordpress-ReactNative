import React, { useEffect} from 'react'
import {AppRegistry} from 'react-native';
import App from './src/components/App';
import AppProvider from './src/store'
import {name as appName} from './app.json';

const AppWrapper = (props) => {
      
    return  <AppProvider>
                <App/>
            </AppProvider>
};
AppRegistry.registerComponent(appName, () => AppWrapper);
