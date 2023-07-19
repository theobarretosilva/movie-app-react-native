import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc'
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MovieList({title, data}) {
    let movieName = 'Ant-Man and the Wasp: Quantumia';
    const navigation = useNavigation();

    return(
      <View style={tw`mb-8 space-y-4`}>
        <View style={tw`mx-4 flex-row justify-between items-center`}>
            <Text style={tw`text-white text-xl`}>{title}</Text>
            <TouchableOpacity>
                <Text style={{color: '#eab308', fontSize: 18, lineHeight: 28}}>See all</Text>
            </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
            {   
                data.map((item, index) => {
                    return(
                        <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movie', item)}>
                            <View style={{marginTop: 16, marginRight: 16}}>
                                <Image source={require('../assets/images/moviePoster2.png')} style={{borderRadius: 24, width: 140, height: 230}} />
                                <Text style={tw`text-neutral-300 ml-1`}>
                                    {
                                        movieName.length>14 ? movieName.slice(0, 17)+'...' : movieName
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