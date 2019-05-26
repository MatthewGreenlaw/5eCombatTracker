# Project Introduction
This repository contains Matthew Greenlaw and Theron Anderson's final project for CS 465: Full-Stack Web Development at Portland State University. The project is a combat tracker for [D&D 5th edition](https://en.wikipedia.org/wiki/Editions_of_Dungeons_%26_Dragons#Dungeons_&_Dragons_5th_edition) using [React](https://reactjs.org/), and the [Random.org JSON-RPC API](https://api.random.org/json-rpc/2). 

## Design Considerations
The project is [released](https://github.com/MatthewGreenlaw/5eCombatTracker/releases) in successive [stages](#stages-of-development) by major components:
1. DiceRoller  
 
The DiceRoller component provides an interface for users to roll dice. Users can select any number of any kind of die and attach a modifier to the roll. Users can make attack and ability check rolls with advantage (roll twice, take highest, add modifier) and/or disadvantage (roll twice, take lowest, add modifier) and can make damage rolls with or without critical damage (roll twice, add both, add modifier). Users can add as many sets of dice as they wish to roll at one time and remove sets of dice until there is only one set to roll.  

<img src="ReadmePictures/DiceRoller_wireframe.png"
     alt="Wireframe for DiceRoller component"
     style="float: left; margin-right: 10px; max-width: 320px;" />

2. Player Combat Tracker  

The PlayerCombatTracker component keeps track of the actions made by a player. It is a wrapper for an InitiativeTracker component and an Entity Component and initializes its Entity component by passing it a JSON object containing the player's stats. Upon creation, the PlayerCombatTracker emits an event to the server for the DMCombatTracker to add the player's information. It also emits events when a player rolls damage/health/initiative, or updates its temp HP or damage. Likewise, the PlayerCombatTracker listens for damage given/taken to/from it and for initiative updates.  

<img src="ReadmePictures/PlayerCombatTracker_wireframe.png"
     alt="Wireframe for PlayerCombatTracker component"
     style="float: left; margin-right: 10px; max-width: 320px;" />  

3. DM Combat Tracker  
The DMCombatTracker component keeps track of the actions made by all players and monsters. It is a wrapper for an InitiativeTracker component and a list of Entity Components representing monsters. It initializes monster Entity component by passing them a JSON object containing the monster's stats. Upon creation, the PlayerCombatTracker emits an event to the server for the PlayerCombatTracker to add the monster's initiative to all player InitaitiveTrackers. It also emits events to player when a monster rolls damage against that player. Likewise, the DMCombatTracker listens for damage given to monsters and for player initiative updates.  

<img src="ReadmePictures/DMCombatTracker_wireframe.png"
     alt="Wireframe for DMCombatTracker component"
     style="float: left; margin-right: 10px; max-width: 320px;" />  

4. Lookup Tool  
<img src="ReadmePictures/LookupTool_wireframe.png"
     alt="Wireframe for /LookupTool component"
     style="float: left; margin-right: 10px; max-width: 320px;" />  

### Todo


# Stages of Development
1. [X] [Stage 1](https://github.com/MatthewGreenlaw/5eCombatTracker/releases/tag/Stage-1): Dice Roller
   1. [X] random.org API
   2. [X] Dice component
   3. [X] DiceRoller component

<img src="ReadmePictures/DiceRoller_completed.png"
     alt="Completed DiceRoller component"
     style="float: left; margin-right: 10px; max-width: 320px;" />

2. [ ] [Stage 2](https://github.com/MatthewGreenlaw/5eCombatTracker/releases/tag/Stage-2): Player Combat Tracker


3. [ ] [Stage 3](https://github.com/MatthewGreenlaw/5eCombatTracker/releases/tag/Stage-3): DM Combat Tracker


4. [ ] [Stage 4](https://github.com/MatthewGreenlaw/5eCombatTracker/releases/tag/Stage-4): Lookup Tool


# Installation Instructions

## Requirments

Node.js and NPM

## Setup
In the root directory of the project:
* Install dependencies by running ```yarn install```.
* Start the development server by running ```yarn start```.
* Create a production build by running ```yarn build```.
* Run tests by running ```yarn test```.
* Run tests with code coverage by running ```yarn test:coverage```.
