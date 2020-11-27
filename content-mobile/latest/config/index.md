---
title: Configure Content Services for Mobile
---

When you first install and access Content Services for Mobile, you can connect to any existing Content Services account as long as it has been [configured for mobile access](LINK).

The mobile application can then be configured for the correct accounts and settings.

## Connect to an account

If you've already got a Content Services or Community Edition user, you can connect to your account.

We recommend connecting to version 6.1 or later.

{% capture and-connect %}

1. Tap **Content Services**.

2. Enter the address to connect to. This is the URL for Content Services. It may look something like `example.alfresco.com`.

3. Activate **HTTPS** if you access your account with a URL that starts with `https://`. If you copy and paste in the URL then the app will select whether **HTTPS** is required or not.

4. Tap **Next**, then enter your username and password, and tap **Sign in**.

    > **Note:** If the account you add is part of your company single sign-on then use your single sign-on details to sign in.

5. Add an optional name for the account, then tap **Done**.

Your account is now set up. The next time you use this app you can go directly to your account by tapping the account name under **Accounts** in the menu.

### Multiple accounts

You can have multiple Content Services accounts and set up connections to any of them.

1. In the Accounts section, tap on the account you're currently in and select **Manage Accounts**.

    > **Note:** You can also tap **Settings** in the menu.

2. To set up a new account connection, tap **+** and then **Content Services**.

3. Set up the account as described above.

4. When you're done you can easily switch between accounts. Just tap the current account in the menu and select another account.

    > **Note:** You can delete accounts by selecting the account in the Settings screen and tapping **Delete**.

{% endcapture %}
{% capture ios-connect %}

