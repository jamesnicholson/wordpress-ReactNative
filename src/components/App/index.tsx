import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  
  fetch( 'https://e-ina.com/wp-json/wp/v2/posts' )
  .then( response => response.json())
  .then(data => console.log(data));
  
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>Hello world</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};
export default App;
