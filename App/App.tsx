import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Platform } from 'react-native';
import { DisplayMap } from './Components/Map/DisplayMap';
import { PrimaryButton } from './Components/Buttons/primary/Buttons';
import { Audio } from 'expo-av';

import { Generale as S } from './Styles/Generale';

export function App() {
  const [map, setMap] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function initSound() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      const { sound: audioSound } = await Audio.Sound.createAsync(
        require('../assets/musique/main.mp3'),
        {
          isLooping: true,
          volume: 0.5
        }
      );
      setSound(audioSound);
      if (Platform.OS !== 'web') {
        await audioSound.playAsync();
      }
    } catch (error) {
      console.error('Erreur audio:', error);
    }
  }

  useEffect(() => {
    initSound();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const handleChooseMap = async () => {
    // if (!map) {
    //   sound?.unloadAsync();
    // } else {
    //   initSound();
    // }
    setMap(!map);
  }

  return (
    <View style={S.container.flex}>
      {map ? (
        <DisplayMap handleChooseMap={handleChooseMap} />
      ) : (
        <ImageBackground
          source={require('../assets/background.webp')}
          style={S.container.flex}
        >
          <Image
            source={require('../assets/Super_Mario_Party_Jamboree_Logo.png')}
            resizeMode="contain"
            style={{ height: 200, width: 200 }}
          />
          <PrimaryButton text="Générer une carte" onPress={handleChooseMap} />
        </ImageBackground>
      )}
    </View>
  )
}
