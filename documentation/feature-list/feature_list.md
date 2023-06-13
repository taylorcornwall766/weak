# MVP List

PhillyRoll, a Crunchyroll clone, is a website for users to watch anime, engage in light discussion, post anime, and spread their interests.

## 0. New account creation, log in, log out, and guest/demo login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Users can't use certain features without logging in to a certified account (like creating or editing an exercise, workout or routine).
* Logged in users are directed to the home page
* Logged out users are directed to the landing page.

## 1. Exercises CRUD:

### C -
* certified users can post (create) exercises with the following required fields: name, description, and primary_muscle. They will also have the following optional (nullable true) fields: secondary_muscle, tertiary_muscle, start_photo and end_photo.

### R -
 *  all users can view (read) all of the exercises for any given muscle group.

### U -
* a user can edit (update) any of the columns of an exercise that they have posted .

### D -
* a user can delete (delete) any of the rows/ exercises that they have created.

## 2. Routines CRUD:

### C -
* all users can create routines with the following required fields: name, muscle_group_1. They will also have the following optional (nullable true) fields: muscle_group_2, muscle_group_3, muscle_group_4, muscle_group_5 and description. They will then be able to add exercises to that routine, through the routine_exercises table.

### R -
* all users can view their own routines (including the routine exercises) and the routines of other users who have private set to false in their user settings.

### U -
* all users can update their own routines and their related routine_exercises.

### D -
* all users can delete their own routines.

## 3. Workouts CRUD:

### C -
* all users can start (create) a workout with the following required field: started_at (this will be auto populated).

### R -
* all users can view their workout and any sets they have added to it.

### U -
* all users can modify the exercises and sets within their workout (weight, reps)

### D
* - all users can delete a workout they created

## 4. leaderboard CRUD:

### C -
* all users can create a leaderboard with the following required fields: leaderboard type, private (boolean)

### R -
* all users can view private = false leaderboards, and users who are added to private leaderboards can view them

### U -
* leaderboard owners can edit a leaderboards members and a leaderboard type

### D -
* leaderboard owners can delete a leaderboard

## BONUS:

### Weight (CRUD)
  * on the logged in user's page `/users/me` I should see a weight chart, that I shows my historical weight entries in a simple line chart. I should also see an update button which allows me to add an entry.
  * I should be able to update previous entries by clicking on them and entering a number into a modal
  * I should also be able to delete entries via a delete entry button on the line graph

### Friends (CRD)
  * on a users page I should see the option to friend them, or remove friend/ cancel request if I already have an active/ pending friendship status with them

### Search (R)
  * on all pages I should see a search bar which allows me to search for users easily

