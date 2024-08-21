---
title: Admin Properties
---

## Admin Properties

The Admin Properties section of Federation Services Admin allows a user to Configure the following Global, Analysis, and Internal Audits Properties. Once changes have been made to any of the properties use the **Update Configuration** button to save the changes to the properties file.

## Global Properties

* Initialise Database on start-up. This will rebuild the database indexes as well as add or rename the connectors - this is the same as setting simflofy.initialize.mongo=true.
* Import database items - this is the same as setting simflofy.initialize.bootstrap=true
* Run various patches which will update the items in the database from 2.X to 3.X forms - this is the same as setting simflofy.initialize.update=true
* Enter the Full Discovery UI URL where these changes are to take place. For example: `https://localhost:8080/Federation-Services-discovery`

Check the boxes and or set the intervals for the properties you want to update and use the update configuration button to push the changes to your Federation Services System.

## Analysis

The Analysis section of Federation Services Admin allows a user to set the following analysis tools for their Federation Services system.

* Turn on the ability to Collect Data
* Allow users to generate Scheduled Reports
* Set time Interval between job check status
* Set Time between Schedule Status checks
* Set time of delay before the data collections service begins checking collection schedules

Check the boxes for the properties you want to set and use the update configuration button to push the changes to your Federation Services System.

## Internal Audits

By default, internal auditing is turned off. To turn auditing on check the box for Internal audits. Here you can choose to **Track All Internal Audits** by checking the Track all Audits box, or you can **Track Internal Audits by Type** by checking the box next to each action type you would like to audit.

List of available Audit types:

mappings, repository, job, job group, license, output, authentication, view, user, search, content search, widget, template, configuration, license

### Overview

The internal audit table displays internal audits, each with a name, type, action, user, org, date, and a description. By default, the audits are sorted by descending order on the date column (most recent audits show at the top). All the other columns except the Date column can be sorted alphabetically if you click on the header. The Date column is sorted by date and time. An up arrow indicates that the column is sorted in ascending order while a down arrow indicates that the column is sorted in descending order.

A system admin will be able to see audits from all orgs while org admins will be able to see only their orgs audits.

### Global Search Bar

The global search bar filters the audits based on input. It searches every column and if a column has the same input then that row is displayed. The search is not case-sensitive.

Below the table you will find search bars and select inputs. These allow you to filter audits by column. The Name, User, and Description columns can be filtered by user input while theType, Action, and Org columns can be filtered by selecting an option from the drop-down. The search input is not case-sensitive and does not need to be an exact match.

By default all audits are selected. You can use multiple column filters to get more precise results.

The input does not have to be an exact match, for example if I want to get all audits that contain the word Filesystem then you could just enter File into the search bar.

An example of filtering by column is shown below. Here we are filtering on the first three columns, Name, Type, and Action.

### Pagination

Pagination works with the shown number of entries selector to determine how many audits are on each page. By default, the page is set to the first page. Clicking the next tab will go to the next page while clicking the previous tab will bring you to the previous tab (if applicable). You can also click on a number to bring you to a certain page.

### Date Range Picker

The date range picker allows you to look at audits from within a certain time period. By default, the date range is set from 7 days ago to the current time.

Clicking on the calendar icon will bring up the current dates month and year. You can select a day on this month, or you can go to a different month by using the back arrow which goes to the previous month, or the forward arrow which goes to the next month.

Alternatively, you can just enter the date manually by selecting in the text field and entering a date and time that follows the format dd/mm/YYYY h:mm.

For example, 12/23/2011 12:03 PM would be a valid date and time

### Displayed Number of Entries

You can change the amount of audit are displayed using the number of entries selector. By default, the number of entries is set to 10. You can change the number of entries per page by clicking on the selector and selecting a different value. The options are 10, 25, 50, and 100.

### Configuration

Internal auditing is set in the Admin Properties. By default, auditing is turned off. To turn auditing on check the box for Internal audits. Here you can choose to **Track All Internal Audits** by checking the Track all Audits box, or you can **Track Internal Audits by Type** by checking the box next to each action type you would like to audit.

List of available Audit types:

* job
* conn
* auth
* mappings
* mappingGroup
* view
* user
* search
* cs
* widget
* jobgroup
* taskgroup
* template
* config
* license
* widgetDefinition
* jobSchedule
* dataSet
* contentReport
* usergroup
* instance
* jobHistory
* organization
* eventConfiguration

### My Internal Audit

This page is available under the **Audit Reports** menu and will display a version of this page with information limited to the current user.

By default, the audits are sorted by descending order on the date column (most recent audits show at the top). All the other columns except the Date column can be sorted alphabetically if you click on the header. The Date column is sorted by date and time. An up arrow indicates that the column is sorted in ascending order while a down arrow indicates that the column is sorted in descending order.