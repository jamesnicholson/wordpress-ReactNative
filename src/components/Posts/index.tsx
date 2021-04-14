import React, {Fragment, useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Card,
  CardItem,
  Body,
} from 'native-base';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import {setCategories} from '../../store/actions'
import Category from '../../api/models/category';
import HeaderWrapper from '../Header';

function Posts ({navigation}){

  const {state, dispatch} = useContext(AppContext);
  useEffect(() => {
    const api = new DataService();
    api.getCategories().then(data => {
       dispatch(setCategories(data))
    }).finally(() => {
        console.log("Categories - All Done")
    });
  },[DataService]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
    },
    card: {
      width:'95%',
      fontSize: 20,
      color: 'red',
      marginLeft: 10,
      marginTop:10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
  return (
      <Container>
          <HeaderWrapper navigation={navigation} />
          <Content>
            {state.categories.map((category:Category) =>
              <TouchableOpacity key={category.id} onPress={() =>console.log("ssss")}>   
                <Card style={styles.card}>
                  <CardItem>
                    <Body>
                      <Text>{category.displayName}</Text>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            )}
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>WOOHOoo E-INA</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
  );
};
export default Posts;
