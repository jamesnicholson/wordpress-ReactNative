import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import HeaderWrapper from '../../components/Header';

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
import Post from '../../api/models/post';

function PostScreen ({route, navigation}){

  const {state, dispatch} = useContext(AppContext);
  const { postId } = route.params;
  const [post, setPost] = useState<String>()
  const api = new DataService();
  const contentWidth = useWindowDimensions().width;

  useEffect(() => {
   api.getPost(postId).then(data => {
       console.log(data.content)
      setPost(data.content)
    }).catch(error =>{
      console.log("Posts - error", error)
    }).finally(() => {
      console.log("Posts - All Done")
    });
  },[DataService, postId, setPost]);

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

console.log(post)
  return (
      <Container>
          <HeaderWrapper navigation={navigation} title={postId} />
          <Content>
            { post ?  <HTML source={{ html: post  }} contentWidth={contentWidth} /> : null }
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
export default PostScreen;