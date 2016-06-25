# Meal Ordering Coordination System

[![Build Status](https://travis-ci.org/michal-januszkiewicz/meal_ordering_coordination_system.svg?branch=master)](https://travis-ci.org/michal-januszkiewicz/meal_ordering_coordination_system)

## Heroku
Skip the troublesome setup and check out the app on Heroku:
<https://meal-ordering-system.herokuapp.com>

## Setup

1. Create database

    1. Create a postgres db named as in database.yml or modify the file to use different db name or even change it to use sqlite if you wish.

    2. Run
        ```
        rake db:schema:load
        ```

2. Seed the db (optional)
    ```
    rake db:seed
    ```

3. Create an app on `developers.facebook.com`

4. Add env variables for facebook app:
    ```
    export CONSUMER_KEY="you_app_id"
    export CONSUMER_SECRET="your_app_secret_key"
    ```

5. Run the server
    ```
    rails s
    ```
