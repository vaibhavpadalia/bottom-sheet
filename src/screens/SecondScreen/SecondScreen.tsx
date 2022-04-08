import React, { useCallback } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export const SecondScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const onPress = useCallback(() => navigate('FirstScreen'), [navigate]);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={onPress} style={styles.buttonContainer}>
        <Text>{'Go Back'}</Text>
      </Pressable>
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
