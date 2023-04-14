import {View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { Calendar } from 'react-native-calendars';
import { useState, useEffect } from 'react';

const RentalScreen = ({route, navigation}) => {
    const { itemId, itemName, itemDisc, itemBrand, itemSize, itemPrice, itemImageUrl, userId, itemAddress } = route.params;

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selected, setSelected] = useState('');
    const [numOfDays, setNumOfDays] = useState(0);

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

    const getDaysBetweenDates = (date1, date2) => {
        const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        return diffDays + 1;
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

    useEffect(() => {
        console.log("start")
        console.log(startDate)
        console.log("end")
        console.log(endDate)
        const days = getDaysBetweenDates(startDate, endDate)
        setNumOfDays(days)

    },[startDate, endDate])

    return(
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
      <View style={styles.textContainer}>
        <Text style={styles.label}>Number of Days: {isNaN(numOfDays)? 0 : numOfDays }</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Price/day: {itemPrice}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Total Price: {isNaN(numOfDays)? 0 : numOfDays * itemPrice}</Text>
      </View>
      <View style={styles.button}>
        <Button 
            title='Confirm'
            onPress={() =>  {
                //Show a popup that says successfully rented and navigate to profile screen
                //Enter the renting data to the firebase data with the user id of the user who rented it.
            }}
            color='white'
        />
        </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: "column",
        backgroundColor: "#cbe7f5",
        alignItems: "center",
        padding: 10,
        gap: 25,
        paddingTop: 50,
        
        },
    button: {
        borderRadius: 5,
        position: 'absolute', 
        bottom: 0, 
        marginBottom: 50, 
        backgroundColor: '#1e90ff',
        flex: 1,
        height: 60,
        padding: 10,
        width: '80%',
        color: 'black'
        
        },
    textContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white', 
        borderRadius: 0, 
        width: '80%',
        height: '7%',
        
        },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#143342',
        padding: 10,
        paddingTop: 20,
        textAlign: 'center'
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

export default RentalScreen;