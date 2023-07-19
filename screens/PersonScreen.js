import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Text } from 'react-native';
import { Dimensions, ScrollView, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc'
import MovieList from '../components/movieList';

var {width, height} = Dimensions.get('window');

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1,2,3,4,5]);

    return(
      <View style={tw`flex-1 bg-neutral-900 `}>
        <ScrollView contentContainerStyle={{paddingBottom: 40}}>
          <SafeAreaView style={tw`z-20 w-full flex-row justify-between items-center px-4 my-3 mt-12 pb-3`}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius: 12, padding: 6, backgroundColor: '#eab308'}}>
              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
              <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>
          </SafeAreaView>
          <View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "center", shadowColor: 'gray', shadowRadius: 40, shadowOffset: {width: 0, height: 5}, shadowOpacity: 1}}>
              <View style={tw`items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500`}>
                <Image source={require('../assets/images/castImage2.png')} style={{height: height*0.43, width: width*0.74}} />
              </View>
            </View>
            <View style={tw`mt-6`}>
              <Text style={tw`text-3xl text-white font-bold text-center`}>
                Keanu Reevs
              </Text>
              <Text style={tw`text-base text-neutral-500 text-center`}>
                London, United Kingdom
              </Text>
            </View>
            <View style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
              <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                <Text style={tw`text-white font-semibold`}>Gender</Text>
                <Text style={tw`text-neutral-300 text-sm`}>Male</Text>
              </View>
              <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                <Text style={tw`text-white font-semibold`}>Birthday</Text>
                <Text style={tw`text-neutral-300 text-sm`}>1964-06-02</Text>
              </View>
              <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                <Text style={tw`text-white font-semibold`}>Know for</Text>
                <Text style={tw`text-neutral-300 text-sm`}>Acting</Text>
              </View>
              <View style={tw`px-2 items-center`}>
                <Text style={tw`text-white font-semibold`}>Popularity</Text>
                <Text style={tw`text-neutral-300 text-sm`}>64.23</Text>
              </View>
            </View>
            <View style={tw`my-6 mx-4 space-y-2`}>
              <Text style={tw`text-white text-lg`}>Biography</Text>
              <Text style={tw`text-neutral-400 tracking-wide`}>
                Keanu Charles Reeves is a Canadian actor. Reeves is known for his roles in Bill & Ted's Excellent Adventure, Speed, Point Break, and The Matrix franchise as Neo. He has collaborated with major directors such as Stephen Frears (in the 1988 period drama Dangerous Liaisons); Gus Van Sant (in the 1991 independent film My Own Private Idaho); and Bernardo Bertolucci (in the 1993 film Little Buddha). Referring to his 1991 film releases, The New York Times' critic, Janet Maslin, praised Reeves' versatility, saying that he "displays considerable discipline and range. He moves easily between the buttoned-down demeanor that suits a police procedural story and the loose-jointed manner of his comic roles." A repeated theme in roles he has portrayed is that of saving the world, including the characters of Ted Logan, Buddha, Neo, Johnny Mnemonic, John Constantine and Klaatu.
              </Text>
            </View>
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          </View>
        </ScrollView>
      </View>
      
    )
}