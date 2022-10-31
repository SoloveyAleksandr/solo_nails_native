import React, { Component, PropsWithChildren, FC, useRef } from 'react';
import { Animated, StyleSheet, I18nManager, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import { Swipeable, gestureHandlerRootHOC } from 'react-native-gesture-handler';

const AnimatedView = Animated.createAnimatedComponent(View);

interface IGmailStyleSwipeableRow {
  children: React.ReactNode
}

const GmailStyleSwipeableRow: FC<IGmailStyleSwipeableRow> = ({ children }) => {
  const renderLeftActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.leftAction} onPress={close}>
        {/* Change it to some icons */}
        <AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]} />
      </RectButton>
    );
  };
  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={close}>
        {/* Change it to some icons */}
        <AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]} />
      </RectButton>
    );
  };


  let swipeableRef: Swipeable;

  const updateRef = (ref: Swipeable) => {
    swipeableRef = ref;
  };

  const close = () => {
    if (swipeableRef) swipeableRef.close()
  }

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      leftThreshold={80}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
    backgroundColor: 'plum',
    height: 20,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default gestureHandlerRootHOC(GmailStyleSwipeableRow);