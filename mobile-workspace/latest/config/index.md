---
title: Configure Alfresco Mobile Workspace
---

Find Alfresco Mobile Workspace at [Google Play]({https://play.google.com/store/apps/details?id=com.alfresco.content.app&hl=en-GB&ah=tbrTPT50zRyrvFT0xxYx0IRH6DA}) for Android or [Apple App Store]({https://apps.apple.com/gb/app/alfresco-mobile-workspace/id1514434480}) for iOS.

## Authenticating

For Single Sign On (SSO) information see the [Single Sign On (SSO) Guide]({% link identity-service/latest/tutorial/sso/ %}).

### Connect to URL

The first screen in the application requests a URL. This is the URL of the Alfresco Content Services instance.  

You are required to enter the URL in the following format `my.alfresco.com`.
> **Note:** You do not need to enter www because the URL will be formatted by the application.

### Advanced Settings

The advanced settings are accessed from the connect to screen. There are a number of options which help to authenticate the application with your Alfresco Content Services instance. The advanced settings are preconfigured with the correct default settings to connect to Alfresco but these may need to change depending on the installation.  

**HTTP/S** Allows the switching between HTTP or HTTPS. If connecting to a community edition of Alfresco Content Services then HTTP is common but for testing purposes only.

Path – URL path.

**Realm** When authenticating against an Alfresco Content Services with the Identity Service configured the value in the realm field must match the `Realm` value in the Identity Service configuration.

**Client ID** This value must also match the configured value in the Identity Service.

### SSO (Identity Service)

If you are connecting to Alfresco Content Services using the Identity Service the app will go through the following steps.

1. Once you press the connect button the display a web view with the configured identity provider (e.g., Okta) 

3. Authentication then has to happen by entering credentials and completing any multi-factor activities  

4. Once authenticated successfully the application will then allow access 

## Extending

You can extend the Mobile Workspace.

Find the Mobile Workspace code at the following github repositories [Android]({https://github.com/Alfresco/alfresco-mobile-workspace-android}) for or [iOS]({https://github.com/Alfresco/alfresco-mobile-workspace-ios}).
