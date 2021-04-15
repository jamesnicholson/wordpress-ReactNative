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

function PostPage ({route, navigation}){

  const {state, dispatch} = useContext(AppContext);
  const { postId } = route.params;
  const [posts, setPosts] = useState([])
  const api = new DataService();
  const contentWidth = useWindowDimensions().width;

  useEffect(() => {
      console.log(postId)
   /* api.getPosts(categoryId).then(data => {
      console.log(data)
      setPosts(data)
    }).catch(error =>{
      console.log("Posts - error", error)
    }).finally(() => {
      console.log("Posts - All Done")
    });*/
  },[postId]);

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
          <HeaderWrapper navigation={navigation} title={postId} />
          <Content>
            <Text>{postId}</Text>
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
export default PostPage;