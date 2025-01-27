import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
  } from 'react-native';
  import React from 'react'
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import useHeroesStore from '../../stores/heroesStore'
import strManipulations from '../../helpers/strManipulations';
import favoriteHeroesAsyncStorage from '../../asyncStorages/favoriteHeroesAsyncStorage';

export default function FansCounter({handleClear}) {
    const {favHeroes} = useHeroesStore();

  return (
    <View style = {styles.container}>
      <View style={styles.row}>
        <View style={styles.card}>          
            <Text>
                {strManipulations.countByField(favHeroes, 'gender', 'male')}
            </Text>
            <Text>
                Male Fans
            </Text>  
        </View>
        <View style={styles.card}>
            <Text>
                {strManipulations.countByField(favHeroes, 'gender', 'female')}
            </Text>
            <Text>
                Female Fans
            </Text> 
        </View>
        <View style={styles.card}>
            <Text>
                {strManipulations.countByField(favHeroes, 'gender', 'n/a')}
            </Text>
            <Text>
                Others
            </Text> 
        </View>
      </View>
      <TouchableOpacity style={styles.clearContainer} onPress={() => handleClear()}>
        <Text style={styles.clearTxt}>Clear Fans</Text>
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
      width: wp('90%'),
      height: hp('20%'),
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#000',
      marginTop: hp('5%'),
      alignItems: 'center'
    },
    row: {
        width: '100%',
        height: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginTop: hp('2%')
    },
    card: {
        width: '32%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',  
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 6, 
        elevation: 4,
    },
    clearContainer: {
        width: '60%',
        height: '20%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('3%'),
        backgroundColor: '#fff',  

    },
    clearTxt: {
        color: 'red',
        textTransform: 'uppercase',
        width: '100%',
        textAlign: 'center'
    }
  });