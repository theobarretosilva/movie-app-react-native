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
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'

const ios = Platform.OS == 'ios';

export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        // console.log("got trending movies: ", data);
        if(data && data.results) setTrending(data.results)
        setLoading(false)
    }

    const getUpComingMovies = async () => {
        const data = await fetchUpcomingMovies();
        // console.log("got up coming movies: ", data);
        if(data && data.results) setUpcoming(data.results)
        setLoading(false)
    }

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        // console.log("got top rated movies: ", data);
        if(data && data.results) setTopRated(data.results)
        setLoading(false)
    }

    useEffect(() => {
        getTrendingMovies();
        getUpComingMovies();
        getTopRatedMovies();
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
                        { trending.length>0 && <TrendingMovies data={trending} /> }
                        <MovieList title="Upcoming" data={upcoming} />
                        <MovieList title="Top Rated" data={topRated} />
                    </ScrollView>
                )
            }
        </View>
    )
}