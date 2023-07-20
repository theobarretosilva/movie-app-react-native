import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc'
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';

export default function MovieList({title, data}) {
    const navigation = useNavigation();

    return(
      <View style={tw`mb-8`}>
        <View style={tw`mx-4 flex-row justify-between items-center`}>
            <Text style={tw`text-white text-xl`}>{title}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
            {   
                data.map((item, index) => {
                    return(
                        <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                            <View style={{marginTop: 16, marginRight: 16}}>
                                <Image source={{uri: image185(item.poster_path) || fallbackMoviePoster}} style={{borderRadius: 24, width: 140, height: 230}} />
                                <Text style={tw`text-neutral-300 ml-1`}>
                                    {
                                        item.title.length>14 ? item.title.slice(0, 17)+'...' : item.title
                                    }
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </ScrollView>
      </View>
    )
}