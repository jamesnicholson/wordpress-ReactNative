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
import LoadingIndicator from '../../components/LoadingIndicator';

function SearchScreen ({route, navigation}) {

  const {state, dispatch} = useContext(AppContext);
  const [posts, setPosts] = useState<SearchResult[]>([])
  const [value, input, submitted, searchResults] = useInput();
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
      backgroundColor: '#f4ebd0',
    },
    card: {
      width:'95%',
      fontSize: 20,
      backgroundColor: '#bdb49c',
      marginLeft: 10,
      marginTop:10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    cardItem:{
      backgroundColor: '#bdb49c'
    },
    cardIcon: {
      color: '#123262',
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
      <Container style={styles.container}>
          <HeaderWrapper navigation={navigation} title="Search" hideSearch={true} />
          <Content>
            <Item style={styles.searchBar}>
              <Icon active name='search' />
              {input}
            </Item>
            <>
              {posts.length === 0 && submitted === true ? <LoadingIndicator /> : null}
            </>
            {posts.map((searchResult:SearchResult) =>
            <TouchableOpacity key={searchResult.id} onPress={() => handler(searchResult.id)}>
              <Card  style={styles.card}>
                <CardItem style={styles.cardItem}>
                  <Left style={{flex:0.8}}>
                    <HTML source={{ html: searchResult.displayTitle }} contentWidth={contentWidth} />
                  </Left>
                  <Right style={{flex:0.2}}>
                    <Icon name="chevron-forward-outline" style={styles.cardIcon} />
                  </Right>
                </CardItem>
              </Card>
            </TouchableOpacity>
          )}
          </Content>
        </Container>
  );
};
export default SearchScreen;