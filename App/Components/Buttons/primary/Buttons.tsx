import { TouchableOpacity, Text, StyleProp, ViewStyle, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Generale as S } from '../../../Styles/Generale';

export function PrimaryButton({ text, onPress, style }: { text: string, onPress: () => void, style?: StyleProp<ViewStyle> }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }}
      style={[
        S.button.primary,
        style
      ]}
    >
      <Text style={S.button.primaryText}>{text}</Text>
    </TouchableOpacity>
  )
}