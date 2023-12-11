import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Header } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      allProducts: [],
      name: '',
    };
  }
  getProducts = () => {
    db.collection('allProducts')
      .where('ownerId', '!=', this.state.email)
      .onSnapshot((snapshot) => {
        var allP = [];
        //array =[doc1, doc2, doc3]
        //array.map((doc)=>{ })
        snapshot.docs.map((doc) => {
          // console.log(doc.data());
          var item = doc.data();
          item['docId'] = doc.id;
          console.log(item);
          allP.push(item);
        });
        this.setState({ allProducts: allP });
      });

    db.collection('users')
      .where('email', '==', this.state.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var item = doc.data();

          this.setState({ name: item.name });
        });
      });
  };

  componentDidMount() {
    this.getProducts();
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          width: '95%',
          alignSelf: 'center',
          marginVertical: 10,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#4f67d8',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 5,
        }}
        onPress={() => {
          this.props.navigation.navigate('DealsDetailsScreen', {
            productDetails: item,
          });
        }}>
        <Image
          source={{uri:item.productImage}}
          style={{ width: 90, height: 90, resizeMode: 'contain' }}
        />
        <View style={{ flex: 1, width: '90%', padding: 10 }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              marginHorizontal: 5,
              fontFamily: 'regular',
            }}>
            {item.productName}
          </Text>
          <Text
            style={{
              color: 'black',
              marginHorizontal: 5,
            }}>
            {item.ownerName}{' '}
            <Text
              style={{
                color: 'black',
                marginHorizontal: 5,
              }}>
              {' '}
              is willing to barter this
            </Text>
          </Text>
          <Text
            style={{
              color: 'black',
              marginHorizontal: 5,
            }}>
            {' '}
            product in exchange of
          </Text>
          <Text
            style={{
              color: 'black',
              marginHorizontal: 5,
            }}>
            {' '}
            {item.need}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#1f3f81',
            width: '100%',
            padding: 20,
            justifyContent: 'center',
            height: 200,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Hi {this.state.name}!
          </Text>

          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              borderBottomColor: '#1f3f81',

              margin: 5,
              padding: 5,
              alignSelf: 'center',
              justifyContent: 'space-between',
              borderRadius: 10,
              backgroundColor: '#fff',
            }}>
            <TextInput
              style={{ height: 30, width: '95%' }}
              placeholder="Search Item"
            />
            <AntDesign
              name="search1"
              size={20}
              color="#1f3f81"
              onPress={() => {
                alert('Feature coming up soon');
              }}
            />
          </View>
        </View>
        {this.state.allProducts.length !== 0 ? (
          <FlatList
            data={this.state.allProducts}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        ) : (
          <Text>No Products currently</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fffff',
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
