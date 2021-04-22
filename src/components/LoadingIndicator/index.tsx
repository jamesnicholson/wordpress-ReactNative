import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native'
import { Spinner } from 'native-base';

const LoadingIndicator = (): JSX.Element => {
    const styles = StyleSheet.create({
        loader:{
        marginBottom:0
        }
    });
  
    return (
        <View style={styles.loader}>
            <Spinner />
        </View>
    );
  }
  export default LoadingIndicator