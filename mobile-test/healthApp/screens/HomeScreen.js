import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  WebView
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Wizyta',
  
  };

  constructor(props) {
    super(props);
    this.state = { lekarz: null, diagnoza: null };
  }

  onMessage = (event) => {
    //console.log(event)
    //console.log("We got event!")
    //Prints out data that was passed.
    if(event && event.nativeEvent.data){
      //console.log(event.nativeEvent)
      //console.log(event.nativeEvent.data)

      //const obj = JSON.parse(event.nativeEvent.data);
      //we got info from webview - get the data and close it
      //console.log("We got event!")
      const parsedData = JSON.parse(event.nativeEvent.data)


      if(parsedData.diagnoza){
        console.log("MAMY DIAGNOZE!")
        console.log(parsedData.diagnoza);
        console.log(parsedData.lekarz);
        this.setState({ diagnoza: parsedData.diagnoza});
    }
      if(parsedData.lekarz){
          console.log("MAMY DIAGNOZE!")
          console.log(parsedData.diagnoza);
          console.log(parsedData.lekarz);
          this.setState({lekarz: parsedData.lekarz});
      }
      
    }
  }

  getProperDoctor(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}


  render = () => {

    if(this.state.lekarz!=null){
      const lekarze = this.state.lekarz.split(/[ ,]+/);
      console.log(lekarze)
      var partsOfStr = this.getProperDoctor(lekarze);
      //todo: send to screen to get list of placowki
      return(<View style={{alignItems:'center', backgroundColor:'white'}}>
        <Text style={{margin:20, textAlign:'center'}}>Szukamy przychodnie na najbliższy termin.</Text>
        <Text style={{margin:20, textAlign:'center'}}>Twoj rekomendowany lekarz to {partsOfStr}
        </Text>
        <Image source={require('../assets/images/doctor_patient.gif')} />
        </View>)
    }
    else  if(this.state.diagnoza!=null){
      //var partsOfStr = this.state.lekarz.split(',');
      let ScreenHeight = Dimensions.get("window").height;
      //return(<View><Text>Twoj lekarz to {partsOfStr[0]}</Text></View>)
      var hide_web_view = <View style={{height:ScreenHeight, alignItems:'center'}}>
      <Text style={{margin:20, textAlign:'center'}}>
          Nasz algorytm wykrył że możliwe objawy dla Ciebie to {this.state.diagnoza.join(' lub ')}
      </Text>
      <Text style={{margin:20, textAlign:'center'}}>Daj nam chwile a zaproponujemy Ci 
      najlepszy termin oraz miejsce wizyty do lekarza</Text>
      <Image source={require('../assets/images/loader1.gif')} />
      </View>
    }  else{
      var hide_web_view = <View></View>
    }

    return (
      <View style={styles.container}>
      {hide_web_view}
      <WebView
        source={{uri: 'https://symptomate.com/diagnosis/pl/'}}
        style={{marginTop: 20}}
        onMessage={this.onMessage }
        injectedJavaScript={`
        $('header > .container').hide();
 
          function CheckFinal()
          {
                if( $('.header:contains("Wyniki")').text()==="Wyniki"){

                      $('html, body').scrollTop($(document).height());

                      var $container = $("html,body");
                      var $scrollTo = $('.doctors-localization');
                      $container.animate({scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0},300);
                      
                      const diagnoza ={"diagnoza":$('.condition-content > a').toArray().map((el)=>el.innerText), "lekarz":$('.specializations').text()};
                      window.postMessage(JSON.stringify(diagnoza));
                    }
          };

          setInterval( CheckFinal, 100 );
    
        `}
    
        onNavigationStateChange={(navEvent)=> console.log(navEvent)}//navEvent.jsEvaluationValue

      />
        
      </View>
    );
  }
//const a = {"lekarz":$('.specializations').text(), "diagnoza":$('.specializations').text()};
//                   const diagnoza = $('.condition-content').text()
//console.log($('.condition-content').text())
//console.log($('.specializations').text())

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
