import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, View, SafeAreaView, TouchableOpacity, Dimensions, Text, Image } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc'

var {width, height} = Dimensions.get('window');

export default function MovieScreen() {
  const {params: item} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {

  },[item])

  return(
    <View style={tw`flex-1 bg-neutral-900 pt-12`}>
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={tw`w-full`}>
          <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4`}>
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
      </ScrollView>
    </View>
  )
}