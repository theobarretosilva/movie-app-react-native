import { Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Loading from '../components/loading';
import tw from 'twrnc'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchMoviesByGenre, image185 } from '../api/moviedb';
import { ArrowSmallLeftIcon } from 'react-native-heroicons/outline';

var {width, height} = Dimensions.get('window');

export default function AllMoviesScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([])
    const {params: item} = useRoute();

    const getMoviesByGenre = async (id) => {
        const data = await fetchMoviesByGenre(id);
        if(data) setResults(data.results)
        setLoading(false)
    }

    useEffect(() => {
        getMoviesByGenre(item.id);
    },[])

    return(
      <View style={tw`bg-neutral-800 flex-1 pt-12 pb-17`}>
        <View style={tw`flex-row  items-center justify-between ml-3 mb-4 mr-5`}>
           <TouchableOpacity onPress={() => navigation.navigate('Genres')}>
                <ArrowSmallLeftIcon size="35" strokeWidth={2} color="#eab308" />
            </TouchableOpacity>
            <Text style={tw`text-white text-xl`}>{item.name}</Text> 
        </View>
        <SafeAreaView>
            {
                loading ? (
                    <Loading />
                ):(
                    results.length>0 ? (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
                            <View style={tw`flex-row justify-between flex-wrap`}>
                                {
                                    results.map((item, index) => {
                                        return(
                                            <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                                                <View style={tw`mb-4`}>
                                                    <Image style={{width: width*0.44, height: height*0.3, borderRadius: 24}} source={{uri: image185(item.poster_path) || fallbackMoviePoster}} />
                                                    <Text style={tw`text-neutral-300 ml-1 mt-1`}>
                                                        {
                                                            item.title.length>22 ? item.title.slice(0, 22)+'...' : item.title
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ):(
                        <View style={tw`flex-row justify-center`}>
                            <Image source={require('../assets/images/movieTime.png')} style={tw`h-96 w-96`} />
                        </View>
                    )
                )
            }
        </SafeAreaView>
      </View>
    )
}