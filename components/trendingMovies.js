import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from "react-native";
import tw from 'twrnc'
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";

var {width, heigth} = Dimensions.get('window');

export default function TrendingMovies({data}) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    };
    
    return(
        <View style={tw`mb-8`}>
            <Text style={tw`text-white text-xl mx-4 mb-5`}>Trending Movies</Text>
            <Carousel
                data={data}
                renderItem={({item}) => <MovieCard item={item} handleClick={() => handleClick(item)} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width*0.62}
                slideStyle={{display: 'flex', alignItems: 'center'}}
            />
        </View>
    )
}

const MovieCard = ({item, handleClick}) => {
    return(
        <TouchableWithoutFeedback onPress={handleClick}>
            <Image source={require('../assets/images/moviePoster1.png')} style={{width: 235, height: 370, borderRadius: 24}} />
        </TouchableWithoutFeedback>
    )
}