import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../../api/api'; // Make sure this import exists
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function FilmCard({name}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      width: wp('25%'),
      height: wp('25%'),
      borderRadius: 5,
      borderColor: '#000',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
        fontWeight: '500',
        textAlign: 'center',
        width: '100%'
    }
  });