import {create} from 'zustand';

const useHerosPageStore = create(set => ({
  currentPageLink: 'https://swapi.py4e.com/api/people/?page=1',
  prevPage: null,
  nextPage: null,
  setCurrentPageLink: link => set(state => ({currentPageLink: link})),
  setPrevPageLink: link => set(state => ({prevPage: link})),
  setNextPageLink: link => set(state => ({nextPage: link})),
}));

export default useHerosPageStore;
