import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../Screens/Login";
import Home from "../Screens/Home";
import PickedPeople from "../Screens/components/Content/PickedPeople";
import PickedFilm from "../Screens/components/Content/PickedFilm";

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
                name="PickedPeople"
                component={PickedPeople}
            />
            <Screen
                name="PickedFilm"
                component={PickedFilm}
            />
        </Navigator>
    );
}