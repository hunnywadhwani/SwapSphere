import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,Image
} from 'react-native';

//flexDirection: "column" vertical , justifyContent: vertically, alignItems:horizontally
//flexDirection:"row", horizontal, justifyContent: horizontally, alignItems:vertically
export default class GetStarted extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/Login.png')}>
          <View
            style={{
              padding: 10,
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderTopWidth: 10,
              borderColor: '#1f3f81',
            }}>
            <Image source={require("../assets/applogo.png")} style={{width:90, height:90, borderRadius:35, position:"absolute", top:-40}} resizeMode="cover"/>
            <Text style={{ textAlign: 'center', fontSize:24, fontWeight:"bold", marginTop:40 }}>SwapSphere</Text>
            <Text style={{ textAlign: 'center', fontSize:18, fontWeight:"400", marginTop:10 }}>"Swap and Share, Your Way to More!"</Text>
            
            <TouchableOpacity
              style={{ backgroundColor: '#1f3f81', width: '80%', padding:10, borderRadius:10, margin:10 , justifyContent:"center", alignItems:"center"}}
              onPress={() => {
                this.props.navigation.navigate('LoginScreen');
              }}>
              <Text style={{color:"white", fontSize:16}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: '#4f67d8', width: '80%', padding:10, borderRadius:10, margin:10 , justifyContent:"center", alignItems:"center"}}
              onPress={() => {
                this.props.navigation.navigate('SignUpScreen');
              }}>
              <Text style={{color:"white", fontSize:16}}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f67d8',
    
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width:"100%",
    height:"100%",
    resizeMode: 'cover', // or 'stretch'
    
    justifyContent: 'center',
    alignItems: 'center',
  },
});
