---
title: Alfresco Content Services for Mobile
---

Alfresco Mobile Workspace enables users to work away from their workstation without compromising the way they access content. Keep productivity high by transporting technical documents into the field without having to worry about a data connection.

View your content on mobile with support for all major document types such as Microsoft Word, Excel and PowerPoint, as well as, large format rendering of JPEG and PNG images + many, many more

Manage and view content offline

View libraries, recent/shared and manage favorites from your mobile device

Dark mode ready to support health and wellbeing at work

Seamless experience across all platforms

Installation*
Google Play Store** 
Alfresco Mobile Workspace is available via the Play Store

Apple App Store** 
Alfresco Mobile Workspace is available via the app Store

Binary request
You can request the binaries for the latest build. Contact support?

Configuration*
Reference SSO Guide to configure a mobile client for ACS

Application Sections* 
Authenticating**
Alfresco Mobile Workspace supports two methods for authentication 

Connect to URL***
The first screen in the application requests a URL. This is the URL of the Alfresco Content Services instance.  

You are required to enter the URL in the following format my.alfresco.com. 

The URL will be formatted by the application so there is no need to enter www etc. 

Advanced Settings***
Advanced settings are accessed from the Connect to screen and has numerous options which help to authenticate the application with an Alfresco Content Services instance. 

HTTP/S - Allows the switching between HTTP or HTTPS. If connecting to a community edition of Alfresco Content Services then HTTP is common but for testing purposes only. 

Path – URL path modification. 

Authentication 

Realm – when authenticating against an Alfresco Content Services with the Identity Service configured the value in the realm field must match the Identity Service configuration. 

Client ID – This value must also match the configured value in the Identity Service. 

Advanced settings come preconfigured with all the correct default settings to connect to Alfresco but these may need to be changed depending on the installation. 

SSO (Identity Service)***
When connecting to Alfresco Content Services with the Identity Service configured the app will go through the following steps 

Once the connect button has been pressed a loading dialog will be displayed 

The app will then display a web view with the configured identity provider (e.g., Okta) 

Authentication then has to happen by entering credentials and completing any multi-factor activities  

Once authenticated successfully the application will then allow access 

Username/Password

Search** 
Search is persistent in the Alfresco Mobile Workspace, allowing global searches at any time. The results can be quickly filtered by files, folders or libraries just like in the Alfresco Digital Workspace. 

Alfresco Mobile Workspace keeps a recent history of search terms so that previous searches can be quickly repeated. 

Contextual search is available within folders, this search mode will only search within that folder but can be converted to a global search using the quick filter 

It is also possible to filter by files and folders within the contextual folder search. 

Recents** 
The Recent Files view shows all the files that have been created or modified within the last 30 days by the current user. The Recent Files view uses the Search API to query SOLR for changes made by the user and includes an extra column to display where the file is located in the content repository. 

Favorites** 
The Favorites view shows all files and folders from the content repository that have been marked as a favorite by the current user. 

Offline** 
Offline is a collection of content individual to a user that is available when offline. 

Alfresco Mobile Workspace will attempt to keep this collection updated with the latest version wherever possible. 

Browse** 
Browse contains the rest of the navigation structure. Users can access all their libraries, personal files, shared and trash from this screen. 

Personal Files retrieves all content from the logged in user's home area (/User Homes/<username>/) in the repository; if the user is ‘admin’ who does not have a home folder then the repository root folder is shown. 

File Libraries retrieves all the sites that the user is a member of including what type of site it is: public, moderated or private. File Libraries is the Libraries component, using the Sites API. 

The Shared Files view aggregates all files that have been shared using the QuickShare feature in the content repository. 

The Trash view shows all the items that a user has deleted, admin will see items deleted by all users. The actions available in this view are Restore and Permanently Delete. 

Extending* 
Source code is available on GitHub (need to provide a link)