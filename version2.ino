#include <TinyGPSPlus.h>
#include "SoftwareSerial.h"
#include <WiFi.h>
#include <sys/time.h>
#include <time.h>
#include <HTTPClient.h>
#include <Servo.h>
#include "DHT.h"
#include <HX711_ADC.h>
#include "ArduinoJson.h"
#if defined(ESP8266)|| defined(ESP32) || defined(AVR)
#include <EEPROM.h>
#endif

TinyGPSPlus gps;
Servo myservo;
Servo myservo2;
SoftwareSerial gps_serial( 12, 13);


//Weight pins RX2+D2
const int HX711_dout = 16; //mcu > HX711 dout pin
const int HX711_sck = 2; //mcu > HX711 sck pin
//Do not touch
HX711_ADC LoadCell(HX711_dout, HX711_sck);
const int calVal_eepromAdress = 2;
unsigned long t = 0;
//
#define DHTTYPE DHT11



//Input ADC
#define LIGHT_SENSOR_PIN  36
#define HEAT_SENSOR_PIN  4
#define WATER_SENSOR_PIN  34
#define IR1_SENSOR_PIN  35
#define IR2_SENSOR_PIN  33
#define DOOR_LED_PIN  32
DHT dht(HEAT_SENSOR_PIN, DHTTYPE);
// Output Digital
static const uint32_t GPSBaud = 9600;
#define LED_PIN           22
#define NOISE_PIN           21
#define PUMP_PIN           18
#define CAMERA_PIN           19
//Thresholds for sensors CHANGE AS NEEDED
#define LIGHT_THRESHOLD  500
#define WATER_UPPER_THRESHOLD  1600
#define WATER_DOWN_THRESHOLD  1050
#define IR1_THRESHOLD  1000
#define IR2_THRESHOLD  1000

float databaseweight = 0;
float HEAT_UPPER_THRESHOLD, HEAT_DOWN_THRESHOLD, temp;

// read them from DB inside the code, if true then sensor will work otherwise it won't so the user can use the phone buttons instead.
bool schedule = true;
bool watersensor, heatsensor, lightsensor, led_db, fan, camera_db, pump_db, irsensors,petsensor,human,pet, door_db, food1_bool, food2_bool, food3_bool,food_bool = false;
int weight,weight1,weight2,weight3;


const char* ssid = "AndroidM";
const char* password = "12345678";


//Your Domain name with URL path or IP address with path
String serverName = "http://192.168.43.86:8000"; ////edited

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
unsigned long lastTime2 = 0;
unsigned long lastTime3 = 0;
unsigned long timerDelay = 500;
unsigned long timerDelay2 = 5000;
unsigned long timerDelay3 = 2000;
int taree=0;
int wb=0;
bool feed1_f=false,feed2_f=false,feed3_f=false;

void setup() {
  Serial.begin(57600);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
       delay(500);
    Serial.print(".");
     if ((millis() - lastTime) > timerDelay2) {
        WiFi.begin(ssid, password);
    lastTime = millis();}
 
  }
  lastTime=0;
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");


  gps_serial.begin(GPSBaud);
  pinMode(LED_PIN, OUTPUT); // set ESP32 pin to output mode
  pinMode(NOISE_PIN, OUTPUT); // set ESP32 pin to output mode
  digitalWrite(NOISE_PIN, HIGH);
  pinMode(PUMP_PIN, OUTPUT); // set ESP32 pin to output mode
  digitalWrite(PUMP_PIN, HIGH);
  pinMode(CAMERA_PIN, OUTPUT); // set ESP32 pin to output mode
    digitalWrite(CAMERA_PIN, HIGH);
  pinMode(DOOR_LED_PIN, OUTPUT); // set ESP32 pin to output mode

  pinMode(12, OUTPUT); // set ESP32 pin to output mode
  digitalWrite(12, LOW);
  // Comment out when using database, these are test values

  // ==============================================
  dht.begin();
  myservo.attach(14);
  myservo2.attach(15);
  myservo2.write(90);
  myservo.write(13);

  //Serial.println();
  LoadCell.begin();
  float calibrationValue; // calibration value (see example file "Calibration.ino")
#if defined(ESP8266)|| defined(ESP32)
  EEPROM.begin(512); // uncomment this if you use ESP8266/ESP32 and want to fetch the calibration value from eeprom
#endif
  EEPROM.get(calVal_eepromAdress, calibrationValue); // uncomment this if you want to fetch the calibration value from eeprom

  unsigned long stabilizingtime = 3000; // preciscion right after power-up can be improved by adding a few seconds of stabilizing time
  boolean _tare = true; //set this to false if you don't want tare to be performed in the next step
  LoadCell.start(stabilizingtime, _tare);
  if (LoadCell.getTareTimeoutFlag()) {
    Serial.println("Timeout, check MCU>HX711 wiring and pin designations");
    while (1);
  }
  else {
    LoadCell.setCalFactor(calibrationValue); // set calibration value (float)
    Serial.println("Startup is complete");
  }

}

