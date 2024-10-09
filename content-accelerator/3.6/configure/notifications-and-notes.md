---
title: Notifications and Notes
---

## Notifications

### Notification Overview

Sending notifications is an easy way to alert users or users in groups about a folder or document in an arbitrary fashion. There are no predefined events that send off a notification - when enabled, the user can click the Send Notification action at any time. The user selects the user to notify, an optional due date, and can write a message in a WYSIWYG editor. Separate notifications are created for each user, and an email is sent to each user containing a link to the document or folder and the message.

Users who have received a notification can either click the link in the email received to view the item or log in to ACA to view all notifications by clicking the appropriate icon in the header of the application. They can then delete the notification.

### Configuring Notifications

The following steps should be used to set up notifications.

Currently only one `sendNotification` form is supported.  Future releases may enable trac-specific overrides.

#### Step 1: Setup the Ad Hoc Form

Notifications are now sent with information setup in an Ad Hoc Form. The form can have any type of attributes configured, but there are five named attributes that are associated to the Notification action

Name | Label | Control Type | Notes |
--- | --- | --- | --- |
bpm_assignees | Users | AutoComplete | Repeating dropdown of all users.  Can be set to `allUsers` picklist or another if desired
bpm_groupAssignee | Groups | AutoComplete | Repeating dropdown of all groups.  Optional, can be omitted if desired.
notificationType | Notification Type | AutoComplete | Dropdown notification classification type.  **NOTE** - if the configuration contains a Notification Type field with `name = notification_type` (use the More button next to the field name to check) or any other value other than `notificationType`, it is recommended to follow the steps outlined below this table.
bpm_workflowDueDate | Due Date | DateBox | Suggested due date for the notification.  Suggested to configure that the date must be today or in the future.
bpm_comment | Comment | Textarea | Suggested to configure with WYSIWYG option on.

> **Note:** Only `bpm_assignees` and `bpm_groupAssignee` are required for notification to work. However, if not present in the form the ACA notification interface will still show columns for Notification Type, Due Date and Comment.  Any values missing on the form will result in a column that only contains blank values.

#### Step 2: Setup the Workflow Config

In the Workflow Config section of the Admin, select the HPI Notification workflow. Add the Ad Hoc form configured above as both the Start Form and View Notification.

#### Step 3: Setup the Action Config

In the sendNotification Action Config, there will be an option "Select Form to Display". Select the Ad Hoc form created in step one.

## External Notifications

External notifications are available starting with the ACA 3.4 release.  Basic workflow task notification support on both Slack and MS Teams is supported.

### OC Setup

By default External Notifications are off by default.  To turn this on, set the following OC properties within your override properties file.

```properties
send.external.notifications=true
```

### Slack Setup

#### Step 1: Navigate to Slack API and sign in

