import { StyleSheet, View,Text,ScrollView, Linking,Platform } from 'react-native';
import { Button,Switch,TextInput, Checkbox } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, {useState,useEffect,useRef} from 'react';
import Moment, { max } from 'moment';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios from "./axios";


export default function Mainpage({navigation}) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);
  const [isSwitchOn3, setIsSwitchOn3] = useState(false);
  const [isSwitchOn4, setIsSwitchOn4] = useState(false);
  const [isSwitchOn5, setIsSwitchOn5] = useState(false);
  const [time, setTime] = useState(false)
  const [time1, setTime1] = useState(false)
  const [time2, setTime2] = useState(false)
  const [text, setText] = useState("");
  const [weight,setWeight] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [temp, setTemp] = useState("");
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] =useState(false);
  const [checked2, setChecked2] =useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isTimePickerVisible1, setTimePickerVisible1] = useState(false);
  const [isTimePickerVisible2, setTimePickerVisible2] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      
    }),
  });

  const lastNotificationResponse=Notifications.useLastNotificationResponse();

  useEffect(() => {
    if(lastNotificationResponse){
      navigation.navigate('GPS')
       // Linking.openURL("https://reactnative.dev/docs/linking")
    }
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    
    };
  }, [lastNotificationResponse])

  const setCheckBox = () => {
    if(checked){
      axios()
    .put("/setSensor",{
      Sensor:!checked,
      sensorType:'food_bool_1',
    })
    .then((response) => {
      console.warn("meal #1 is disabled");
      setText('')
      setChecked(!checked);
      setTime(false)
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
    }
    else{
      setChecked(!checked);

    }
    

    
 
  
  };
  const setCheckBox1 = () => {
if(checked1){
  axios()
  .put("/setSensor",{
    Sensor:!checked1,
    sensorType:'food_bool_2',
  })
  .then((response) => {
    console.warn("meal #2 is disabled");
    setText1('')
    setChecked1(!checked1);
    setTime1(false)
  })
  .catch((error) => {
    console.log(error)
    if(!error.response)
  return

});
}
else{
  setChecked1(!checked1);
}

 
  };
  const setCheckBox2 = () => {

    if(checked2){
      axios()
    .put("/setSensor",{
      Sensor:!checked2,
      sensorType:'food_bool_3',
    })
    .then((response) => {
      console.warn("meal #3 is disabled");
      setText2('')
      setChecked2(!checked2);
      setTime2(false)
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
    }
    else{
      setChecked2(!checked2);
    }
    
 

  };



  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  
  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };


  const handleConfirm = (time) => {
   hideTimePicker();
  setTime(Moment(time).format("HH:mm"));
  console.warn("A date has been picked: ", Moment(time).format("HH:mm"));
 
  };
  
  const showTimePicker1 = () => {
    setTimePickerVisible1(true);
  };

  
  const hideTimePicker1 = () => {
    setTimePickerVisible1(false);
  };


  const handleConfirm1 = (time1) => {
    hideTimePicker1();
    setTime1(Moment(time1).format("HH:mm"));
    console.warn("A date has been picked: ", Moment(time1).format("HH:mm"));
    
  };
  const showTimePicker2 = () => {
    setTimePickerVisible2(true);
  };

  
  const hideTimePicker2 = () => {
    setTimePickerVisible2(false);
  };

  const handleConfirm2 = (time2) => {
    hideTimePicker2();
    setTime2(Moment(time2).format("HH:mm"));
    console.warn("A date has been picked: ", Moment(time2).format("HH:mm"));
  
  };
  const onToggleSwitch = () =>{ 
 
    axios()
    .put("/setSensor",{
      Sensor:!isSwitchOn,
      sensorType:'light_sensor',
    })
    .then((response) => {
      if(!isSwitchOn)
      {
        console.warn("light sensor is enabled")
        turnOff1('Light')
      
    }
      else
      {console.warn("light sensor is disabled")}
      setIsSwitchOn(!isSwitchOn)
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
  
  };
  const onToggleSwitch1 = () => {
    axios()
    .put("/setSensor",{
      Sensor:!isSwitchOn1,
      sensorType:'water_sensor',
    })
    .then((response) => {
      if(!isSwitchOn1)
      {console.warn("water sensor is enabled")
      turnOff1('Pump')}
      else
      {console.warn("water sensor is disabled")}
      setIsSwitchOn1(!isSwitchOn1)
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
    
 };
  const onToggleSwitch2 = () => {
    axios()
    .put("/setSensor",{
      Sensor:!isSwitchOn2,
      sensorType:'heat_sensor',
    })
    .then((response) => {
      if(!isSwitchOn2)
      {console.warn("heat sensor is enabled")
      turnOff1('Fan')}
      else
      {console.warn("heat sensor is disabled")}
      setIsSwitchOn2(!isSwitchOn2)
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
   };
  const onToggleSwitch3 = () =>{
    axios()
    .put("/setSensor",{
      Sensor:!isSwitchOn3,
      sensorType:'camera',
    })
    .then((response) => {
      if(!isSwitchOn3)
      console.warn("camera is enabled")
      else
      console.warn("camera is disabled")
      setIsSwitchOn3(!isSwitchOn3)
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
  
  };
  const onToggleSwitch4 = () =>{
    axios()
    .put("/setSensor",{
      Sensor:!isSwitchOn4,
      sensorType:'door_sensor',
    })
    .then((response) => {
      if(!isSwitchOn4)
    { console.warn("door sensor is enabled")
    turnOff1('door')}
      else
      {console.warn("door sensor is disabled")}
      setIsSwitchOn4(!isSwitchOn4)
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
  
  };

  const onToggleSwitch5 = () =>{
    axios()
    .put("/setSensor",{
      Sensor:!isSwitchOn5,
      sensorType:'pet_sensor',
    })
    .then((response) => {
      if(!isSwitchOn5)
      console.warn("PetSensor is enabled")
      else
      console.warn("PetSensor is disabled")
      setIsSwitchOn5(!isSwitchOn5)
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
  
  };
  const turnOn = (deviceType) =>{
    axios()
    .put("/turnOn",{
      deviceType:deviceType,
    })
    .then((response) => {
      if(deviceType=="door")
      console.warn(deviceType+" is Opened")
      else
      console.warn(deviceType+" is ON")
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
  }

  const turnOff = (deviceType) =>{


      axios()
      .put("/turnOff",{
        deviceType:deviceType,
      })
      .then((response) => {
        if(deviceType=="door")
        console.warn(deviceType+" is Closed")
        else
        console.warn(deviceType+" is OFF")
      })
      .catch((error) => {
        console.log(error)
        if(!error.response)
      return
    
    });
    

  }

  
  const turnOff1 = (deviceType) =>{


    axios()
    .put("/turnOff",{
      deviceType:deviceType,
    })
    .then((response) => {
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
  

}

  const setMeal = (mealNumber) =>{
   let mealweight
   let mealtime
    if(mealNumber==1)
{
  mealweight=text
  mealtime=time
}
    else if(mealNumber==2)
{  mealweight=text1
  mealtime=time1}
    else if(mealNumber==3)
{  mealweight=text2
  mealtime=time2}

    axios()
    .put("/setMeal",{
      mealNumber:mealNumber,
      time:mealtime,
      weight:mealweight,
    })
    .then((response) => {
      console.warn("Meal #"+mealNumber+" has been set successfully")
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });

  }


  const dropMeal = () =>{
    axios()
    .put("/dropMeal",{
      weight:weight,
    })
    .then((response) => {
      console.warn("Meal "+weight+"g has been dropped")
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
  }
  const Temp = () =>{
    axios()
    .put("/setTemp",{
      temp:temp,
    })
    .then((response) => {
      console.warn("Temperature "+temp+"°C has been set")
    })
    .catch((error) => {
      console.log(error)
      if(!error.response)
    return
  
  });
  }


  return (
    
    <View>

 <ScrollView>

 <View
      style={
        {
          flexDirection: "row",
          height: 70,
          padding:15,
       
        }
      }
      
      >
           <Text style={{marginTop:15,marginRight:17,fontWeight:'bold',fontSize:15}}> Door </Text>
        <View style={{marginRight:20}}>
        <Switch value={isSwitchOn4} onValueChange={onToggleSwitch4} />
        </View>
        <View style={{marginRight:20}}>
        <Button disabled={isSwitchOn4}   icon="door-open" mode="contained" onPress={()=>turnOn('door')}>
        open
      </Button>
        </View>
        <View>
        <Button disabled={isSwitchOn4}  icon="door-closed" mode="contained" onPress={()=>turnOff('door')}>
        Close
      </Button>
        </View>
      </View>
   
      <View
      style={
        {
          flexDirection: "row",
          height: 70,
          padding:15,
       
        }
      }
      
      >
           <Text style={{marginTop:15,marginRight:17,fontWeight:'bold',fontSize:15}}> Light </Text>
        <View style={{marginRight:20}}>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <View style={{marginRight:20}}>
        <Button disabled={isSwitchOn}   icon="lightbulb-on" mode="contained" onPress={()=>turnOn('Light')}>
        On
      </Button>
        </View>
        <View>
        <Button disabled={isSwitchOn}  icon="lightbulb" mode="contained" onPress={()=>turnOff('Light')}>
        Off
      </Button>
        </View>
      </View>
      

      <View
      style={
        {
          flexDirection: "row",
          height: 70,
          padding: 15,
         
        }
      }
      >
         <Text style={{marginTop:15,marginRight:15,fontWeight:'bold',fontSize:15}}> Water </Text>
        <View style={{marginRight:20}}>
        <Switch value={isSwitchOn1} onValueChange={onToggleSwitch1} />
        </View>

        <View style={{marginRight:20}}>
        <Button disabled={isSwitchOn1} icon="water" mode="contained" onPress={()=>turnOn('Pump')}>
        On
      </Button>
        </View>
        <View>
        <Button disabled={isSwitchOn1}  icon="water-off" mode="contained" onPress={()=>turnOff('Pump')}>
        Off
      </Button>
        </View>
      </View>




      <View
      style={
        {
          flexDirection: "row",
          height: 60,
          padding: 10,
         
        }
      }
      >
        <Text style={{marginTop:15,marginRight:22,fontWeight:'bold',fontSize:19}}> Fan </Text>
        <View style={{marginRight:20}}>
        <Switch value={isSwitchOn2} onValueChange={onToggleSwitch2} />
        </View>

        <View style={{marginRight:20}}>
        <Button  disabled={isSwitchOn2} icon="fan" mode="contained" onPress={()=>turnOn('Fan')}>
        On
      </Button>
        </View>
        <View>
        <Button disabled={isSwitchOn2} icon="fan-off" mode="contained"  onPress={()=>turnOff('Fan')}>
        Off
      </Button>
        </View>
      </View>


      <View
      style={
        {
          flexDirection: "row",
          height: 60,
          padding: 5,
         
        }
      }
      >
     <View style={{marginLeft:20}} >
        <TextInput
        disabled={!isSwitchOn2}
       style={{width:150,height:50}}
      label="Temperature °C"
      keyboardType="numeric"
      value={temp}
      onChangeText={temp => setTemp(temp)}
    />
        </View>
         <View>
        <Button style={{marginLeft:20}} disabled={!isSwitchOn2} icon="temperature-celsius" mode="contained"  onPress={()=>Temp()}>
        Set
      </Button>
        </View>
      </View>




      <View
      style={
        {
          flexDirection: "row",
          height: 60,
          padding: 10,
         
        }
      }
      >
         <Text style={{marginTop:15,fontWeight:'bold',fontSize:15.5}}> Camera </Text>
        <View style={{marginRight:20}}>
        <Switch value={isSwitchOn3} onValueChange={onToggleSwitch3} />
        </View>

        <View style={{marginRight:10}}>
        <Button disabled={!isSwitchOn3} icon="camera" mode="contained" onPress={() => navigation.navigate('Camera')}>
       Watch
      </Button>
      
        </View>
        <Text style={{marginTop:15,fontWeight:'bold',fontSize:14.5}}> Pet Sensor </Text>
        <View style={{marginRight:20}}>
        <Switch value={isSwitchOn5} onValueChange={onToggleSwitch5} />
        </View>
      
{/* ////////////////////////////////////////////////////////////////////////////////// */}

      </View>

      <Text style={{marginLeft:20,fontWeight:'bold'}}> Drop Food </Text>

      <View
       style={
        {
          flexDirection: "row",
          height: 60,
          padding: 10,
          marginLeft:25
        }
      }
      >
           <View >
      </View>
        <View style={{flex:0}}>
        <TextInput
       style={{width:120,height:70}}
      label="Weight (g)"
      keyboardType="numeric"
      value={weight}
      onChangeText={weight => setWeight(weight)}
    />
        </View>
        
       <View>
       
    </View>
    <Button mode="contained" style={{marginLeft:10}} icon="food"  onPress={()=>dropMeal()}> Drop </Button>

  

     
     
        <View>
        </View>

        
        
      </View>

      <Text id="Morning" style={{marginLeft:20,marginTop:30,fontWeight:'bold'}}> Meal 1 </Text>
      <View
     style={
        {
          flexDirection: "row",
          height: 60,
          padding: 10,
          
        }
      }
    
      >
       <View style={{marginTop:15,marginRight:5}}  >
    <Checkbox label="Morning" status={checked ? 'checked' : 'unchecked'} onPress={setCheckBox} ></Checkbox>
      </View>
        <View style={{flex:1}}>
        <TextInput 
       disabled={!checked}
      label="Weight (g)"
      value={text}
      keyboardType="numeric"
      onChangeText={text => setText(text)}
    />
        </View>
       <View>
    </View>

  
    <View>
      <Button  title=""  disabled={!checked}  onPress={showTimePicker}> Pick Time</Button>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
    </View>
 
    <Button mode="contained"  disabled={time==false}  icon="food"  onPress={()=>setMeal(1)}> Set </Button>


     
        <View>
        </View>

        
        
      </View>



      <Text style={{marginLeft:20,marginTop:20,fontWeight:'bold'}}> Meal 2 </Text>
      <View
      style={
        {
          flexDirection: "row",
          height: 60,
          padding: 10,
          
        }
      }
      >
      
     <View style={{marginTop:15,marginRight:5}}  >
    <Checkbox  label="Morning" status={checked1 ? 'checked' : 'unchecked'} onPress={setCheckBox1} ></Checkbox>
      </View>
        <View style={{flex:1}}>
        <TextInput
          disabled={!checked1}
      label="Weight (g)"
      keyboardType="numeric"
      value={text1}
      onChangeText={text1 => setText1(text1)}
    />
        </View>
       <View>
    </View>

    <View>
    
      <Button title=""  disabled={!checked1} onPress={showTimePicker1}> Pick Time</Button>
      <DateTimePickerModal
        isVisible={isTimePickerVisible1}
        mode="time"
        date={new Date()}
        onConfirm={handleConfirm1}
        onCancel={hideTimePicker1}
      />
    </View>
    
    <Button mode="contained" disabled={time1==false}  icon="food"  onPress={()=>setMeal(2)}> Set </Button>

     
        <View>
        </View>

        
        
      </View>

      <Text style={{marginLeft:20,marginTop:20,fontWeight:'bold'}}> Meal 3 </Text>

      <View
      style={
        {
          flexDirection: "row",
          height:  60,
          padding: 10,
          
        }
      }
      >
           <View style={{marginTop:15,marginRight:5}}  >
    <Checkbox  label="Morning" status={checked2 ? 'checked' : 'unchecked'} onPress={setCheckBox2} ></Checkbox>
      </View>
        <View style={{flex:1}}>
        <TextInput
       disabled={!checked2}
      label="Weight (g)"
      keyboardType="numeric"
      value={text2}
      onChangeText={text2 => setText2(text2)}
    />
        </View>
       <View>
    </View>

    <View>
      <Button disabled={!checked2} title="" onPress={showTimePicker2}> Pick Time</Button>
      <DateTimePickerModal
        isVisible={isTimePickerVisible2}
        mode="time"
        date={new Date()}
        onConfirm={handleConfirm2}
        onCancel={hideTimePicker2}
      />
    </View>
    
    <Button mode="contained" disabled={time2==false}  icon="food"  onPress={()=>setMeal(3)}> Set </Button>

     
        <View>
        </View>

        
        
      </View>


      <View 
      style={
        {
          flexDirection: "row",
          height: 80,
          padding: 18,
          marginTop:20
        }
      }
      >

        <Button  icon="crosshairs-gps" mode="contained" onPress={() => navigation.navigate('GPS')}>
        Locate your pet (GPS)
      </Button>
      </View>

     
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

async function registerForPushNotificationsAsync() {
    
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}