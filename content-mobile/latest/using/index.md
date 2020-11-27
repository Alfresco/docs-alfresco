---
title: Using Content Services for Mobile
---

Once you’ve connected the mobile app to your Alfresco Content Services account it’s time to start finding, downloading, and using content.

Content is stored in sites, so you can use different sites to store different groups of content.

## Display

The display is split into three areas:

* The **Menu** providing access to all of the application features.

* **Lists** that display the results of the selected menu item. For example, selecting **Favorites** will display a list of files and folders that you have favorited.

>**Note**: Navigate back a level using the option at the top of a list, or pull down the screen to refresh a list.

* The **Preview** option shows a preview of a file or folder. For example, tapping one of your favorited files in the list will display a preview of that file.

## Menu

When you start up Content Services, you’ll see a list of options including choosing a site, searching for content, and viewing site activity.

>**Note**: Some options are only available if your Content Services repository is using the latest version.

To show or hide the menu:

* On Android: tap the menu button or pull the left edge of the screen.
* On iOS: swipe right on an iPhone or pull the left edge of the screen on an iPad.

The options are:

>**Note**: [Settings]({% link content-mobile/latest/config/index.md %}) can be used to set which options are visible in this view. Administrators can also customize the menu view, meaning all options may not be available to you.

| Option | Description |
| ------ | ----------- |
| [Accounts](#accounts) | Switch between or manage accounts. |  
| Activities | View a list of recent activities in your sites. |
| [Repository](#repository) | View a directory tree of your sites, folders, and files, and easily navigate to your files. |
| [Sites](#sites) | Choose the site that you want to view content on. |  
| [Favorites](#favorite-content) | View content that you've favorited. |  
| [Search](#search) | Search for content. |  
| [Synced Content](#sync-content) | View content synced to your device. |  
| [Local Files](#local-files) | View content stored on your device. |  
| My Files | View your private content. Only you can access this area. |  
| [My Tasks](#tasks) | View your tasks and create new tasks for yourself or others. |  
| Shared Files | View content that’s shared in Alfresco Content Services but not added to a site. |  
| Settings | Open [Settings]({% link content-mobile/latest/config/index.md %}). |
| Help | Get help. |

## Accounts

You can connect to as many Content Services accounts as you want. The app is device-specific, so you can connect to different accounts using different devices.

Accounts can be added, edited or deleted.

{% capture and-accounts %}

Tap on the account name in the menu to display options for account management.

### Manage accounts

Tap **Manage Accounts** to show the existing accounts.

To edit an existing account, tap on it to view its [settings]({% link content-mobile/latest/config/index.md %}).

Use the ![plus icon]({% link content-mobile/images/android-plus-icon.png %}) icon to add a new account and follow the steps for [setting up multiple accounts]({% link content-mobile/latest/config/index.md %}#connect-to-an-account).

Use the ![x icon]({% link content-mobile/images/android-x-icon.png %}) icon to delete an account from the device.

> **Note:** The account is not permanently deleted, the connection is just removed from the app on that device.

### Switch profiles

Your administrator can set up [customized profiles]({% link content-mobile/latest/config/index.md %}#customize-app-profiles) so that different users have different menus and access options. If your administrator has done this then you can switch between the profiles that are available to you.

{% endcapture %}
{% capture ios-accounts %}

Tap the ![add account]({% link content-mobile/images/ios-plus-icon.png %}) account icon or your profile picture to list your accounts.

### Manage accounts

To edit an existing account, tap on it to view its [settings]({% link content-mobile/latest/config/index.md %}).

Use **+** to add a new account and follow the steps for [setting up multiple accounts]({% link content-mobile/latest/config/index.md %}#connect-to-an-account).

Tap an account and swipe to the left to display the **Delete** button.

> **Note:** The account is not permanently deleted, the connection is just removed from the app on that device.

### Switch profiles

If there are multiple accounts set up then the account in use will display a ![account selected]({% link content-mobile/images/ios-selected-icon.png %}) icon. Tap on the empty icon against another account to switch to that one instead.

{% endcapture %}

{% include tabs.html tableid="accounts" opt1="Android" content1=and-accounts opt2="iOS" content2=ios-accounts %}

## Content

You can access content through the repository or through the sites that it’s stored on. You can also access local files stored on your device.

### Repository

Tap **Repository** and then you can tap to drill-down through all the content available to you. The repository is particularly useful if you want to find content outside of site document libraries, such as in wikis.

### Sites

Sites are what content is directly stored in and are the quickest way to access content.

Tap **Sites** and you’ll see a list of sites that you’re a member of (**My Sites**) with the account you’re currently using. You can filter the view of sites to only see your **Favorite Sites**, or use the **Site Finder** to search for a site.

The current site or folder name that you are viewing is displayed at the top of the screen.

Tap the options next to a site for options to join or leave a site, favorite or unfavorite a site that you’re a member of, and view the site members.

**Note:** On Android devices you can view the sites where your membership is pending confirmation using the ![options icon]({% link content-mobile/images/android-options-icon.png %}) icon at the top of the screen.

### Create content

When you’re in a site or folder in which you have permissions to upload or edit content, you have multiple options available. Tap on a folder to view its contents and tap on a file to display a preview of it.

> **Note:** Permissions are set by site managers.

Tap the **+** icon and choose how to create new content:

| Option | Description |
| ------ | ----------- |
| Create Folder | Create a new folder in the active site or folder. |
| Create | Create a new file and then save it in Content Services, adding tags if you want. If you select to create a **Text Document** using the **Alfresco Text Editor**, you can tap the microphone icon to create it using speech-to-text if you’re online. |
| Upload | Choose content to upload and select a device location to [upload](#upload-content) from. |
| Take Photo | Take a new photo. |
| Record Video | Make a new video. |
| Record Audio | Record and upload audio. This may not be available on some devices. |

> **Note:** You can drag down to refresh the content in a repository or a site.

### Manage content

Tap on a file or folder to view it and see the options available for working with it.

{% capture and-manage %}

#### Files

The options for working with files are:

> **Note**: On some devices you’ll need to tap the ![options icon]({% link content-mobile/images/android-options-icon.png %}) icon to see all the available options. The options available depend on your individual permissions.

| Option | Description |
| ------ | ----------- |
| Open in | Choose a compatible app on your device to open the file with. Saving the file in the app will apply those changes to the file in Content Services. |
| Sync | Sync a file or folder to your device so you can view it even when offline. Tap it again to unsync it. |
| Favorite | Mark a file as a favorite so it appears in your **Favorites** list. Tap it again to unfavorite it. |
| Like | Like or approve a file. |
| Share attachment | Share the file as an attachment in another app, such as an email, or another Content Services account. Depending on the configuration you can choose whether it is shared as an attachment or clickable link. |
| Download | Download a copy of the file for offline viewing. It will appear in the Content Services **Local Files** section. |
| Upload | Upload a new version of the file from your device. This will overwrite the current version. |
| Edit | Change the file properties. |
| Start review | Create a [review task](#tasks) for the file. |
| Delete | Delete the file from the site. |

##### Tabs

You can tap or swipe to move between the different tab views in preview.

* **Properties** displays the tags and properties for a file.
* **Versions** displays the version history of the file.
* **Comments** displays the comments on the file and lets you add new ones.

##### Restricted content

Restricted content can’t be accessed on the mobile app. Content with the ![restricted icon]({% link content-mobile/images/android-restricted-icon.png %}) icon next to it has had some restrictions placed on it. This content also has an additional **Restrictable** section in the **Properties**.

You can view the version history, comments and tags for a restricted file, as well as create a task for it. You can’t access the content of a restricted file, print it, or download it.

#### Folders

The options for working with folders are:

> **Note**: On some devices you’ll need to tap the ![options icon]({% link content-mobile/images/android-options-icon.png %}) icon to see all the available options. The options available depend on your individual permissions.

| Option | Description |
| ------ | ----------- |
| View Properties | View the properties for the folder. When viewing the properties this allows you to **Sync**, **Favorite** or **Like** the folder. These behaviors are the same as for files, with **Sync** having the whole folder appear in the **Synced Content** view. |
| Edit | Edit the properties of a folder. |
| Delete | Delete a folder. |

{% endcapture %}
{% capture ios-manage %}

#### Folders and files

The options for working with files and folders are:

> **Note**: The options available depend on your individual permissions.

| Option | Description |
| ------ | ----------- |
| Open in | Choose a compatible app on your device to open the file with. Some apps will allow you to save the file back to Content Services, whilst others need to you to save the changed file locally and then **Upload** it into Content Services. |
| Sync | Sync a file or folder to your device so you can view it even when offline. Tap it again to unsync it. |
| Favorite | Mark a file as a favorite so it appears in your **Favorites** list. Tap it again to unfavorite it. |
| Like | Like or approve a file. |
| Review | Create a [review task](#tasks) for the file. |
| Comments | View existing comments and add new ones. |
| Edit | Open a file and directly make changes. Only available for text files. |
| Update | Select a new version of a file from your **Local Files**. Save as a major or minor change to increment the version of the file. |
| Email | Open up a draft email with the file as an attachment. |
| Print | Print the file to a compatible printer. |
| Download | Download a copy of the file for offline viewing. It will appear in the Content Services **Local Files** section. |
| Delete | Delete the file or folder from the site. |
| Add Folder | Create a new folder within the current folder. |

#### Tabs

You can tap or swipe to move between the different tab views in preview.

> **Note:** iPhones will only display the icons, whilst iPads display the a text description.

* ![preview icon]({% link content-mobile/images/ios-preview-icon.png %}) **Preview** displays a file preview to scroll through and zoom in on, or play a video. This is not available for folders.
* ![properties icon]({% link content-mobile/images/ios-properties-icon.png %}) **Properties** displays the file or folder properties.
* ![history icon]({% link content-mobile/images/ios-history-icon.png %}) **History** displays the version history of a file. This is not available for folders.
* ![comment icon]({% link content-mobile/images/ios-comment-icon.png %}) **Comments** displays the comments on a file or folder and allows you to add your own.
* ![map icon]({% link content-mobile/images/ios-map-icon.png %}) **Maps** displays the map location for files with geographic properties.

{% endcapture %}

{% include tabs.html tableid="manage" opt1="Android" content1=and-manage opt2="iOS" content2=ios-manage %}

## Tasks

Tap **My Tasks** to see the list of tasks assigned to you and to create new To do lists or Review & Approve tasks.

Tasks are in date order so that you’ll always see the task with the most recent due date first. All of your tasks are synced up with your Content Services account.

Tap on a task and you’ll see more details about the task. If the task relates to a file, you’ll see a preview image and the file name. Tap on the file to open it and you can use all the usual file actions.

{% capture and-tasks %}

### Filter tasks

By default, all active tasks are displayed. To filter by specific task types:

1. Tap the down arrow.
2. Select the task type to view from the menu.

To create a custom filter:

1. Tap on **My Filter**.
2. Enter the filter requirements for `Status`, `Date Due`, `Priority`, and `Assignee`.
3. Tap **View Tasks**.

### Task actions

Depending on whether you have a review or to do task open, you can tap a choice of actions:

| Option | Description |
| ------ | ----------- |
| Approve | Approve a review on the file. |
| Reject | Reject a review on the file. |
| Reassign | Choose another user to assign the task to. |
| Done | Complete the task. |
| Task History | View the history of the task. |

{% endcapture %}
{% capture ios-tasks %}

Tap **View** and select to show either **My Tasks** or **Tasks I Started**.

> **Note:** You can also accept and reject invitations to sites in the **My Tasks** section.

### Task actions

Depending on whether you have a review task, a to do task, or a site invitation, you can tap a choice of actions:

| Option | Description |
| ------ | ----------- |
| Approve | Approve a review on the file, or accept the site invitation. |
| Reject | Reject a review on the file, or reject the site invitation. |
| Reassign | Choose another user to assign the task to. |
| Done | Complete the task. |

> **Note:** Once a site invitation has been accepted, refresh the sites list by pulling down on the screen.

{% endcapture %}

{% include tabs.html tableid="tasks" opt1="Android" content1=and-tasks opt2="iOS" content2=ios-tasks %}

### Create a task

You can create new tasks for yourself or for other users.

1. Tap **My Tasks** and then the **+** icon.
2. Choose the task type, `To do` or `Review & Approve`.

    > **Note:** You can also create a new `Review & Approve` task when viewing a file.

3. Enter a title for the task and choose the date that the task is due by.

4. Tap **Assignee** to search for a person to assign the task to.

5. Tap **Save** to create the task.

You can also add attachments to a task such as a file for review. You can set the priority of the task and notify the assigned user by setting **Email Notification** on.

For `Review & Approve` tasks:

* On Android: tap **Approvers** to choose one or more people to approve the file.
* On iOS: tap the **+** and **-** icons to add or remove approvers.

## Sync content

You can sync any file or folder in Content Services to your device and work with your synced content when you’re offline.

Tap the sync icon when previewing a file or folder to sync it. Synced content can be viewed by tapping on **Synced Content**. Tap the unsync icon to stop syncing a piece of content.

Synced content was previously based on content that was a **Favorite**. Content that was previously synced because it was favorited is still available in **Synced Content**. Any files or folders that you favorite from now on will be available in **Favorites**, but not in **Synced Content**.

When online, your synced content will automatically sync to your device. This means that this content is always up to date.

If working offline, or if you can’t connect to your Content Services account, you’ll still be able to see your synced content. If you edit a synced file or folder whilst offline, the next time you go back online the changes you’ve made will be synced.

> **Note:** If the **Synced Content** folder displays a warning, then one or more of your synced files have been moved or deleted from Content Services. You can select to **Resolve Conflicts** and create a local copy of the file.

### Data usage

Data usage can be switched off using the setting:

* For Android: **Data Usage**.
* For iOS: **Use Data for Sync**.

If you have it switched on then content will sync automatically, and your data usage may be affected. If you want to reduce your data usage then turn it off. Your synced content will only be synced when you refresh it in the **Synced Content** folder.

## Favorite content

You can make any file or folder a favorite by tapping the favorite icon on a file or folder.

Tap **Favorites** to view all your favorited content.

>**Note:** Favorites aren't available when you’re offline.

## Search

You can search for files, folders, people, and sites.

{% capture and-search %}

Tap the search icon on the menu to search a full account.

The files search is displayed by default. Tap the down icon select to search for people, folders or sites instead.

Tap the search icon when you're in a site or folder to search in only that site or folder.

> **Note:** In a site or folder you can only search for folders or files.

Type your search text in the search field and then tap the search icon on your device keypad. You can check the location of a file by looking at the `path` in the file properties. You can also use the microphone icon to search using speech to text.

In the Search screen tap your device menu button then select **Advanced Search** to enter one or more search criteria, to make your search more specific.

> **Note:** Your previous searches are shown below the search box. You can tap on these to search again.

{% endcapture %}
{% capture ios-search %}

Tap the search icon on the menu to search a full account, then tap to search for files, folders, sites, or people.

Type your search text in the search box and tap the search icon on your device keypad.

> **Note:** When you're in **Repository**, **Sites**, **Shared Files** and **My Files** a search box is available for you to search for files within that area only.

All files matching the search are displayed. Tap a result to preview the file.

You can only search for file names, not folder names. If you have [**Full Text Search**]({% link content-mobile/latest/config/index.md %}#app-settings/ios/full-content-search) selected then all files containing the search term are also displayed.

> **Note:** Your previous searches are shown below the search box. You can tap on these to search again.

The search results list is displayed until you click **Cancel**.

{% endcapture %}

{% include tabs.html tableid="search" opt1="Android" content1=and-search opt2="iOS" content2=ios-search %}

## Users

When you tap on a user, or anywhere else you see their avatar in the app, you can see their profile details.

> **Note**: To search for users, tap the search icon and choose to search for people.

{% capture and-users %}

The options available when viewing a user profile are:

| Option | Description |
| ------ | ----------- |
| Telephone | Call the user. |
| Skype | Make a Skype call to the user, or send them a message using Skype. |
| Email | Send an email to the user. |
| Add contact | Add the user as a contact. |
| Location | View the user's location. |

{% endcapture %}
{% capture ios-users %}

The options available when viewing a user profile are:

| Option | Description |
| ------ | ----------- |
| Skype | Make a Skype call to the user, or send them a message using Skype. |
| Email | Send an email to the user. |

> **Note:** You can tap the down arrow next to a site in the sites list to view the members of that site.

{% endcapture %}

{% include tabs.html tableid="users" opt1="Android" content1=and-users opt2="iOS" content2=ios-users %}

## Local files

Content that’s stored on your device is listed in **Local Files**.

{% capture and-local %}

In **Local Files** you can access your **Alfresco Downloads** folder, **Device Shortcuts**, and your devices’ **Library**. This is a great way to search you device for content that you want to view or upload to Alfresco Content Services.

Files in **Alfresco Downloads** may have been downloaded from Content Services to store locally, or sent from another app. All local files, including files in **Alfresco Downloads**, can be accessed when you're offline.

Tap on a file to open it in a compatible app where you can edit it and save it back to your local files.

You can tap ![menu icon]({% link content-mobile/images/android-options-icon.png %}) on a file in the **Alfresco Downloads** folder to **Upload**, **Share**, **Rename**, or **Delete** it.

**Note:** When working with local files through **Device Shortcuts** or in your device **Library**, the **Rename** and **Delete** options aren’t available.

Tap on a file to open it in an associated app.

Tap and hold a file to select multiple files. You can then **Upload**, **Share** or **Delete** them, or **Select All**.

{% endcapture %}
{% capture ios-local %}

Local files can be files downloaded to store locally or they can be sent to Content Services. All local files can be accessed when you're offline.

The options for local files are to:

| Option | Description |
| ------ | ----------- |
| Open in | Choose a compatible app on your device to open the file with. Some apps will allow you to save the file back to Content Services, whilst others need to you to save the changed file locally and then **Upload** it into Content Services. |
| Email | Open up a draft email with the file as an attachment. |
| Print | Print the file to a compatible printer. |
| Rename | Rename the file. |
| Delete | Delete the file or folder from the site. |

> **Note:** You can tap **Original Properties** to view the file properties at the point it was downloaded. Any changes to the properties aren’t reflected here.

{% endcapture %}

{% include tabs.html tableid="local" opt1="Android" content1=and-local opt2="iOS" content2=ios-local %}

## Using content with other apps

You can open Content Services files in other apps, upload from other apps to Content Services, and create Microsoft Office files and save them to Content Services.

> **Note:** You may occasionally find that a file doesn't open or upload when using another app. If this happens then try using a different app or updating the system version on your device.

{% capture and-other %}

### Open Content Services files in other apps

1. In the file preview tap **Open in...** and select an app to open a file in, for example, Microsoft Word.

2. When you've edited the file save it in the app you’re using for editing, and any changes will be applied to the file in Content Services.

> **Note:** For Microsoft Office apps you can just tap your device back button and the file will be saved back to Alfresco Content Services.

### Create Office files and save to Content Services

You can create new Microsoft Office files and save them straight to Content Services.

1. Create a new file in a Microsoft Office app.

2. Select **Save**, then **Other Cloud Storage**, and select **Alfresco** from the list.

> **Note:** You need to be signed in to the Content Services app for it to display on the list.

3.Choose where to save the file to.

> **Note:** You can't save a file straight to the top level of the **Synced Content** area, you need to save it to a folder that has been synced.

### Open Content Services files from Office

1. Select **Open** in a Microsoft Office app.

2. Select **Other Cloud Storage**, and select **Alfresco** from the list.

3. Browse through Alfresco to find a file then tap on it.

4. When you've edited the file select **Save** and the file is saved back to Content Services.

> **Note:** The Content Services app needs to be running for it to display on the list.

You may occasionally find that a file doesn't open. If this happens then open Content Services and tap on the account name in the menu and make sure that you're signed in.

### Upload from other apps

You can use the **Share** option in other apps to upload files.

1. Select **Alfresco** from the list of apps, and you can tap down icon to choose which account, site, and folder to upload the file to.

2. You can name the file and add tags and a description, and if a file with that name already exists in the location, then you’ll be prompted to rename your file to avoid overwriting existing content.

> **Note:** If you're uploading multiple files you can’t name an item or add tags and descriptions at this point.

{% endcapture %}
{% capture ios-other %}

> **Important:** To open a file from another app you need to have logged in to iCloud in your device settings, and be using iOS 10 or later.

### Open Content Services files in other apps

1. In the file preview tap **Open in...** and select an app to open a file in, for example Microsoft Word.

> **Note:** This opens a copy of the file. To edit the file open it directly from an app such as Microsoft Word.

### Create Office files and save to Content Services

You can create new Microsoft Office files and save them straight to Content Services.

1. Create a new file in a Microsoft Office app.

2. Select **Save**, then **More** then **Locations** and select **Alfresco** from the list.

> **Note:** You need to be signed in to the Content Services app for it to display on the list.

3.Choose where to save the file to.

> **Note:** You can't save a file straight to the top level of the **Synced Content** area, you need to save it to a folder that has been synced.

### Open Content Services files from Office

1. Select **Open** in a Microsoft Office app.

2. Select **More** then **Locations** and select **Alfresco** from the list.

3. Browse to find a file then tap on it.

4. When you've edited the file select **Save** and the file is saved back to Content Services.

> **Note:** The Content Services app needs to be running for it to display on the list.

You may occasionally find that a file doesn't open. If this happens then open Content Services and tap on the account name in the menu and make sure that you're signed in.

### Open a file directly from another app

> **Note:** The instructions may differ for different apps.

1. Open the app you want to open a file in, for example Microsoft Word.

2. Tap **Open** then **More**.

3. Tap **Locations** then **More**.

4. Switch on the **Alfresco** option and tap **Done**.

5. Tap **Locations** again. Now that you've switched on this option it'll be available each time you tap **Locations**.

6. Select **Alfresco**.

7. Select an account or **Local Files** and enter your login details if requested.

8. Browse to the file you want to add and select it.

You can now edit the file and when you're done select save and it'll be saved back to Content Services.

> **Note:** Microsoft Office apps support save back, but not all apps do, so check that the app your using does support this feature. If not then you'll need to upload the saved document to Content Services.

### Add a file to another app

> **Note:** The instructions may differ for different apps.

1. Open the app you want to add a file to.

2. Tap the **More** or **Options** icon and select **Add Files**.

3. Select **Alfresco**.

4. Select an account or **Local Files** and enter your login details if requested.

5. Browse to the file you want to add and select it.

{% endcapture %}

{% include tabs.html tableid="other-apps" opt1="Android" content1=and-other opt2="iOS" content2=ios-other %}
