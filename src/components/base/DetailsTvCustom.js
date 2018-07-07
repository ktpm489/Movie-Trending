import React, { PureComponent, Component } from 'react';
import {
    ActivityIndicator,
    Button,
    ScrollView, StyleSheet,
    Text,
    View,
    FlatList,
    Linking,
    Platform,
    Dimensions
} from 'react-native';
import axios from 'axios'
import style, { marginTop } from '../../styles/light-theme'
import styles from '../../styles/MovieList'
import ProgressBar from '../customComponent/ProgressBar'
import CardItem from '../customComponent/CardItem/CardItemHorizontal'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import BackgroundImage from '../common/BackgroundImage';
import ShowOverview from '../common/ShowOverview';
import HorizontalImageList from '../common/ImageList';
import CastList from '../common/CastList'
import TrailerList from '../common/TrailerList';
import CastDetails from '../common/CastDetails';
import Constant from '../../utilities/constants'
import { getUriPopulated } from '../../utilities/utils';
// import MovieSimilar from './movieDetailComponent/tvFlatlist'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view'
const heightScreen = Dimensions.get('window').height
//SAVESTORE
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1,
            blur: 0,
            currentReviewPage: 1,
            reviewPageResults: [],
            isLoadingInfo: true,
            isLoadingReview: true,
            isLoadingSimilar: true,
            currentSimilarPage: 1,
            similarPageResults: [],
            onEndReachedCalledDuringMomentum: true

        };

    }

    // https://stackoverflow.com/questions/47910127/flatlist-calls-enendreached-when-its-rendered?rq=1
    componentDidMount() {
        console.error("Override!!");
    }

    getSpecialComponent() {
        console.error("Override!!");
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.details !== nextProps.details) {
            return true;
        }
        if (this.state.similarPageResults !== nextState.similarPageResults
            // this.state.currentSimilarPage !== nextState.currentSimilarPage 
        ) {
            return true;
        }
        return false;
    }


    fetchDetails = async (imagesUri, peopleUri, movieId) => {
        const { onDetailsFetched, currentTab, config } = this.props;

        await axios.get(imagesUri)
            .then(({ data }) => {
                const { images, videos } = data;
                data.images = getUriPopulated(images.backdrops, config, 'backdropSize');
                data.videos = this.formVideoUrls(videos.results)
                onDetailsFetched(data, 'imagesAndVideos', currentTab);
            }).catch((error) => { console.error(error.response); });

        await axios.get(peopleUri)
            .then(({ data }) => {
                const { crew, cast } = data;
                const people = {
                    'directors': getUriPopulated(crew.filter((member) =>
                        member.job === 'Director'), config, 'profileSize'),
                    'casts': getUriPopulated(cast.sort((a, b) => a.order - b.order), config, 'profileSize')
                }
                onDetailsFetched(people, 'directorsAndCast', currentTab);
            }).catch((error) => { console.error(error.response); });
        await this.retrieveSimilarMovieList()
    }

    /**
     * Forms video urls
     */
    formVideoUrls = (videos) => {
        const filteredVideos = videos.filter((video) => video.site === 'YouTube');
        return filteredVideos.map((video) => {
            return {
                name: video.name,
                url: `https://www.youtube.com/embed/${video.key}?&autoplay=1`
            };
        });
    }

    showCastDetails(cast) {
        this.props.onCastSelected(cast, this.props.currentTab);
    }

    playVideo(url) {
        // if (Platform.OS === 'ios') {
        this.props
            .navigation
            .navigate('VideoPlayer', { url });
        // } else if (Platform.OS === 'android') {
        //   Linking
        //     .openURL(url)
        //     .catch(err => console.error('An error occurred', err));
        // }
    }

    handleOnScroll = (e) => {
        const yOffset = e.nativeEvent.contentOffset.y;
        const blurConstant = 10;
        // If Y scroll position is more than detail poster then blur it
        if (yOffset > marginTop) {
            this.setState({
                opacity: 0,
                blur: blurConstant
            })
        } else {
            const opacity = 1 - (yOffset / marginTop);
            const blur = parseInt((yOffset * blurConstant) / marginTop, 10);
            this.setState({
                opacity,
                blur
            })
        }
    }

    retrieveSimilarMovieList = async () => {
        this.props.actions.retrieveTVSimilarDetails(this.props.details.id, this.state.currentSimilarPage).then(() => {
            console.log('Retrieve Similar TV list')
            this.setState({
                similarPageResults: this.props.similartv.results,
                isLoadingSimilar: false,
            })
        }).catch(error => { console.log('Retrive Similar TV list error', error) })
    }



    retrieveSimilarNextPage = async () => {


        await this.makeMoreRequest();


    }

    makeMoreRequest = async () => {

    
        //setTimeout( async () => {
        // if (!this.state.onEndReachedCalledDuringMomentum) {
         console.log('Read Next Page', this.state.currentSimilarPage, this.props.similartv.total_pages)
        this.setState({ currentSimilarPage: this.state.currentSimilarPage + 1 }, async () => {

            if (this.state.currentSimilarPage <= this.props.similartv.total_pages) {


                await axios.get(`${Constant.TMDB_URL}/tv/${this.props.details.id}/similar?api_key=${Constant.TMDB_API_KEY}&language=en-US&page=${this.state.currentSimilarPage}`).then(
                    (res) => {
                        const data = this.state.similarPageResults
                        const newData = res.data.results

                        console.log('New Data', newData[newData.length - 1].id, data[data.length - 1].id)
                        if (newData && newData[newData.length - 1] && newData[newData.length - 1].id && newData[newData.length - 1].id !== data[data.length - 1].id) {
                            newData.map((item, index) => data.push(item))
                            this.setState({
                                similarPageResults: data,
                                // currentPage: this.state.currentSimilarPage + 1
                            })
                        }
                    }
                ).catch((err) => { console.log('nextSimilar TV page', err) })
            }

        })


        // }
        // }, 1000)
    }

    onMomentumScrollBegin = () => {
        this.setState({ onEndReachedCalledDuringMomentum: false })
    }


    renderSeparator = () => (

        <View style={styles.seperator} />
    )

    renderFooter = () => {
        return (
            <View style={{ height: 50, backgroundColor: 'transparent' }}>
                <ProgressBar />
            </View>
        )
    }
    renderItem = (item, index) => {

        // to do 
        return (
            <CardItem
                info={item}
                onShowDetails={this.props.onShowDetails}
            />
        )
    }

    tvFlatlist = () => {
        console.log('dataSource', this.state.similarPageResults.length)

        return (
            this.state.isLoading ?
                <View style={styles.progressBar}><ProgressBar /></View>
                :
                <View style={{ flex: 1, marginBottom: 20 }}>
                    <Text style={{ textAlign: 'left', justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 10, fontSize: 20, color: 'gray' }}> Similar TV Shows</Text>
                    <OptimizedFlatList
                        key={'dummy_key_' + Math.random(10)}
                        style={{
                            backgroundColor: style.screenBackgroundColor,
                            marginTop: 2,
                            //  flex: 1,
                            zIndex: 9999,
                            marginBottom: 10,
                            //paddingTop : 100,
                            //  minHeight: 500, minWidth: 200,
                            // position :'absolute',

                        }}
                        horizontal

                        shouldItemUpdate={(props, nextProps) => {
                            console.log('props', props, 'nextProps', nextProps)
                            return props.item.id !== nextProps.item.id

                        }}
                        onMomentumScrollBegin={this.onMomentumScrollBegin}
                        //   disableVirtualization={false}
                        numColumns={1}
                        data={this.state.similarPageResults}
                        renderItem={this.renderItem}
                        // ItemSeparatorComponent={this.renderSeparator}
                        onEndReached={this.retrieveSimilarNextPage}
                        removeClippedSubviews={false}
                        //  enableEmptySections={true}
                        // initialListSize={120}
                        // pageSize={12 * 3}
                        initialNumToRender={100}
                        // ListFooterComponent={renderFooter}
                        onEndReachedThreshold={1200}
                        // extraData={this.state.similarPageResults}
                        keyExtractor={(item, index) => index}
                    />
                </View>
        )
    }

    render() {
        const {
            config: {
                image: { secureBaseUrl, posterSizeForBackground },
                style: { backdropSize }
            },
            details: {
                title, images, videos, release_date, casts, first_air_date, runtime,
                vote_average, overview, poster_path
            }
        } = this.props;
        const bgImage = `${secureBaseUrl}${posterSizeForBackground}/${poster_path}`;
        console.log('Render Details Movies')
        return (
            <View style={[{ flex: 1 }, style.screenBackgroundColor]}>
                <BackgroundImage
                    uri={bgImage}
                    opacity={this.state.opacity}
                    blur={this.state.blur} />
                <ScrollView>

                    { // TODO - Disabling onScroll blur. Need better solution
          /* onScroll={this.handleOnScroll} scrollEventThrottle={160} */}
                    <View style={style.detailsContainer}>
                        <Text style={[style.text, style.titleText]}>
                            {title}
                        </Text>

                        <ShowOverview
                            date={release_date || first_air_date || ''}
                            runtime={runtime || 100}
                            ratings={vote_average}
                        />

                        <Text style={[style.text, style.normalText]}>
                            {overview}
                        </Text>

                        <HorizontalImageList
                            title="Photos"
                            isNeedShowFull={true}
                            images={images || []}
                            style={backdropSize}
                        />

                        <TrailerList
                            videos={videos || []}
                            playVideo={this.playVideo.bind(this)}
                        />

                        {this.getSpecialComponent()}

                        <CastList
                            title="Cast"
                            items={casts || []}
                            onPress={this.showCastDetails.bind(this)}
                        />
                        {/* <MovieSimilar
              retrieveNextPage={this.retrieveSimilarNextPage}
              dataSource={this.state.similarPageResults}
              isLoading={this.isLoadingReview}
              onMomentumScrollBegin={this.onMomentumScrollBegin}
              onShowDetails={this.props.onShowDetails.bind(this)}
            /> */}
                        {this.tvFlatlist()}
                    </View>
                </ScrollView>
            </View>



        );
    }
}

export default Details;
