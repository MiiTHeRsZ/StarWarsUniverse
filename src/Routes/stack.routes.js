import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../Screens/Login";
import Home from "../Screens/Home";
import PickedFilm from "../Screens/components/Content/PickedFilm";
import PickedPeople from "../Screens/components/Content/PickedPeople";
import PickedPlanet from "../Screens/components/Content/PickedPlanet";
import PickedSpecie from "../Screens/components/Content/PickedSpecie";
import PickedStarship from "../Screens/components/Content/PickedStarship";
import PickedVehicle from "../Screens/components/Content/PickedVehicle";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="Login"
                component={Login}
            />
            <Screen
                name="Home"
                component={Home}
            />
            <Screen
                name="PickedFilm"
                component={PickedFilm}
            />
            <Screen
                name="PickedPeople"
                component={PickedPeople}
            />
            <Screen
                name="PickedPlanet"
                component={PickedPlanet}
            />
            <Screen
                name="PickedSpecie"
                component={PickedSpecie}
            />
            <Screen
                name="PickedStarship"
                component={PickedStarship}
            />
            <Screen
                name="PickedVehicle"
                component={PickedVehicle}
            />
        </Navigator>
    );
}