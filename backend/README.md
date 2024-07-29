# backend documentation

## this backend server as a server for the music player client

### it contains the following:

- ### a music controller with all music related endpoints:
 	- get all songs from a local directory
 	- stream a song
 	- get songs of a certain album
 	- get the top 5 rated songs and all albums of an artist

- ### a music service that holds all business logic necessary for the app to work properly

- ### models used in the app

## to run the project by cmd: 

- open a terminal in the root directory

- run:
	> dotnet watch run --project .\backend