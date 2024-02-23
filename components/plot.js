import React from 'react';
import { View, Dimensions, Text, TouchableOpacity, Switch } from 'react-native';
import moment from 'moment';
import PureChart from 'react-native-pure-chart';
import { useState } from 'react';
const LinePlot = ({ data, mlData }) => {
  const [showData1, setShowData1] = useState(true);
const toggleData = () => {
    setShowData1(prevState => !prevState);
  };
  // Extract dates and moods from data
  let plotData =data.map(item => ({
    x: moment(item.date).format('DD-MM'), // Assuming you're using moment.js for date formatting
    y: item.mood
  }));
  let mlPlotData=mlData.map(item => ({
    x: moment(item.date).format('DD-MM'), // Assuming you're using moment.js for date formatting
    y: item.mood
  }));
/*    
// Combine dates from both arrays and convert them to a set to remove duplicates
const allDatesSet = new Set([...plotData.map(item => item.x), ...mlPlotData.map(item => item.x)]);

// Convert the set back to an array of unique dates
const allDates = Array.from(allDatesSet);

// Function to check if a date exists in an array
const dateExists = (date, dataArray) => dataArray.some(item => item.x === date);

// Placeholder y value
const placeholderY = 0;

// Add missing dates with placeholder y value to plotData array
allDates.forEach(date => {
  if (!dateExists(date, plotData)) {
    plotData.push({ x: date, y: placeholderY });
  }
});

// Add missing dates with placeholder y value to mlPlotData array
allDates.forEach(date => {
  if (!dateExists(date, mlPlotData)) {
    mlPlotData.push({ x: date, y: placeholderY });
  }
});
*/
    // Sort the arrays by date in ascending order
plotData = plotData.sort((a, b) => moment(a.x, 'DD-MM').toDate() - moment(b.x, 'DD-MM').toDate());
  mlPlotData = mlPlotData.sort((a, b) => moment(a.x, 'DD-MM').toDate() - moment(b.x, 'DD-MM').toDate());
    const chartData = showData1 ? plotData : mlPlotData;

  return (
    <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
      <View style={{ flexDirection: 'row', marginLeft: 15 }}>
        <Text style={{ fontWeight: '500', fontSize: 30, marginVertical: 10, flex:1 }}>Mood Statistics</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#7455f6' }}
          thumbColor={showData1 ? '#813082' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleData}
          value={showData1}
          style={{flex:0, marginVertical:10}}
        />
      </View>
      <View>
        <Text style={{alignSelf:'center', fontWeight:'bold', marginBottom:10}}>{showData1 ?'Your input mood':'ML-assessed mood'}</Text>
          <PureChart
              width={'50%'}
              height={250}
              data={chartData}
              maxValue={5}
              minValue={0}
              type='line'
              customValueRenderer={(index, point) => {
                if (point.y==0) return <Text>N/A</Text>
                return (
                  <Text style={{textAlign: 'center'}}>{point.y}</Text>
                )
        }}    
        />
        </View>
</View>
  );
};

export default LinePlot;
