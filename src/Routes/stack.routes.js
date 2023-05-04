import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import Home from "../Screens/Home";

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
        </Navigator>
    );
}