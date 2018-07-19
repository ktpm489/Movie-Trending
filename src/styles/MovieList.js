import { Platform, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#8E8E8E'
    },
    progresssBar : {
        backgroundColor: '#8E8E8E',
         flex: 1,
         width: '100%',
         height : '100%',
         justifyContent: 'center',
         alignItems: 'center',
         alignSelf: 'center',
         paddingBottom: 20,
    },
    seperator : {
        marginTop : 10,
        backgroundColor: '#8E8E8E'
    }
})
export default styles