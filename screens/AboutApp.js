import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
export default class EditprofileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
     
         <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/Login.png')}>
           <Header
          leftComponent={
            <Icon
              name="arrow-back"
              type="Ionicons"
              color="#fff"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'About App',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#1f3f81"
        />
             <View
            style={{
              padding: 10,
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              
            }}>
            
            <Image source={require("../assets/applogo.png")} style={{width:90, height:90, borderRadius:35, position:"absolute", top:-1}} resizeMode="cover"/>
            <Text style={{ textAlign: 'center', fontSize:24, fontWeight:"bold", marginTop:80,color: '#fff', backgroundColor:"#1f3f81" }}>Swap Sphere</Text>
            <Text style={{ textAlign: 'center', fontSize:18, fontWeight:"400", marginTop:10 }}>"Swap and Share, Your Way to More!"</Text>

            <Text style={{ textAlign: 'center', fontSize:13,  }}>
            Welcome to Swap Sphere, your go-to destination for a revolutionary online bartering experience! Swap Sphere offers a dynamic and user-friendly platform where individuals can seamlessly trade goods and services. Say farewell to conventional transactions and dive into a new era of exchange where users can connect, negotiate, and barter items of value. Whether you are looking to trade your handmade crafts, unused electronics, or even professional skills,  Happy swapping with Swap Sphere
            </Text>

            </View>
          </ImageBackground>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fffff',
    padding: 8,
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbbbb',
    padding:10,
    width:"85%",
    height:"40%"
  },
  modalMainView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowColor: '#bbbb',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
