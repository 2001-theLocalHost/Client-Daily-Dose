import * as React from 'react';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class TabBarIcon extends React.Component {
  render() {
    const { icon, name, focused } = this.props;

    if (icon === 'ionicons') {
      return (
        <Ionicons
          name={name}
          size={30}
          style={{ marginBottom: -3, color: '#659B0E' }}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      );
    } else if (icon === 'materialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={name}
          size={30}
          style={{ marginBottom: -3, color: '#659B0E' }}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      );
    }
  }
}
