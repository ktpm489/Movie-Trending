import React , {Component}  from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../../../utilities/constants'
import styles from './styles' 
const iconStar = <Icon name="md-star" size={16} color="#F5B642" />
import {CachedImage} from "react-native-img-cache";
class CardItem extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const { info, onShowDetails, isCustom } = this.props
    console.log('info', info)
        const pressItem =  ()=> onShowDetails(info.item)
        let stylesCustomCard = isCustom ? [{ backgroundColor: 'transparent' }, styles.card] : [styles.card]
        let stylesCustomCardContainer = isCustom ? [{backgroundColor : 'transparent'}, styles.cardContainer] : [styles.cardContainer]
        return (
            <View style={stylesCustomCardContainer}>
            <TouchableOpacity activeOpacity={0.9} onPress={pressItem} >
                <View style={stylesCustomCard}>
                   {/* <Image source={{ uri: `${Constant.api_img_url}/w185/${info.item.poster_path}`}} style={styles.cardImage} />  */}
                     <CachedImage source={{ uri: `${Constant.api_img_url}/w185/${info.item.poster_path}` }} style={styles.cardImage} mutable/> 
                    <View style={styles.cardDetails}>
                        <Text
                            style={styles.cardTitle}
                            numberOfLines={3}>
                            {info.item.original_title}
                        </Text>
                        <View style={styles.cardGenre}>
                            <Text style={styles.cardGenreItem}>{info.item.release_date}</Text>
                        </View>
                        <View style={styles.cardNumbers}>
                            <View style={styles.cardStar}>
                                {iconStar}
                                <Text style={styles.cardStarRatings}>{info.item.vote_average.toFixed(1)}</Text>
                            </View>
                            <Text style={styles.cardRunningHours} />
                        </View>
                        <Text style={styles.cardDescription} numberOfLines={3}>
                            {info.item.overview}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
}
export default CardItem
