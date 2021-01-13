import * as React from 'react';
import {SvgCssUri} from 'react-native-svg';

export default ({uri, svgWidth}) => (
  <SvgCssUri
    width={svgWidth}
    uri={`${uri}`} /* viewBox={`0 0 ${svgWidth} 300`} */
  />
);
