import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Login';
import Home from '../screen/Home';
import Splash from '../screen/Splash';

const Stack = createNativeStackNavigator();

export default class Routes extends React.Component {
render() {
    return(
        <NavigationContainer>
            <Stack.Navigator  initialRouteName='splash'>
            <Stack.Screen name="splash" component={Splash} options={{ headerShown:false }}/>

                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>

                <Stack.Screen name="Home" component={Home} options={{title:"Account Details",headerTitleAlign:"center",headerTitleStyle:{fontFamily:"Cinzel-VariableFont_wght"}}}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

}