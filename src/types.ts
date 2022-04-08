import { ImageSourcePropType } from 'react-native';

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
};

export type CardItems = {
  title: string;
  subTitle: string;
  imagePath: ImageSourcePropType;
  key: string;
};

export type RootStackList = {
  FirstScreen: undefined;
  SecondScreen: undefined;
};
