import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View, Alert, FlatList } from 'react-native';

import {List, ListItem } from 'react-native-elements';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Przychodnie',
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }
GetItem (dane) {
   
  Alert.alert(dane);

  }

  fetchNFZ = async () => {
    try {
      let response = await fetch('https://api.nfz.gov.pl/queues?page=1&limit=10&format=json&case=1&province=07&benefit=stomatolog&locality=warszawa');
      let responseJson = await response.json();
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        });     
      console.log(dataSource);
    } catch(e) {
      console.log();
    }
  }

  componentDidMount() {
    console.log('https://api.nfz.gov.pl/queues?page=1&limit=10&format=json&case=1&province=07&benefit='+ this.props.navigation.getParam('lekarzId') +'&locality=warszawa');
    return fetch('https://api.nfz.gov.pl/queues?page=1&limit=10&format=json&case=1&province=07&benefit='+ this.props.navigation.getParam('lekarzId') +'&locality=warszawa')
    //return fetch('https://api.nfz.gov.pl/queues?page=1&limit=10&format=json&case=1&province=07&benefit=laryngolog&locality=warszawa')    
    .then((response) => response.json())
        .then((responseJson) => {
         // just setState here e.g.
         this.setState({ dataSource: responseJson.data,isLoading: false });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    console.log("!!!!!!");
    console.log(this.state.dataSource.data);

    return (

      <View style={styles.MainContainer}>
      
      <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={this.state.dataSource}
          renderItem={({item}) => (<ListItem
            title={`${item.attributes.benefit} ${item.attributes.provider}`}
            subtitle={item.attributes.dates.date}
            onPress = {() => 
              {this.props.navigation.navigate('Settings', {
              hospitalData: item.attributes,
            })
          }}
          /> )}
          keyExtractor={(item, index) => index}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

MainContainer :{
// Setting up View inside content in Vertically center.
justifyContent: 'center',
flex:1,
margin: 10
},
rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
      }

});