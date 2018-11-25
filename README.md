# Mobile Patient Portal
## Mobile App meeting the needs of 21 century customer

## Motivation
When it comes to healthcare despite having really good public information systems NFZ lacks a client facing application where patient can get all of their data. 

![mobile app](https://i.imgur.com/tcFNom4.png)

We present here platform that let's you:
* Find a specialist that you need, with online diagnose (using API [symptomate] https://symptomate.com)
* Get schedules of treatments (from [terminy leczenia] https://api.nfz.gov.pl/#structure)
* Get your history of treatment (from [ZIP] https://zip.nfz.gov.pl)
* Rate doctors (for initialization we used [google maps] and [znany lekarz])
* Reports any abuse of possible frauds from historical treatments

Mobile app is user friendly. Runs on both android and ios. To build it we used react-native.

## Screens

#### Historical treatment, report and rate
![diagnose](https://i.imgur.com/dqMqDUI.png)
![diagnose](https://i.imgur.com/vpcSofT.png)
![diagnose](https://i.imgur.com/f3sthsb.png)

#### Diagnose and show doctors
##### Online diagnose
![diagnose](https://i.imgur.com/HnagOmc.png)
![diagnose](https://i.imgur.com/YU0kLBf.png)
![diagnose](https://i.imgur.com/CaRtRoT.png)
![diagnose](https://i.imgur.com/onRPzdX.png)
![diagnose](https://i.imgur.com/1KrtkAl.png)

##### Next we show you a recomendation to a list of places you could go to based on your symptoms
![diagnose](https://i.imgur.com/aZupPuH.png)

##### We give you a detailed window with information about the place and all contact details you need to book a visit
![diagnose](https://i.imgur.com/8dvpccc.png)

#### Find available dates for treatment
![diagnose](https://i.imgur.com/3qWFpwf.png)


## What you find in this repository
This repository contains two projects
- frontend (react native)
- backend (nodejs)

## Getting Started

#### Frontend part
Frontend part of the App is written using React native and Expo, meaning you can have mobile app

If you want to build mobile app for Android or IOS from source code, first step make sure you have Git, Node and npm installed in your machine.

Then run:

```
npm install -g expo-cli
```

Next step clone the repository:

```
git clone https://github.com/vostruk/hackYeah.git
```

```
cd hackYeah
```

Download and install all dependencies needed:
```
npm install
```

Run the expo build server to build the app Bundle:
```
expo start
```

You should see that Expo DevTools is running at http://localhost:19002.


For development and test purposes you can install Expo emulator on your Android or IOS device:

https://docs.expo.io/versions/latest/guides/up-and-running.html


You can also scan the QR code with Expo app and install the newest version right Away

![mobile app](https://i.imgur.com/IgMwLg5.png)



#### Backend Server (Node)
You can start the Backend Server easily with docker-compose. Just make sure you have docker and docker-compose installed on your machine.

Installation instructions are here:
https://docs.docker.com/install/linux/docker-ce/ubuntu/

```
cd backend/zip-scraper
```

```
docker-compose up
```

The server is an Express server which uses Pupeteer Headless browser emulator to Scrape the ZIP NFZ portal (https://zip.nfz.gov.pl/ap-portal/user/menu/open@info?view=001)


#### Backend AI Server (Python)
You can run the server easily with docker-compose:


```
cd AI
```

```
docker-compose up
```

### Built With
We used
* Docker
* Python
* Node
* Express
* Flask
* Expo
* ReactNative
* Pupeteer
* Sketch
* Symptomate

## Authors
* **Vladimir Ostruk**
* **Pavel Ivchenko**
* **Artur Vasylkov**
* **Łukasz Berwid**

#### Disclaimer
[presentation](https://docs.google.com/presentation/d/1oR6GMsmk33Tx_7qnNM48wSbJiAuOU2ZGzWPbaXqjipI/edit#slide=id.g460c5168e6_1_23)
Project made for HackYeach hackathon 2018c</br>
[hackaton website](hackyeah.pl/tasks.html) </br>
[project page](https://expo.io/@ostruk/healthApp)
