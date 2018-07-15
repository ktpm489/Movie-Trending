import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native'
class RssItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            url : this.props.url,
            title : '',
            description : '',
            link : '',
            entries : [],
            color : this.props.color,
            isLoading : true,
        }
    }

    componentDidMount() {
        const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        const { url } = this.props
        const linkData = parseUrl + url + '&api_key=af6isnmdfd8q9mc6p28emc094cw5hj56avozhfhq'
        fetch(linkData)
        .then (response => response.json())
        .then ((json)=> {
            if (json.status === 'ok'){
                console.log('json' , json)
                this.setState({
                    title : json.feed.title,
                    description : json.feed.description,
                    link : json.feed.link,
                    image: json.feed.image,
                    entries: json.items,
                    isLoading : false
                })
            } else {
                this.setState({
                    title: 'This RSS is not working at the moment',
                    link : url,
                    isLoading : false
                })
            }
        })
    }

    handlePress = () => {
        const { title, entries } = this.state
        console.log('param', this.props.param)
        this.props.param('feed',
            {
                title,
                entries
            }
        )
      //  this.props.navigator.push('feed', { title, entries })
     //   this.props.navigator.push('feed', { title, entries })
    }

  render() {
      const deleteData = this.props.hanleDelete
    return (
        <TouchableOpacity onPress={this.state.isLoading ? () => { } : this.handlePress} 
            onLongPress={()=> deleteData(this.props.url)}
        >
            <View style={[styles.rssContainer, { backgroundColor: this.props.color }]}>
                {this.state.isLoading ?
                    <ActivityIndicator color={'#FFF'} style={styles.activityIndicator} /> :
                    <View>
                        <Text style={styles.title} numberOfLines={2} >
                            {this.state.title}
                        </Text>

                        <Text style={styles.body} numberOfLines={3} >
                            {this.state.description}
                        </Text>

                        <Text style={styles.footer}>
                            {this.state.link}
                        </Text>
                    </View>
                }
            </View>
        
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
    rssContainer : {
        flexDirection: 'column',
        backgroundColor : 'transparent',
        padding : 10
    },
    title : {
        color :'#FFF',
        fontSize: 16,
        fontWeight: '600'
    },
    body : {
        color :'#FFF',
        fontSize :12,
        paddingTop :7
    },
    footer : {
        color :'#FFF',
        fontSize : 10,
        fontWeight : '500',
        paddingTop :7
    },
    activityIndicator : {
        padding : 15
    }
})

export default  withNavigation(RssItem)
