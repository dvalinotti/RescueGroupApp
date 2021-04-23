import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Card from './Card';
import Panel from './Panel';
import { colors } from '../styles';
import InfoRow from './InfoRow';

const shadowStyles = {
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 3,
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listItem: {
    marginHorizontal: 0,
  },
  listItemButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: 'relative',
    zIndex: 5,
  },
  itemInactive: {
    backgroundColor: 'rgba(0, 0, 0, 0.033)',
  },
  itemActive: {
    ...shadowStyles,
    zIndex: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    backgroundColor: colors.white,
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  listItemContent: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
});

export default function CollapsibleList(props) {
  const { items } = props;
  return (
    <Card>
      <View style={styles.listContainer}>
        {items.map((item, index) => (
          <Panel
            key={index}
            title={item.title}
            isLast={index === items.length - 1}>
            {item.content}
          </Panel>
        ))}
      </View>
    </Card>
  );
}
