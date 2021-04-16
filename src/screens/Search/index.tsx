import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import DataService from '../../api/services';
import AppContext from '../../store/context'
import HeaderWrapper from '../../components/Header';
import {setSearchTerm} from '../../store/actions'
import { useInput } from '../../hooks'
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
  Icon
} from 'native-base';
import Post from '../../api/models/post';
import HTML from "react-native-render-html";
import SearchResult from '../../api/models/searchResult';
import {PostType} from '../../api/intefaces/enums'

function SearchScreen ({route, navigation}) {

  const {state, dispatch} = useContext(AppContext);
  const [posts, setPosts] = useState<SearchResult[]>([])
  const [value, input, searchResults] = useInput();
  const contentWidth = useWindowDimensions().width;

  useEffect(() => {
    dispatch(setSearchTerm(value));
  },[value]);
  
  useEffect(() => {
    setPosts(searchResults)
  },[searchResults, setPosts]);

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
    searchBar: {
      margin:10,
      padding: 10,
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
          <HeaderWrapper navigation={navigation} title="Search" />
          <Content>
            <Item style={styles.searchBar}>
              <Icon active name='search' />
              {input}
            </Item>
            {posts.map((searchResult:SearchResult) =>
            <TouchableOpacity key={searchResult.id} onPress={() => handler(searchResult.id)}>
              <Card  style={styles.card}>
                <CardItem>
                  <Left style={{flex:0.8}}>
                    <HTML source={{ html: searchResult.displayTitle }} contentWidth={contentWidth} />
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
export default SearchScreen;