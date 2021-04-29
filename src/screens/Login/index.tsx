import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import HeaderWrapper from '../../components/Header';
import {setSearchTerm} from '../../store/actions'

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
  Input
} from 'native-base';
import HTML from "react-native-render-html";
import SearchResult from '../../api/models/searchResult';
import {PostType} from '../../api/intefaces/enums'
import LoadingIndicator from '../../components/LoadingIndicator';

function LoginScreen ({route, navigation}) {

    const {state, dispatch} = useContext(AppContext);
    const contentWidth = useWindowDimensions().width;
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: 'green',
        },
        loginForm: {
            margin:10
        },
        loginButton:{
            marginTop:20
        }
    });
    const handler = () => {
        console.log("rad")


    }
  return (
      <Container>
          <HeaderWrapper navigation={navigation} title="Login" hideSearch={true} />
          <Content>
            <Form style={styles.loginForm}>
                <Item stackedLabel>
                    <Label>Username</Label>
                    <Input 
                        onChange={e => setUserName(e.target.value)}
                    />
                </Item>
                <Item stackedLabel last>
                    <Label>Password</Label>
                    <Input 
                        onChange={e => setPassword(e.target.value)}
                    />
                </Item>
                <Button full primary style={styles.loginButton} onPress={() => handler()}><Text>Login</Text></Button>
            </Form>
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
export default LoginScreen;