Link to Slack API: [https://api.slack.com](https://api.slack.com){:target="_blank"}

Click on the tab **_Your Apps_** in the top right corner. If you have not created an app yet, then hit the **_Create New App_** button. Give it a name and select the workspace where you want the application to live. If you already have an app created, then click on it.

#### Step 2: Customize app Display Information (optional)

When the app was clicked on, the basic information should have been loaded. At the bottom of this page there is the Display Information section. This gives the ability to customize what the particular app will look like to the user. Go ahead and customize this section now or skip to Step 3.

#### Step 3: Add a Bot User

Find the submenu under **_Features_** called **_Bot Users_** and click on it. This will bring up an option to turn on and add a bot user. You can customize the display name and default username if you choose. Also, it gives the option to show that the bot user is always online.

#### Step 4: Reinstall/Install the app

If you have not installed the application, now would be a good time to do that to the particular workspace. You can do that by clicking on the **_Install App_** submenu under the **_Settings_** menu. It will also have you choose a channel for the bot to have permissions to post. This is a default channel the bot will post to if a channel is not specified within the post message API call.

#### Step 5: Set up the app's scopes

OAuth scopes let you specify exactly how your app needs to access a Slack user's account. Different Slack API calls require different scope permissions. The scope permissions that you need to add are the following: `channels:read, chat:write:bot, users:read, users:read:email`. After adding these, it will need you to reinstall your app.

#### Step 6: Grab the Bot User OAuth Access Token

Click on the submenu **_OAuth & Permissions_** under the **_Features_** menu. You should be able to see a **_Bot User OAuth Access Token_**. This will be needed to override the `slack.auth.token` property value in the next step.

#### Step 7: Override the Slack Properties

Now that we have the bot user set up, you can now successfully override the properties to get Slack external notifications connected.

* Locate the `opencontent-override-placeholders.properties` file. It will be located on the /alfresco classpath, for example, `tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent`
* Put the properties `send.external.notifications=true` and `slack.auth.token=xxxx-yourAuthToken`.
* Restart alfresco and the Slack external notification connection should be all set up!

### MS Teams Setup

#### Step 1: Navigate to Azure Portal and sign in

Link to Azure Portal: [https://portal.azure.com/](https://portal.azure.com/){:target="_blank"}

In the search bar, search for **_App Registrations_**. Click on the **_New registration_** plus button in the top left corner of the view.

#### Step 2: Register the application (API)

* Fill out the name field with whatever name you want to give this application.
* Then, fill out who can use this application or access this API. This will depend on use-cases, but typically should be restricted to Single tenant (the company org account).
* Leave the Redirect URI empty, this will not be used for our external notification API.

#### Step 3: App Overview

The **_Overview_** tab should be showing right now. Some important variables to note here are the **Application (client) ID** and the **Directory (tenant) ID**. Take note of these two variables, they will be used below.

#### Step 4: API Permissions

Navigate to the **_API permissions_** tab on the left menu bar. Click the plus button to **_Add a permission_**. These permissions are the access/scopes you are giving to this API. Good practice is to not give your API more permissions than it needs, these can be added/subtracted at anytime. Go ahead and add the following permissions:

* Chat.Read
* Chat.ReadWrite
* Group.Read.All
* Group.ReadWrite.All
* User.Read
* User.Read.All
* User.ReadBasic.All
* User.ReadWrite
* User.ReadWrite.All

#### Step 5: Grant/Request Admin Consent

You may notice there are some permissions that need Admin Consent. These are the permissions of `Group.Read.All`, `Group.ReadWrite.All`, `User.Read.All`, `User.ReadWrite.All`. If you are not the admin, you will have to get them to grant these permissions. To grant the permissions, follow this [Azure Active Directory documentation link](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent#grant-admin-consent-in-app-registrations){:target="_blank"}.

#### Step 6: Authentication

Click on the **_Authentication_** tab on the left side menu. There are 2 different ways the following configurations can be filled out on this screen depending on if your azure account loads their new or old view for this section.

##### _"New"_ experience

New experience is loaded by default. This is Azure's update to some of these views.

1. Click on the Add a platform. It will ask you to add a redirect URI. We don't necessarily need one for this API, but it's a required field. So give it your application url root/homepage (EX: `http://localhost:8080`).

2. Leave the Logout Url section blank

3. Select the check-boxes for the **Access token** and **ID tokens** (this is very important because it lets the application generate a access token to be used within the API calls)

4. Once that is created, scroll to the bottom of the page to the **_Advanced Settings_** header. Turn this on. We are not using re-direct URI's. That means we are grabbing tokens without user involvement/sign-in window.

5. Click Save at the top to save all these changes.

##### _"Old"_ experience

You can tell if you are on the old, if the button to the right of the Discard says _Switch to the new experience_.

1. Skip the Redirect URIs section and do not input a logout url.

2. Under the **_Implicit grant_** section, select the check-boxes for the **Access token** and **ID tokens** (this is very important because it lets the application generate a access token to be used within the API calls).

3. Click Yes for the **_Default client type_** to treat application as a public client.

4. Click save at the top to save all these changes.

#### Step 7: Creation of a Service Account User

A service account user is needed to send a direct 1:1 message to the user that is receiving the task notification.

* The admin needs to add an account to the organization/team that should have a name that signifies its purpose, i.e. Service Account. To help set up a new account, see this [Azure Active Directory link](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/add-users-azure-active-directory){:target="_blank"}.

  >**Important:** This user does not need elevated permissions and needs to be apart of the team that the user who is receiving the task notification is in.

  > **Note:** The username and password for the account this will be used in the next step.

#### Step 8: Encrypt the Service Account User's Password

This is a valid user within your organization/team's azure directory. So, we need to encrypt the password before adding it to our override property file.

* The steps to achieving the encryption can be followed [here]({% link content-accelerator/3.6/configure/oc-property-overrides.md %}#encrypting-property-values)

#### Step 9: Override the Microsoft Teams Properties

Now that we have the App set up, you can now successfully override the properties to get Teams external notifications connected.

* Locate the `opencontent-override-placeholders.properties` file. It will be located on the /alfresco classpath, for example, `tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent`
* Put the following properties in this file:
  * `teams.team.id=` this is the group id for the Microsoft Teams team. Follow this [article](https://teams.handsontek.net/2019/04/09/how-to-get-microsoft-teams-tenant-id/){:target="_blank"}, but instead of tenant id in the article, grab the **GROUP ID** from the url they show you how to get.
  * `teams.app.id=` this is the Application (client) ID from [Step 3](#step-3-app-overview) in the **_Overview_** tab.
  * `teams.service.account.username=` this is the username from [Step 7](#step-7-creation-of-a-service-account-user) for the service account user
  * `teams.service.account.password=` this is the encrypted password surrounded by "@{}" from [Step 8](#step-8-encrypt-the-service-account-users-password)
* Restart alfresco and the Microsoft Teams external notification connection should be all set up!

#### Microsoft Graph API Limitations

* Currently, the [API calls](https://docs.microsoft.com/en-us/graph/overview?view=graph-rest-beta){:target="_blank"} utilized within this integration are limited and in beta.
* The [API call to send a direct message](https://docs.microsoft.com/en-us/graph/api/chat-post-messages?view=graph-rest-beta&tabs=http){:target="_blank"} is only supported for work/school accounts and is of the permission type delegated.
  * The "Delegated" permission type defines a [on-behalf-of-user permission](https://docs.microsoft.com/en-us/azure/active-directory/develop/developer-glossary#permissions){:target="_blank"}. Essentially a user can only send a direct message to another user within the team.
  * In the future, we hope this expands to include the "Application" permission type. The "Application" permission type would allow our application to direct message a user directly, without having to create a Service Account User.

## Folder Notes and Document Notes

### Folder Notes

Folder notes are notes attached to a folder. The default note type is hpi_note. An hpi_note has the following attributes:

* note_detail: abbreviated note_content <= 3000 characters
* note_type: a classification given to each note, such as "Authority", "Corrspondance, "Procedural", etc. pulled from form support in a note_type picklist
* note_attachment: if the note was created from Document Notes, note_attachment is the objectId of the parent document. Otherwise, it is undefined

These notes are stored in a hidden folder inside the parent container called .folder-notes

### Document Notes

Notes can also be attached to individual documents with the Document Notes action. All document notes are stored in the .folder-notes folder in the parent folder of the document.

### Configuring Notes

To configure Folder Notes, navigate to the admin panel > Stage Config > Folder Actions, and find the Folder Notes action in the list of available actions. This action can be configured as either a _Modal_ action or a _Right-Side_ action.

To configure Document Notes, navigate to the admin panel > Stage Config > DocViewer, and find the Document Notes action in the list of available actions.

#### Form to Display

This is the form that will display to the user when editing or adding a note.  It's recommended to have a 'createHPINote' form configured that you can use throughout the application (it's not trac-dependent).  The object type on the form should be `HPI Note`. Typically, we configure the following properties on the form:

* Note Type (optional) - sometimes configured as a picklist
* note_content (required) - usually a hidden textarea
* note_detail (required) - usually a hidden textarea

#### Note Object Type

The default note object type is "hpi_note". To configure otherwise, replace this value with the appropriate object type.

#### Note Relationship (required)

Ensure that the Note Relationship option is configured to :

`hpi:folder_note (alfresco)`

## Subscription and Distribution

Subcriptions and distributions can be utilized to notify users about changes to documents.

### Subscription

ACA allows users to subscribe to a document.

Actions to configure:

* Subscribe (allows a user to subscribe to a document)
* Unsubscribe (allows a user to unsubscribe to a document)

Dashlets to configure:

* My Subscriptions (allows users to see all documents they are subscribed to on the ACA dashboard)

When a user is subscribed to a document they will receive an ACA notification and an email when the document they are subscribed to is modified in a way that meets the configured notification criteria for the subscription action (for more information see [Configuring Notifications for Subscription and Distribution](#configuring-notifications-for-subscription-and-distribution)).

### Distribution

Distribution lists allow users to define (at index time or later) what users and groups should be notified about changes to a document.

### Configuring Notifications for Subscription and Distribution

The following properties define when notifications should be sent for subscriptions and distributions: 

```text
# Configuration for the Distributions List and Subscription List behaviors, which will send users and/or groups a notification when a
# property is updated to a given value.  The users and groups that will receive the notification are based on
# values on the properties set in the tsg:distributionsAttrs and tsg:subscriptionAttrs aspects.
# The list of QNames of the properties to check.  If this property does not exist on the node, no notifications will be sent.
# Example {http://www.tsgrp.com/model/tsg/1.0}status|{tsg.engineering}status
alfresco.notifications.criteriaProperty=
# A pipe separated list of comma-separated lists of values; each value list corresponds to the above property list
# When a node's property is set to one of these values, a notification is sent
# Example: Approved,Effective,Obsolete|Released
alfresco.notifications.criteriaPropertyValues=
# The QName of the attribute that will identify the document in the notification and email.  For example, this could be
# the QName for the node name or document number. If the document doesn't have this property the cm:name will be used.
alfresco.notifications.identificationPropQName=
```

In summary, these properties allow to configure according to the statament: "when X property changes to value Y I want an email to be sent to subscribed users and I want the document name in the email to be Z property value".