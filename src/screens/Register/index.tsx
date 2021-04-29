import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import HeaderWrapper from '../../components/Header';

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Card,
  CardItem,
  Left,
  Right,
  Item,
  Icon,
  Form,
  Label,
  Input,
  H1
} from 'native-base';

import {PostType} from '../../api/intefaces/enums'
import LoadingIndicator from '../../components/LoadingIndicator';

function RegisterScreen ({route, navigation}) {

  const {state, dispatch} = useContext(AppContext);
  const contentWidth = useWindowDimensions().width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
    },
    loginForm: {
        backgroundColor: 'green'
    }
  });
  const handler = (id: number) => {
    navigation.navigate('Post', {
      postId:id,
      type: PostType.SEARCHED
    }) 
  }
  return (
      <Container>
          <HeaderWrapper navigation={navigation} title="Register" hideSearch={true} />
          <Content>
            <H1>Register Screen</H1>
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>E-INA</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
  );
};
export default RegisterScreen;