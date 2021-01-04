import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// const tabBarHeight = Platform.select({
//   ios: 44,
//   android: 56,
//   default: 64,
// });


export default {
  gutter: 10,
  window: {
    width,
    height,
  },
  // tabBarHeight,
  isSmallDevice: width < 480,
};
