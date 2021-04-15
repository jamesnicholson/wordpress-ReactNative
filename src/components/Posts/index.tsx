import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import HeaderWrapper from '../Header';
import Post from '../../api/models/post';
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
import HTML from "react-native-render-html";

function Posts ({route, navigation}){

  const {state, dispatch} = useContext(AppContext);
  const { categoryId, name } = route.params;
  const [posts, setPosts] = useState([])
  const api = new DataService();
  const contentWidth = useWindowDimensions().width;
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
  navigation.navigate('Post', {
    postId:id
  }) 
}

  return (
      <Container>
          <HeaderWrapper navigation={navigation} title={name} />
          <Content>
            <Text>{name}</Text>
            {posts.map((post:Post) =>
              <TouchableOpacity key={post.id} onPress={() => handler(post.id)}>
                <Card  style={styles.card}>
                  <CardItem>
                    <Body>
                    <HTML source={{ html: post.displayTitle }} contentWidth={contentWidth} />
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            )}
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
export default Posts;