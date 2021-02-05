/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import localCountryData from './src/countryData';
import colourData from './src/colourData';

/* import Image from 'react-native-scalable-image'; */
import * as Vibrant from 'node-vibrant';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {defaultSearch, nameSearch} from './src/utils/API';
import List from './src/Components/List';

import images from './assets/images/index';
const App = () => {
  const [countryNames, setCountryNames] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentCountry, setCurrentCountry] = useState({
    name: null,
    capital: null,
    flag: null,
    otherNames: null,
    alpha3Code: null,
    accentColours: {},
  });

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      if (!ignore) {
        let result = null;
        if (searchText === '') {
          try {
            result = {data: localCountryData};
          } catch (err) {
            console.error(err);
          }
        } else {
          try {
            result = await nameSearch.get(`/${searchText}`);
          } catch (err) {
            console.error(err);
          }
        }
        const names = result
          ? result.data
              .map((country) => country.name)
              .sort((a, b) => {
                const textA = a.toUpperCase();
                const textB = b.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
          : [];
        const countries = result
          ? result.data
              .map(({name, capital, altSpellings, alpha3Code}) => {
                return {
                  name,
                  capital,
                  flag: images[alpha3Code.toLowerCase()],
                  accentColours: colourData[alpha3Code.toLowerCase()],
                  otherNames: [...altSpellings],
                  alpha3Code: alpha3Code.toLowerCase(),
                };
              })
              .sort((a, b) => {
                const textA = a.name.toUpperCase();
                const textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
          : [];

        setCountryNames(names);
        setCountryData(countries);
      }
    }
    fetchData(searchText);
    return () => {
      ignore = true;
    };
  }, [currentCountry, searchText]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {currentCountry.name !== null && (
          <View>
            <Text>Current Country</Text>
            <Text>{currentCountry.name}</Text>
            <Text style={{color: currentCountry.accentColours.DarkMuted}}>
              {JSON.stringify(currentCountry.accentColours)}
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={currentCountry.flag}
                style={styles.image}
                resizeMode={'contain'}
              />
            </View>
          </View>
        )}
        <ScrollView
        /*  contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView} */
        >
          <TextInput
            placeholder="Search by country"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />

          <List
            names={countryNames}
            setCurrentCountry={setCurrentCountry}
            countryData={countryData}
            currentCountry={currentCountry}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
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

  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  flag: {width: 50, height: 50},
});

export default App;
