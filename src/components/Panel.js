import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value(50),
    };
  }

  toggle() {
    let initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded,
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue,
      useNativeDriver: false,
    }).start();
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height,
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          this.state.expanded && styles.containerActive,
          this.props.isLast && styles.lastContainer,
          { height: this.state.animation },
        ]}>
        <TouchableHighlight
          style={[
            styles.button,
            this.props.isLast && !this.state.expanded && styles.lastContainer,
          ]}
          onPress={this.toggle.bind(this)}
          underlayColor="#f1f1f1">
          <View
            style={styles.titleContainer}
            onLayout={this._setMinHeight.bind(this)}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Ionicons
              name={`chevron-${this.state.expanded ? 'up' : 'down'}-outline`}
              size={25}
              color={colors.blue}
            />
          </View>
        </TouchableHighlight>

        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  containerActive: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  lastContainer: {
    borderBottomWidth: 0,
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    flex: 1,
    color: '#2a2f43',
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    paddingHorizontal: 15,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});

export default Panel;
