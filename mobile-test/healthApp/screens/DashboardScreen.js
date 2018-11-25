import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

export default class DashboardScreen extends React.Component {

  static navigationOptions = {
    title: 'Pulpit',
  };

  render = () =>  {
    return(
      <View style={styles.container}>
      <TouchableOpacity onPress={() => {this.props.navigation.navigate('Home')}}>
        <Card containerStyle={styles.dashboardCard}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
            <Image style={{width: 57, height: 48, marginRight: 16}} source={require('../assets/images/diagnoses.png')} />
            <View>
              <Text style={styles.cardHeading}>Zdiagnozuj chorobę</Text>
              <Text style={styles.cardText}>Wypełnij krótką ankietę w serwisie Symptomate</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Links')}}>
          <Card containerStyle={styles.dashboardCard}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
              <Image style={{width: 55, height: 48, marginRight: 16}} source={require('../assets/images/calendar.png')} />
              <View>
                <Text style={styles.cardHeading}>Wolne terminy</Text>
                <Text style={styles.cardText}>Wyszukaj pierwsze wolne terminy~{"\n"}dla zabiegów</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Links')}}>
          <Card containerStyle={styles.dashboardCard}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
            <Image style={{width: 54, height: 51, marginRight: 16}} source={require('../assets/images/history.png')} />
            <View>
              <Text style={styles.cardHeading}>Historia wizyt</Text>
              <Text style={styles.cardText}>Sprawdź historię wizyt i oceń~{"\n"}ich przebieg</Text>
            </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>

    );
  }
}

  const styles = StyleSheet.create({
  dashboardCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    borderRadius: 10,
    margin: 16,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.08,
  },
  cardHeading: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    marginBottom: 4
  },
  cardText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "#515151"
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
    paddingTop: 18
  }
});
