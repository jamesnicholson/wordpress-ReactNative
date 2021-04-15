import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AppRegistry} from 'react-native';
import AppProvider from './src/store'
import App from './src/components/App';
import Posts from './src/components/Posts';
import PostPage from './src/components/Post';
import {name as appName} from './app.json';
const Stack = createStackNavigator();
const AppWrapper = () => {
return  <AppProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName="Home">
                    <Stack.Screen name="Home" component={App} />
                    <Stack.Screen name="Posts" component={Posts} />
                    <Stack.Screen name="Post" component={PostPage} />
                </Stack.Navigator>
            </NavigationContainer>         
        </AppProvider>
};
AppRegistry.registerComponent(appName, () => AppWrapper);
