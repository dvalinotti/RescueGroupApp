import React, { useState, useEffect } from 'react';
import Animated, { interpolate } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';

export default function HorizontalSlideTransition(props) {
  const { direction, offset, duration, delay } = props;
  const [toggled, setToggled] = useState(false);

  const transition = useTimingTransition(toggled, {
    duration,
  });
  const opacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0.0, 1.0],
  });
  const translateX = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [offset * (direction === 'right' ? -1 : 1), 0],
  });

  useEffect(() => {
    if (!toggled) {
      setTimeout(() => {
        setToggled(true);
      }, delay);
    }
  }, [toggled, setToggled, delay]);

  return (
    <Animated.View
      style={[
        {
          opacity,
        },
        {
          transform: [
            {
              translateX,
            },
          ],
        },
      ]}>
      {props.children}
    </Animated.View>
  );
}
