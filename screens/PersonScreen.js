import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { Dimensions, ScrollView, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc'
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function PersonScreen() {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if(data) setPerson(data);
    setLoading(false);

  }
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if(data && data.cast) setPersonMovies(data.cast)
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id)
  },[item])

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
        {
          loading ? (
            <Loading />
          ):(
            <View>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "center", shadowColor: 'gray', shadowRadius: 40, shadowOffset: {width: 0, height: 5}, shadowOpacity: 1}}>
                <View style={tw`items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500`}>
                  <Image source={{uri: image342(person?.profile_path) || fallbackPersonImage}} style={{height: height*0.43, width: width*0.74}} />
                </View>
              </View>
              <View style={tw`mt-6`}>
                <Text style={tw`text-3xl text-white font-bold text-center`}>
                  {person?.name}
                </Text>
                <Text style={tw`text-base text-neutral-500 text-center`}>
                  {person?.place_of_birth}
                </Text>
              </View>
              <View style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
                <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                  <Text style={tw`text-white font-semibold`}>Gender</Text>
                  <Text style={tw`text-neutral-300 text-sm`}>
                    {person?.gender==1 ? 'Female' : 'Male'}
                  </Text>
                </View>
                <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                  <Text style={tw`text-white font-semibold`}>Birthday</Text>
                  <Text style={tw`text-neutral-300 text-sm`}>{person?.birthday}</Text>
                </View>
                <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                  <Text style={tw`text-white font-semibold`}>Known for</Text>
                  <Text style={tw`text-neutral-300 text-sm`}>{person?.known_for_department}</Text>
                </View>
                <View style={tw`px-2 items-center`}>
                  <Text style={tw`text-white font-semibold`}>Popularity</Text>
                  <Text style={tw`text-neutral-300 text-sm`}>{person?.popularity?.toFixed(2)} %</Text>
                </View>
              </View>
              <View style={tw`my-6 mx-4`}>
                <Text style={tw`text-white text-lg`}>Biography</Text>
                <Text style={tw`text-neutral-400`}>
                  {person?.biography || 'N/A'}
                </Text>
              </View>
              <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
            </View>
          )
        }
      </ScrollView>
    </View>
    
  )
}