import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import favoriteHeroesAsyncStorage from '../../asyncStorages/favoriteHeroesAsyncStorage';
import useHeroesStore from '../../stores/heroesStore';
export default function HeroCard({hero}) {
  const [isFav, setIsFav] = useState(false);
  const {setFavHeroes, favHeroes} = useHeroesStore();
  const navigation = useNavigation();

  const handlePress = async hero => {
    if (isFav) {
      await favoriteHeroesAsyncStorage.removeHero(hero.name);
      const newHeroes = await favoriteHeroesAsyncStorage.getHeroes();
      setFavHeroes(newHeroes);
    } else {
      await favoriteHeroesAsyncStorage.addHero({
        name: hero.name,
        gender: hero.gender,
      });
      const newHeroes = await favoriteHeroesAsyncStorage.getHeroes();
      setFavHeroes(newHeroes);
    }
    setIsFav(prevState => !prevState);
  };
  const handleNavigate = () => {
    navigation.navigate('CharacterScreen', {link: hero.url, title: hero.name});
  };

  useEffect(() => {
    (async () => {
      try {
        const favHeroesFromStore = await favoriteHeroesAsyncStorage.getHeroes();
        console.log(favHeroesFromStore);
        const heroExists = favHeroesFromStore.some(
          favHero => favHero.name === hero.name,
        );

        if (heroExists) {
          setIsFav(true);
        } else {
          setIsFav(false);
        }
      } catch (error) {
        console.error('Ошибка при загрузке любимых героев:', error);
      }
    })();
  }, [favHeroes]);

  return (
    <View style={styles.container}>
      <View style={styles.nameTxtContainer}>
        <Text style={styles.nameTxt}>{hero.name}</Text>
      </View>
      <TouchableOpacity
        style={isFav ? styles.removeFromFavContainer : styles.addToFavContainer}
        onPress={() => handlePress(hero)}>
        <Text style={isFav ? styles.removeFromFavTxt : styles.addToFavTxt}>
          {isFav ? 'Remove from Fav' : 'Add to Fav'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.learnMoreContainer}>
        <Text style={styles.learnMoreTxt} onPress={() => handleNavigate()}>
          Learn More
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('8%'),
    width: wp('90%'),
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 2,
    marginTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  nameTxtContainer: {
    width: '40%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 2,
  },
  nameTxt: {
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
    fontSize: hp('1.6%'),
  },
  addToFavContainer: {
    width: '30%',
    height: '40%',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToFavTxt: {
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
    color: 'red',
    fontSize: hp('1.2%'),
  },

  removeFromFavContainer: {
    width: '30%',
    height: '40%',
    backgroundColor: 'red',
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeFromFavTxt: {
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
    color: '#fff',
    fontSize: hp('1.2%'),
  },
  learnMoreContainer: {
    width: '20%',
    height: '40%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  learnMoreTxt: {
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
    color: '#fff',
    fontSize: hp('1.2%'),
  },
});
