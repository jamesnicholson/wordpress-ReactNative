import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Dimensions} from 'react-native';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Left,
  Icon,
  Right,
} from 'native-base';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import {setCategories, setParentCategory} from '../../store/actions'
import Category from '../../api/models/category';
import HeaderWrapper from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';

function HomeScreen ({navigation}){

  const {state, dispatch} = useContext(AppContext);
  const win = Dimensions.get('window');

  useEffect(() => {
    const api = new DataService();
    api.getHomeScreen().then(data => {
        dispatch(setCategories(data))
    });
  },[DataService]);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4ebd0',
    },
    card: {
      width:'95%',
      fontSize: 20,
      color: 'red',
      marginLeft: 10,
      marginTop:10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#bdb49c'
    },
    cardText: {
      backgroundColor: '#eee',
    },
    cardItem:{
      backgroundColor: '#bdb49c'
    },
    cardIcon: {
      color: '#123262',
    },
    heading:{
      padding:10,
      marginTop:20,
      marginBottom:20
    },
    subHeading:{
      padding:10,
      marginTop:20,
      marginLeft:10
    },
    image: {
      flex: 1,
      alignSelf: 'stretch',
      width: win.width,
      height: 200,
  }
  });

  const handler = (category:Category) =>{
    const { categoryId, displayTitle, getParent } = category
    const parentCategory: Category = state.categories.find((category: Category) => category.categoryId === getParent);
    dispatch(setParentCategory(parentCategory))
    navigation.navigate('Posts', {
      categoryId:categoryId,
      name: displayTitle,
    }) 
  }

  return (
      <Container style={styles.container} >
          <HeaderWrapper navigation={navigation} title="eINA" hideSearch={false} />
          <Content>
           <>
              {state.categories.length === 0 ? <LoadingIndicator /> : null}
           </>
            {state.categories.map((category:Category, index: number) => {
              if(category.image && category.image !== "undefined"){
                return <View key={category.categoryId}>
                          <Image 
                            source={{
                              uri: category.image
                            }}
                            style={styles.image}
                            resizeMode={'contain'}  
                           />
                        </View>           
              }
              return  <TouchableOpacity key={category.categoryId} onPress={() => handler(category)}>
                        <Card style={styles.card}>
                          <CardItem style={styles.cardItem}>
                            <Left style={{flex:0.8}}>
                              <Text>{category.displayTitle}</Text>
                            </Left>
                            <Right style={{flex:0.2}}>
                              <Icon name="chevron-forward-outline" style={styles.cardIcon} />
                            </Right>
                          </CardItem>
                        </Card>
                      </TouchableOpacity>
            })}
          </Content>
        </Container>
  );
};
export default HomeScreen;
