import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import api from '../../api/api';
export default function HeroDescription({heroData}) {
    const [species, setSpecies] = useState([])
    useEffect(() => {
        (async () => {
            const heroSpecies = []
            for (let element of heroData.species) {
                const response = await api.getData(element);
                heroSpecies.push(response.name); // Assuming you want to store the fetched species data
              }
              setSpecies(heroSpecies)
        })()
    }, [])
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dossier</Text>
      <Text>{heroData.name}</Text>
      <Text>Species: {species.join(', ')}</Text>
      <Text>Height: {heroData.height} cm</Text>
      <Text>Mass: {heroData.mass} kg</Text>
      <Text>Hair color: {heroData.hair_color}</Text>
      <Text>Skin color: {heroData.skin_color}</Text>
      <Text>Eye color: {heroData. eye_color}</Text>
      <Text>Birth year: {heroData. birth_year}</Text>
      <Text>Gender: {heroData. gender}</Text>   
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
      width: wp('40%'),
      height: hp('25%'),
      borderRadius: 5,
      borderColor: '#000',
      borderWidth: 2,
      paddingLeft: wp('2%'),

    },
    title: {
        fontWeight: '600',
        fontSize: hp('2.3%')
    }
})