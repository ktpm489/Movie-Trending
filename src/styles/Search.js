import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: 'white'
    },
    textInput: {
        backgroundColor: '#E3E2E3',
        paddingLeft :2,
        ...Platform.select({
            ios: {
                height: 30,
            },
            android: {
                height: 35
            }
        })
    },
    searchboxBorder: {
        borderRadius: 3,
        backgroundColor: '#E3E2E3',
        paddingHorizontal: 5,
        marginHorizontal: 14,
    },
    searchbox: {
       // backgroundColor: '#191919',
        paddingHorizontal: 10,
        paddingVertical: 2,
       // marginBottom: 16
    },
    seperator: {
        marginTop: 10,
        backgroundColor: '#8E8E8E'
    }
});

export default styles;
