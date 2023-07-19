import { Text, View } from 'react-native';
import tw from 'twrnc'

export default function Cast({cast}) {
    return(
        <View style={tw`my-6`}>
            <Text style={tw`text-white text-lg mx-4 mb-5`}>Top Cast</Text>
        </View>
    )
}