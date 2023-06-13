# User Stories

## Landing Page
* When navigating to the website, I should see signup page `/signup` with an option to click login for already existing users.

## Users (CR)
### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.
  * I can sign up as either a certified or non certified user, ONLY certified users can post exercises.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.



### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button for either a certified demo profile or a regular user profile to log me in and allow me access the site's functionality based off the user's permissions.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying the landing page.


## Exercises (CRUD)

### Viewing all exercises
  * I should be able to visit the exercises page `/exercises` of the website which displays all the exercises on the website.
  * On click of an exercise tile, I should be redirected to the exercise creators page
  * I should also be able to view all exercises when adding exercises to a workout

### Adding an exercises
* As a logged in certified user, I should be able to  click on a button on my page to create a new exercise, this button will open a modal to create the exercise.
  * after successfully submitting the exercise the modal should close and the my exercises carousel should update
### Deleting an exercise
  * on hover over an exercise in my carousel I should see a delete button, which will open a confirm delete modal, the confirm delete modal will then either cancel the delete or delete the exercise

### Updating an exercise
  * on hover over an exercise in my exercises  carousel I should see an edit button, which will open a form/modal to edit the exercise, I should then be prompted to confirm or cancel changes which will either save the updates or just close the modal.



## Routines (CRUD):

### Creating a Routine
  * on the homepage I should be able to view my routines, as well as see a button to add a routine on click this button will redirect me to `/routines/new` to create a new routine

  * after creating a routine, I will be prompted to add exercises to it, with each exercise I will be prompted to add sets

  *
### Viewing Routines
  * on the homepage I should be able to view my routines
  and on another users page who is not private I should be able to see their routines

### Updating Routines
  * on the homepage on hover over my routine I should be see an update button which will bring me to the `/routines/:routineId/edit` page to edit that routine and its exercises

### Deleting Routines
  * on the `/routines/:routineId/edit` routines edit page, I should see a button to delete the routine which will render a confirm delete modal

## Workouts (CRUD):

### Create a workout
  * all users can start/ create a workout on the homepage, it will redirect them to the new `/workouts/new` where you can fill out a workout form to start/ create a workout. after creating a workout you will be prompted to add exercises and sets to it.

### View a workout
  * all users can view all of their workouts in a carousel on their homepage, on click they should be redirected to that workouts details page `/workouts/:workoutId`

### Edit a workout
  * on a workouts page that I own `/workout/:workoutId` I should see a button to redirect me to `/workout/:workoutId/edit` and be able to change the related workout information on that page

### Delete a workout
  * on a workouts edit page `/workout/:workoutId/edit` I should see a delete button that opens up a confirm delete modal that deletes the workout.




## Leaderboards (CRUD)
### View Leaderboards
  * in the navbar I should see a leaderboards button which takes me to `/leaderboards` page which will show me all the leaderboards i am participating aswell as an index of public leaderboards.
### Create Leaderboards
  * I should see a button to create a leaderboard here which takes me to the page `/leaderboards/new` and allows me to create a new leaderboard and add members to it here.

### Updating and Deleting a Leaderboard
  * when clicking on a leaderboard I should go to the leaderboards details page `/leaderboards/:leaderboardId` and see the rankings of the leaderboards members
    * when on a leaderboards page that I have created I should have the option to update the leaderboards members, and the option to delete the leaderboard

## BONUS

### Weight (CRUD)
  * on the logged in user's page `/users/me` I should see a weight chart, that I shows my historical weight entries in a simple line chart. I should also see an update button which allows me to add an entry.
  * I should be able to update previous entries by clicking on them and entering a number into a modal
  * I should also be able to delete entries via a delete entry button on the line graph

### Friends (CRD)
  * on a users page I should see the option to friend them, or remove friend/ cancel request if I already have an active/ pending friendship status with them

### Search (R)
  * on all pages I should see a search bar which allows me to search for users easily
