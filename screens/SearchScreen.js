import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Dimensions, Text, SafeAreaView, View, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc'
import Loading from '../components/loading';
import { debounce } from 'lodash';
import { fallbackMoviePoster, fetchSearchMovies, image185 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (value) => {
        if (value && value.length>2){
            setLoading(true);
            fetchSearchMovies(value)
                .then(data => {
                    setLoading(false)
                    console.log(data)
                    if(data && data.results) setResults(data.results);
                })
        } else {
            setLoading(false)
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    return(
        <View style={tw`bg-neutral-800 flex-1 pt-12 pb-17`}>
            <SafeAreaView>
                <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
                    <TextInput
                        onChangeText={handleTextDebounce}
                        placeholder='Search Movie'
                        placeholderTextColor={'lightgray'}
                        style={tw`pb-1 pl-6 flex-1 text-base font-semibold text-white`} 
                    />
                    <TouchableOpacity style={tw`rounded-full p-3 m-1 bg-neutral-500`} onPress={() => navigation.navigate('Home')}>
                        <XMarkIcon size="25" color="white" />
                    </TouchableOpacity>
                </View>
                {
                    loading ? (
                        <Loading />
                    ):(
                        results.length>0 ? (
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}} style={tw`space-y-3`}>
                                <Text style={tw`text-white font-semibold ml-1 pb-3`}>Results ({results.length})</Text>
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