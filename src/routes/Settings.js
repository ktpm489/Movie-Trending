import {StackNavigator} from 'react-navigation'

import Settings from './../components/settings/Settings'
import SettingDetails from './../components/settings/SettingsDetail'
import YoutubeDetails from '../ScreenNew/YoutubeView/YoutubeView'
import {StackNavHeaderStyles, headerBackgroundColor} from '../styles/light-theme'

const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
      ...StackNavHeaderStyles
    }
  },
  SettingDetails: {
    screen: SettingDetails,
    navigationOptions: ({
      navigation: {
        state: {
          params
        }
      }
    }) => ({
      title: `Choose ${params.name}`,
      ...StackNavHeaderStyles
    })
  },
  YoutubeDetails: {
    screen: YoutubeDetails,
    navigationOptions: {
      title: 'Youtube Screen',
      ...StackNavHeaderStyles
    }
  },
}, {
  headerMode: 'float',
  cardStyle: {
    backgroundColor: headerBackgroundColor
  }
})

export default SettingsStack
