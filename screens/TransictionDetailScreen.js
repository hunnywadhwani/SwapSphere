import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Header, Icon } from 'react-native-elements';
import {
  MaterialIcons,
  Entypo,
  Ionicons,
  Foundation,
  FontAwesome,
  Fontisto,
} from '@expo/vector-icons';

export default class CompletedTransactionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.route.params.item['barterEmailId'],
      address: this.props.route.params.item['barterItemAddress'],
      details: this.props.route.params.item['barterItemDetails'],
      itemName: this.props.route.params.item['barterItemName'],
      contact: this.props.route.params.item['barterMobile'],
      ownerId: this.props.route.params.item['ownerId'],
      docId: this.props.route.params.item['docId'],
      productDocId: this.props.route.params.item['productDocId'],
      barterItemName: this.props.route.params.item['productName'],
      productImage: this.props.route.params.item['productImage'],
      barterImage: this.props.route.params.item['barterItemImage'],
    };
    console.log(this.props.route.params.allInterests);
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
          source={this.state.barterImage}
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
            {this.state.itemName}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Fontisto name="email" size={20} color="#1f3f81" />
            <Text style={{ marginLeft: 5, fontSize: 16 }}>
              {this.state.email}
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
              {this.state.details}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Entypo name="location" size={20} color="#1f3f81" />

            <Text style={{ marginLeft: 5, fontSize: 16 }}>
              {this.state.address}
            </Text>
          </View>

          <View
            style={{
              padding: 10,
              width: '95%',
              justifyContent: 'center',
              alignItems: 'flex-start',
              borderRadius: 10,

              borderColor: '#1f3f81',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#1f3f81',
              }}>
              In exchange of your product {this.state.barterItemName}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#1f3f81',
                width: '30%',
                padding: 10,
                borderRadius: 10,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              onPress={() => {
                db.collection('allInterests').doc(this.state.docId).update({
                  isTransactionCompleted: true,
                  reply:"accepted"
                });
              }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: '30%',
                padding: 10,
                borderRadius: 8,
                margin: 8,
                borderWidth: 0.5,
                borderColor: '#1f3f81',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{ color: '#1f3f81', fontSize: 16 }}>
                <Foundation name="telephone" size={20} color="gray" /> Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#1f3f81',
                width: '30%',
                padding: 10,
                borderRadius: 10,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              onPress={() => {
                db.collection('allInterests').doc(this.state.docId).update({
                  isTransactionCompleted: true,
                  reply:"denied"

                });
              }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Deny </Text>
            </TouchableOpacity>
          </View>
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
