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
import useHerosPageStore from '../../stores/heroesPageStore';
import strManipulations from '../../helpers/strManipulations';

export default function HeroesPageChanger() {
  const {currentPageLink, prevPage, nextPage, setCurrentPageLink} =
    useHerosPageStore();

  const goTo = page => {
    switch (page) {
      case 'next':
        console.log('clicked', nextPage);
        setCurrentPageLink(nextPage);
        break;
      case 'prev':
        setCurrentPageLink(prevPage);
        break;
      default:
        console.log('Invalid page');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          goTo('prev');
        }}
        style={styles.arrowContainer}>
        {prevPage ? <Text>{'<<'}</Text> : <></>}
      </TouchableOpacity>
      <Text>{strManipulations.getPageNumber(currentPageLink)}</Text>
      <TouchableOpacity
        onPress={() => {
          goTo('next');
        }}
        style={styles.arrowContainer}>
        {nextPage ? <Text>{'>>'}</Text> : <></>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('6%'),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  arrowContainer: {
    width: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
});
