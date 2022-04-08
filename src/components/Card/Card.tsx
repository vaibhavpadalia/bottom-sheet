import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import { CardItems } from '../../types';

export const Card = React.memo<CardItems>(({ title, subTitle, imagePath }) => {
  const { navigate } = useNavigation();
  const onPress = useCallback(() => navigate('SecondScreen'), [navigate]);
  return (
    <View>
      <Pressable style={styles.rowView} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image
            source={imagePath}
            resizeMode={'cover'}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subTitle}</Text>
        </View>
      </Pressable>
      <View style={styles.divider} />
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainerStyle: {
    marginTop: 20,
    marginVertical: 15,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  imageContainer: {
    alignSelf: 'center',
    marginRight: 10,
  },
  imageStyle: {
    height: 50,
    width: 50,
  },
  divider: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 15,
  },
  textContainer: {
    flexShrink: 1,
  },
  titleText: {
    ...Platform.select({
      android: { fontFamily: 'Manrope-Normal' },
      ios: { fontFamily: 'Manrope', fontWeight: 'normal' },
    }),
    color: 'black',
    fontSize: 18,
  },
  subtitleText: {
    ...Platform.select({
      android: { fontFamily: 'Manrope-Normal' },
      ios: { fontFamily: 'Manrope', fontWeight: 'normal' },
    }),
    color: 'grey',
    fontSize: 14,
  },
});
