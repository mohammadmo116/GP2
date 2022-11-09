#include <TinyGPS++.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include "SoftwareSerial.h"
TinyGPSPlus gps;
static const uint32_t GPSBaud = 9600;
SoftwareSerial gps_serial( D1, D2);
const char* ssid = "AndroidM";
const char* password = "12345678";
String serverName = "http://192.168.43.86:8000"; ////edited

unsigned long lastTime = 0;
unsigned long timerDelay = 7000;
void setup()
{ 
  gps_serial.begin(GPSBaud);
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
 while (WiFi.status() != WL_CONNECTED) {
       delay(500);
    Serial.print(".");
     if ((millis() - lastTime) > timerDelay) {
        WiFi.begin(ssid, password);
         Serial.print("-");
    lastTime = millis();}
 
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop()
{

  // Send an HTTP POST request depending on timerDelay

  if(gps_serial.available() > 0)
    if (gps.encode(gps_serial.read()))
     { displayInfo();
     delay(3000);
     }
  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
  }

}

  void displayInfo()
{
  Serial.print(F("Location: ")); 
  if (gps.location.isValid())
  {
    
  String data = "latitude="+String(gps.location.lat(),6)+"&longitude="+String(gps.location.lng(),6);           
    putRequest("/api/setGps",data);
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
    Serial.println("");
    Serial.println("");
  
  }
  else
  {
    Serial.println(F("INVALID"));

  }
}




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
