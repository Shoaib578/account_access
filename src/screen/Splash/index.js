import React from 'react'
import {View,Text,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default class Splash extends React.Component {
    state = {
        is_logged_in: false,
    }
    isLoggedIn =async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)

        if(parse == null){
            this.setState({is_logged_in:false})
        }else{
            this.setState({is_logged_in:true})

        }


        if(this.state.is_logged_in){
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            });
        }else{
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "Login" }]
            });
        }
    }


componentDidMount(){
    setTimeout(() => {
        this.isLoggedIn()
    },500)
}
render() {
    return(
        <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
            <View style={{width: 353,height:150}} >
            <Image source={require('../../assets/logo.png')} style={{ width:'100%', height:'100%' }}/>
            <Text style={{color:'black',fontSize:18,fontFamily:'Cinzel-VariableFont_wght',textAlign:'center'}}>PRIVATPLATZIERUNGSPROGRAMM</Text>
             <Text style={{color:'black',fontSize:26,fontFamily:'Cinzel-VariableFont_wght',textAlign:'center'}}>SICHERER KUNDENZUGRIFF</Text>

            </View>
        </View>
    )
}

}
