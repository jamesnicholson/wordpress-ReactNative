import React, { Component } from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import HTML from 'react-native-render-html';
import { useState } from 'react';

const HeaderWrapper = ({navigation, title, hideSearch}): JSX.Element => {
  const [displayTitle , setDisplayTitle] =  useState<String>("")
  const contentWidth = useWindowDimensions().width;
  const styles = StyleSheet.create({
    header:{
      marginBottom:0
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
          : null
          }
        </Left>
        <Body>
        <HTML source={{ html: "<div>"+title+"</div>" }} contentWidth={contentWidth} tagsStyles={tagStyles} />
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