import React, {useState, useContext, useEffect} from 'react';
import { Linking, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import HeaderWrapper from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import ModalContent from '../Post/ModalContent'
import Modal from 'react-native-modalbox';

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
} from 'native-base';

import HTML from "react-native-render-html";


function PostScreen ({route, navigation}){

  const {state, dispatch} = useContext(AppContext);
  const { postId, type } = route.params;
  const [post, setPost] = useState<String>()
  const [name, setName] = useState<String>()
  const [modalURL, setModalURL] = useState<string>()
  const modalRef = React.useRef()

  const api = new DataService();
  const contentWidth = useWindowDimensions().width;
  const contentHeight = useWindowDimensions().height;
  useEffect(() => {
      api.getPost(postId, type).then(data => {
        setName(data.title)
        setPost(data.content)
     }).catch(error =>{
       console.log("Posts - error", error)
     }).finally(() => {
       console.log("Post Screen - Posts - All Done")
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
    },
    'cbxwpbkmarkwrap':  {
      display: 'none'
    },
    'pmpro_content_message':{
      backgroundColor: '#dcdcdc',
      borderColor: '#eee',
      borderWidth: 5,
      width:contentWidth*.8,
      marginTop: 10,
      alignSelf:'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent:'stretch',
      textAlign: 'center',
    },
    'custom-pmp-login': {
      backgroundColor: '#3f51b5',
      fontSize:30,
      padding:100,
      textAlign: 'center'
    },
    'custom-pmp-join': {
      display: 'flex',
      backgroundColor:'red',
      fontSize:30,
      margin:100,
      textAlign: 'center'
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
      marginTop:0,
    },
    modal2: {
      height: contentHeight * .89,
      backgroundColor: "#3B5998"
    },
  
  }

  const handler = (event:any, url: string) => {
    let isEINADomain = url.includes("https://e-ina.com")
    if(!isEINADomain){
      Linking.openURL(url)
    }
  }
  const loginHandler = () =>{
    navigation.navigate('Login') 
  }
  const registerHandler = () => {
    navigation.navigate('Register') 
  }
  const renderers = {
    p: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const style = {
        container: {
          padding:10,
          margin:5,
        }
      }
      if(htmlAttribs.class === "pmpro_content_message"){
        return <View key={passProps.key} style={style.container}>{children}</View>
      }else 
        return  <View key={passProps.key} style={style.container}>{children}</View>
      
    },
    a: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      
      const style = {
        login: {
          color: "white",
          padding:10,
          margin:5,
          width:contentWidth *.5,
          textAlign:'center',
          justifyContent: 'center',
          backgroundColor:'#8bc34a',
          alignSelf: 'center'
        },
        register: {
          color: "white",
          padding:10,
          margin:5,
          marginBottom: 15,
          width:contentWidth *.5,
          backgroundColor:'#00bcd4',
          textAlign:'center',
          justifyContent: 'center',
          alignSelf: 'center'
        }
      }
      
      if (htmlAttribs.class === "custom-pmp-login") {
        return  <TouchableOpacity  key={passProps.key} onPress={() => loginHandler()}>
                  <Text style={style.login}>Login</Text>
                </TouchableOpacity>
      }else if (htmlAttribs.class === "custom-pmp-join"){
        return  <TouchableOpacity  key={passProps.key} onPress={() => registerHandler()}>
                  <Text style={style.register}>Join Us</Text> 
                </TouchableOpacity>
      }
    }
  }
  return (
      <Container>
          <HeaderWrapper navigation={navigation} title={name} hideSearch={false} />
          <Content>
          <>
            {!post ? <LoadingIndicator /> : null}
          </>
            { post ?  <HTML 
                        source={{ html: post  }}
                        contentWidth={contentWidth}
                        renderers={renderers}
                        tagsStyles={tagsStyles}
                        classesStyles={classesStyles}
                        onLinkPress={(event, url) => handler(event, url)}
                        /> : null }
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>E-INA</Text>
              </Button>
            </FooterTab>
          </Footer>
          <Modal style={[tagsStyles.modal2]} backdrop={true}  position={"bottom"} ref={modalRef}>
            <Text style={[{color: "white"}]}>Modal on top</Text>
            <ModalContent post={post} url={modalURL} />
          </Modal>
        </Container>
  );
};
export default PostScreen;