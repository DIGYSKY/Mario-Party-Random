import React, { Button, View } from 'react-native';
import { DisplayMap } from './Components/Map/DisplayMap';

import { Generale as S } from './Styles/Generale';

export function App() {

  return (
    <View
      style={S.container.flex}
    >
      <Button title="Choisir une carte" onPress={() => {
        console.log('Choisir une carte');
      }} />
    </View>
  )
}
