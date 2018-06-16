import { StyleSheet, Platform } from 'react-native'
import { width, heightScale, verticalScale } from './globalStyles'
const ISIOS = Platform.OS === 'ios'
const topNavBarIOS = heightScale(ISIOS ? 3 : 0)
const heightNavBar = heightScale(ISIOS ? 11.5 : 8.5)
const styles = StyleSheet.create({
  mainHeaderContainer: {
    position: 'absolute',
    top: 0,
    paddingHorizontal: width(3),
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9998,
    opacity: 1,
    paddingTop: topNavBarIOS,
    height: heightNavBar
  },
  backBtn: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: width(14),
    paddingVertical: heightScale(2),
    top: verticalScale(1.3)
  },

  txtTitle: {
    color: '#FEFEFE',
    fontSize: width(6),
    lineHeight: ISIOS ? width(17) : width(7)
  },

  rightView: {
    width: width(14),
    alignItems: 'flex-end',
    opacity: 1
  },

  mainContainer: {
    flex: 1
  }

})

export default styles
