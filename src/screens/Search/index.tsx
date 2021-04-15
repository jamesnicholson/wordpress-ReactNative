import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import HeaderWrapper from '../../components/Header';
import Post from '../../api/models/post';
import { useInput } from '../../hooks'
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Card,
  CardItem,
  Left,
  Right,
  Item,
  Icon
} from 'native-base';
import HTML from "react-native-render-html";

function SearchScreen ({route, navigation}){
  const [value, input] = useInput();
  const {state, dispatch} = useContext(AppContext);
  const [posts, setPosts] = useState([])
  const api = new DataService();
  const contentWidth = useWindowDimensions().width;
  /*useEffect(() => {
   
    api.getPosts(categoryId).then(data => {
      console.log(data)
      setPosts(data)
    }).catch(error =>{
      console.log("Posts - error", error)
    }).finally(() => {
      console.log("Posts - All Done")
    });
  },[DataService, setPosts]);*/

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
    },
    card: {
      width:'95%',
      fontSize: 20,
      color: 'red',
      marginLeft: 10,
      marginTop:10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    searchBar: {
      margin:10,
      padding: 10,
    }
  });

const handler = (id) => {
  navigation.navigate('Post', {
    postId:id
  }) 
}

useEffect(() => {
  console.log(value)
 // dispatch(setSearchTerm(value));
},[value]);



  return (
      <Container>
          <HeaderWrapper navigation={navigation} title="Search" />
          <Content>
            <Item style={styles.searchBar}>
              <Icon active name='search' />
              {input}
            </Item>
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>E-INA</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
  );
};
export default SearchScreen;