import {View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { Slider } from 'react-native-elements';
import { useState, useEffect } from 'react';
import DatePicker from 'react-native-datepicker';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FilterScreen = ({navigation}) => {
  const [state, setState] = useState({
    radius: 0,
    price: 0,
    bikeSize: 0,
    datesAvailable: "",
  });
  
  const [radius, setRadius] = useState(20)
  const [price, setPrice] = useState(20)
  const [bikeSize, setBikeSize] = useState(1)

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    });
  };

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selected, setSelected] = useState('');

  const handleDayPress = (date) => {
    if (!startDate) {
      setStartDate(date.dateString);
      setSelected(date.dateString);
    } else if (startDate && !endDate && new Date(date.dateString) > new Date(startDate)) {
      setEndDate(date.dateString);
      setSelected(date.dateString);
    } else {
      setStartDate(date.dateString);
      setEndDate('');
      setSelected(date.dateString);
    }
  };

  const markedDates = {};
  markedDates[startDate] = { selected: true, startingDay: true, color: '#2ecc71' };
  markedDates[endDate] = { selected: true, endingDay: true, color: '#2ecc71' };
  if (startDate && endDate) {
    const range = {
      start: startDate,
      end: endDate,
      color: '#2ecc71',
      textColor: 'white',
    };
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      markedDates[currentDate.toISOString().slice(0, 10)] = range;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  } 

  return (
    <View style={styles.container}>
      
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        markingType="period"
        theme={{
          arrowColor: '#2ecc71',
          selectedDayBackgroundColor: '#2ecc71',
          selectedDayTextColor: 'white',
        }}
      />
      
      <View style={styles.slider}>
  <Slider
    value={radius}
    maximumValue={50}
    thumbStyle={{ height: 20, width: 20, backgroundColor: 'grey' }}
    onValueChange={(value) => {
      setRadius(value)
    }}
  />
  <Text>Radius: {radius.toFixed()} miles</Text>
</View>
<View style={styles.slider}>
  <Slider
    value={price}
    maximumValue={50}
    thumbStyle={{ height: 20, width: 20, backgroundColor: 'grey' }}
    onValueChange={(value) => {
      setPrice(value)
    }}
  />
  <Text>Price: {price.toFixed()}</Text>
</View>
<View style={styles.slider}>
  <Slider
    value={state.bikeSize}
    maximumValue={3}
    thumbStyle={{ height: 20, width: 20, backgroundColor: 'grey' }}
    onValueChange={(value) => {
      setBikeSize(value)
    }}
  />
  <Text>Bike Size: {bikeSize.toFixed()}</Text>
</View>
    <View style={styles.button}>
      <Button 
        title='Save'
        color= 'white'
        onPress={() => navigation.navigate("HomeScreen")}
        />
    </View>

</View>

  );
}

const styles = StyleSheet.create ({
  slider: {
    flex: 1, 
    alignItems: 'stretch', 
    justifyContent: 'space-evenly',
    width: '100%',
    margin: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: "column",
    backgroundColor: "#cbe7f5",
    alignItems: "center",
    padding: 50,
  },
  button: {
    borderRadius: 5,
    width: '100%', 
    padding: 2,
    backgroundColor: '#1e90ff',
    height: 45,
    
},
label: {
  fontSize: 18,
  fontWeight: 'bold',
  marginVertical: 10,
},
datePicker: {
  width: 200,
  marginBottom: 10,
  color: '#1e90ff',
},
dateRangeContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 20,
  color: '#1e90ff',
},
dateContainer: {
  alignItems: 'center',
  color: '#1e90ff',
},

date: {
  fontSize: 10,
  fontWeight: 'bold',
},

})

export default FilterScreen;



