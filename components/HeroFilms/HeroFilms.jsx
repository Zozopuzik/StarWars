import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../../api/api'; // Make sure this import exists
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FilmCard from '../FilmCard/FilmCard';

export default function HeroFilms({ heroData }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show ActivityIndicator

  useEffect(() => {
    if (heroData && heroData.films) {
      const fetchFilms = async () => {
        try {
          const heroFilms = [];
          for (let element of heroData.films) {
            const response = await api.getData(element);
            heroFilms.push(response.title); // Assuming you want the title of each film
          }
          setFilms(heroFilms);
        } catch (error) {
          console.error("Error fetching films:", error);
        } finally {
          setLoading(false); // Stop loading after fetching films
        }
      };

      fetchFilms();
    }
  }, [heroData]); // Dependency array includes heroData to fetch films when heroData changes

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Films:</Text>
      <View style={styles.row}>
        {films.map((element, index) => <FilmCard name={element} key={index}/>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: wp('96%'),
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: hp('2%')
  },
  row: {
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: hp('2%')
  },
  heading: {
    fontWeight: '600',
    fontSize: hp('2.3%'),
    marginBottom: hp('1%')

  }
});
