import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import {
  useTransition,
  interpolateColor,
} from 'react-native-redash/lib/module/v1';
import { useState } from 'react';

const alpha = Math.PI; // 30deg
const UseTransition = () => {
  const [toggled, setToggled] = useState(false);
  // Transition helper function from react-native-redash
  const transition = useTransition(toggled, {
    duration: 500,
  });
  const colorTransition = useTransition(toggled, {
    duration: 750,
  });
  // Interpolate rotate value using transition helper function
  const rotate = interpolate(transition, {
    inputRange: [0, 1], // Range of possible state values
    outputRange: [0, alpha], // Range of translation values
  });
  const color = interpolateColor(colorTransition, {
    inputRange: [0, 1],
    outputRange: ['red', 'blue'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                rotate,
              },
            ],
          },
          {
            backgroundColor: color,
          },
        ]}>
        <Text>Hello</Text>
      </Animated.View>
      <Button
        title={toggled ? 'Reset' : 'start'}
        onPress={() => setToggled(prev => !prev)}
      />
    </View>
  );
};

const CIRCLE_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: 'tomato',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: '#000',
  },
});

export default UseTransition;
