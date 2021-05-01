import React, {useState, useContext, useEffect} from 'react';
import { Linking, StyleSheet, TouchableOpacity, useWindowDimensions, View, Image } from 'react-native';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import HeaderWrapper from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';
import {LOGO} from '../../assets/images'
import Modal from 'react-native-modalbox';

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Icon,
} from 'native-base';

import HTML from "react-native-render-html";
import WebView from 'react-native-webview';


function PostScreen ({route, navigation}){
  const { postId, type } = route.params;
  const [post, setPost] = useState<String>()
  const [name, setName] = useState<String>()
  const [modalURL, setModalURL] = useState<string>("")
  const [memberStatus, setMemberStatus] = useState<boolean>(true)
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
    modalHeader: {
      width:'95%',
      fontSize: 20,
      paddingTop:20,
      display:'flex',
      flexDirection:'row',
      justifyContent: "space-between"
    },
    close: {
      fontSize:35,
      marginTop:25,
      marginRight:5,
    },
    logo:{
      width:contentWidth * .15,
      height:contentWidth * .15,
      marginTop:15,
      marginLeft:25,
  }
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
      height: contentHeight,
      backgroundColor: "#ffffff"
    },
  
  }


  
  const validURL = (str: string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  const handler = (event:any, url: string) => {
    let isEINADomain = url.includes("https://e-ina.com")
    if(validURL(url)){
      if(!isEINADomain){
        setModalURL(url)
        modalRef.current.open()
      }
    }
  }
  const closeModal = () => {
    modalRef.current.close()
  }
  const loginHandler = () => {
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
        return  children
      
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
      }else{
        return children
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
            { post ? 
                memberStatus ?

                  <HTML 
                        source={{ html: post  }}
                        contentWidth={contentWidth}
                        tagsStyles={tagsStyles}
                        classesStyles={classesStyles}
                        onLinkPress={(event, url) => handler(event, url)}
                        /> 
                :
                
                  <HTML 
                        source={{ html: post  }}
                        contentWidth={contentWidth}
                        renderers={renderers}
                        tagsStyles={tagsStyles}
                        classesStyles={classesStyles}
                        />  
              : null }
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>E-INA</Text>
              </Button>
            </FooterTab>
          </Footer>
          <Modal style={[tagsStyles.modal2]} backdrop={true}  position={"bottom"} ref={modalRef}>
            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => closeModal()}>
                  <Image source={LOGO} style={styles.logo}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => closeModal()}>
                    <Icon name='close' style={styles.close} />
                </TouchableOpacity>
            </View>
            <WebView 
                    source={{uri: modalURL}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    sharedCookiesEnabled={true}
                    originWhitelist={["*"]}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                    mixedContentMode={"always"}
                    allowsInlineMediaPlayback={true}
                    allowsFullscreenVideo={true}
                    allowsBackForwardNavigationGestures={true}
                    allowsLinkPreview={false}
                    onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                      console.warn('WebView error: ', nativeEvent);
                    }}
                    onLoad={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                      console.log(syntheticEvent); //nativeEvent.url;
                    }}
                    onLoadProgress={({ nativeEvent }) => {
                      console.log(nativeEvent.progress);
                    }}
                    /> 
          </Modal>
        </Container>
  );
};
export default PostScreen;