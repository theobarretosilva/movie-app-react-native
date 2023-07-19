import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, View, SafeAreaView, TouchableOpacity, Dimensions, Text, Image } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc'
import Cast from '../components/cast';

var {width, height} = Dimensions.get('window');

export default function MovieScreen() {
  let movieName = 'Ant-Man and the Wasp: Quantumia';
  const {params: item} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([1,2,3,4,5]);

  useEffect(() => {

  },[item])

  return(
    <View style={tw`flex-1 bg-neutral-900 `}>
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={tw`w-full`}>
          <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4 pt-12`}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius: 12, padding: 6, backgroundColor: '#eab308'}}>
              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
              <HeartIcon size="35" color={isFavourite ? "#eab308" : "white"} />
            </TouchableOpacity>
          </SafeAreaView>
          <View>
            <Image source={require('../assets/images/moviePoster2.png')} style={{width, height: height*0.55}} />
            <LinearGradient
              colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
              style={{width, height: height*0.40, position: "absolute", bottom: 0}}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        </View>
        <View style={{marginTop: -(height*0.09), gap: 12}}>
          <Text style={tw`text-white text-center text-3xl font-bold tracking-wider`}>{movieName}</Text>
          <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>Released • 2023 • 170 min</Text>
          <View style={tw`flex-row justify-center mx-4 space-x-2`}>
            <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>Action • </Text>
            <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>Thrill • </Text>
            <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>Comedy</Text>
          </View>
          <Text style={tw`text-neutral-400 mx-4 tracking-wide`}>
            Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.
          </Text>
        </View>
        <Cast cast={cast} />
      </ScrollView>
    </View>
  )
}