import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,Image
} from 'react-native';
import firebase from 'firebase';
import { Header, Icon } from 'react-native-elements';
import db from '../config';

export default class EditprofileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docId: this.props.route.params.users[0]['docId'],
      name: this.props.route.params.users[0]['name'],
      contact: this.props.route.params.users[0]['contact'],
      email: this.props.route.params.users[0]['email'],
      password: this.props.route.params.users[0]['password'],
    };
    console.log(this.props.route.params.users);
  }
  updateUserDetails = () => {
    db.collection('users').doc(this.state.docId).update({
      name: this.state.name,
      contact: this.state.contact,
      email: this.state.email,
      password: this.state.password,
    });
    alert('User Details Updated');
    this.props.navigation.navigate('SettingsScreen');
  };

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
              text: 'Profile',
              style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
            }}
            backgroundColor="#1f3f81"
          />
          <View style={{ flex: 1, justifyContent: 'center', alignItems:"center" }}>
            <Image
              source={require('../assets/applogo.png')}
              style={{
                width: 90,
                height: 90,
                borderRadius: 40,
              }}
              resizeMode="cover"
            />
            <Text >{this.state.email}</Text>

            <TextInput
              style={{ height: 30, margin:10,width: '90%', borderColor:"#1f3f81", borderWidth:0.5 , padding:5, borderRadius:5}}
              
              placeholder={'name'}
              onChangeText={(text) => {
                this.setState({ name: text });
              }}
              value={this.state.name}
            />
            <TextInput
              style={{ height: 30, margin:10,width: '90%', borderColor:"#1f3f81", borderWidth:0.5,padding:5, borderRadius:5 }}

              placeholder={'contact'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({ contact: text });
              }}
              value={this.state.contact}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#4f67d8',
                width: '80%',
                padding: 10,
                borderRadius: 10,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                this.updateUserDetails();
              }}>
              <Text style={{ color: 'white', fontSize: 16 }}>
                Update Profile
              </Text>
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'stretch'
  },
});
