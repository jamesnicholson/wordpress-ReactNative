import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import DataService from '../../api/services';
import { WebView } from 'react-native-webview';
import LoadingIndicator from '../../components/LoadingIndicator';

function ModalContent ({post, url}) {
  const contentWidth = useWindowDimensions().width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
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
  const tagStyles = {
    'code_div': {
      color: '#000000',
      display:'flex'
    },
    'headsect': {
      fontWeight:'bold'
    }
  }
  useEffect(() => {
    console.log(post)
  //  let regexs = `#\<div id="${url.replace("#","")}"\>(.+?)\<\/div\>#s`;
  //  console.log(post.match(regexs))
  },[url,post])



  return (
     <View>   
         <>
            {!post ? <LoadingIndicator /> : null}
          </>
            { post ? <WebView 
                        source={{ html: post  }}
                        style={classesStyles}
                    /> : null }
     </View>
  );
};
export default ModalContent;