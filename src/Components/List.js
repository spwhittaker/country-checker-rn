import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

export default function List({
  names,
  setCurrentCountry,
  countryData,
  currentCountry,
  setAccentColors,
}) {
  if (!names) {
    return (
      <View>
        <Text>Nothing to see here, please try another search.</Text>
      </View>
    );
  }
  return names.length > 0 ? (
    <View style={styles.list}>
      {names.map((name, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity
            style={styles.button}
            color="pink"
            title={`More info about ${name}`}
            onPress={(e) => {
              const newCountry = countryData.filter(
                (country) => country.name === name,
              );

              setCurrentCountry(newCountry[0]);
            }}>
            <Text style={styles.button}>More info</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  ) : (
    <View>
      <Text>Nothing to see here, please try another search.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: 90,
    margin: 5,
    height: 80,
    borderColor: 'black',
    borderWidth: 2,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flexGrow: 2,
    fontSize: 12,
    margin: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    fontSize: 10,
    color: 'white',
    backgroundColor: 'green',
    width: '100%',
  },
});
