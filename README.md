# EmoSense: a React Native application

EmoSense, a mobile application for everyday use, aims to improve user’s understanding of well-being and emotional intelligence, as well as provide insights that are self-help and education-focused. 

## Demo of the application

**Home Page**
<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
 <img src="https://github.com/alinaerf/EmoSense/assets/90750587/3a53532f-dd66-48f3-88e9-ca3dba4ad58c" alt="photo_1" width="200"/>
 <img src="https://github.com/alinaerf/EmoSense/assets/90750587/9a98f330-766f-42ef-844e-04e233fb00ac" alt="photo_2" width="200"/>
 </div>


 

**Journal Page**
 <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
 <img src="https://github.com/alinaerf/EmoSense/assets/90750587/e39599a0-5b33-4364-8162-2c03d174a87b" alt="photo_1" width="200"/>
 <img src="https://github.com/alinaerf/EmoSense/assets/90750587/c4e4aae3-623e-444f-acb3-783bae1443c6" alt="photo_2" width="200"/>
 </div>



**User Page**
 <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
 <img src="https://github.com/alinaerf/EmoSense/assets/90750587/cc9e8a36-f0ff-498d-a391-3ef2a49c1f36" alt="photo_1" width="200"/>
 <img src="https://github.com/alinaerf/EmoSense/assets/90750587/bd79492f-44d0-41da-aa27-f67e5bbfe744" alt="photo_2" width="200"/>
 </div> 



## User story
---
```gherkin=
Feature: Adding a new diary entry

  Scenario: User wants to record how their day went
    Given I'm a logged-in User
    When I go to the Journal page
    And I click on the add button
    Then I see the page to enter title and text of a journal entry
    And I click to save
```
```gherkin=
Feature: See a mood patterns

    Given I'm a logged-in User
    When I go to the User page
    The app shows my mood patterns across the last month via my daily inputs and ML assessment from my journal entries
```

```gherkin=
Feature: Read mental health articles

  Scenario: User is in a dangerous situation
    Given I'm a logged-in User
    When I go to the Main page
    And I see a list of mental health articles
    Then I click on the article I am interested in  
    And the application opens the article on my preferred browser
```

## Running the project

- Clone this project
```
git clone < project-url.git >
```
- Install dependencies
```
npm install
```
- Install ExpoGo from Apple Store/Play Market

- Start an application build
```
npx expo start
```
- Scan QR code with Expo Go
