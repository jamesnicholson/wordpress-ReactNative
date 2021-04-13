import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
const HeaderWrapper = () => {

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
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
      </Container>
    );
  
}
export default HeaderWrapper