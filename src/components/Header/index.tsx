import React, { useContext, useState } from 'react';
import {Image, StyleSheet, useWindowDimensions} from 'react-native'
import { Header, Left, Body, Right, Button, Icon } from 'native-base';
import HTML from 'react-native-render-html';
import Logo from '../../assets/logo';
import AppContext from '../../store/context';
import { useEffect } from 'react';

const HeaderWrapper = ({navigation, title, hideSearch}): JSX.Element => {
  const {state, dispatch} = useContext(AppContext);
  const [parentTitle, setParentTitle] = useState<string>("")
  const contentWidth = useWindowDimensions().width;
  const styles = StyleSheet.create({
    header:{
      marginBottom:0,
      backgroundColor: '#123262',
    },
    logo:{
        width:contentWidth * .2,
        height:contentWidth * .2,
        padding:10
    },
    searchIcon:{
      color:'#f4ebd0'
    }
  });
  const tagStyles = StyleSheet.create({
    div: {
      fontSize:16,
      fontWeight:'bold',
      width: contentWidth * .68,
      color:'#f4ebd0'
    }
  });
  const handler = () => {
    navigation.navigate('Search') 
  }
  useEffect(() =>{
    setParentTitle(state.parentCategory.displayTitle)
  },[state.parentCategory, setParentTitle])
  
  return (
      <Header style={styles.header}>
        <Left>
          {
            title !== "eINA" ? 
            <Button transparent  onPress={() => {navigation.goBack()}}>
              <Icon name='arrow-back'  style={styles.searchIcon}/>
            </Button>
          : <Logo />
          }
        </Left>
        <Body>
          {   title !== "eINA" && title !== undefined  ? 
                
                parentTitle === "" ?
                    <HTML source={{ html: "<div>where am i "+title+"</div>" }} contentWidth={contentWidth} tagsStyles={tagStyles} />

                :   <HTML source={{ html: "<div>"+parentTitle+"</div>" }} contentWidth={contentWidth} tagsStyles={tagStyles} />

              : null
          }
        </Body>
        <Right>
          {
            !hideSearch ? 
              <Button transparent onPress={() => handler()}>
                <Icon name='search' style={styles.searchIcon} />
              </Button>
            : null
          }
        </Right>
      </Header>
    );
  }
  export default HeaderWrapper