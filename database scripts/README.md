## Database Scripts

###Important Note: For grading purposes, please include the grading flag when running these scripts and please be connected to the University VPN or on campus to be able to connect to the database on the socs server.

**This folder contains scripts to perform database actions.**

<u>Prior to Running Scripts:</u>

To Install necessary node modules:
> npm install within the current directory

<u>To Run Scripts for Grading:</u> 

To Create the Database Locally if it does not exist & create empty tables:
> node create_db_with_tables.js grading

To Drop All Tables:
> node drop_db_tables.js grading

To Drop Database and Tables:
> node drop_db_with_tables.js grading

<hr>

<u>To Run Scripts for Local Purposes (with a Local Database):</u>

To Create the Database Locally if it does not exist & create empty tables:
> node create_db_with_tables.js

To Drop All Tables:
> node drop_db_tables.js 

To Drop Database and Tables:
> node drop_db_with_tables.js