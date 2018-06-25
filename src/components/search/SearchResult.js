import React from 'react'
import { View, ScrollView, TouchableOpacity, FlatList} from 'react-native'

import PopularSearch from './../search/PopularSearch';
import style from '../../styles/light-theme'
import SearchItem from './SearchItem'
import ProgressBar from '../customComponent/ProgressBar'
const SearchResult = ({ items, popular, config, onSelect, onSelectPopular, retrieveNextPage }) => {
  
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => { onSelect(item.item) }}>
        <SearchItem item={item.item} config={config} />
      </TouchableOpacity>
    )
  }
  const renderFooter = () => {
    return (
      <View style={{ height: 50 }}>
        <ProgressBar />
      </View>
    )
  }
  
  return (
    <View>
      {items.length > 0 ?  
       <FlatList
        key={'dummy_key_' + items.length}
        style={[
          style.searchResult,
         { marginTop: 2}
        ]}
        numColumns={1}
        data={items}
        renderItem={renderItem}
       // removeClippedSubviews={false}
       // initialNumToRender={50}
        // ItemSeparatorComponent={this.renderSeparator}
       // ListFooterComponent={renderFooter}
        onEndReached={retrieveNextPage}
       // maxToRenderPerBatch={50}
        onEndReachedThreshold={120}
        keyExtractor={(item, index) => index}
      /> : 
        <ScrollView style={style.searchResult}>
          <PopularSearch data={popular} onSelect={onSelectPopular} />
        </ScrollView> 
      }
    </View>
  )
}

export default SearchResult
