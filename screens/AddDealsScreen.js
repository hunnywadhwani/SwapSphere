import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import {
  AntDesign,
  Ionicons,
  EvilIcons,
  FontAwesome,
} from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';
export default class AddDealsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      productName: '',
      productDetails: '',
      address: '',
      image: '#',
      isSubmitted: false,
      need: '',
      mobile: '',
      ownerName: '',
    };
  }
  componentDidMount() {
    db.collection('users')
      .where('email', '==', this.state.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({ ownerName: doc.data().name });
        });
      });
  }
  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('images/' + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('images/' + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        db.collection('allProducts').add({
          ownerId: this.state.email,
          productName: this.state.productName,
          productDetails: this.state.productDetails,
          address: this.state.address,
          productImage: url,
          mobile: this.state.mobile,
          need: this.state.need,
          ownerName: this.state.ownerName,
        });

        this.setState({
          isSubmitted: false,
          image: '#',
          productName: '',
          productDetails: '',
          address: '',
        });
        alert('Product added successfully');
        this.props.navigation.navigate('MyDealsScreen');
      })
      .catch((error) => {
        this.setState({ donationImage: '#' });
      });
  };
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addProduct = () => {
    this.setState({ isSubmitted: true });
    var randomRequestId = this.createUniqueId();
    this.uploadImage(this.state.image, randomRequestId);
  };
  selectPicture = async () => {
    var result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //result= {canceled: true, assets:[]}
    if (!result.canceled) {
      this.setState({
        image: result.assets[0].uri,
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/Login.png')}>
          <Header
            centerComponent={{
              text: 'Add Product',
              style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
            }}
            backgroundColor="#1f3f81"
          />

          <View
            style={{
              marginTop: 10,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Image
              source={{
                uri: this.state.image,
              }}
              style={{
                height: 100,
                width: 100,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#fcc005',
              }}
            />
            <View style={{ alignSelf: 'flex-end' }}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  this.selectPicture();
                }}>
                <Text style={styles.plusSign}>+</Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                  }}>
                  Add Image
                </Text>
              </TouchableOpacity>
            </View>
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
              placeholder="Product Name"
              onChangeText={(val) => {
                this.setState({ productName: val });
              }}
              value={this.state.productName}
            />
            <AntDesign name="CodeSandbox" size={20} color="gray" />
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
              placeholder="Product details"
              onChangeText={(val) => {
                this.setState({ productDetails: val });
              }}
              value={this.state.productDetails}
            />
            <Ionicons name="information-circle" size={20} color="gray" />
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
              placeholder="Your Address"
              onChangeText={(val) => {
                this.setState({ address: val });
              }}
              value={this.state.address}
            />
            <EvilIcons name="location" size={20} color="gray" />
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
              placeholder="Your Mobile Number"
              onChangeText={(val) => {
                this.setState({ mobile: val });
              }}
              value={this.state.mobile}
            />
            <AntDesign name="mobile1" size={20} color="gray" />
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
              placeholder="Your Need In Exchange of this?"
              onChangeText={(val) => {
                this.setState({ need: val });
              }}
              value={this.state.need}
            />
            <FontAwesome name="exchange" size={20} color="gray" />
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
              this.state.isSubmitted == false
                ? this.addProduct()
                : alert('Product added already');
            }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Add Deal</Text>
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
  plusSign: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f3f81',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'stretch'
  },
});
