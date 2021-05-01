import React, { useState } from 'react';
import {Image, StyleSheet, useWindowDimensions} from 'react-native'
import { Header, Left, Body, Right, Button, Icon } from 'native-base';
import HTML from 'react-native-render-html';
import { LOGO } from '../../assets/images';

const HeaderWrapper = ({navigation, title, hideSearch}): JSX.Element => {
  
  const contentWidth = useWindowDimensions().width;
  const styles = StyleSheet.create({
    header:{
      marginBottom:0
    },
    logo:{
        width:contentWidth * .2,
        height:contentWidth * .2,
        padding:10
    }
  });
  const tagStyles = StyleSheet.create({
    div: {
      fontSize:20,
      width: contentWidth * .7
    }
  });
  const handler = () => {
    navigation.navigate('Search') 
  }
  
  return (
      <Header style={styles.header}>
        <Left>
          {
            title !== "eINA" ? 
            <Button transparent  onPress={() => {navigation.goBack()}}>
              <Icon name='arrow-back' />
            </Button>
          : <Image source={LOGO} style={styles.logo}/>
          }
        </Left>
        <Body>
          {   title !== "eINA" && title !== undefined  ? 
                 <HTML source={{ html: "<div>"+title+"</div>" }} contentWidth={contentWidth} tagsStyles={tagStyles} />
                 : null
          }
        </Body>
        <Right>
          {
            !hideSearch ? 
              <Button transparent onPress={() => handler()}>
                <Icon name='search' />
              </Button>
            : null
          }
        </Right>
      </Header>
    );
  }
  export default HeaderWrapper