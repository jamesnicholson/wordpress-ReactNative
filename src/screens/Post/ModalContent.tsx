import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import DataService from '../../api/services';
import { WebView } from 'react-native-webview';
import LoadingIndicator from '../../components/LoadingIndicator';


function ModalContent ({url}) {
  const contentWidth = useWindowDimensions().width;
  const contentHeight = useWindowDimensions().height;

  const classesStyles = {
    'code_div': {
      color: '#000000',
      display:'flex'
    },
    'headsect': {
      fontWeight:'bold'
    }
  }
  const tagStyles = {
    'code_div': {
      color: '#000000',
      display:'flex'
    },
    'headsect': {
      fontWeight:'bold'
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      maxHeight: 200,
      width: 320,
      backgroundColor:'#000000'
  
    }
  });


  useEffect(() => {
    console.log(url)
  //  let regexs = `#\<div id="${url.replace("#","")}"\>(.+?)\<\/div\>#s`;
  //  console.log(post.match(regexs))
  },[url])



  return (
     <View>   
          
    
             
     </View>
  );
};
export default ModalContent;