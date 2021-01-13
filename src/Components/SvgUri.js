import {SvgUri} from 'react-native-svg';
import React from 'react';
import {View} from 'react-native';
export default (uri) => (
  <View style={{width: 200, height: 200}}>
    <SvgUri source={{uri: uri}} />
  </View>
);
