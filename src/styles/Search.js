import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: 'white'
    },
    textInput: {
        backgroundColor: '#8E8E8E',
        ...Platform.select({
            ios: {
                height: 30,
            },
            android: {
                height: 48
            }
        })
    },
    searchboxBorder: {
        borderRadius: 3,
        backgroundColor: '#8E8E8E',
        paddingHorizontal: 10,
        marginHorizontal: 14,
    },
    searchbox: {
       // backgroundColor: '#191919',
        paddingHorizontal: 22,
        paddingVertical: 2,
       // marginBottom: 16
    },
    seperator: {
        marginTop: 10,
        backgroundColor: '#8E8E8E'
    }
});

export default styles;
