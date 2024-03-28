# EmoSense: a React Native application

EmoSense, a mobile application for everyday use, aims to improve user’s understanding of well-being and emotional intelligence, as well as provide insights that are self-help and education-focused. 

## Demo of the application

 <img src="https://hackmd.io/_uploads/BJVErbQ10.png" alt="Main pages of the application"/>
\

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
