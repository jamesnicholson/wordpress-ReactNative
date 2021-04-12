import React, {Fragment, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import {setCategories} from '../../store/actions'
import Category from '../../api/models/category';
const App = () => {
  const {state, dispatch} = useContext(AppContext);
  useEffect(() => {
    const api = new DataService();
    api.getCategories().then(data => {
       dispatch(setCategories(data))
    }).finally(() => {
        console.log("Categories - All Done")
    });
  },[DataService]);

  return (
    
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>Hello world</Text>
            {
              state.categories.map((category: Category) => <Text key={category.id}>{category.displayName}</Text>)
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};
export default App;
