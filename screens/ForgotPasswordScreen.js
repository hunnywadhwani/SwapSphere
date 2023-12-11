import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import firebase from 'firebase';
import { Fontisto, Feather } from '@expo/vector-icons';

export default class ForgotPasswordScreen extends React.Component {
  forgotpassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        alert('Password reset link sent ');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  constructor() {
    super();
    this.state = { email: '' };
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
              Forgot Password
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
                placeholder="Email Id"
                onChangeText={(val) => {
                  this.setState({ email: val });
                }}
              />
              <Fontisto name="email" size={20} color="gray" />;
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
                this.forgotpassword();
              }}>
              <Text style={{ color: 'white', fontSize: 12 }}>
                Send Link to reset password
              </Text>
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
              this.props.navigation.navigate('LoginScreen');
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
