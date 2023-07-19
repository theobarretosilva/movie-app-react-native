import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, Platform, Text, TouchableOpacity, ScrollView } from "react-native";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import tw from 'twrnc'
import React, { useEffect, useState } from "react";
import { styles } from '../theme'
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTrendingMovies } from '../api/moviedb'

const ios = Platform.OS == 'ios';

export default function HomeScreen() {
    const [trending, setTrending] = useState([1, 2, 3]);
    const [upcoming, setUpcoming] = useState([1, 2, 3]);
    const [topRated, setTopRated] = useState([1, 2, 3]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        console.log("got trending movies: ", data)
    }

    useEffect(() => {
        getTrendingMovies();
    },[])

    return(
        <View style={tw`flex-1 bg-neutral-800 pt-12`}>
            <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-3`}>
                <StatusBar style="light" />
                <View style={tw`flex-row justify-between items-center mx-4`}>
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text style={tw`text-white text-3xl font-bold`}><Text style={styles.text}>M</Text>ovies</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ):(
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10}}>
                        <TrendingMovies data={trending} />
                        <MovieList title="Upcoming" data={upcoming} />
                        <MovieList title="Top Rated" data={topRated} />
                    </ScrollView>
                )
            }
            
        </View>
    )
}