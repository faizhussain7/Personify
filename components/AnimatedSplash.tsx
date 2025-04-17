import { useState } from 'react';
import { Animated, Dimensions, Platform } from 'react-native';
import BootSplash from 'react-native-bootsplash';

const useNativeDriver = Platform.OS !== 'web';

export const AnimatedBootSplash = ({ onAnimationEnd }: { onAnimationEnd: () => void }) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(1));
  const [rotate] = useState(() => new Animated.Value(0)); // in radians for rotation

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const { container, logo } = BootSplash.useHideAnimation({
    manifest: require('../assets/bootsplash/manifest.json'),
    logo: require('../assets/bootsplash/logo@1,5x.png'),
    animate: () => {
      const { height } = Dimensions.get('window');
      Animated.parallel([
        Animated.sequence([
          Animated.spring(translateY, {
            toValue: -50,
            useNativeDriver,
            speed: 12,
            bounciness: 14,
          }),
          Animated.spring(scale, {
            toValue: 1.1,
            useNativeDriver,
            speed: 14,
            bounciness: 8,
          }),
          Animated.timing(rotate, {
            toValue: 1,
            duration: 800,
            useNativeDriver,
          }),
          Animated.spring(translateY, {
            toValue: height,
            useNativeDriver,
            speed: 10,
            bounciness: 6,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver,
            delay: 200,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver,
            delay: 800,
          }),
        ]),
      ]).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View
      {...container}
      className="flex-1 items-center justify-center bg-secondary"
      style={[{ opacity }]}>
      <Animated.Image
        {...logo}
        className="h-32 w-32 rounded-2xl shadow-xl"
        style={[
          {
            transform: [{ translateY }, { scale }, { rotate: rotateInterpolate }],
          },
        ]}
      />
    </Animated.View>
  );
};
