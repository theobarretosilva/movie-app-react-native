import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import GenresScreen from "../screens/GenresScreen";
import AllMoviesScreen from "../screens/AllMoviesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
                <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
                <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
                <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
                <Stack.Screen name="Genres" options={{headerShown: false, presentation: "modal"}} component={GenresScreen} />
                <Stack.Screen name="AllMovies" options={{headerShown: false}} component={AllMoviesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}