# Gramoday - Assignment

## Problem Statement

To build an express JS API web-service which captures user contributed reports and returns an aggregate report in response.

### Prerequisite Installations

- Node Js
- MongoDB

### Instructions to set up project locally

1. Download zip file and extract it

2. Go to command prompt -> `cd` into the main folder directory
3. install the dependencies using -> `npm i`
4. now `npm run dev` or `nodemon index.js`
5. visit `http://localhost:8000/` to view the application locally

> Note :
>
> - Install Robo-3T for visual interface of Data in MongoDB
>
> - Install Postman for testing

### Working of API

#### Post: Send a create report request

The algorithm first checks in the database, if the report provided is already present or not.

The comparison is done by comparing Market ID and Commodity ID with each report.

If the report is not present, the report gets added on the database. Price unit is updated to "kg" and price is updated to average price by

$$
report.price = report.price/report.convFctr
$$

If the report is present, then check if the user has already submitted the report or not, and also check that not more than 2 user can contribute to report. If both conditions are satisfied, then append the user in `userID` list. And update the average price.

#### Get: Get the aggregated report

The algorithm first checks if reportID is given or not. If not given return with `status(400)` Error. If reportID is provided, then search in the whole Database by comparing \_id with reportID. Return the report if found else throw not found error.

#### Delete: Delete the aggregated report

Similar to Get requests, first it is checked if reportID is given or not. return with `status(400)` and if reportID is provided. find the report by ID and then delete it from the database
