import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const createStyleSheet = color =>
  StyleSheet.create({
    button: {
      backgroundColor: colors[color],
      paddingVertical: 8,
      paddingHorizontal: 24,
      borderRadius: 10,
      margin: 5,
      alignSelf: 'center',
      shadowColor: colors[`${color}Dark`],
      shadowOpacity: 0.8,
      shadowRadius: 0,
    },
    buttonLarge: {
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 10,
    },
    buttonIcon: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonTextLarge: {
      fontSize: 20,
    },
    buttonTextIcon: {
      fontSize: 12,
      textAlign: 'center',
      marginTop: 5,
    },
  });

class BaseButton extends Component {
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
    }, 30);
  }

  render() {
    const {
      title,
      onPress,
      color = 'primary',
      size = 'regular',
      icon,
    } = this.props;
    const { translateY, shadowOffsetHeight } = this.state;
    const styles = createStyleSheet(color);

    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <Animated.View
          style={[
            styles.button,
            size === 'large' && styles.buttonLarge,
            icon && styles.buttonIcon,
            {
              transform: [{ translateY }],
              shadowOffset: {
                width: 0,
                height: shadowOffsetHeight,
              },
            },
          ]}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {icon && <Ionicons name={icon} size={28} color={colors.white} />}
            <Text
              style={[
                styles.buttonText,
                size === 'large' && styles.buttonTextLarge,
                icon && styles.buttonTextIcon,
              ]}>
              {title}
            </Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default BaseButton;
