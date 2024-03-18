import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Search from '../images/Search.png';
import Cloudy from '../images/Cloudy.gif'
import Gif from 'react-native-fast-image';

const SearchTab = ({navigation}) => {
  const [SearchLocation, setSearchLocation] = useState('');

  const handleSearch = () =>{
    navigation.navigate('Home', { SearchLocation: SearchLocation })
    setSearchLocation('')

  }
  return (
    <ImageBackground
      source={require('../images/bg_image.png')}
      style={styles.BGImage}>
      <ScrollView style={styles.Container}  alignItems={'center'}>
        <StatusBar backgroundColor={'#738391'} />
        <View style={styles.SearchBarContainer}>
          <TextInput
            placeholder="Search"
            style={styles.SearchBar}
            placeholderTextColor={'#fff'}
            cursorColor={'#fff'}
            caretHidden={false}
            onChangeText={text => setSearchLocation(text)}
            value={SearchLocation}
          />
          <TouchableWithoutFeedback style={styles.SearchIconConatiner} onPress={handleSearch}>
            <Image source={Search} style={styles.SearchIcon} />
          </TouchableWithoutFeedback>
        </View>
        {SearchLocation ? (
          <TouchableOpacity style={styles.SearchedLocationContainer} onPress={handleSearch}>
            <Text style={styles.SearchedLocationText}>{SearchLocation}</Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.CloudyContainer}>
           <Gif source={Cloudy} style={styles.CloudyGif}/>
           <Text style={styles.Text1}>Search any place to check weather</Text>
           <Text style={styles.Text2}>I will find it for you</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    height:'auto',
    width:'auto',
    padding:20
  },
  BGImage: {
    flex: 1,
    height:'auto'
  },
  SearchBarContainer: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'rgba(115, 128, 140,1)',
    borderColor: 'rgb(207, 209, 211)',
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  SearchBar: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Exo2-Medium',
    width:'85%',
    padding: 7,
  },
  SearchIconConatiner: {
    padding: 7,
    borderRadius: 10,
  },
  SearchIcon: {
    width: 30,
    height: 30,
  },
  SearchedLocationContainer: {
    backgroundColor: 'rgba(115, 131, 145,0.7)',
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
  },
  SearchedLocationText: {
    fontSize: 18,
    fontFamily: 'Exo2-Bold',
    color: '#fff',
  },
  CloudyContainer:{
    flex:1,
    alignItems:'center',
    marginTop:100,
    
  },
  CloudyGif:{
    width:300,
    height:300,
    objectFit:'fill'
  },
  Text1:{
    fontSize:16,
    fontFamily:'Exo2-Bold',
    color:'#fff',
    textAlign:'center'
  },
  Text2:{
    fontSize:30,
    fontFamily:'Exo2-Bold',
    color:'#fff',
    textAlign:'center'
  }
});

export default SearchTab;
