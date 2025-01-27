import AsyncStorage from '@react-native-async-storage/async-storage';

const favoriteHeroesAsyncStorage = {
  initialize: async () => {
    try {
      const existingData = await AsyncStorage.getItem('fav_heroes');
      console.log(existingData);
      if (!existingData) {
        await AsyncStorage.setItem('fav_heroes', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Ошибка инициализации хранилища:', error);
    }
  },
  addHero: async hero => {
    try {
      const heroes = await AsyncStorage.getItem('fav_heroes');
      const parsedHeroes = JSON.parse(heroes);
      parsedHeroes.push(hero);
      await AsyncStorage.setItem('fav_heroes', JSON.stringify(parsedHeroes));
    } catch (error) {
      console.log('Ошибка добавления героя:', error);
    }
  },
  removeHero: async name => {
    try {
      const heroes = await AsyncStorage.getItem('fav_heroes');
      const parsedHeroes = JSON.parse(heroes);
      const updatedHeroes = parsedHeroes.filter(hero => hero.name !== name);
      await AsyncStorage.setItem('fav_heroes', JSON.stringify(updatedHeroes));
    } catch (error) {
      console.log('Ошибка удаления героя:', error);
    }
  },
  getHeroes: async () => {
    try {
      const heroes = await AsyncStorage.getItem('fav_heroes');
      return heroes ? JSON.parse(heroes) : [];
    } catch (error) {
      console.error('Ошибка получения списка героев:', error);
      return [];
    }
  },
  clearStore: async () => {
    try {
      const heroes = await AsyncStorage.getItem('fav_heroes');
      const parsedHeroes = JSON.parse(heroes) || [];
      await AsyncStorage.setItem('fav_heroes', JSON.stringify([]));
    } catch (error) {
      console.error('Ошибка получения списка героев:', error);
    }
  },
};

export default favoriteHeroesAsyncStorage;
