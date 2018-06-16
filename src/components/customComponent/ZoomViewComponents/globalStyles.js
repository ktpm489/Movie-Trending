import { Dimensions, StyleSheet, Platform } from 'react-native'

const CORE_RATIO = 667 / 375
const MYWIDTH = Dimensions.get('window').width
const MYHEIGHT = Dimensions.get('window').height
const MYSCALE = CORE_RATIO / (MYHEIGHT / MYWIDTH)
const guidelineBaseWidth = 375
const guidelineBaseHeight = 667

export const width = num => MYWIDTH * (num / 100)
export const height = num => MYHEIGHT * (num / 100)
export const scale = (size) => MYWIDTH / guidelineBaseWidth * size
export const verticalScale = (size) => MYHEIGHT / guidelineBaseHeight * size
export const heightScale = num => MYHEIGHT * (num * MYSCALE / 100)
const ISIOS = Platform.OS === 'ios'

export const JBCFONT = {
    DEFAULT: ISIOS ? 'UTM-Avo' : 'utmAvo',
    DEFAULT_BOLD: ISIOS ? 'UTMAvoBold' : 'utmAvoBold',
    JAPAN: 'HiraKakuPro-W3'
}

export const JBCCOLOR = {
    DEFAULT: 'white',
    RED: '#d1191b',
    GREEN: '#42a711',
    BLACK: '#252525',
    GRAY: '#aeadad',
    YELLOW: '#ffba00'
}

export const txtDefault = {
    color: 'black',
    fontSize: width(4),
    backgroundColor: 'transparent',
    fontFamily: JBCFONT.DEFAULT,
    top: 0
}

export const txtJapan = {
    color: 'black',
    fontSize: width(4),
    backgroundColor: 'transparent',
    fontFamily: JBCFONT.JAPAN,
    top: ISIOS ? height(0.5) : 0
}

const styles = StyleSheet.create({
    backgroundDefault: {
        flex: 1,
        backgroundColor: JBCCOLOR.DEFAULT
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%'
    }
})

export default styles
