import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../../api/api';
import HeroDescription from '../../components/HeroDescription/HeroDescription';
import PlanetCard from '../../components/PlanetCard/PlanetCard';
import HeroFilms from '../../components/HeroFilms/HeroFilms';

export default function CharacterScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {link, title} = route.params;
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (title) {
      navigation.setOptions({
        title: title,
      });
    }
  }, [title, navigation]);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getData(link);
        setHeroData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [link]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.row}>
        {heroData && <HeroDescription heroData={heroData} />}
        {heroData && <PlanetCard heroData={heroData} />}
      </View>
      <View style={styles.row}>
        <HeroFilms heroData={heroData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: hp('2%'),
  },
});
