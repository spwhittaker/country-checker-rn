import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

export default function OtherNames({otherNames, accentColours}) {
  const styles = StyleSheet.create({
    container: {
      borderColor: accentColours.DarkMuted || 'black',
      borderWidth: 1,
      margin: 1,
      color: accentColours.DarkerMuted || 'black',
      justifyContent: 'center',
    },
    countryName: {
      color: accentColours.DarkerMuted || 'black',
      padding: 10,
    },
    otherNamesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      borderWidth: 1,
      padding: 10,
      alignSelf: 'center',
      justifySelf: 'center',
      flex: 1,
      flexGrow: 1,
      width: Dimensions.get('window').width * 0.3,
      height: Dimensions.get('window').width * 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: accentColours.Vibrant || 'black',
    },
  });

  return (
    <View style={styles.container}>
      <Text>Other Names</Text>
      <View>
        <Text style={styles.otherNamesContainer}>
          {otherNames.map((countryName, index) => (
            <View key={index} style={styles.box}>
              <View>
                <Text style={styles.countryName}>{countryName}</Text>
              </View>
            </View>
          ))}
        </Text>
      </View>
    </View>
  );
}