void loop() {
  int lightValue = analogRead(LIGHT_SENSOR_PIN); // read the value on analog pin
  int waterValue = analogRead(WATER_SENSOR_PIN); // read the value on analog pin
  int IR1Value = analogRead(IR1_SENSOR_PIN); // read the value on analog pin
  int IR2Value = analogRead(IR2_SENSOR_PIN); // read the value on analog pin
  float heatValue = dht.readTemperature(); // read the value on analog pin

  if ((millis() - lastTime) > timerDelay) {
    StaticJsonBuffer<1200> JSONBuffer;
    JsonObject& parsed = JSONBuffer.parseObject(getRequest("/api/all"));
  
    watersensor = parsed["water_sensor"];
    heatsensor = parsed["heat_sensor"];
    led_db = parsed["light"];
    lightsensor = parsed["light_sensor"];
    fan = parsed["fan"];
    camera_db = parsed["camera"];
    pump_db = parsed["pump"];
    irsensors = parsed["door_sensor"];
    petsensor= parsed["pet_sensor"];
    door_db = parsed["door"];
    food_bool=parsed["food_bool"];
    food1_bool = parsed["food_bool_1"];
    food2_bool = parsed["food_bool_2"];
    food3_bool = parsed["food_bool_3"];
    feed1_f= parsed["feed1_f"];
    feed2_f= parsed["feed2_f"];
    feed3_f= parsed["feed3_f"];
    weight= parsed["weight_value"];
    weight1= parsed["weight_value_1"];
    weight2=parsed["weight_value_2"];
    weight3=parsed["weight_value_3"];
    temp = (float)parsed["temp"];
    HEAT_UPPER_THRESHOLD = temp + 2;
    HEAT_DOWN_THRESHOLD = temp;

    lastTime = millis();
  }
  
     if(feed1_f==true || feed2_f==true || feed3_f==true ||food_bool==true){
    timerDelay=3000;
    }
    else{
      timerDelay=500;
      }


  while (gps_serial.available() > 0)
    /*if (gps.encode(gps_serial.read()))
      displayInfo();*/

    if (millis() > 5000 && gps.charsProcessed() < 10)
    {
      Serial.println(F("No GPS detected: check wiring."));
      //while(true);
    }



  if (watersensor)
  {
   // Serial.println(waterValue);
   // delay(500);
    if (waterValue <= WATER_DOWN_THRESHOLD)
    {
      digitalWrite(PUMP_PIN, LOW);
    }
    else if (waterValue >= WATER_UPPER_THRESHOLD)
    {

      digitalWrite(PUMP_PIN, HIGH);

    }
  }
  else
  {
    //readbutton value from DB and write it onto the digitalpin using digitalWrite
    if (pump_db)
      digitalWrite(PUMP_PIN, LOW);

    else
      digitalWrite(PUMP_PIN, HIGH);

  }



  if (lightsensor)
    sensor_function(lightValue, LIGHT_THRESHOLD, LED_PIN );
  else
  {
    //readbutton value from DB and write it onto the digitalpin using digitalWrite
    if (led_db)
    { digitalWrite(LED_PIN, HIGH);
    }
    else
    {
      digitalWrite(LED_PIN, LOW);
    }

  }


  if (heatsensor)
  {
    if (heatValue <= HEAT_DOWN_THRESHOLD)
    {
      digitalWrite(NOISE_PIN, HIGH);
    }
    else if (heatValue >= HEAT_UPPER_THRESHOLD)
    {

      digitalWrite(NOISE_PIN, LOW);

    }
  }
  else
  {
    //readbutton value from DB and write it onto the digitalpin using digitalWrite
    if (fan)
      digitalWrite(NOISE_PIN, LOW);

    else
      digitalWrite(NOISE_PIN, HIGH);

  }




  if (irsensors)
    sensor_function_door(IR1Value, IR1_THRESHOLD, DOOR_LED_PIN );
  else
  {
    //readbutton value from DB and write it onto the digitalpin using digitalWrite
    if (door_db)
    {
      digitalWrite(DOOR_LED_PIN, HIGH);
      myservo2.write(0);
    }
    else
    { digitalWrite(DOOR_LED_PIN, LOW);
      myservo2.write(90);
    }

  }

  

    if (petsensor)
    {
      
   if(IR1Value<=1000){
    }
   else{
 if(IR2Value<=1000){
  human=false;
  unsigned long startTimep = millis();
  while (millis() - startTimep < timerDelay3) 
  {  
     IR1Value = analogRead(IR1_SENSOR_PIN);
     if(IR1Value<=1000)
     {human=true;
     startTimep=-2000;}
  }
  if(!human)
  {
    String da=getRequest("/api/notify");
    Serial.print("Notify");
  }
  
  }

    }
    }
  
 
  
    {
      if (camera_db)
          digitalWrite(CAMERA_PIN, LOW);
      else
          digitalWrite(CAMERA_PIN, HIGH);

    }



  //=========================Weight=====================
  // check for new data/start next conversion:

   float weightvalue;
      float weightMax=0;
  static boolean newDataReady = 0;
  const int serialPrintInterval = 0; //increase value to slow down serial print activity
   for(int y=0;y<10;y++){
      
    if (LoadCell.update()) newDataReady = true;
    if (newDataReady) {
      if (millis() > t + serialPrintInterval) {
        weightvalue = LoadCell.getData();
        if(weightvalue>weightMax)
        weightMax=weightvalue;
        newDataReady = 0;
        t = millis();
      }
    }
    }
         Serial.print("Load_cell output val: ");
        Serial.println(weightMax);
    
    if (Serial.available() > 0) {
      char inByte = Serial.read();
      if (inByte == 't') LoadCell.tareNoDelay();
    }

    // check if last tare operation is complete:
    if (LoadCell.getTareStatus() == true) {
      Serial.println("Tare complete");
    }
    
if(food_bool){
  feeding(weight,4,weightMax);
}
if(feed1_f)
{
  feeding(weight1,1,weightMax);
  }
if(feed2_f)
{feeding(weight2,2,weightMax);
  }
if(feed3_f)
{feeding(weight3,3,weightMax);}

  delay(200);
}


