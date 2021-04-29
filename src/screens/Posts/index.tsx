import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import DataService from '../../api/services';
import HeaderWrapper from '../../components/Header';
import LoadingIndicator from '../../components/LoadingIndicator';

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
  H1,
  Icon
} from 'native-base';

import HTML from "react-native-render-html";
import {PostType} from '../../api/intefaces/enums'
import Post from '../../api/models/post';
import Category from '../../api/models/category';

function PostsScreen ({route, navigation}){

  const { categoryId, name } = route.params;
  const [posts, setPosts] = useState([])
  const [list, setList] = useState([])
  const [categories, setCategories] = useState([])
  const [listType, setListType] = useState('posts')
  const api = new DataService();
  const contentWidth = useWindowDimensions().width;

  useEffect(() => {
    api.getPosts(categoryId).then(data => {
      setPosts(data)
    }).catch(error =>{
      console.log("Posts - error", error)
    }).finally(() => {
      console.log("Posts Screen - Posts - All Done")
    });
  },[DataService, setPosts]);

  useEffect(() => {
    api.getCategories(categoryId).then(data => {
      setCategories(data)
    }).catch(error =>{
      console.log("Categories - error", error)
    }).finally(() => {
      console.log("Categories - All Done")
    });
  },[DataService, setCategories]);

  useEffect(() => {
    if(posts.length > 0){
      setList(posts)
      setListType('posts')
    }
    if(categories.length > 0){
      setList(categories)
      setListType('categories')
    }
  },[posts, categories, setList, setListType])

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
    title: {
      marginLeft: 5,
      marginTop:10,
      padding: 10,
    }
  });

const handler = (id: number, listType: string, title: string) => {

  if(listType === 'posts'){
    navigation.navigate('Post', {
      postId:id,
      type: PostType.POSTS
    })
  }else{
    navigation.push('Posts', {
      categoryId:id,
      name: title,
      type: PostType.POSTS
    })
  }
}

return (
    <Container>
        <HeaderWrapper navigation={navigation} title={name} />
        <Content>
          <H1 style={styles.title}>{name}</H1>
          <>
            {list.length === 0 ? <LoadingIndicator /> : null}
          </>
          {
            listType === 'posts' ? 
                list.map((post:Post, index:number) => {
                  return <TouchableOpacity key={index} onPress={() => handler(post.getId, listType, post.displayTitle)}>
                            <Card style={styles.card}>
                              <CardItem>
                                <Left style={{flex:0.8}}>
                                  <HTML source={{ html: post.displayTitle }} contentWidth={contentWidth} />
                                </Left>
                                <Right style={{flex:0.2}}>
                                  <Icon name="chevron-forward-outline" />
                                </Right>
                              </CardItem>
                            </Card>
                          </TouchableOpacity>
                })
          :
            list.map((category:Category, index:number) => {
              return <TouchableOpacity key={index} onPress={() => handler(category.getId, listType, category.displayTitle)}>
                        <Card style={styles.card}>
                          <CardItem>
                            <Left style={{flex:0.8}}>
                              <HTML source={{ html: category.displayTitle }} contentWidth={contentWidth} />
                            </Left>
                            <Right style={{flex:0.2}}>
                              <Icon name="chevron-forward-outline" />
                            </Right>
                          </CardItem>
                        </Card>
                      </TouchableOpacity>
            })
        }
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>E-INA</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>)

};
export default PostsScreen;
