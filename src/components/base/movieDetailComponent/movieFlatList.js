import React from 'react'
import {ScrollView, Dimensions } from 'react-native'
import style from '../../../styles/light-theme'
import styles from '../../../styles/MovieList'
import ProgressBar from '../../customComponent/ProgressBar'
import { View, FlatList, Text } from 'react-native'
import CardItem from '../../customComponent/CardItem/CardItemHorizontal'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
const heightScreen = Dimensions.get('window').height
const movieFlatList = (props) => {
    const { isLoading, dataSource, retrieveNextPage, onMomentumScrollBegin } = props
    const { onShowDetails } = props
    console.log('dataSource', dataSource)
    const renderItem = (item, index) => {
         
        // to do 
        return (
            <CardItem
                info={item}
                onShowDetails={onShowDetails}
            />
        )
    }

    const renderSeparator = () => (

        <View style={styles.seperator} />
    )

    const renderFooter = () => {
        return (
            <View style={{ height: 50 , backgroundColor : 'transparent'}}>
                <ProgressBar />
            </View>
        )
    }
    return (
        isLoading ?
            <View style={styles.progressBar}><ProgressBar /></View>
            :
            <View style={{flex: 1, marginBottom : 20 }}>
            <Text style={{ textAlign :'left', justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 10 ,fontSize :30 }}> Similar Movie</Text>
                <FlatList
                    key={'dummy_key_' + Math.random(10)}
                    style={{
                        backgroundColor: style.screenBackgroundColor,
                        marginTop: 2,
                       //  flex: 1,
                       zIndex: 9999,
                         marginBottom:  10,
                        //paddingTop : 100,
                      //  minHeight: 500, minWidth: 200,
                        // position :'absolute',
                        
                    }}
                     horizontal
                    
                    shouldItemUpdate={(props, nextProps) => {
                        console.log('props', props, 'nextProps', nextProps)
                    return props.item !== nextProps.item

                    }}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                    disableVirtualization={false}
                    numColumns={1}
                    data={dataSource}
                    renderItem={renderItem}
                    ItemSeparatorComponent={renderSeparator}
                    onEndReached={retrieveNextPage}
                    removeClippedSubviews={true}
                    enableEmptySections={true}
                   // initialListSize={12}
                   // pageSize={12 * 3}
                    // initialNumToRender={100}
                  // ListFooterComponent={renderFooter}
                    onEndReachedThreshold={100}
                    extraData={dataSource.length}
                    keyExtractor={(item, index) => index}
                /> 
                </View>
    )
}

export default movieFlatList