void feeding(float weight,int x,float weightval){
  wb++;
   if(taree==0)
   {
    LoadCell.tare();
    Serial.println("tared");
   taree=1;
    }
    else {
      if(wb==15){
    
      wb=0;
    if (weightval < weight)
    {
 // myservo.write(60);

    myservo.write(40);
    delay(550);
    myservo.write(13);
    }

    else
    {
   if(x==1)
   {feed1_f=false;
     putRequest("/api/feed_f","a=1");
   }
   else if(x==2)
{feed2_f=false;
 putRequest("/api/feed_f","a=2");
}
else if(x==3)
{feed3_f=false;
 putRequest("/api/feed_f","a=3");
}
else if(x==4)
{food_bool=false;
  putRequest("/api/food_bool","a=0");
}
taree=0;
    }
    }
}
  }
void sensor_function (float value_read, float given_threshold, int given_pin)
{

    //   Serial.print("TEMPERATURE = ");
     //  Serial.print(value_read);

  if (value_read <= given_threshold)
  {
    digitalWrite(given_pin, LOW);
  }
  else
  {
    //     Serial.print("TEMPERATURE = ");
    //         Serial.print(value_read);
    digitalWrite(given_pin, HIGH);

  }
}
void sensor_function2 (float value_read, float given_threshold, int given_pin)
{


  if (value_read <= given_threshold)
  {
    digitalWrite(given_pin, HIGH);
  }
  else
  {

    digitalWrite(given_pin, LOW);

  }
}
void sensor_function_door (float value_read, float given_threshold, int given_pin)
{


  if (value_read <= given_threshold)
  {
    digitalWrite(given_pin, HIGH);
    myservo2.write(0);
     lastTime2 = millis();
  }
  else
  {
      if ((millis() - lastTime2) > timerDelay3) {
          digitalWrite(given_pin, LOW);
          myservo2.write(90);
       
  }
  

  }
}

void displayInfo()
{
  Serial.print(F("Location: "));
  if (gps.location.isValid())
  {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
  }
  else
  {
    Serial.print(F("INVALID"));
  }
}

boolean distancecalc()
{
  //return (allowedDistance < TinyGPSPlus::distanceBetween(gps.location.lat(), gps.location.lng(), landingLat, landingLng));
}

///////////////PUT
void putRequest(String pathName, String Data) {
  //Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    String serverPath = serverName + pathName;
    // Your Domain name with URL path or IP address with path
    http.begin(client, serverPath);

    // Specify content-type header
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    // Data to send with HTTP POST
    String httpRequestData = Data;
    // Send HTTP POST request
    int httpResponseCode = http.PUT(httpRequestData);

    /*
      // If you need an HTTP request with a content type: application/json, use the following:
      http.addHeader("Content-Type", "application/json");
      // JSON data to send with HTTP POST
      String httpRequestData = "{\"api_key\":\"" + apiKey + "\",\"field1\":\"" + String(random(40)) + "\"}";
      // Send HTTP POST request
      int httpResponseCode = http.POST(httpRequestData);*/

    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }


}


///////////////GET
String getRequest(String pathName) {

  //Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    String serverPath = serverName + pathName;

    // Your Domain name with URL path or IP address with path
    http.begin(serverPath.c_str());

    // Send HTTP GET request
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      //        Serial.println(payload);
      return payload;
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
      return "-1";
    }
    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
    return "-1";
  }

}