> **Note:** The first time you connect to your account you’ll be asked if you want to enable file protection for downloaded files. Tap **Yes** to activate [file protection](#app-settings/ios/file-protection).

1. Tap **Content Services**.

2. Enter the address to connect to. This is the URL for Content Services. It may look something like `example.alfresco.com`.

3. Activate **HTTPS** if you access your account with a URL that starts with `https://`. If you copy and paste in the URL then the app will select whether **HTTPS** is required or not.

4. Review the advanced settings and tap **Next**. If you need to change them use the [FAQs](#faqs).

5. *Optional:* If you are using SSO enter your **Realm** and **Client ID** and tap **Next**. Use the default values here unless your administrator gives you other details.

    > **Note:** After tapping **Next** you will be asked to sign in with your normal company credentials or you will be asked to enter your **Content URL** which is your Alfresco Content Services URL, and to enter a **Description**. You will then tap **Next** and be asked to sign in with your normal company credentials. If you have any problems signing in contact your systems administrator.

6. Sign in with your credentials.

7. Once logged in you can change the account description.

8. Tap **Save**.

### Multiple accounts

You can have multiple Content Services accounts and set up connections to any of them.

1. Tap your photo (or the Alfresco logo icon if you don’t have a profile photo for the currently selected account).

    You’ll see the accounts that you’ve already set up.

2. To set up a new account connection, tap **+** and then tap either **Content Services**.

3. Set up the account as described above.

4. Enter your account details and tap **Save**.

If you have multiple accounts set up then the account with a green tick next to it as the currently selected account.

To delete an account, swipe left on it and tap **Delete**.

{% endcapture %}

{% include tabs.html tableid="connect" opt1="Android" content1=and-connect opt2="iOS" content2=ios-connect %}

## Settings

You can access app settings by tapping **Settings** in the main menu.

{% capture and-settings %}

### Account settings

Tap an account to display and edit its settings, or delete the account. You can customize the menu options for an account and the behavior of synced content as well as updating the account name.

Tap the name of the account to change its name.

#### Customization

Tap **Menu** and you can select which tabs are available on the menu for the account. Deselect a tab to remove it from the menu - you can always add it back again later. You can also tap and hold on a tab, then drag it up and down to change the order of items. Your [administrator can customize menus](#customize-app-profiles), so you may find that some of the tabs aren't available, or that the menu is already pre-configured.

Tap **Confirm** to save any changes you've made.

#### Synced Content

You can turn the **Data Usage** option on or off. If you want to reduce your data usage then turn it off. Your synced content will only be synced when you refresh it in the **Synced Content** folder.

If you have it switched on then content will sync automatically, and your data usage may be affected.

This option is only shown on devices that support cellular networks.

### Enterprise settings

The settings for enterprise accounts are to manage the data protection for content.

#### Data protection

The first time you add an account you'll be asked if you want to protect your data.

Data protection means that files downloaded from Content Services can only be viewed in the Content Services app. Tap **Data Protection** to switch this feature on or off.

If you have data protection switched on then files downloaded from all your accounts will be protected. Protection will be removed if you delete all of your accounts.

> **Note:** If you switch **Data Protection** on, then when you select **Open in...** for a file some third-party applications may not be able to open the file.

#### Passcode

Tap **Enter Passcode** to open a new screen where you can turn passcode protection on and off. When you switch **Enable Passcode** on, you can choose a 4-digit passcode. This passcode will have to be entered before the Content Services app can be used on your device. Tap **Expiration** to set the length of time the passcode is remembered for.

You can change your passcode at any point by tapping **Change Passcode**.

For added security you can select the **Erase Data** option so that all data downloaded from Content Services will be removed from the device after 10 failed passcode attempts.

### Feedback

Tap **Feedback** to send feedback to Alfresco.

#### Send Diagnostics

Tap **Send Diagnostics** to enable the sending of diagnostic data to Alfresco. Alfresco collects technical data for use when developing the app. This is completely anonymous but if preferred you can turn this feature off.

### About

Click **About** to view app details.

{% endcapture %}
{% capture ios-settings %}

### About

Tap **About** to view the version number of the app.

### Use Data for Sync

You can turn the **Data Sync** option on or off. If you want to reduce your data usage then turn it off. Your synced content will only be synced when you refresh it in the **Synced Content** folder.

If you have it switched on then content will sync automatically, and your data usage may be affected.

This option is only shown on devices that support cellular networks.

### Send Diagnostics

Tap **Send Diagnostics** to enable the sending of diagnostic data to Alfresco. Alfresco collects technical data for use when developing the app. This is completely anonymous but if preferred you can turn this feature off.

### Full Content Search

By default, the search searches for files and metadata. If you switch on this option then searches will also search within the content of files, such as Word documents.

### File Protection

The first time you add an account you’ll be asked if you want to protect your files.

File protection means that files in your device's Alfresco Content Services Local Files are encrypted when the device is locked, and cannot be opened from any external device that’s connected to this device. Tap **File Protection** to turn this feature on or off.

If you have file protection switched on then files downloaded from all your accounts will be protected. Protection will be removed if you delete all of your accounts.

> **Note:** If you have File Protection switched on then your **Local Files** are encrypted when the device is locked, and cannot be opened from any external device that’s connected to this device.

### Passcode

With **Passcode Lock** turned on Content Services can only be accessed on your device by entering the passcode. Tap **Passcode Lock** to turn this feature on or off.

When you turn it on you can choose a new 4-digit passcode. Once you've entered a passcode you can tap **Change Passcode** to enter a new passcode.

> **Note:** If the passcode is entered incorrectly 10 consecutive times, then all Content Services account details, synced files and local files will be wiped from the device.

If you have Apple Passcode and Touch ID turned on on your device, then once you've set a Content Services passcode you also have the option of using **Touch ID**. When you switch this option on you can use Touch ID to unlock Alfresco Content Services.

### Clear Data

The clear data options effectively let you reset Content Services back to the default factory settings. You can choose to **Clear Accounts** or **Clear Account, Cache & Downloads**.

Once you've selected an option restart Content Services for the changes to take effect. Just press your device home button twice to display the currently running apps, and swipe Content Services off the top of the screen to close it.

Now open your cleaned-up app and create your accounts as required.

### Account settings

You can edit the settings for each Content Services account. Tap on an account to see the settings for each individual account you have set up on the device.

#### Edit Profile

Your administrator can set up profiles so that different users have different menus and access options. If your administrator has done this then you can switch between the profiles that are available to you.

#### Edit Main Menu

You can select which tabs are available on the menu, so you just see those that you use. Tap the horizontal lines and drag a tab to hidden to remove it from the menu - you can always add it back again later. You can also tap and hold the horizontal lines, then drag the tab up and down to change the order of menu items.

The available tabs depend on which Content Services version you're connected to.

> **Note:** If you're using a profile set up by your administrator then this option isn't available.

#### Settings

View and edit the general account details.

{% endcapture %}

{% include tabs.html tableid="app-settings" opt1="Android" content1=and-settings opt2="iOS" content2=ios-settings %}

## Customize app profiles

Administrators can set up customized profiles so that different users have different menus and access options.

Users can then be assigned a profile or given the option to switch between profiles.

Configuration of profiles is done in [Content Services](LINK).

## Mobile Device Management (MDM)

Many companies now use Mobile Device Management (MDM) solutions such as MobileIron and Airwatch to manage apps that are used on their devices.

You can connect to the Content Services for Mobile app from a number of MDM services. If you're using an MDM solution then how you implement Content Services depends on your user role.

For more information on MDM solutions and versions of Alfresco Content Services, speak to [Alfresco Support](http://support.alfresco.com/){:target="_blank"}.

> **Note:** Due to security restrictions for managed apps, not all features are available.

### System Administrators

Provision Content Services inside your MDM, and configure it using the following parameters:

> **Note:** The parameters required may differ between MDM solutions.

| Property | Description |
| -------- | ----------- |
| AlfrescoRepositoryURL | *Required.* The Content Services server URL to connect to, using the format `<http | https>://<host-name>:<port>/<repository-context>` For example `https://example.com:8080/alfresco`. |
| AlfrescoUserName | *Optional.* User name of each user. |
| AlfrescoDisplayName | *Optional.* The display label for Content Services, for example, `Company Intranet`. |
| AlfrescoShareURL | *Optional.* The Alfresco Share server URL to connect to, using the format `<http | https>://<host-name>:<port>/<share-context>`. |
| AlfrescoUserProfile | *Optional.* Use a profile-id defined in the configuration file to enforce a specific profile. Configuration files are done in [Content Services](LINK). |

Your MDM solution may display this information automatically. Users can then install and use the Content Services for Mobile app.

### Users

1. Install Content Services through your MDM as you would with any other app.

2. When you open the app, you don't need to set up an account in the same way that non-MDM users do. Instead just enter your user name and password and tap **Sign in**.

    > **Note:** Depending on the MDM you're using, some features might not be available.

## FAQs

If you encounter issues configuring the app then try these suggestions to resolve them.

{% capture and-faq %}

### I can’t connect to Content Services

Check that you’re using the right login email address and that your password matches the login email.

Test the connection from a browser by typing your Content Services address in a browser window, for example `http://hostname:port/alfresco`.

If a connection is established from the browser, but you still can’t connect from the app, tap the account then tap **Manage Accounts** then tap the account name, then **Details**.

Change the **Hostname** value to `/alfresco/service/cmis` then tap **Save**.

If you’re still having trouble connecting contact your administrator.

### Where do I enter the port number for my connection?

In previous versions of the Content Services app you needed to enter a port number when setting up a connection. We've now simplified this process so that you just need to enter the URL of the account that you're connecting to.

{% endcapture %}
{% capture ios-faq %}

### I can’t connect to Content Services

Check that you’re using the right login email address and that your password matches the login email.

Test the connection from a browser by typing your Alfresco Content Services address in a browser window, for example `http://hostname:port/alfresco`.

Check the Advanced account settings:

| Setting | Description |
| ------- | ----------- |
| Port | The port number is selected automatically, but your company may be using a different number. Ask your administrator if you need to use a different port number. |
| Service Document | Content Services for Mobile is set up with the default service document string. Ask your administrator if your company uses a different string. |
| Client Certificate | Content Services for Mobile doesn’t use a client certificate by default. Ask your administrator if your company account requires client certification. If needed you can tap **Client Certificate**, then **Import Client Certificate**, and choose a previously downloaded certificate from your Content Services **Local Files**. |
| Realm | The value of this is taken from your Identity Service. The default value for **Realm** is `alfresco`. |
| Client ID | The value of this is taken from your Identity Service. The default value for **Client ID** is `alfresco-ios-acs-app`. |

> **Note:** You can also use the **Retry with Diagnostic** option which will test the connection for you and indicate what the issue is.

{% endcapture %}

{% include tabs.html tableid="faq" opt1="Android" content1=and-faq opt2="iOS" content2=ios-faq %}
