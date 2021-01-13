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
  Image,
  Dimensions,
} from 'react-native';
import * as Vibrant from 'node-vibrant';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {lighten, darken} from 'polished';
import {defaultSearch, nameSearch} from './src/utils/API';
import List from './src/Components/List';
import SvgCssUri from './src/Components/SvgCssUri';

const App = () => {
  const [countryNames, setCountryNames] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentCountry, setCurrentCountry] = useState({
    name: null,
    capital: null,
    flag: null,
    otherNames: null,
  });

  const [accentColors, setAccentColors] = useState({});

  const RGBToHex = ([r, g, b]) => {
    r = Math.round(r).toString(16);
    g = Math.round(g).toString(16);
    b = Math.round(b).toString(16);
    if (r.length === 1) r = '0' + r;
    if (g.length === 1) g = '0' + g;
    if (b.length === 1) b = '0' + b;
    r = r.toUpperCase();
    g = g.toUpperCase();
    b = b.toUpperCase();
    return '#' + r + g + b;
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      if (!ignore) {
        let result = null;
        if (searchText === '') {
          try {
            result = await defaultSearch.get('/');
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
              .map(({name, capital, flag, altSpellings}) => {
                return {name, capital, flag, otherNames: [...altSpellings]};
              })
              .sort((a, b) => {
                const textA = a.name.toUpperCase();
                const textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
          : [];

        setCountryNames(names);
        setCountryData(countries);
        if (currentCountry.flag) {
          async () => {
            try {
              const palette = await Vibrant.from(
                currentCountry.flag,
              ).getPalette();
              console.log(palette);
              if (palette) {
                const paletteColors = {
                  DarkMuted: RGBToHex(palette.DarkMuted._rgb),
                  DarkVibrant: RGBToHex(palette.DarkVibrant._rgb),
                  DarkVibrantContrast: lighten(
                    0.2,
                    RGBToHex(palette.DarkVibrant._rgb),
                  ),
                  DarkerMuted: darken(0.1, RGBToHex(palette.DarkMuted._rgb)),
                  DarkestMuted: darken(0.2, RGBToHex(palette.DarkMuted._rgb)),
                  LightMuted: RGBToHex(palette.LightMuted._rgb),
                  LightVibrant: RGBToHex(palette.LightVibrant._rgb),
                  LighterMuted: lighten(0.3, RGBToHex(palette.LightMuted._rgb)),
                  LightestMuted: lighten(
                    0.5,
                    RGBToHex(palette.LightMuted._rgb),
                  ),
                  Muted: RGBToHex(palette.Muted._rgb),
                  Vibrant: RGBToHex(palette.Vibrant._rgb),
                };
                setAccentColors(paletteColors);
              }
            } catch (err) {
              console.error(err);
            }
          };
        }
      }
    }
    fetchData(searchText);

    return () => {
      ignore = true;
    };
  }, [currentCountry, searchText]);
  const originalWidth = 519;
  const originalHeight = 260;
  const aspectRatio = originalWidth / originalHeight;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {currentCountry.name !== null && (
          <View>
            <Text>Current Country</Text>
            <Text>{currentCountry.name}</Text>
            <Text>Accent Colour: {accentColors.DarkMuted}</Text>
            <Text>Flag: {currentCountry.flag}</Text>
            <View
              style={{
                width: windowWidth,
                aspectRatio,
                borderColor: 'black',
                borderWidth: 2,
              }}>
              <SvgCssUri uri={currentCountry.flag} svgWidth={windowWidth} />
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
