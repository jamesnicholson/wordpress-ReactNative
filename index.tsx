import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AppRegistry} from 'react-native';
import AppProvider from './src/store'
import App from './src/components/App';
import {name as appName} from './app.json';

const AppWrapper = (props) => {
      
    return  <NavigationContainer>
                <AppProvider>
                    <App/>
                </AppProvider>
            </NavigationContainer>
};
AppRegistry.registerComponent(appName, () => AppWrapper);
