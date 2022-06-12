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
            <ScrollView>
                <TouchableOpacity onPress={this.logout} style={{borderColor:"red",backgroundColor:"red",padding:5,width:80,justifyContent:'center',alignItems:"center",marginLeft:"78%",marginTop:20}}>
                    <Text style={{color:"white",fontWeight:"bold"}}>Logout</Text>
                </TouchableOpacity>
                <Image source={require("../../assets/logo.png")} style={{width:350,height:150,alignSelf:'center',marginTop:30}}/>


                <View  style={styles.orderCard}>
    
                   
                      
                    <View style={{ marginLeft:Dimensions.get('window').width*2/40,marginTop:10 }}>

                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Account</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.account} </Text>
                   </View>

                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Name</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.name} </Text>
                   </View>
   
   
   
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Email</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.email} </Text>
                   </View>
   
                 
                   

                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Account</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.account} </Text>
                   </View>


                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Routing</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.routing} </Text>
                   </View>

                    
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Phone Number</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.phone_no} </Text>
                   </View>

                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Code</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.code} </Text>
                   </View>

                 
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Product Name</Text>
                   <Text style={{ fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.user.product_name} </Text>

                  
                   </View>



                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Address</Text>
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
