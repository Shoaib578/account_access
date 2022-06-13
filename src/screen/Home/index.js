import React from 'react'
import {View,Text, ActivityIndicator, TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base_url from '../../base_url'
import { ScrollView } from 'react-native-gesture-handler'
export default class Home extends React.Component {
    state = {
        is_loading:true,
        user:[]
    }
    getUser = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        console.log(parse)
        Axios.get(base_url+'/apis/get_user?id='+parse.id)
        .then(res=>{
            this.setState({user:res.data.user},()=>{
                this.setState({is_loading:false})
            })
        })
    }

    logout = ()=>{
        AsyncStorage.removeItem("user")
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        });
    }
    componentDidMount(){
        this.getUser()
    }
    render() {
        if(this.state.is_loading == false){

        return(
            <ScrollView style={{backgroundColor:"white",flex:1}}>
                <TouchableOpacity onPress={this.logout} style={{borderColor:"red",backgroundColor:"red",padding:5,width:80,justifyContent:'center',alignItems:"center",marginLeft:"78%",marginTop:20}}>
                    <Text style={{color:"white",fontWeight:"bold"}}>Logout</Text>
                </TouchableOpacity>
                <Image source={require("../../assets/logo.png")} style={{width:350,height:150,alignSelf:'center',marginTop:10}}/>

                <Text style={{color:'black',fontSize:18,fontFamily:'Cinzel-VariableFont_wght',textAlign:'center'}}>PRIVATPLATZIERUNGSPROGRAMM</Text>
                <Text style={{color:'black',fontSize:26,fontFamily:'Cinzel-VariableFont_wght',textAlign:'center'}}>SICHERER KUNDENZUGRIFF</Text>

                <View  style={styles.orderCard}>
    
                   
                      
                    <View style={{ marginLeft:Dimensions.get('window').width*2/40,marginTop:10 }}>

                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15,fontFamily:"Cinzel-VariableFont_wght" }}>KONTO-#</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold',fontFamily:"Cinzel-VariableFont_wght" }}>{this.state.user.account} </Text>
                   </View>

                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15,fontFamily:"Cinzel-VariableFont_wght" }}>VOLLSTÄNDIGE NAMEN</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold',fontFamily:"Cinzel-VariableFont_wght" }}>{this.state.user.name} </Text>
                   </View>
   
   
   
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15,fontFamily:"Cinzel-VariableFont_wght" }}>E-MAIL</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold',fontFamily:"Cinzel-VariableFont_wght" }}>{this.state.user.email} </Text>
                   </View>
   
                 
                   

                   


                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15,fontFamily:"Cinzel-VariableFont_wght" }}>ROUTING/IBAN/BIC/SWIFT</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.routing} </Text>
                   </View>

                    
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15,fontFamily:"Cinzel-VariableFont_wght" }}>TELEFON</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.phone_no} </Text>
                   </View>

                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15,fontFamily:"Cinzel-VariableFont_wght" }}>KONTOSTAND (IN CHF)</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.code} </Text>
                   </View>

                 
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15,fontFamily:"Cinzel-VariableFont_wght" }}>BEGÜNSTIGTE BANK</Text>
                   <Text style={{ fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.product_name} </Text>

                  
                   </View>



                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15,fontFamily:"Cinzel-VariableFont_wght" }}>ADRESSE</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.address} </Text>
                   </View>

                 </View>
                       
                    </View>
            </ScrollView>
        )
    }else{
        return <ActivityIndicator size="large" color="black" style={{alignSelf:"center"}}/>
    }

    }
}

const styles = StyleSheet.create({
    container:{
       flex:1,
        alignitems: 'center'
    },

    orderCard:{
        width:Dimensions.get('window').width*2/2.2,
        marginTop:20,
        borderRadius:10,
       
        borderWidth:1,
        alignSelf:'center',
        borderColor:"#193ed1",
        marginBottom:20,
        paddingBottom:10
    },

  

    productImage:{
        width:'100%',
        height:'100%',
        flex:1,
        alignItems:'flex-end'
    },

    status:{
        left:'75%',
        marginTop:5,
        backgroundColor:'orange',
        padding:3,
        borderRadius:10,
        position:'absolute'
    },

    statusText:{
        fontSize:16,
        fontWeight:'bold',
    },

    ProductInfo:{
        paddingLeft:'5%',
        paddingTop:'5%'
    },

    ProductTitle:{
        fontSize:18,
        fontWeight:'bold',
    },

    ProductPrice:{
        fontSize:18,
        marginTop:'1%',
        fontWeight:'bold',
    },

    OrderFrom:{
        fontSize:18,
        marginTop:'1%',
        fontWeight:'bold',
    },
    submit_btn:{
        
          borderWidth:1,
          borderColor:"green",
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'green',
          borderRadius:10,
          height:50,
          width:'100%',
          marginTop:20,
          
        }
})
