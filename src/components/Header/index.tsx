import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

const HeaderWrapper = ({navigation}): JSX.Element => {

    return (
        <Header>
          <Left>
            {
              navigation ?  <Button transparent  onPress={() => {navigation.goBack()}}>
                              <Icon name='arrow-back' />
                            </Button>
                          : null
            }
        
          </Left>
          <Body>
            <Title>E-INA</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search' />
            </Button>
          </Right>
        </Header>
    );
  }
  export default HeaderWrapper