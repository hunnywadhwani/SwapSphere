import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
export default class MyDealsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      allProducts: [],
    };
  }
  getProducts = () => {
    db.collection('allProducts')
      .where('ownerId', '==', this.state.email)
      .onSnapshot((snapshot) => {
        var allP = [];
        //array =[doc1, doc2, doc3]
        //array.map((doc)=>{ })
        snapshot.docs.map((doc) => {
          // console.log(doc.data());
          var item = doc.data();
          item['docId'] = doc.id;
          // console.log(item);
          allP.push(item);
        });
        this.setState({ allProducts: allP });
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
          this.props.navigation.navigate('MyDealsDetailsScreen', {
            productDetails: item,
          });
        }}>
        <Image
          source={{uri:item.productImage}}
          style={{ width: 50, height: 50, resizeMode: 'contain' }}
        />
        <View style={{ flex: 1, width: '90%' }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              marginHorizontal: 5,
              fontFamily: 'regular',
            }}>
            {item.productName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'My products',
            style: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
          }}
          containerStyle={{
            backgroundColor: '#1f3f81',
            justifyContent: 'space-around',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOpacity: 0.2,
          }}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.allProducts}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddDealsScreen');
          }}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 100,
            backgroundColor: '#1f3f81',
            borderRadius: 30,
            elevation: 8,
            marginBottom: 20,
          }}>
          <AntDesign name="plus" size={32} color="white" />
        </TouchableOpacity>
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
