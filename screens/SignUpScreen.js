import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {
  AntDesign,
  Ionicons,
  Fontisto,
  Feather,
  Foundation,
} from '@expo/vector-icons';

export default class SignUpScreen extends React.Component {
  signup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert('User Created!');

        db.collection('users').add({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          contact: this.state.contact,
        });

        this.props.navigation.replace('HomeScreen');
      })
      .catch((error) => {
        var errorCode = error.code; 
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      contact: '',
    };
  }

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
              borderRadius: 10,
              borderWidth: 1,
              borderTopWidth: 10,
              borderColor: '#1f3f81',
            }}>
            <Image
              source={require('../assets/applogo.png')}
              style={{
                width: 90,
                height: 90,
                borderRadius: 35,
                position: 'absolute',
                top: -40,
                right: 10,
              }}
              resizeMode="cover"
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 40,
              }}>
              SignUp
            </Text>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                borderBottomColor: '#1f3f81',
                borderBottomWidth: 1,
                margin: 5,
                padding: 5,
                alignSelf: 'center',

                justifyContent: 'space-between',
              }}>
              <TextInput
                style={{ height: 30, width: '95%' }}
                placeholder="Name"
                onChangeText={(val) => {
                  this.setState({ name: val });
                }}
              />
              <AntDesign name="user" size={20} color="gray" />
            </View>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                borderBottomColor: '#1f3f81',
                borderBottomWidth: 1,
                margin: 5,
                padding: 5,
                alignSelf: 'center',

                justifyContent: 'space-between',
              }}>
              <TextInput
                style={{ height: 30, width: '95%' }}
                placeholder="Contact No."
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
              />
              <Foundation name="telephone" size={20} color="gray" />
            </View>

            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                borderBottomColor: '#1f3f81',
                borderBottomWidth: 1,
                margin: 5,
                padding: 5,
                alignSelf: 'center',

                justifyContent: 'space-between',
              }}>
              <TextInput
                style={{ height: 30, width: '95%' }}
                placeholder="Email Id"
                onChangeText={(val) => {
                  this.setState({ email: val });
                }}
              />
              <Fontisto name="email" size={20} color="gray" />
            </View>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                borderBottomColor: '#1f3f81',
                borderBottomWidth: 1,
                margin: 5,
                padding: 5,
                alignSelf: 'center',

                justifyContent: 'space-between',
              }}>
              <TextInput
                style={{ height: 30, width: '95%' }}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(val) => {
                  this.setState({ password: val });
                }}
              />
              <Feather name="lock" size={20} color="gray" />
            </View>

            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                borderBottomColor: '#1f3f81',
                borderBottomWidth: 1,
                margin: 5,
                padding: 5,
                alignSelf: 'center',

                justifyContent: 'space-between',
              }}>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={(val) => {
                  this.setState({ confirmPassword: val });
                }}
              />
              <Feather name="lock" size={20} color="gray" />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#1f3f81',
                width: '60%',
                padding: 10,
                borderRadius: 10,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              onPress={() => {
                this.signup();
              }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              width: '30%',
              padding: 5,
              borderWidth: 0.1,
              marginLeft: 10,
              borderRadius: 3,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}
            onPress={() => {
              this.props.navigation.navigate('LoginScreen',
              {users: this.state.name});
            }}>
            <Text style={{ color: '#1f3f81', fontSize: 16 }}>Login?</Text>
          </TouchableOpacity>
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'stretch'

    justifyContent: 'center',
    alignItems: 'center',
  },
});
