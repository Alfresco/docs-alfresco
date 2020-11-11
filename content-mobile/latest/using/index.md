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

>**Note**: [Settings](LINK) can be used to set which options are visible in this view. Administrators can also customize the menu view, meaning all options may not be available to you.

| Option | Description |
| ------ | ----------- |
| [Accounts](#accounts) | Switch between or manage accounts. |  
| Activities | View a list of recent activities in your sites. |
| [Repository](#repository) | View a directory tree of your sites, folders, and files, and easily navigate to your files. |
| [Sites](#sites) | Choose the site that you want to view content on. |  
| Favorites | View content that you've favorited. |  
| Search | Search for content. |  
| [Synced Content](#sync-content) | View content synced to your device. |  
| Local Files | View content stored on your device. |  
| My Files | View your private content. Only you can access this area. |  
| [My Tasks](#tasks) | View your tasks and create new tasks for yourself or others. |  
| Shared Files | View content that’s shared in Alfresco Content Services but not added to a site. |  
| Settings | Open [Settings](LINK). |
| Help | Get help. |

## Accounts

You can connect to as many Content Services accounts as you want. The app is device-specific, so you can connect to different accounts using different devices.

Accounts can be added, edited or deleted.

{% capture and-accounts %}

Tap on the account name in the menu to display options for account management.

### Manage accounts

Tap **Manage Accounts** to show the existing accounts.

To edit an existing account, tap on it to view its [settings](LINK).

Use the ![plus icon]({% link content-mobile/images/android-plus-icon.png %}) icon to add a new account and follow the steps for [setting up multiple accounts](LINK).

Use the ![x icon]({% link content-mobile/images/android-x-icon.png %}) icon to delete an account from the device.

> **Note:** The account is not permanently deleted, the connection is just removed from the app on that device.

### Switch profiles

Your administrator can set up [customized profiles](LINK) so that different users have different menus and access options. If your administrator has done this then you can switch between the profiles that are available to you.

{% endcapture %}
{% capture ios-accounts %}

Tap the ![add account]({% link content-mobile/images/ios-plus-icon.png %}) account icon or your profile picture to list your accounts.

### Manage accounts

To edit an existing account, tap on it to view its [settings](LINK).

Use **+** to add a new account and follow the steps for [setting up multiple accounts](LINK).

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
| Start review | Create a [review task](LINK) for the file. |
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

The options for working with files and folders are:

> **Note**: The options available depend on your individual permissions.

| Option | Description |
| ------ | ----------- |
| Open in | Choose a compatible app on your device to open the file with. Some apps will allow you to save the file back to Content Services, whilst others need to you to save the changed file locally and then **Upload** it into Content Services. |
| Sync | Sync a file or folder to your device so you can view it even when offline. Tap it again to unsync it. |
| Favorite | Mark a file as a favorite so it appears in your **Favorites** list. Tap it again to unfavorite it. |
| Like | Like or approve a file. |
| Review | Create a [review task](LINK) for the file. |
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

### Filter tasks

By default, all active tasks are displayed. To filter by specific task types:

1. Tap the down arrow.
2. Select the task type to view from the menu.

To create a custom filter:

1. Tap on **My Filter**.
2. Enter the filter requirements for `Status`, `Date Due`, `Priority`, and `Assignee`.
3. Tap **View Tasks**.

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

Tap the sync icon when previewing a file or folder to sync it. Synced content can be viewed by tapping on **Synced Content**.

Synced content was previously based on content that was a **Favorite**. Content that was previously synced because it was favorited is still available in **Synced Content**. Any files or folders that you favorite from now on will be available in **Favorites**, but not in **Synced Content**.

When online, your synced content will automatically sync to your device. This means that this content is always up to date.

If working offline, or if you can’t connect to your Content Services account, you’ll still be able to see your synced content. If you edit a synced file or folder whilst offline, the next time you go back online the changes you’ve made will be synced.





















