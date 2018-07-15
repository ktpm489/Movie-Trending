import React, { Component } from 'react';
import { View, ScrollView, Text, Button ,TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { saveSettingsAction } from './../../Actions'
import { MovieDBListItem, TouchableListItem } from './../common/ListItem';
// import style from './../../styles/styles';
import style from './../../styles/light-theme';
import language from '../../Config/languagues'
import region from '../../Config/region'
import { cleartItem } from '../../utilities/globalFunction'
const appInfo = [
  {
    name: 'App Name',
    value: 'MovieDB'
  }, {
    name: 'App Version',
    value: '0.0.1'
  }
];

// const settings = [
//   {
//     name: 'Language',
//     values: ['IN-hi', 'US-en', 'UK-en']
//   }, {
//     name: 'Region',
//     values: ['IN', 'US', 'UK']
//   }, {
//     name: 'Theme',
//     values: ['Light', 'Dark']
//   }
// ]


const settings = [
  {
    name: 'Language',
    values: language
  }, {
    name: 'Region',
    values: region
  }
]

class Settings extends Component {

  onSettingsChange = (values) => {
    this.props.saveSettingsAction(values);
  }
  onPressSearchYoutube = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'YoutubeDetails'
    }))
  }
  onPressResetData  = async () => {
    await cleartItem()
  }
  render() {
    return (
      <View>
        <ScrollView style={{marginTop: 20,minHeight: 400}}>
          <Text style={[style.text, style.headingText]}>
            About
          </Text>
          {appInfo.map((info, index) => (
          <MovieDBListItem name={info.name} value={info.value} key={index}/>
          ))}

          <View style={{marginTop: 20}}>
            <Text style={[style.text, style.headingText]}>
              Language and Region
            </Text>

            {settings.map(({name, values}) => (<TouchableListItem
              key={name}
              name={name}
              onPress={() => {
              this.props.navigation.dispatch(NavigationActions.navigate({
                  routeName: 'SettingDetails',
                  params: {
                    name,
                    values,
                    onSelect: this.onSettingsChange
                  }
                }))
            }}/>))}
          </View>
          <TouchableOpacity style={{ backgroundColor: '#D9D9D9', padding :3 }}>
          <Text style={[style.text, style.headingText]} onPress={this.onPressResetData}>
              Reset Data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#D9D9D9', padding: 3, marginTop :6}}>
          <Text style={[style.text, style.headingText]} onPress={this.onPressSearchYoutube}>
              Search Youtube
            </Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, { saveSettingsAction })(Settings);
