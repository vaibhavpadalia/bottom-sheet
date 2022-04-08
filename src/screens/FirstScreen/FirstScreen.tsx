import React, { useCallback, useRef } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { MAX_TRANSLATE_Y } from '../../styleConsts';
import { BottomSheetRefProps } from '../../types';

import { BottomSheet } from '../../components/BottomSheet';

export const FirstScreen: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const onPress = useCallback(() => {
    bottomSheetRef?.current?.scrollTo(MAX_TRANSLATE_Y);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={onPress} style={styles.buttonContainer}>
        <Text>{'Open bottomsheet'}</Text>
      </Pressable>
      <BottomSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2E8FF',
  },
  buttonContainer: {
    backgroundColor: 'cyan',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
  },
});
