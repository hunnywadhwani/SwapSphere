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
import {
  MaterialIcons,
  Entypo,
  Ionicons,
  Foundation,
  FontAwesome,
} from '@expo/vector-icons';
import db from '../config';
export default class DealsDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: this.props.route.params.productDetails['productName'],
      productDocId: this.props.route.params.productDetails['docId'],
      ownerAddress: this.props.route.params.productDetails['address'],
      productDetails: this.props.route.params.productDetails['productDetails'],
      mobile: this.props.route.params.productDetails['mobile'],
      need: this.props.route.params.productDetails['need'],
      productImage: this.props.route.params.productDetails['productImage'],
    };
    console.log(this.state.pd);
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#1f3f81',
            padding: 5,
            marginTop: 10,
            borderRadius: 10,
            width: 50,
          }}>
          <Icon
            name="arrow-back"
            type="Ionicons"
            color="#fff"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        </View>
        <Image
          source={{uri:this.state.productImage}}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginBottom: 10,
            backgroundColor: '#1f3f81',
          }}
        />

        <View style={styles.lowerContainer}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#4f67d8',
            }}>
            {this.state.productName}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Entypo name="location" size={20} color="#1f3f81" />
            <Text style={{ marginLeft: 5, fontSize: 16 }}>
              {this.state.ownerAddress}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderTopWidth: 1,
              borderColor: '#1f3f81',
            }}>
            <Text style={{ marginLeft: 5, fontSize: 14 }}>
              {this.state.productDetails}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <FontAwesome name="exchange" size={20} color="#1f3f81" />
            <Text style={{ marginLeft: 5, fontSize: 16 }}>
              {this.state.need}
            </Text>
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
              try {
                db.collection('allProducts')
                  .doc(this.state.productDocId)
                  .delete();
                this.props.navigation.navigate('MyDealsScreen');
              } catch (e) {
                console.log(e);
              }
            }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>
              Delete product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f67d8',
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: '#ffffffee',
    padding: 10,
    borderRadius: 20,
    borderTopWidth: 20,
    borderColor: '#1f3f81',
    paddingTop: 50,
    paddingLeft: 10,
  },
});
