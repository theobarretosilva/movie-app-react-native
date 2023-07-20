import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, View, SafeAreaView, TouchableOpacity, Dimensions, Text, Image } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/movieList'
import tw from 'twrnc'
import Cast from '../components/cast';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function MovieScreen() {
  const {params: item} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if(data) setMovie(data);
    setLoading(false)
  }
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if(data && data.cast){
      setCast(data.cast);
    }
    setLoading(false)
  }
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if(data && data.results) setSimilarMovies(data.results)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  },[item])

  return(
    <View style={tw`flex-1 bg-neutral-900 `}>
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={tw`w-full`}>
          <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4 pt-12`}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius: 12, padding: 6, backgroundColor: '#eab308'}}>
              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
              <HeartIcon size="35" color={isFavourite ? "#eab308" : "white"} />
            </TouchableOpacity>
          </SafeAreaView>
          {
            loading ? (
              <Loading />
            ):(
              <View>
                <Image source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}} style={{width, height: height*0.55}} />
                <LinearGradient
                  colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                  style={{width, height: height*0.40, position: "absolute", bottom: 0}}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                />
              </View>
            )
          }
          
        </View>
        <View style={{marginTop: -(height*0.09), gap: 12}}>
          <Text style={tw`text-white text-center text-3xl font-bold`}>{movie?.title}</Text>
          {movie?.id ? (
            <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
              {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
            </Text>
          ) : null}
          <View style={tw`flex-row justify-center mx-4 space-x-2`}>
            {
              movie?.genres?.map((genre, index) => {
                let showDot = index+1 != movie.genres.length;
                return(
                  <Text key={index} style={tw`text-neutral-400 font-semibold text-base text-center`}>
                    {genre?.name} {showDot ? "• " : null}
                  </Text>
                )
              })
            }
          </View>
          <Text style={tw`text-neutral-400 mx-4`}>{movie?.overview}</Text>
        </View>
        <Cast navigation={navigation} cast={cast} />
        <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
      </ScrollView>
    </View>
  )
}