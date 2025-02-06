import { ImageBackground, Animated, Platform, Image, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

import { Maps, Map } from './Maps';

import { PrimaryButton } from '../Buttons/primary/Buttons';

import { Generale as S } from '../../Styles/Generale';

export function DisplayMap({ handleChooseMap }: { handleChooseMap: () => void }) {
  const [randomMap, setRandomMap] = useState<Map | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [contentOpacity, setContentOpacity] = useState(new Animated.Value(0));
  const [spinValue, setSpinValue] = useState(new Animated.Value(1));
  const [soundLoad, setSoundLoad] = useState<Audio.Sound | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  const handleReload = () => {
    setReload(!reload);
    setIsSpinning(true);
    setContentOpacity(new Animated.Value(0));
    setSpinValue(new Animated.Value(1));
    setRandomMap(null);
    setSoundLoad(null);
  }

  async function initSoundLoad() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      const { sound: audioSound } = await Audio.Sound.createAsync(
        require('../../../assets/musique/roullette_cub.mp3'),
        { isLooping: false }
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
  }, [reload]);

  useEffect(() => {
    const totalMaps = 20;
    let mapsShown = 0;
    let currentDelay = 170;
    let intervalId: ReturnType<typeof setInterval>;
    let isAnimating = true;
    let map = 0;

    const showNextMap = () => {
      if (!isAnimating || mapsShown >= totalMaps) {
        clearInterval(intervalId);
        setIsSpinning(false);
        return;
      }
      let nextMap = Math.floor(Math.random() * Maps.length);
      while (nextMap === map) {
        nextMap = Math.floor(Math.random() * Maps.length);
      }
      map = nextMap;
      requestAnimationFrame(() => {
        setRandomMap(Maps[map]);

        if (Platform.OS === 'ios' || Platform.OS === 'android') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      });

      mapsShown++;
    };

    intervalId = setInterval(showNextMap, currentDelay);

    return () => {
      isAnimating = false;
      clearInterval(intervalId);
    };
  }, [reload]);

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

      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    }
  }, [isSpinning, reload]);

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
        <Animated.View style={{ opacity: contentOpacity }}>
          <PrimaryButton text="Recommencer" onPress={handleReload} style={
            {
              marginVertical: 20
            }
          } />
        </Animated.View>
        <Animated.View style={{ opacity: contentOpacity }}>
          <PrimaryButton text="Retour" onPress={handleChooseMap} style={
            {
              marginVertical: 10
            }
          } />
        </Animated.View>
      </View>
    </ImageBackground>
  );
}