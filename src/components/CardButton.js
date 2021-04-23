import { DefaultTheme } from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Card from './Card';

const createStyleSheet = colors =>
  StyleSheet.create({
    card: {
      flex: 1,
      margin: 10,
      backgroundColor: colors.card,
      shadowColor: '#00000066',
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.4,
      shadowRadius: 0.5,
      elevation: 8,
    },
    cardContent: {
      overflow: 'hidden',
      borderRadius: 10,
    },
  });

class CardButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(0),
      shadowOffsetHeight: new Animated.Value(5),
    };

    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
  }

  onPressIn() {
    Animated.parallel([
      Animated.timing(this.state.translateY, {
        toValue: 3,
        duration: 80,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.shadowOffsetHeight, {
        toValue: 2,
        duration: 80,
        useNativeDriver: false,
      }),
    ]).start();
  }

  onPressOut() {
    Animated.parallel([
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 125,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.shadowOffsetHeight, {
        toValue: 5,
        duration: 125,
        useNativeDriver: false,
      }),
    ]).start();
    setTimeout(() => {
      this.props.onPress();
    }, 75);
  }

  render() {
    const theme = DefaultTheme;
    const styles = createStyleSheet(theme.colors);
    const { translateY, shadowOffsetHeight } = this.state;

    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ translateY }],
              shadowOffset: {
                width: 0,
                height: shadowOffsetHeight,
              },
            },
          ]}>
          <Card>{this.props.children}</Card>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CardButton;
