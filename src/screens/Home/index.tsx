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
  Left,
  Icon,
  Right
} from 'native-base';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import {setCategories} from '../../store/actions'
import Category from '../../api/models/category';
import HeaderWrapper from '../../components/Header';

function HomeScreen ({navigation}){
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
    cardText: {
      backgroundColor: '#eee',
    },
    cardIcon: {
      backgroundColor: '#777',
      width:'20%'
    }
  });
  const handler = (id, name) =>{
    navigation.navigate('Posts', {
      categoryId:id,
      name: name
    }) 
  }

  return (
      <Container>
          <HeaderWrapper title="E-INA" />
          <Content>
            {state.categories.map((category:Category) =>
              <TouchableOpacity key={category.id} onPress={() => handler(category.id, category.name)}>
                <Card style={styles.card}>
                  <CardItem>
                    <Left style={{flex:0.8}}>
                      <Text>{category.displayName}</Text>
                    </Left>
                    <Right style={{flex:0.2}}>
                      <Icon name="chevron-forward-outline" />
                    </Right>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            )}
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
export default HomeScreen;
