import {create} from 'zustand';

const useHeroesStore = create(set => ({
  heroes: [],
  setHeroes: newHeroes => set(state => ({heroes: [...newHeroes]})),
  favHeroes: [],
  setFavHeroes: newHeroes => set(state => ({favHeroes: [...newHeroes]})),
}));

export default useHeroesStore;
