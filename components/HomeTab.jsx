import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import PartlyCloudy from '../images/partlyCloudy.png';
import ClearNight from '../images/ClearNight.png';
import ClearDay from '../images/Sunny.png';
import Mist from '../images/Mist.png';
import LightRain from '../images/LightRain.png';
import WindSpeed from '../images/Wind.png';
import HumidityLevel from '../images/Humidity.png';
import AQILevel from '../images/AQI.png';
import DailyForecast from '../images/DailyForecast.png';
import OverCast from '../images/Overcast.png';
import Snow from '../images/snowflake.png'
import Fog from '../images/Fog.png'
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';

const APIkey = 'ac09ad54a74e44d5a0a105958241203';

const HomeTab = ({route}) => {
  const Searchquery = route.params
    ? route?.params?.SearchLocation
    : 'Chhattisgarh';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Weather, setWeather] = useState('');
  const [Temperature, setTemperature] = useState('');
  const [Wind, setWind] = useState('');
  const [Region, setRegion] = useState('');
  const [Country, setCountry] = useState('');
  const [Humidity, setHumidity] = useState('');
  const [AQI, setAQI] = useState('');
  const [ForecastDaysArray, setForecastDaysArray] = useState([]);
  const DateArray = ForecastDaysArray.map(forecast => forecast.date);
  const DayArray = DateArray.map(date => moment(date).format('dddd'));
  const ForecastDayTemperature = ForecastDaysArray.map(
    forecastTemperature => forecastTemperature.day.maxtemp_c,
  );
  const ForecastDayWeatherArray = ForecastDaysArray.map(
    forecastWeather => forecastWeather?.day?.condition?.text,
  );
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    const weatherAPIurl = `https://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${Searchquery}&days=7&aqi=yes&alerts=yes`;
    const response = await fetch(weatherAPIurl);
    const data = await response.json();
    if (data?.forecast?.forecastday) {
      setRegion(data?.location?.name);
      setCountry(data?.location?.country);
      setTemperature(data?.current?.temp_c);
      setWeather(data?.current?.condition?.text);
      setWind(data?.current?.wind_kph);
      setHumidity(data?.current?.humidity);
      setAQI(data?.current?.air_quality?.pm10);
      setForecastDaysArray(data?.forecast?.forecastday);
      setLoading(false);
    } else {
      setLoading(false);
      setError('No matching location found.');
    }
  };

  useEffect(() => {
    if (Searchquery?.length > 0) {
      fetchWeatherData();
    }
  }, [Searchquery]);

  if (loading) {
    return (
      <ImageBackground
        source={require('../images/bg_image.png')}
        style={styles.BGImage}>
        <ScrollView style={styles.Container} alignItems={'center'} justifyContent={'center'}>
          <StatusBar backgroundColor={'#738391'} />
          <ActivityIndicator size="large" color="#14868C" />
        </ScrollView>
      </ImageBackground>
    );
  }
  if (error !== null) {
    return (
      <ImageBackground
        source={require('../images/bg_image.png')}
        style={styles.BGImage}>
        <ScrollView style={styles.Container} alignItems={'center'} justifyContent={'center'}>
          <StatusBar backgroundColor={'#738391'} />

          <View style={styles.ErrorMessageContainer}>
            <Text style={styles.ErrorMessage}>{error}</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../images/bg_image.png')}
      style={styles.BGImage}>
      <ScrollView style={styles.Container} alignItems={'center'} justifyContent={'center'}>
        <StatusBar backgroundColor={'#738391'} />
        <View style={styles.LocationContainer}>
          <Text style={styles.LocationName}>{Region}, </Text>
          <Text style={styles.CountryName}>{Country}</Text>
        </View>        

        {Weather?.includes('Fog') ? (
          <View style={styles.ImageContainer}>
            <Image source={Fog} style={styles.Image} />
          </View>
        ) : null}
        {Weather?.includes('Sunny') ? (
          <View style={styles.ImageContainer}>
            <Image source={ClearDay} style={styles.Image} />
          </View>
        ) : null}
        {Weather?.includes('Clear') ? (
          <View style={styles.ImageContainer}>
            <Image source={ClearNight} style={styles.Image} />
          </View>
        ) : null}
        {Weather?.includes('Overcast') ? (
          <View style={styles.ImageContainer}>
            <Image source={OverCast} style={styles.Image} />
          </View>
        ) : null}
        {Weather?.includes('rain') ? (
          <View style={styles.ImageContainer}>
            <Image source={LightRain} style={styles.Image} />
          </View>
        ) : null}
        {Weather?.includes('outbreaks') ? (
          <View style={styles.ImageContainer}>
            <Image source={LightRain} style={styles.Image} />
          </View>
        ) : null}
        {Weather?.includes('Mist') ? (
          <View style={styles.ImageContainer}>
            <Image source={Mist} style={styles.Image} />
          </View>
        ) : null}
        {Weather?.includes('Partly') ? (
          <View style={styles.ImageContainer}>
            <Image source={PartlyCloudy} style={styles.Image} />
          </View>
        ) : null}
        {Weather?.includes('snow') ? (
          <View style={styles.ImageContainer}>
            <Image source={Snow} style={styles.Image} />
          </View>
        ) : null}
        <View style={styles.Temperature}>
          <Text style={styles.Degree}>{`${Temperature}°C`}</Text>
          <Text style={styles.CurrentWeather}>{Weather}</Text>
        </View>
        <View style={styles.OtherInfoContainer}>
          <View style={styles.InfoItem}>
            <Image source={WindSpeed} style={styles.IconImage} />
            <Text style={styles.InfoText}>{Wind}kph</Text>
          </View>
          <View style={styles.InfoItem}>
            <Image source={HumidityLevel} style={styles.IconImage} />
            <Text style={styles.InfoText}>{Humidity}%</Text>
          </View>
          <View style={styles.InfoItem}>
            <Image source={AQILevel} style={styles.IconImage} />
            <Text style={styles.InfoText}>AQI {AQI}</Text>
          </View>
        </View>
        <View style={styles.ForecastContainer}>
          <View style={styles.ForecastHeadingImageContainer}>
            <Image source={DailyForecast} style={styles.DailyForecastImage} />
            <Text style={styles.DailyForecastHeading}>Daily Forecast</Text>
          </View>

          <ScrollView
            style={styles.DailyForecastReportContainer}
            horizontal={true}>
            <View style={styles.DailyForecastReport}>
              <View style={styles.DailyForecastWeatherImageContainer}>
                {ForecastDayWeatherArray[1]?.includes('Fog') ? (
                  <Image
                    source={Fog}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[1]?.includes('Clear') ? (
                  <Image
                    source={ClearNight}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[1]?.includes('Sunny') ? (
                  <Image
                    source={ClearDay}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[1]?.includes('Overcast') ? (
                  <Image
                    source={OverCast}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[1]?.includes('rain') || ForecastDayWeatherArray[1]?.includes('outbreaks') ? (
                  <Image
                    source={LightRain}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[1]?.includes('Mist') ? (
                  <Image
                    source={Mist}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[1]?.includes('Partly') ? (
                  <Image
                    source={PartlyCloudy}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[1]?.includes('snow') ? (
                  <Image
                    source={Snow}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
              </View>
              <View style={styles.DailyForecastReportData}>
                <View>
                  <Text style={styles.ForecastReportDate}>{DayArray[1]}</Text>
                </View>
                <View>
                  <Text style={styles.ForecastTemperature}>
                    {ForecastDayTemperature[1]}°C
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.DailyForecastReport}>
              <View style={styles.DailyForecastWeatherImageContainer}>
                {ForecastDayWeatherArray[2]?.includes('Fog') ? (
                  <Image
                    source={Fog}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[2]?.includes('snow') ? (
                  <Image
                    source={Snow}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[2]?.includes('Clear') ? (
                  <Image
                    source={ClearNight}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[2]?.includes('Sunny') ? (
                  <Image
                    source={ClearDay}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[2]?.includes('Overcast') ? (
                  <Image
                    source={OverCast}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[2]?.includes('rain') || ForecastDayWeatherArray[2]?.includes('outbreaks') ? (
                  <Image
                    source={LightRain}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[2]?.includes('Mist') ? (
                  <Image
                    source={Mist}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[2]?.includes('Partly') ? (
                  <Image
                    source={PartlyCloudy}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
              </View>
              <View style={styles.DailyForecastReportData}>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastReportDate}>{DayArray[2]}</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastTemperature}>
                    {ForecastDayTemperature[2]}°C
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={styles.DailyForecastReport}>
              <View style={styles.DailyForecastWeatherImageContainer}>
                {ForecastDayWeatherArray[3]?.includes('Fog') ? (
                  <Image
                    source={Fog}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[3]?.includes('snow') ? (
                  <Image
                    source={Snow}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[3]?.includes('Clear') ? (
                  <Image
                    source={ClearNight}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[3]?.includes('Sunny') ? (
                  <Image
                    source={ClearDay}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[3]?.includes('Overcast') ? (
                  <Image
                    source={OverCast}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[3]?.includes('rain') || ForecastDayWeatherArray[3]?.includes('outbreaks') ? (
                  <Image
                    source={LightRain}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[3]?.includes('Mist') ? (
                  <Image
                    source={Mist}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[3]?.includes('Partly') ? (
                  <Image
                    source={PartlyCloudy}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
              </View>
              <View style={styles.DailyForecastReportData}>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastReportDate}>{DayArray[3]}</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastTemperature}>
                    {ForecastDayTemperature[3]}°C
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={styles.DailyForecastReport}>
              <View style={styles.DailyForecastWeatherImageContainer}>
                {ForecastDayWeatherArray[4]?.includes('Fog') ? (
                  <Image
                    source={Fog}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[4]?.includes('snow') ? (
                  <Image
                    source={Snow}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[4]?.includes('Clear') ? (
                  <Image
                    source={ClearNight}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[4]?.includes('Sunny') ? (
                  <Image
                    source={ClearDay}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[4]?.includes('Overcast') ? (
                  <Image
                    source={OverCast}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[4]?.includes('rain') || ForecastDayWeatherArray[4]?.includes('outbreaks') ? (
                  <Image
                    source={LightRain}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[4]?.includes('Mist') ? (
                  <Image
                    source={Mist}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[4]?.includes('Partly') ? (
                  <Image
                    source={PartlyCloudy}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
              </View>
              <View style={styles.DailyForecastReportData}>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastReportDate}>{DayArray[4]}</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastTemperature}>
                    {ForecastDayTemperature[4]}°C
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={styles.DailyForecastReport}>
              <View style={styles.DailyForecastWeatherImageContainer}>
                {ForecastDayWeatherArray[5]?.includes('Fog') ? (
                  <Image
                    source={Fog}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[5]?.includes('snow') ? (
                  <Image
                    source={Snow}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[5]?.includes('Clear') ? (
                  <Image
                    source={ClearNight}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[5]?.includes('Sunny') ? (
                  <Image
                    source={ClearDay}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[5]?.includes('Overcast') ? (
                  <Image
                    source={OverCast}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[5]?.includes('rain') || ForecastDayWeatherArray[5]?.includes('outbreaks') ? (
                  <Image
                    source={LightRain}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[5]?.includes('Mist') ? (
                  <Image
                    source={Mist}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[5]?.includes('Partly') ? (
                  <Image
                    source={PartlyCloudy}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
              </View>
              <View style={styles.DailyForecastReportData}>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastReportDate}>{DayArray[5]}</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastTemperature}>
                    {ForecastDayTemperature[5]}°C
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={styles.DailyForecastReport}>
              <View style={styles.DailyForecastWeatherImageContainer}>
                {ForecastDayWeatherArray[6]?.includes('Fog') ? (
                  <Image
                    source={Fog}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[6]?.includes('snow') ? (
                  <Image
                    source={Snow}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[6]?.includes('Clear') ? (
                  <Image
                    source={ClearNight}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[6]?.includes('Sunny') ? (
                  <Image
                    source={ClearDay}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[6]?.includes('Overcast') ? (
                  <Image
                    source={OverCast}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                 {ForecastDayWeatherArray[6]?.includes('rain') || ForecastDayWeatherArray[6]?.includes('outbreaks') ? (
                  <Image
                    source={LightRain}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[6]?.includes('Mist') ? (
                  <Image
                    source={Mist}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
                {ForecastDayWeatherArray[6]?.includes('Partly') ? (
                  <Image
                    source={PartlyCloudy}
                    style={styles.DailyForecastWeatherImage}
                  />
                ) : null}
              </View>
              <View style={styles.DailyForecastReportData}>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastReportDate}>{DayArray[6]}</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <Text style={styles.ForecastTemperature}>
                    {ForecastDayTemperature[6]}°C
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
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
    height:'100%'
  },
  ErrorMessage: {
    color: '#ffffff',
    fontFamily: 'Exo2-Bold',
    fontSize: 20
  },
  LocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding:5
  },
  LocationName: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Exo2-Bold',
  },
  CountryName: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Exo2-Medium',
  },
  ImageContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  Image: {
    height: 200,
    width: 200,
  },
  Temperature: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  Degree: {
    color: '#ffffff',
    fontFamily: 'Exo2-Bold',
    fontSize: 60,
  },
  CurrentWeather: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'Exo2-Regular',
  },
  OtherInfoContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
  InfoItem: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 20,
  },
  IconImage: {
    width: 30,
    height: 30,
  },
  InfoText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 7,
    fontFamily: 'Exo2-SemiBold',
  },
  ForecastContainer: {
    width: 380,
    height: 210,
    borderRadius: 12,
  },
  ForecastHeadingImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  DailyForecastHeading: {
    color: '#fff',
    fontFamily: 'Exo2-Bold',
    fontSize: 18,
  },
  DailyForecastImage: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  DailyForecastReportContainer: {
    flex: 1,
  },
  DailyForecastReport: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 13,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DailyForecastWeatherImageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 7,
  },
  DailyForecastWeatherImage: {
    height: 60,
    width: 60,
  },
  DailyForecastReportData: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ForecastReportDate: {
    color: '#fff',
    fontFamily: 'Exo2-Regular',
    fontSize: 15,
  },
  ForecastTemperature: {
    color: '#fff',
    fontFamily: 'Exo2-Bold',
    fontSize: 20,
  },
});

export default HomeTab;
