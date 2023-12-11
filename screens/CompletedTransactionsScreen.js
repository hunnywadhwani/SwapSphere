import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Header } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

export default class CompletedTransactionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      allInterests: [],
      allCompletedInterests: [],
      completed: false,
    };
  }
  getTransictions = () => {
    db.collection('allInterests')
      .where('ownerId', '==', this.state.email)
      .onSnapshot((snapshot) => {
        var allIn = [];
        var allCIn = [];
        snapshot.docs.map((doc) => {
          var item = doc.data();
          item['docId'] = doc.id;

          item.isTransactionCompleted ? allCIn.push(item) : allIn.push(item);
        });
        this.setState({ allInterests: allIn, allCompletedInterests: allCIn });
      });
    console.log(this.state.allInterests);
  };

  componentDidMount() {
    this.getTransictions();
  }

  renderItem = ({ item }) => {
    if (!item.isTransactionCompleted) {
      return (
        <TouchableOpacity
          style={{
            borderRadius: 10,
            shadowColor: 'black',
            alignItems: 'center',
            width: '95%',
            alignSelf: 'center',
            borderWidth: 0.5,
            borderColor: '#4f67d8',
            padding: 5,
          }}
          onPress={() => {
            this.props.navigation.navigate('TransictionDetailScreen', {
              item: item,
            });
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              marginHorizontal: 5,
              fontFamily: 'regular',
              marginTop: 5,
            }}>
            {item.barterEmailId} is willing to barter
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '98%',
              alignSelf: 'center',
              padding: 5,
              margin: 5,
              justifyContent: 'space-evenly',
            }}>
            <View>
              <Image
                source={{ uri: item.barterItemImage }}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                  borderRadius: 30,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  marginHorizontal: 5,
                  fontFamily: 'regular',
                }}>
                {item.barterItemName}
              </Text>
            </View>
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                marginHorizontal: 5,
                fontFamily: 'regular',
              }}>
              <FontAwesome name="exchange" size={20} color="gray" />
            </Text>
            <View>
              <Image
                source={{ uri: item.productImage }}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                  borderRadius: 30,
                }}
              />
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
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            borderRadius: 10,
            shadowColor: 'black',
            alignItems: 'center',
            width: '95%',
            alignSelf: 'center',
            borderWidth: 0.5,
            borderColor: '#4f67d8',
            padding: 5,
          }}
          onPress={() => {
            this.props.navigation.navigate('CompletedTransictionDetailScreen', {
              item: item,
            });
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              marginHorizontal: 5,
              fontFamily: 'regular',
              marginTop: 5,
            }}>
            Barter Transaction details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '98%',
              alignSelf: 'center',
              padding: 5,
              margin: 5,
              justifyContent: 'space-evenly',
            }}>
            <View>
              <Image
                source={{uri:item.barterItemImage}}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                  borderRadius: 30,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  marginHorizontal: 5,
                  fontFamily: 'regular',
                }}>
                {item.barterItemName}
              </Text>
            </View>
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                marginHorizontal: 5,
                fontFamily: 'regular',
              }}>
              <FontAwesome name="exchange" size={20} color="gray" />
            </Text>
            <View>
              <Image
                source={{uri:item.productImage}}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                  borderRadius: 30,
                }}
              />
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
          </View>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              marginHorizontal: 5,
              fontFamily: 'regular',
              marginTop: 5,
            }}>
            Transaction {item.reply}
          </Text>
        </TouchableOpacity>
      );
    }
  };
  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'My Transactions',
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

        <View style={styles.rectangle}>
          <TouchableOpacity
            style={this.state.completed ? styles.button : styles.selectedButton}
            onPress={() => {
              this.setState({ completed: false });
            }}>
            <Text
              style={
                this.state.completed
                  ? {
                      color: 'black',
                      fontSize: 14,
                    }
                  : { color: 'white', fontSize: 14 }
              }>
              Ongoing
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={this.state.completed ? styles.selectedButton : styles.button}
            onPress={() => {
              this.setState({ completed: true });
            }}>
            <Text
              style={
                this.state.completed
                  ? {
                      color: 'white',
                      fontSize: 14,
                    }
                  : { color: 'black', fontSize: 14 }
              }>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, marginTop: 20 }}>
          {this.state.completed ? (
            <FlatList
              data={this.state.allCompletedInterests}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          ) : (
            <FlatList
              data={this.state.allInterests}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fffff',
  },

  rectangle: {
    alignSelf: 'center',
    backgroundColor: '#a5bffa',
    marginTop: 20,
    width: '80%',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedButton: {
    backgroundColor: '#427dff',
    width: '45%',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    width: '45%',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
