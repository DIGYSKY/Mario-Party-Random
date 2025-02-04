import { ImageBackground, Animated, Platform, Image, View } from 'react-native';
import { useState, useEffect } from 'react';
import { RandomMap } from './RandomMap';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

import { Maps, Map } from './Maps';

import { PrimaryButton } from '../Buttons/primary/Buttons';

import { Generale as S } from '../../Styles/Generale';

export function DisplayMap({ handleChooseMap }: { handleChooseMap: () => void }) {
  const [randomMap, setRandomMap] = useState<Map | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const contentOpacity = useState(new Animated.Value(0))[0];
  const spinValue = useState(new Animated.Value(1))[0];
  const [soundLoad, setSoundLoad] = useState<Audio.Sound | null>(null);

  async function initSoundLoad() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      const { sound: audioSound } = await Audio.Sound.createAsync(
        require('../../../assets/musique/roullette_cub.mp3'),
        { isLooping: true }
      );
      setSoundLoad(audioSound);
      if (Platform.OS !== 'web') {
        await audioSound.playAsync();
      }
    } catch (error) {
      console.error('Erreur audio:', error);
    }
  }

  useEffect(() => {
    initSoundLoad();

    return () => {
      soundLoad?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    const totalMaps = 17;
    let mapsShown = 0;
    let currentDelay = 100;
    let timeoutId: NodeJS.Timeout;
    let isAnimating = true;

    const showNextMap = () => {
      if (!isAnimating) return;

      const map = RandomMap();
      requestAnimationFrame(() => {
        setRandomMap(Maps[map]);

        if (Platform.OS === 'ios' || Platform.OS === 'android') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      });

      mapsShown++;

      if (mapsShown < totalMaps) {
        currentDelay = currentDelay * 1.1;
        timeoutId = setTimeout(showNextMap, currentDelay);
      } else {
        setIsSpinning(false);
      }
    };

    timeoutId = setTimeout(showNextMap, currentDelay);

    return () => {
      isAnimating = false;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isSpinning) {
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: Platform.OS !== 'web',
        })
      ]).start();

      soundLoad?.unloadAsync();
    }
  }, [isSpinning]);

  return (
    <ImageBackground
      source={!isSpinning ? randomMap?.boardView : require('../../../assets/bg_load.jpeg')}
      style={[S.container.flex]}
    >
      <View
        style={[
          S.container.flex,
          {
            paddingHorizontal: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }
        ]}
      >
        <Animated.Text style={[S.text.h1, S.text.center, { opacity: contentOpacity }]}>
          {randomMap?.name}
        </Animated.Text>
        {randomMap && (
          <Image
            source={randomMap.boardIcon}
            resizeMode="contain"
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
        <Animated.Text style={[S.text.textHeight, S.text.center, { opacity: contentOpacity }]}>
          {randomMap?.description}
        </Animated.Text>
        <PrimaryButton text="Retour" onPress={handleChooseMap} style={
          {
            opacity: contentOpacity,
            marginVertical: 20
          }
        } />
      </View>
    </ImageBackground>
  );
}