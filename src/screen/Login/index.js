import React from 'react'
import {View,Text, ScrollView, TextInput,Dimensions, TouchableOpacity, ActivityIndicator,Image, Alert} from 'react-native'
import Axios from 'axios'
import base_url from '../../base_url'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default class Login extends React.Component {
    state={
        name:"",
        password:'',
        is_loading:false
    }

    login = ()=>{
        if(this.state.name.length<1 || this.state.password.length<1)
        {
            Alert.alert("Name and password is required")
            return false
        }
        this.setState({is_loading:true})
        let formData = new FormData()
        formData.append("name",this.state.name)
        formData.append("password",this.state.password)
       
        
        fetch(base_url+"/apis/login",{
            method:"POST",
            body:formData
        })
        .then(data=>data.json())
        .then((res)=>{
            
            if(res.msg == "success") {
                 AsyncStorage.setItem("user",JSON.stringify(res.user))
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                });
            }else{
                Alert.alert("Invalid Name or Password")
            }
            
            this.setState({is_loading:false})
        })
        .catch(err=>{
            Alert.alert(err.message)
            this.setState({is_loading:false})
        })
    }
render(){
    return(
        <ScrollView>
            <Image source={require("../../assets/logo.png")} style={{width:350,height:150,alignSelf:'center',marginTop:50}}/>
            <Text style={{color:'black',fontSize:18,fontFamily:'Cinzel-VariableFont_wght',textAlign:'center'}}>PRIVATPLATZIERUNGSPROGRAMM</Text>
             <Text style={{color:'black',fontSize:26,fontFamily:'Cinzel-VariableFont_wght',textAlign:'center'}}>SICHERER KUNDENZUGRIFF</Text>

        <TextInput placeholder='NUTZERNAME' value={this.state.name} placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#c9c9c9',borderWidth:.5,marginTop:50,padding:15,color:'white',backgroundColor:'#c9c9c9',fontSize:15,alignSelf:'center'}} onChangeText={(val)=>this.setState({name:val})}/>
        <TextInput placeholder='PASSWORT' secureTextEntry value={this.state.password} placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#c9c9c9',borderWidth:.5,marginTop:20,padding:15,color:'white',backgroundColor:'#c9c9c9',fontSize:15,alignSelf:"center"}} onChangeText={(val)=>this.setState({password:val})}/>


        <TouchableOpacity disabled={this.state.is_loading} onPress={this.login} style={{backgroundColor:'#165b93',flexDirection:'row',marginTop:30,borderColor:'#165b93',borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center',padding:10,width:'80%',alignSelf:'center'}}>
        {this.state.is_loading?<ActivityIndicator size="small" color="white" />:null}
        <Text style={{color:'white',fontWeight:'bold'}}>Login</Text>
        </TouchableOpacity>
        </ScrollView>
    )
}
}