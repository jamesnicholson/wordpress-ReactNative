import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

const HeaderWrapper = ({navigation, title}): JSX.Element => {
  const styles = StyleSheet.create({
    header:{
      marginBottom:0
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
            <Title>{title}</Title>
          </Body>
          <Right>
            {
              title !== "Search" ? 
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