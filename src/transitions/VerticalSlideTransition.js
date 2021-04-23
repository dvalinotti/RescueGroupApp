import React, { useState, useEffect } from 'react';
import Animated, { interpolate } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';

export default function VerticalSlideTransition(props) {
  const { offset, duration, delay } = props;
  const [toggled, setToggled] = useState(false);

  const transition = useTimingTransition(toggled, {
    duration,
  });
  const opacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0.0, 1.0],
  });
  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [offset, 0],
  });

  useEffect(() => {
    setTimeout(() => {
      setToggled(true);
    }, delay);
  }, [setToggled, delay]);

  return (
    <Animated.View
      style={[
        {
          opacity,
        },
        {
          transform: [
            {
              translateY,
            },
          ],
        },
      ]}>
      {props.children}
    </Animated.View>
  );
}
