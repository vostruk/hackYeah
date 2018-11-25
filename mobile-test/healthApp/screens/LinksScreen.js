import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View, Alert, FlatList } from 'react-native';

import {List, ListItem, Rating } from 'react-native-elements';


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
    //return fetch('https://api.nfz.gov.pl/queues?page=1&limit=10&format=json&case=1&province=07&benefit='+ this.props.navigation.getParam('lekarzId') +'&locality=warszawa')
    console.log('https://api.nfz.gov.pl/benefits?page=1&limit=1&format=json&name='+this.props.navigation.getParam('lekarzId'));
    fetch('https://api.nfz.gov.pl/benefits?page=1&limit=1&format=json&name='+this.props.navigation.getParam('lekarzId'))
    .then((response) => response.json())
        .then((responseJsonBenef) => {
         // just setState here e.g.     
         console.log('https://api.nfz.gov.pl/queues?page=1&limit=10&format=json&case=1&province=07&benefit='+ responseJsonBenef.data +'&locality=warszawa');
    return fetch('https://api.nfz.gov.pl/queues?page=1&limit=10&format=json&case=1&province=07&benefit='+ responseJsonBenef.data +'&locality=warszawa');
  })
    .then((response) => response.json())
        .then((responseJson) => {
         // just setState here e.g.
         this.setState({ dataSource: responseJson.data,isLoading: false });
        })
        .catch((error) => {
          console.error(error);
        });
        //end of return
}

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#ececec",
        }}
      />
    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0,
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
      style={{
        fontSize: 16,
        backgroundColor: "#ffffff",
        width: "100%",
      }}
          ItemSeparatorComponent={this.renderSeparator}
          data={this.state.dataSource}
          renderItem={({item}) => (<ListItem
            title={
              <View>
                <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 18, paddingTop: 6 }}>{item.attributes.dates.date}</Text>
              
              </View>
            }
            subtitle={
              <View>
              <Text style={{ fontFamily: "Montserrat-Regular", color: "#515151", fontSize: 14, marginTop: 5, paddingBottom: 3 }}>{item.attributes.provider}</Text>
              <Rating
                    type="star"
                    fractions={1}
                    startingValue={4.5}
                    readonly
                    imageSize={16}
                    onFinishRating={this.ratingCompleted}
                    onStartRating={this.ratingStarted}
                    style={{ paddingVertical: 10 }}
                  />
              </View>
              
            }
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

list: {
  fontSize: 16,
  backgroundColor: "#ffffff"
},

MainContainer :{
// Setting up View inside content in Vertically center.
justifyContent: 'center',
flex:1,
margin: 0,
marginTop:10,
},
rowViewContainer: {
        fontSize: 20,
        paddingRight: 20,
        paddingBottom: 20,
      }

});
