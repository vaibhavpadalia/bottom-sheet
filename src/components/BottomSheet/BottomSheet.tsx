import React, { useCallback, useImperativeHandle } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { BottomSheetRefProps } from '../../types';
import { MAX_TRANSLATE_Y, height } from '../../styleConsts';
import { OPTION_LIST } from '../../consts';
import { Card } from '../Card';

export const BottomSheet = React.forwardRef<BottomSheetRefProps, {}>(
  ({}, ref) => {
    const translateY = useSharedValue(0);
    const previousPosition = useSharedValue({ y: 0 });

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        translateY.value = withSpring(destination, { damping: 40 });
      },
      [translateY],
    );

    useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);

    const captureGesture = Gesture.Pan()
      .onStart(() => {
        previousPosition.value = { y: translateY.value };
      })
      .onUpdate(event => {
        translateY.value = event.translationY + previousPosition.value.y;
        //responsible for setting max opening limit for bottom sheet
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        // responsible for minimum scroll to bounce top or bottom
        if (translateY.value > -height * 0.35) {
          scrollTo(0);
        } else if (translateY.value < -height * 0.45) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const dynamicStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <GestureDetector gesture={captureGesture}>
        <Animated.View style={[styles.container, dynamicStyles]}>
          <ScrollView style={styles.cardContainerStyle}>
            {OPTION_LIST.map(item => (
              <Card
                key={item.title}
                title={item.title}
                subTitle={item.subtitle}
                imagePath={item.url}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ededed',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: height,
    top: height,
    position: 'absolute',
    justifyContent: 'center',
  },
  cardContainerStyle: {
    flex: 1,
    marginTop: 20,
    marginVertical: 15,
  },
});
