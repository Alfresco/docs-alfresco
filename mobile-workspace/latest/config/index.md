---
title: Configure Mobile Workspace
---

Find Alfresco Mobile Workspace at [Google Play](https://play.google.com/store/apps/details?id=com.alfresco.content.app&hl=en-GB&ah=tbrTPT50zRyrvFT0xxYx0IRH6DA){:target="_blank"} for Android or [Apple App Store](https://apps.apple.com/gb/app/alfresco-mobile-workspace/id1514434480){:target="_blank"} for iOS.

## Login screen

From the first screen you enter the URL of your Alfresco Content Services instance into the `Connect to`  field. You will then be asked to authenticate using your Alfresco credentials. If you want to use Single Sign-On (SSO) to connect to the Mobile Workspace you can enter the URL of the Identity Service. You can enter the URL in the following format `my.alfresco.com`.
> **Note:** You do not need to enter www because the URL will be formatted by the application.

### Advanced settings

The **Advanced settings** are preconfigured with the correct default settings to connect to Alfresco. Depending on your installation you may need to change some of these. The advanced settings are accessed from the first screen. There are a number of options which help to authenticate the application with your Alfresco Content Services instance.

| Field | Description|
| ----- | ---------- |
| HTTPS | Allows you to switch between HTTP or HTTPS. If connecting to Alfresco Content Services Community Edition then HTTP is common but it is generally only used for testing purposes only. |
| Port | The port used by your Alfresco Content Services instance. If you use HTTPS the default value is `443`, if it is HTTP the default value is `80`. |
| Path | This is the path where Alfresco Content Services is located on your domain. For example `mydomain.com/alfresco`. |
| Realm | When authenticating against Alfresco Content Services with the Identity Service configured the value in the realm field must match the `Realm` value in the Identity Service configuration. |
| Client ID | This value must match the value the `Client ID` value configured in the Identity Service. |

### SSO (Identity Service)

If you are connecting to Alfresco Content Services using the Identity Service the app will delegate authentication responsibilities to your identity provider, for example okta, including any multi-factor authentication steps.

For Single Sign On (SSO) information see the [Single Sign On (SSO) Guide]({% link identity-service/latest/tutorial/sso/index.md %}){:target="_blank"}.

## Extending

You can extend the Mobile Workspace.

Find the Mobile Workspace code at the following github repositories for [Android](https://github.com/alfresco/alfresco-mobile-workspace-android){:target="_blank"} or [iOS](https://github.com/alfresco/alfresco-mobile-workspace-ios){:target="_blank"}.
