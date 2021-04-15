import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Card,
  CardItem,
  Body,
} from 'native-base';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import {setCategories} from '../../store/actions'
import Category from '../../api/models/category';
import HeaderWrapper from '../Header';
import { openDatabase } from 'react-native-sqlite-storage';
import Post from '../../api/models/post';

function Posts ({route, navigation}){

  const {state, dispatch} = useContext(AppContext);
  const { categoryId, name } = route.params;
  const [posts, setPosts] = useState([])
  const api = new DataService();
  
  useEffect(() => {
   
    api.getPosts(categoryId).then(data => {
      console.log(data)
      setPosts(data)
    }).catch(error =>{
      console.log("Posts - error", error)
    }).finally(() => {
      console.log("Posts - All Done")
    });
  },[DataService, setPosts]);

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
  });

const handler = (id) => {
  console.log(id)
}

  return (
      <Container>
          <HeaderWrapper navigation={navigation} title={name} />
          <Content>
            <Text>{categoryId}</Text>
            {posts.map((post:Post) =>
              <TouchableOpacity key={post.id} onPress={() => handler(post.id)}>
                <Card  style={styles.card}>
                  <CardItem>
                    <Body>
                      <Text>{post.displayTitle}</Text>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            )}
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>WOOHOoo E-INA</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
  );
};
export default Posts;
