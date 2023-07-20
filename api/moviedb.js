import axios from "axios";
import { useState } from "react";

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjUyYWRiOGE3NjdhZGZkZmUyYjliNDRjMDBiMTU2MCIsInN1YiI6IjY0YjgzNjkyMjdkYjYxMDEzOTA4MTY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0RA3czyUykNX0g66iewPqjFDinbuzx80u4hYbaozu0';
const apiBaseUrl = 'https://api.themoviedb.org/3';

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

export const image500 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image342 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const image185 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w185'+posterPath : null;

const apiCall = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios('https://api.themoviedb.org/3/trending/movie/day', options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
}

export const fetchTrendingMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios('https://api.themoviedb.org/3/trending/movie/day', options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
    return response;
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}