import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AppRegistry} from 'react-native';
import AppProvider from './src/store'
import HomeScreen from './src/screens/Home';
import PostsScreen from './src/screens/Posts';
import PostScreen from './src/screens/Post';
import SearchScreen from './src/screens/Search';
import {name as appName} from './app.json';

/*
// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};
*/
const Stack = createStackNavigator();
const AppWrapper = () => {
return  <AppProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Posts" component={PostsScreen} />
                    <Stack.Screen name="Post" component={PostScreen} />
                    <Stack.Screen name="Search" component={SearchScreen} />
                </Stack.Navigator>
            </NavigationContainer>         
        </AppProvider>
};
AppRegistry.registerComponent(appName, () => AppWrapper);

