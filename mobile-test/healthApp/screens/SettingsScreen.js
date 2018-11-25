import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View, Alert, FlatList } from 'react-native';
import {Icon} from 'react-native-elements';
export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Ustawienia',
  };

  renderElevator = () => {
    return(
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Icon name="ios-chat" size={20} />
    <Text>
      2 replies
    </Text>
 </View>
    )
  }

  render() {
    console.log(this.props.navigation.getParam('hospitalData'));
    return(
      
    <View style={styles.MainContainer}>
    
    <Text>{this.props.navigation.getParam('hospitalData').dates.date}</Text>
    <Text>{this.props.navigation.getParam('hospitalData').provider}</Text>
    <Text>{this.props.navigation.getParam('hospitalData').locality + " " + this.props.navigation.getParam('hospitalData').address  }</Text>
    {this.renderElevator()}
    </View>
    
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
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
        },
        storyCounters: {
          width: 25,
        },
        
        iconCounter: {
          fontSize: 21,
          color: '#bbbbbb',
          textAlign: 'center',
        },
        
        iconCounterText: {
          color: '#bbbbbb',
          fontSize: 12,
          textAlign: 'center'
        },
  
  });