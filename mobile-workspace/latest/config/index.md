---
title: Configure Alfresco Mobile Workspace
---
Configuration
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



Extending* 
Source code is available on GitHub (need to provide a link)