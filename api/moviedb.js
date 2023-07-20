import axios from "axios";

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjUyYWRiOGE3NjdhZGZkZmUyYjliNDRjMDBiMTU2MCIsInN1YiI6IjY0YjgzNjkyMjdkYjYxMDEzOTA4MTY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0RA3czyUykNX0g66iewPqjFDinbuzx80u4hYbaozu0';
const apiBaseUrl = 'https://api.themoviedb.org/3';

export const image500 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image342 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const image185 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w185'+posterPath : null;

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const personDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

const searchMoviesEndpoint = value => `${apiBaseUrl}/search/movie?query=${value}api_key=${apiKey}`;

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
}
export const fetchUpcomingMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios('https://api.themoviedb.org/3/movie/upcoming', options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
}
export const fetchTopRatedMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios('https://api.themoviedb.org/3/movie/top_rated', options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
}

export const fetchMovieDetails = async (id) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios(movieDetailsEndpoint(id), options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
}
export const fetchMovieCredits = async (id) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios(movieCreditsEndpoint(id), options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
}
export const fetchSimilarMovies = async (id) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios(similarMoviesEndpoint(id), options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
}

export const fetchPersonDetails = async (id) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios(personDetailsEndpoint(id), options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
}
export const fetchPersonMovies = async (id) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios(personMoviesEndpoint(id), options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
}

export const fetchSearchMovies = async (value) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios(`https://api.themoviedb.org/3/search/movie?query=${value}`, options)
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return{}
    }
}