import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc'

export default function Cast({cast, navigation}) {
    let personName = 'Keanu Reevs';
    let characterName = 'John Wick'

    return(
        <View style={tw`my-6`}>
            <Text style={tw`text-white text-lg mx-4 mb-5`}>Top Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
                {
                    cast && cast.map((person, index) => {
                        return(
                            <TouchableOpacity key={index} style={tw`mr-4 items-center`} onPress={() => navigation.navigate('Person', person)}>
                                <View style={tw`overflow-hidden rounded-full h-20 w-20 items-center border-neutral-500`}>
                                    <Image style={tw`rounded-2xl h-24 w-20`} source={require('../assets/images/castImage1.png')} />
                                </View>
                                <Text style={tw`text-white text-xs mt-1`}>
                                    {characterName.length>10 ? characterName.slice(0,10)+'...' : characterName}
                                </Text>
                                <Text style={tw`text-neutral-400 text-xs mt-1`}>
                                    {personName.length>10 ? characterName.slice(0,10)+'...' : characterName}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}