import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';
import {useEffect, useState} from 'react';
import api from '../../api/api';
import useHerosPageStore from '../../stores/heroesPageStore';
import useHeroesStore from '../../stores/heroesStore';
import HeroesPageChanger from '../../components/HeroesPageChanger/HeroesPageChanger';
import HeroesList from '../../components/HeroesList/HeroesList';
import favoriteHeroesAsyncStorage from '../../asyncStorages/favoriteHeroesAsyncStorage';
import FansCounter from '../../components/FansCounter/FansCounter';

export default function MainScreen() {
  const {setHeroes, setFavHeroes} = useHeroesStore();
  const {currentPageLink, setPrevPageLink, setNextPageLink} =
    useHerosPageStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const newHeroes = await favoriteHeroesAsyncStorage.getHeroes();
      setFavHeroes(newHeroes);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      favoriteHeroesAsyncStorage.initialize();
      const {results, previous, next} = await api.getData(currentPageLink);
      setHeroes(results);
      setPrevPageLink(previous);
      setNextPageLink(next);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    })();
  }, [currentPageLink]);

  const handleClear = async () => {
    await favoriteHeroesAsyncStorage.clearStore();
    const newHeroes = await favoriteHeroesAsyncStorage.getHeroes();
    setFavHeroes(newHeroes);
  };

  return (
    <View style={styles.container}>
      <FansCounter handleClear={handleClear} />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <HeroesList />
        </>
      )}
      <HeroesPageChanger />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    height: hp('50%'),
    width: wp('90%'),
    marginTop: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
