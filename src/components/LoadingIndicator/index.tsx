import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native'
import { Spinner } from 'native-base';

const LoadingIndicator = (): JSX.Element => {
    const styles = StyleSheet.create({
        loader:{
        marginBottom:0
        },
        spinner:{
            color:'#123262'
        }
    });
  
    return (
        <View style={styles.loader}>
            <Spinner color='#123262' />
        </View>
    );
  }
  export default LoadingIndicator