import React, { useState } from 'react';
import {Image, StyleSheet, useWindowDimensions} from 'react-native'
import { Header, Left, Body, Right, Button, Icon } from 'native-base';
import HTML from 'react-native-render-html';
import { LOGO } from '../../assets/images';
import { color } from 'react-native-reanimated';

const HeaderWrapper = ({navigation, title, hideSearch}): JSX.Element => {
  
  const contentWidth = useWindowDimensions().width;
  const styles = StyleSheet.create({
    header:{
      marginBottom:0,
      backgroundColor: '#123262',
    },
    logo:{
        width:contentWidth * .2,
        height:contentWidth * .2,
        padding:10
    },
    searchIcon:{
      color:'#f4ebd0'
    }
  });
  const tagStyles = StyleSheet.create({
    div: {
      fontSize:20,
      width: contentWidth * .7,
      color:'#f4ebd0'
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
              <Icon name='arrow-back'  style={styles.searchIcon}/>
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
                <Icon name='search' style={styles.searchIcon} />
              </Button>
            : null
          }
        </Right>
      </Header>
    );
  }
  export default HeaderWrapper