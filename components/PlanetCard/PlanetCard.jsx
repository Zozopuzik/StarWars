import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../../api/api'; // Make sure this import exists
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function PlanetCard({ heroData }) {
  const [planetData, setPlanetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (heroData && heroData.homeworld) {
      (async () => {
        try {
          const data = await api.getData(heroData.homeworld);
          setPlanetData(data);
        } catch (error) {
          console.error("Error fetching planet data:", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [heroData]); 

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {planetData ? (
        <>
          <Text style={styles.title}>Home World</Text>
          <Text>{planetData.name}</Text>
          <Text>Climate: {planetData.climate}</Text>
          <Text>Gravity: {planetData.gravity}</Text>
          <Text>Terrain: {planetData.terrain}</Text>
          <Text>Population: {planetData.population}</Text> 
        </>
      ) : (
        <Text>No planet data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
});
