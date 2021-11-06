# D-D-Encounter-Builder

# Project Overview

## Project Name

D&D Encounter Builder

## Project Description

The minimum viable product will be a tool for players to reference the important stats for a given monster in D&D.
The full application will allow people running games of D&D to take those monsters that they reference, and build encounters while calculating how difficult the encounter will be for their players. There's usually a ton of complexity in this, but the calculations are actually simple, especially if they're automated. 

## API and Data Sample
https://api.open5e.com/?format=json This is the api that I used.
JSON snippet:
	{
   	 "count": 1086,
   	 "next": "https://api.open5e.com/monsters/?format=api&page=2",
   	 "previous": null,
    	"results": [
     	   {
       	    	"slug": "aatxe",
      	    	"name": "Aatxe",
            	"size": "Large",
            	"type": "celestial",
            	"subtype": "shapechanger",
            	"group": null,
            	"alignment": "lawful good",
            	"armor_class": 14,
            	"armor_desc": "natural armor",
            	"hit_points": 105,
            	"hit_dice": "10d10+50",
            	"speed": {
                	"walk": 50
            	},

## Wireframes

Upload images of your wireframes to an image hosting site or add them to an assets folder in your repo and link them here with a description of each specific wireframe.
![image](https://user-images.githubusercontent.com/9029262/140623362-a8dfb6a6-3208-441b-b2e8-46f8f9df14c2.png)
![image](https://user-images.githubusercontent.com/9029262/140623424-d88a44ed-f09d-43d3-9f7c-e1ad47620662.png)
![image](https://user-images.githubusercontent.com/9029262/140623442-7b97cfe1-5425-4818-8010-1551fb4529df.png)



### MVP/PostMVP

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP 

- Find and use external api 
- Render data on page 
- Allow user to view statistics of a monster
- Break the search down from 1086 options using multiple selectors

#### PostMVP  

- Add second screen
- Add second toolbar
- Allow for comparison vs party composition

## Project Schedule 

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|July 13| Project Approval | Incomplete
|July 13| Core Application Structure (HTML, CSS, etc.) | Incomplete
|July 14| Pseudocode / actual code | Incomplete
|July 15| Initial Clickable Model  | Incomplete
|July 16| MVP | Incomplete
|July 17| Presentations | Incomplete

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matrix.  Link this image in a similar manner to your wireframes

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Adding Form | H | 3hrs| 3.5hrs | 3.5hrs |
| Working with API | H | 3hrs| 2.5hrs | 2.5hrs |
| Total | H | 6hrs| 5hrs | 5hrs |
![image](https://user-images.githubusercontent.com/9029262/140624468-1470415f-b0c9-4eaa-a692-c4f44d5d974b.png)
![image](https://user-images.githubusercontent.com/9029262/140624477-e545251d-ee53-4e0d-ae2e-f1a9f39c7d0f.png)
![image](https://user-images.githubusercontent.com/9029262/140624484-c38d9674-31c5-426b-a3ca-ba7cce987f52.png)



## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
