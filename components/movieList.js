import { Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc'
import { styles } from '../theme';

export default function MovieList({title, data}) {
    return(
      <View style={tw`mb-8 spac-y-4`}>
        <View style={tw`mx-4 flex-row justify-between items-center`}>
            <Text style={tw`text-white text-xl`}>{title}</Text>
            <TouchableOpacity>
                <Text style={styles.text && tw`text-lg`}>See all</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
}