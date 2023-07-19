import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Dimensions, Text, SafeAreaView, View, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc'
import Loading from '../components/loading';

var {width, height} = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([1,2,3,4]);
    const [loading, setLoading] = useState(false);
    let movieName = 'Ant-Man and the Wasp: Quantumia';

    return(
        <View style={tw`bg-neutral-800 flex-1 pt-12`}>
            <SafeAreaView>
                <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
                    <TextInput placeholder='Search Movie' placeholderTextColor={'lightgray'} style={tw`pb-1 pl-6 flex-1 text-base font-semibold text-white`} />
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
                                                        <Image style={{width: width*0.44, height: height*0.3, borderRadius: 24}} source={require('../assets/images/moviePoster2.png')} />
                                                        <Text style={tw`text-neutral-300 ml-1 mt-1`}>
                                                            {
                                                                movieName.length>22 ? movieName.slice(0, 22)+'...' : movieName
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