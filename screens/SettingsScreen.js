import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myId: [],
      email: firebase.auth().currentUser.email,
    };
  }
  componentDidMount() {
    db.collection('users')
      .where('email', '==', this.state.email)
      .onSnapshot((snapshot) => {
        var myid = [];
        snapshot.docs.map((doc) => {
          var item = doc.data();
          item["docId"] = doc.id;
          myid.push(item);
        });
        this.setState({ myId: myid });
      });
  }
  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <View
          style={{
            flex: 0.3,
            backgroundColor: '#1f3f81',
            width: '100%',
            padding: 20,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/applogo.png')}
              style={{
                width: 90,
                height: 90,
                borderRadius: 40,
              }}
              resizeMode="cover"
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              {this.state.email}
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.7, width: '100%', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#4f67d8',
              width: '80%',
              padding: 10,
              borderRadius: 10,
              margin: 10,
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('EditprofileScreen',{users:this.state.myId});
            }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#4f67d8',
              width: '80%',
              padding: 10,
              borderRadius: 10,
              margin: 10,
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('AboutApp');
            }}>
            <Text style={{ color: 'white', fontSize: 16 }}>About App</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#4f67d8',
              width: '80%',
              padding: 10,
              borderRadius: 10,
              margin: 10,
              alignItems: 'center',
            }}
            onPress={() => {
              try {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                     
                    this.props.navigation.replace('GetStarted');
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
              } catch (e) {
                console.log(e);
              }
            }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fffff',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
