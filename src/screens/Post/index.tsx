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
  const { postId, type } = route.params;
  const [post, setPost] = useState<String>()
  const [name, setName] = useState<String>()
  const api = new DataService();
  const contentWidth = useWindowDimensions().width;



  useEffect(() => {
      api.getPost(postId, type).then(data => {
        setName(data.title)
        setPost(data.content)
     }).catch(error =>{
       console.log("Posts - error", error)
     }).finally(() => {
       console.log("Posts - All Done")
     });
  },[DataService, postId, setPost, setName]);

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
  const classesStyles = {
    'code_div': {
      color: '#000000',
      display:'flex'
    },
    'headsect': {
      fontWeight:'bold'
    }
  }

  const tagsStyles = {
    h1: {
      color: '#6728C7',
      textAlign: 'center',
      marginBottom: 10
    },
    img: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20
    },
    p:{
      padding:5,
      margin: 5
    },
    dl:{
      padding:5,
    },
    a: {
      textDecorationLine: 'none',
    },
    dt: {
      fontWeight: 'bold',
      fontSize:15,
    },
    dd: {
      marginLeft:10,
      paddingTop: 0,
      marginTop:0
    }
  }


  return (
      <Container>
          <HeaderWrapper navigation={navigation} title={name} />
          <Content>
            { post ?  <HTML 
                        source={{ html: post  }}
                        contentWidth={contentWidth}
                        tagsStyles={tagsStyles}
                        classesStyles={classesStyles}
                        onLinkPress={(event, url) => console.log(url)}
                        /> : null }
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