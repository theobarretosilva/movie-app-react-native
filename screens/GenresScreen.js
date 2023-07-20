import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc'
import { fetchMovieGenres } from '../api/moviedb';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

export default function GenresScreen() {
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState({});
    const navigation = useNavigation();

    const getMovieGenres = async () => {
        const data = await fetchMovieGenres();
        if(data && data.genres) setGenres(data.genres);
        setLoading(false);
    }

    useEffect(() => {
        getMovieGenres();
    },[])

    return(
      <View style={tw`flex-1 bg-neutral-800 pt-12`} >
        <View style={tw`flex-row mr-4 ml-4 justify-between`}>
            <Text style={tw`text-white text-2xl`}>Genres</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <XMarkIcon size="42" color="#eab308" />
            </TouchableOpacity>
        </View>
        <ScrollView style={tw`mt-5 ml-10`}>
            {
                loading ? (
                    <Loading />
                ):(
                    genres.map((genre, index) => {
                        return(
                            <TouchableOpacity key={index} style={tw`flex-row justify-between mb-6`} onPress={() => navigation.navigate('AllMovies', genre)}>
                                <Text style={tw`text-white text-xl`}>{genre.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                )
            }
        </ScrollView>
      </View>
    )
}