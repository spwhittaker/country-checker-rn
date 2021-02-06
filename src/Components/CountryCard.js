import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import OtherNames from './OtherNames';

export default function CountryCard({currentCountry}) {
  return (
    <View>
      {currentCountry.name && (
        <Text
          style={{color: currentCountry.accentColours.DarkerMuted || 'black'}}>
          {currentCountry.name}
        </Text>
      )}
      {currentCountry.capital && (
        <Text
          style={{color: currentCountry.accentColours.DarkerMuted || 'black'}}>
          Capital: {currentCountry.capital}
        </Text>
      )}

      {currentCountry.flag && (
        <View style={styles.imageContainer}>
          <Image
            source={currentCountry.flag}
            style={styles.image}
            resizeMode={'contain'}
          />
        </View>
      )}
      {currentCountry.otherNames.length > 1 && (
        <OtherNames
          otherNames={currentCountry.otherNames}
          accentColours={currentCountry.accentColours}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderColor: 'black',
    borderWidth: 2,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    margin: 5,
  },
});
