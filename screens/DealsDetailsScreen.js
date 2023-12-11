import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import db from '../config';
import Modal from 'react-native-modal';
import firebase from 'firebase';
import {
  MaterialIcons,
  Entypo,
  Ionicons,
  Foundation,
  FontAwesome,
} from '@expo/vector-icons';

import call from "react-native-phone-call";
import { RadioButton } from 'react-native-paper';
export default class DealsDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: this.props.route.params.productDetails['productName'],
      productDocId: this.props.route.params.productDetails['docId'],
      ownerAddress: this.props.route.params.productDetails['address'],
      productDetails: this.props.route.params.productDetails['productDetails'],
      productOwnerId: this.props.route.params.productDetails['ownerId'],
      mobile: this.props.route.params.productDetails['mobile'],
      need: this.props.route.params.productDetails['need'],
      productImage: this.props.route.params.productDetails['productImage'],

      modalVisible: false,
      myProducts: [],
      email: firebase.auth().currentUser.email,
      checked: '',
      checkedProductInfo: {},
    };
  }

  componentDidMount() {
    db.collection('allProducts')
      .where('ownerId', '==', this.state.email)
      .onSnapshot((snapshot) => {
        var myP = [];
        snapshot.docs.map((doc) => {
          var item = doc.data();
          myP.push(item);
        });
        this.setState({ myProducts: myP });
      });
  }
  sendInterest = () => {
    db.collection('allInterests').add({
      ownerId: this.state.productOwnerId,
      productDocId: this.state.productDocId,
      productName: this.state.productName,
      productImage: this.state.productImage,
      barterEmailId: this.state.email,
      barterItemName: this.state.checkedProductInfo.productName,
      barterItemDetails: this.state.checkedProductInfo.productDetails,
      barterItemImage: this.state.checkedProductInfo.productImage,
      barterItemAddress: this.state.checkedProductInfo.address,
      barterMobile: this.state.checkedProductInfo.mobile,
      isTransactionCompleted: false,
    });
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('HomeScreen');
  };
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
              this.setState({ modalVisible: true });
            }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Show Interest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              width: '75%',
              padding: 10,
              borderRadius: 8,
              margin: 8,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderWidth: 0.5,
              borderColor: '#1f3f81',
            }}
            onPress={() => {
              const args = {
                number: this.state.mobile, // String value with the number to call
                prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
              };

              call(args).catch((err) => {
                Alert.alert(err);
              });
            }}>
            <Text style={{ color: '#1f3f81', fontSize: 16 }}>
              <Foundation name="telephone" size={20} color="#1f3f81" /> Call
              Now- {this.state.mobile}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Modal
            style={styles.modalView}
            isVisible={this.state.modalVisible}
            backdropOpacity={0.4}
            deviceWidth={Dimensions.get('window').width}
            deviceHeight={Dimensions.get('window').height}
            onBackdropPress={() => this.setState({ modalVisible: false })}>
            <View style={styles.modalMainView}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -13,
                  right: -10,
                  margin: 10,
                  padding: 10,
                }}
                onPress={() => this.setState({ modalVisible: false })}>
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color="#2460a7ff"
                  onPress={() => this.setState({ modalVisible: false })}
                />
              </TouchableOpacity>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    margin: 2,

                    fontSize: 16,
                  }}>
                  Select a Product you want to barter with!
                </Text>
              </View>
              {this.state.myProducts.map((product) => {
                return (
                  <View
                    style={{
                      width: '70%',
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      paddingHorizontal: 30,
                      margin: 10,
                      borderWidth: 1,
                      borderRadius: 10,
                      alignSelf: 'center',
                    }}>
                    <RadioButton
                      value={product.productName}
                      status={
                        this.state.checked == product.productName
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => {
                        this.setState({
                          checked: product.productName,
                          checkedProductInfo: product,
                        });
                        console.log(this.state.checked);
                      }}
                    />
                    <Text style={{ fontWeight: 'bold' }}>
                      {product.productName}
                    </Text>
                  </View>
                );
              })}
              {this.state.myProducts.length == 0 ? (
                <Text>
                  No products added to barter with! Kindly add products first
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.state.checked !== ''
                      ? this.sendInterest()
                      : alert('Select a product first!');
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderWidth: 0.5,
                    borderColor: '#1f3f81',
                  }}>
                  <Text style={{ textAlign: 'center', color: '#1f3f81' }}>
                    Send Interest
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Modal>
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
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '90%',
    height: '60%',
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
