import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React from 'react';
import useHeroesStore from '../../stores/heroesStore';
import HeroCard from '../HeroCard/HeroCard';

export default function HeroesList() {
  const {heroes} = useHeroesStore();

  return (
    <ScrollView style={styles.container}>
      {heroes.map(hero => (
        <HeroCard key={hero.url} hero={hero} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('50%'),
    width: wp('90%'),
    marginTop: hp('5%'),
  },
});
