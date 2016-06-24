# Meal Ordering Coordination System

[![Build Status](https://travis-ci.org/michal-januszkiewicz/meal_ordering_coordination_system.svg?branch=master)](https://travis-ci.org/michal-januszkiewicz/meal_ordering_coordination_system)

## Setup

1. Create database
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
