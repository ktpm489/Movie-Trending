import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import EntryItem from '../rsscomponents/EntryItem'

const FeedList = (props) =>{
    const renderArticles = () => props.entries.map((item,index) => (
        <EntryItem key={index} entry={item} param={props.params} />
    ))

    return (
        <ScrollView style={styles.container}>
            {renderArticles()}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop :5
    }
})

export default FeedList