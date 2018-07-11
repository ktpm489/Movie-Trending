import React, { Component } from 'react'
import {View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { fetchSettingsAction } from './../../Actions'
import {TouchableListItem} from './../common/ListItem'
import style from './../../styles/styles'
import { width } from '../customComponent/ZoomViewComponents/globalStyles'
class SettingDetails extends Component {

  componentDidMount() {
    this.props.fetchSettingsAction();
  }

  _changeSettings = (key, value) => {
    let changes = {};
    changes[key] = value;
    this.props.navigation.state.params.onSelect(Object.assign({}, this.props.settings, changes));
  }
  calculateRenderLanguageItem = (values, name, selected) => (
    <ScrollView style={{ marginBottom: width(5) }}>
        {values.map((value) => {
          return (
            <TouchableListItem
              key={value.iso_639_1}
              name={value.english_name}
              value={value.iso_639_1}
              selected={selected}
              onPress={() => { this._changeSettings(name.toLowerCase(), value.iso_639_1) }}
            />)
        })}
        </ScrollView>
  )

  calculateRenderRegionItem = (values, name,selected) => (
    <ScrollView style={{ marginBottom: width(5) }}>
      {values.map((value) => {
        return (
         <TouchableListItem
            key={value.alpha_2}
            name={value.name}
            value={value.alpha_2}
            selected={selected}
            onPress={() => { this._changeSettings(name.toLowerCase(), value.alpha_2) }}
          />)
      })}
    </ScrollView>
  )
    

  render() {
    const {name, values} = this.props.navigation.state.params;
    const selected = this.props.settings[name.toLowerCase()];
    console.log('Values', values, selected, name)
    const renderItem = name.toLowerCase() === 'region' ? this.calculateRenderRegionItem(values, name, selected) : this.calculateRenderLanguageItem(values, name,selected)
    return (
      <View>
        <Text style={[style.Text, style.subHeading, style.settingDetailsTitle]}>
          {name}
          Settings
        </Text>
        {renderItem}
      </View>
    )
  }
}

function mapStateToProps({settings}) {
  return {settings}
}

export default connect(mapStateToProps, {fetchSettingsAction})(SettingDetails);
