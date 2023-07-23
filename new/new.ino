//Nodemcu library
#include <ESP8266WiFi.h>

//Nodemcu Fetch data library
#include <ESP8266HTTPClient.h>
//DHT22 library
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ArduinoJson.h>

#define DHTPIN D7
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
#define SERVER_IP "172.26.0.186"
#define PORT "5000"
#ifndef WIFI_ID
#define WIFI_ID "abcd"
#define WIFI_PASSWORD  "abcd1234"
#endif

#define RELAY_1 D0 // Pin connected to relay module channel 1
#define RELAY_2 D1 // Pin connected to relay module channel 2
#define RELAY_3 D2 // Pin connected to relay module channel 3
#define RELAY_4 D3 // Pin connected to relay module channel 4

String hum = "";
String temp = "";
String data = "";
int _mode = -1; // 0 check for rfid, 1 check pin

 void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(RELAY_1, OUTPUT);
  pinMode(RELAY_2, OUTPUT);
  pinMode(RELAY_3, OUTPUT);
  pinMode(RELAY_4, OUTPUT);
  Serial.println();
  Serial.println();
  Serial.println();
  WiFi.begin(WIFI_ID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
  dht.begin();
}

// function to delimit the string
String delimit_string(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = { 0, -1 };
  int maxIndex = data.length() - 1;

 

  for (int i = 0; i <= maxIndex && found <= index; i++) {
    if (data.charAt(i) == separator || i == maxIndex) {
      found++;
      strIndex[0] = strIndex[1] + 1;
      strIndex[1] = (i == maxIndex) ? i + 1 : i;
    }
  }
  return found > index ? data.substring(strIndex[0], strIndex[1]) : "-1";
}

void getSensorData() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" *C");
  if ((WiFi.status() == WL_CONNECTED)) {
    WiFiClient client;
    if (Serial.available()) {
      if (Serial.read() == '#') {
        String data = Serial.readStringUntil('\n');
        String  hum = delimit_string(data, ',', 0);
        String  temp = delimit_string(data, ',', 1);
        String  soil = delimit_string(data, ',', 2);
        String  gas = delimit_string(data, ',', 3);
        Serial.print("HUM: ");
        Serial.print(hum);
        Serial.print("TEMP: ");
        Serial.print(temp);
        Serial.print("SOIL: ");
        Serial.print(soil);
        Serial.print("GAS: ");
        Serial.println(gas);
      }
    }
        HTTPClient http;
        String toSend = "http://" SERVER_IP ":" PORT "/api/data/";
        toSend += String(humidity) + "/"+ String(temperature);
        http.begin(client, toSend); //HTTP

 

        int httpResponseCode = http.GET();
        if (httpResponseCode > 0) {
          const String& payload = http.getString();
          Serial.println(payload);
        }
        else {
          Serial.println("#0,0,Request Timeout");
        }
        http.end();
  }

}
void getRelayData() {
  HTTPClient http;
  WiFiClient client;
  String toSend = "http://" SERVER_IP ":" PORT "/api/get-relay/";
  http.begin(client, toSend); //HTTP
  int httpResponseCode = http.GET();
  String payload = http.getString();
  Serial.println(payload);
  if (httpResponseCode == 201)
  {
    // Allocate JsonBuffer
    // Use arduinojson.org/assistant to compute the capacity.
    const size_t capacity = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(2) + 60;
    DynamicJsonBuffer jsonBuffer(capacity);
    // Parse JSON object
    JsonObject& root = jsonBuffer.parseObject(payload);
    if (!root.success()) {
      Serial.println(F("Parsing failed!"));
      return;
    }
    // Decode JSON/Extract values
    Serial.println(F("Response:"));
    Serial.println(root["relay1"].as<char*>());
    Serial.println(root["relay2"].as<char*>());
    Serial.println(root["relay3"].as<char*>());
    Serial.println(root["relay4"].as<char*>());
    if (root["relay1"] == "true") {
      digitalWrite(D0, HIGH);
    } else {
      digitalWrite(D0, LOW);
    }
    if (root["relay2"] == "true") {
      digitalWrite(D1, HIGH);
    } else {
      digitalWrite(D1, LOW);
    }
    if (root["relay3"] == "true") {
      digitalWrite(D2, HIGH);
    } else {
      digitalWrite(D2, LOW);
    }
    if (root["relay4"] == "true") {
      digitalWrite(D3, HIGH);
    } else {
      digitalWrite(D3, LOW);
    }
  }
  else
  {
    Serial.println("Error in response");
  }
  http.end();
}
void loop() {
  delay(1000); // Delay between readings
  //  float humidity = dht.readHumidity();
  //  float temperature = dht.readTemperature();
  //
  //  // Check if any reads failed and exit early (to try again).
  //  if (isnan(humidity) || isnan(temperature)) {
  //    Serial.println("Failed to read from DHT sensor!");
  //    return;
  //  }
  //
  //  Serial.print("Humidity: ");
  //  Serial.print(humidity);
  //  Serial.print(" %\t");
  //  Serial.print("Temperature: ");
  //  Serial.print(temperature);
  //  Serial.println(" °C");
  getSensorData();
  getRelayData();
  //  if (httpResponseCode > 0) {
  //    const String& payload = http.getString();
  //    Serial.println(payload);
  //  }
}
