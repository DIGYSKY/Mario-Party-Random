import { ImageBackground, Animated, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { RandomMap } from './RandomMap';
import * as Haptics from 'expo-haptics';

import { Maps, Map } from './Maps';

import { Generale as S } from '../../Styles/Generale';

export function DisplayMap() {
  const [randomMap, setRandomMap] = useState<Map | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const contentOpacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const totalMaps = 30;
    let mapsShown = 0;
    let currentDelay = 50;
    let intervalId: NodeJS.Timeout;

    const showNextMap = () => {
      const map = RandomMap();
      setRandomMap(Maps[map]);
      mapsShown++;

      if (mapsShown < totalMaps) {
        currentDelay = currentDelay * 1.07;
        intervalId = setTimeout(showNextMap, currentDelay);
      } else {
        setIsSpinning(false);
      }
    };

    intervalId = setTimeout(showNextMap, currentDelay);

    return () => {
      clearTimeout(intervalId);
    };
  }, []);

  useEffect(() => {
    if (randomMap && isSpinning && (Platform.OS === 'ios' || Platform.OS === 'android')) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [randomMap]);

  useEffect(() => {
    if (!isSpinning) {
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }
  }, [isSpinning]);

  return (
    <ImageBackground
      source={!isSpinning ? randomMap?.boardView : undefined}
      style={[
        S.container.flex
      ]}
    >
      <Animated.View
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
        <Animated.Image
          source={randomMap?.boardIcon}
          resizeMode="contain"
          style={{
            width: 200,
            height: 200,
            opacity: isSpinning ? 1 : contentOpacity
          }}
        />
        <Animated.Text style={[S.text.textHeight, S.text.center, { opacity: contentOpacity }]}>
          {randomMap?.description}
        </Animated.Text>
      </Animated.View>
    </ImageBackground>
  );
}