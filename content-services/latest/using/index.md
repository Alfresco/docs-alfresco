---
title: Getting started with Alfresco Share
---

Use the Getting Started guide to quickly learn the basics, and find more detailed information in Using Alfresco Share help.

> **Note:** If you prefer to use Alfresco Digital Workspace instead of Alfresco Share, see the [Digital Workspace documentation](TODO_LINK:). Alfresco Digital Workspace is a new content management application built with the Alfresco Application Development Framework (ADF). Digital Workspace offers a simplified experience for working with content and more comprehensive extensibility for developers.

For most of us, today's work environment means we spend much of our time working in teams that can extend beyond our workplace, and even our enterprise, to include partners, consultants, external agencies, and customers.

With Alfresco Share it's simple to share information, run projects, and collaborate effectively.

This guide gives you an introduction to some of the features of Alfresco Share:

* Personalize Alfresco Share with your own dashboard and user profile
* Build a site for your team
* Work with content and add it to your site
* Be social! Add users to your site, set up meetings and use social media features

You'll also be shown other little tricks and tips to help you get more out of Alfresco Share, so you can work and collaborate efficiently and effectively.

The video shows an overview of the Alfresco Share features:

> **Note:** This video contains functionality that's no longer available in Alfresco Share, i.e. Sync to Cloud.

## Signing in

To start the Getting Started guide you need to sign in to Alfresco Share.

1. Enter the following on the sign in screen:

    **Username**: *your user name*

    **Password**: *your password*

    > **Note:** You can get the sign in URL from your IT team. If you've downloaded Alfresco Share straight to your computer then the default url is *127.0.0.1:8080/share*.

2. Click **Sign In**.

    This opens your personal dashboard. You can now configure the dashboard so that it shows the information most important to you.

    ![Your Personal Dashboard]({% link content-services/images/gs-firstlogin.png %})

## Personalizing Alfresco Share

Having installed Alfresco Share and signed in, the first thing you can do is to personalize Alfresco Share to your own tastes and needs.

You're going to update your dashboard and your profile.

Your dashboard is made up of dashlets - each dashlet displays summary information on different parts of Alfresco Share, such as your latest updates, your tasks, or your sites. There are two different sets of dashlets available - one set for your personal Alfresco Share dashboard and one set that is used to customize individual sites that you set up.

As well as adding and removing dashlets you can also customize your dashboard layout.

Managing your profile means that you can create a personality that's visible to other Alfresco Share users.

### Setting up your dashboard

You can customize your dashboard so that you only see the information that you're interested in.

To customize your dashboard appearance and content:

1. Click ![Customize Dashboard icon]({% link content-services/images/settings-icon.png %}) to show the Customize User Dashboard page.

2. Click **Change Layout** to display the available layouts.

3. Click **Select** for the Three columns option.

4. Click **Add Dashlets** to display all the available dashlets.

5. Drag and drop **My Profile** and then **My Calendar** to Column 3.

    ![Customize User Dashboard: Add Dashlets]({% link content-services/images/gs-dashlets.png %})

6. Select **Hide from Dashboard** for the Get Started Panel.

7. Click **OK**.

    If you look at your dashboard now you can see that it's been updated with your dashlet choices.

    > **Note:** You can also resize dashlets to line them up nicely - just click on the bottom of a dashlet then drag up and down to resize it.

Your dashboard is now customized exactly as you want it - this isn't fixed though, you can change the dashboard whenever you like. You can click My Dashboard from anywhere in Alfresco Share to take a look at your dashboard.

### Updating your profile

Alfresco Share user profiles help you to identify who a user is and what they do in your organization.

Your name is displayed at the top of the screen. When you click on the name a menu opens where you can update profile details, change your password, search the help, and log out.

To update your profile:

1. Click your name and select **My Profile**, then click **Edit Profile**.

    > **Tip:** You can also select **View My Profile** from the My Profile dashlet.

2. Enter all the details that you want to show in your profile, including a picture if you like, then click **Save Changes**.

3. Click **Home** and you can see the updated details in the My Profile dashlet.

When your colleagues view your profile they'll see all the details you've entered.

![My Profile]({% link content-services/images/gs-my-profile.png %})

## Building a site

Now that you've personalized your own dashboard and profile, you're ready to set up a site.

Collaboration in Alfresco Share is based around the concept of creating sites that teams can share content in, but an Alfresco Share site is more than just a place to share and manage content. You can schedule and manage meetings and calendars, publish blogs and set up forums where you can have team discussions, and even write content online and publish it to a wiki.

### Creating a new site

The first thing that you need to do is to create a site and choose its settings.

1. Click **Create Site** on the **My Sites** dashlet or click the **Sites** menu at the top of the screen and select **Create Site**.

    Whichever method you choose will open up the **Create Site** dialog box.

2. Now enter site details as shown. You'll notice that the URL Name is automatically created.

    * **Name**: Marketing Content
    * **Description**: This site is for sharing and collaborating on marketing content.
    * **Visibility**: Public

        > **Note:** By setting the site to **Public** all users in your organization can see and join the site. Selecting **Moderated** means that everyone can see it but a site manager has to approve requests to join. If you set the site visibility to **Private**, only users that you, the Site Manager, add to a site will be able to see and join the site. The visibility setting you select is displayed next to the site name when a user is in the site. See [Alfresco Share sites]({% link content-services/latest/using/share/sites.md %}) for more information on site visibility settings.

    ![Create Site]({% link content-services/images/gs-create-site.png %})

3. If you have modules such as Records Management installed, then there will be an additional Type option. Select **Collaboration Site** to create a standard site.

4. Click **Create** and the dashboard for your new site is now shown.

    Now that you've created a site, you can start to customize it, in much the same way as you did with your personal dashboard.

### Customizing the site dashboard

A site dashboard displays all information and activities associated with the site. You can customize the site dashboard just as you did with your personal dashboard.

1. Click ![Customize Dashboard icon]({% link content-services/images/settings-icon.png %}) then Customize Dashboard.

2. Leave the current layout as it is and click **Add Dashlets**.

    > **Note:** Notice how the dashlets differ to those available for your personal dashboard. The personal dashlets help you to configure what you want to see such as activity on sites that you are a member of, whereas the site dashlets are designed to help with team collaboration.

3. Drag the **Wiki** dashlet onto Column 1 and click **OK**.

You can resize the dashlets on the site dashboard as required. You are now nearly ready to add content to your site, just one more step first to customize the site further.

### Adding features to a site

You can add features to your site such as a discussion forum, a wiki, or a blog.

At the top of your site dashboard are tabs for areas of your site. By default you have Site Dashboard, Document Library, and Site Members. You can add additional features as needed for a site and choose a site homepage. If you look at the Wiki dashlet that you added previously, you'll see that it says that no page is configured. You're now going to configure a wiki for the site.

1. Click ![Customize Dashboard icon]({% link content-services/images/settings-icon.png %}) and then **Customize Site**.

2. Drag the Wiki and Calendar icons down into the Current Site Pages area, and click **OK**.

    > **Note:** Take a look at [Alfresco site features]({% link content-services/latest/using/share/features/index.md %}) for more details on these features.

Back on the site dashboard you can see that the wiki and calendar have been added. You now have a site set up! It's time to start adding some content.

## Working with content

Before you begin working with content, we'll look at the two different concepts of content there are in Alfresco Share.

The first is content that is actually part of Alfresco Share features themselves, such as updates to a wiki, a new blog posts, or forum discussions.

The second is content items such as documents, spreadsheets, or images that are stored in the Document Library. These can be uploaded or created directly from Alfresco Share.

So now that you know the differences in content types, it's time to start adding content to your site.

### Adding content

First you'll look at adding content items such as documents, spreadsheets, presentations, and images to a site.

You're going to add two documents that you created previously to your site.

> **Note:** To help you follow this example you'll need to have two documents available on your computer that you can add to the site.

1. Click **Document Library** to display the document library.

    Alfresco Share gives you lots of options for getting content into the library. You can upload files, create folders, drag and drop files and even create content directly from Alfresco Share.

2. You're going to drag and drop the content in - go to the location where you saved your two files, select them, and drag and drop them directly to the drag and drop area on the Document Library.

    ![Drag and drop]({% link content-services/images/gs-dragdrop.png %})

    It's as simple as that. Your documents are now uploaded to the site library.

### Editing content

Updating your content in Alfresco Share is easy to do and you can even select whether to edit in Microsoft Office, offline, or in Google Docs.

1. In the Document Library item list, hover your cursor over one of the files.

    This highlights the item and displays the actions available for that item.

2. Click **More** and then select **Edit Offline**.

    Alfresco Share now shows a notification that the document is locked. Depending on your browser the content will be either downloaded automatically, or you will need to choose a location to save it to.

    The document is saved to this location with **(Working Copy)** added to the title.

3. Now open the document from this location using you're preferred software and make an edit it to it.

4. When you've done that save and close it.

5. Back in Alfresco Share, hover your curser over the document and click **Upload New Version**.

    ![Update File page]({% link content-services/images/UpdateFile.png %})

6. In the Update File page click the browse icon and find and select the "Working Copy" document.

    > **Note:** If you select a file with a different name or file type then this will be shown. You can continue as in the next step, cancel, or select a different file to upload. If you continue then the uploaded file name and/or file type will be used.

7. Leave the version on minor changes and click **Upload**.

8. When the upload is finished click **OK**, and a modification update is shown on-screen.

9. Click **Site Dashboard** and you'll see update notifications in the dashlets.

### Creating content

As well as uploading content, you can also create content right in Alfresco Share.

1. Select the folder in the site library where you want to add the content.

2. Click **Create**.

    You can see a number of different types of file that you can create.

3. Select the type of Google Docs file you want to create.

    > **Note:** The first time you access Google Docs you have to authorize Alfresco Share to use your account. After responding to the prompts a message lets you know that the authorization was successful.

    Alfresco Share stores your Google Docs account information. You will need to authorize this each session, but you won't have to re-enter your credentials each time.

    If your browser asks you to allow popups for Google Docs then go ahead and do so. If you're using Safari you won't be able to use Google Docs until you enable all popups in the Settings, so for security reasons you may prefer to use a different browser.

    Google Docs opens with standard Google Docs functionality available, including the menu, the toolbar, and the features to add comments and share.

4. Enter some content in the text area.

    > **Note:** The file is saved to Google Docs, and locked in Alfresco Share until you check it in.

5. When you're done, close the Google Docs browser tab.

    In Alfresco Share you'll see the file displays the ![Geolocation metadata icon]({% link content-services/images/ico-googledocs.png %}) icon to show that it's open in Google Docs.

6. In Alfresco Share, click **More** then **Check In Google Doc**.

7. Now hover over the new item, click ![Edit]({% link content-services/images/ico-configure.png %}), and type a new name for the item then press ENTER.

## Being social

You have built a site and added some content to it. The next thing you need to do is to get other users on your site, sharing and creating their own content.

In Alfresco Share you can schedule social events using the shared site calendar, and add both internal and external users to the site. You also decide how much power they have in the site, such as whether they can just add content or actively edit content created by other users. There is also a full range of social features such as liking content and following favorite users.

### Scheduling events

Having previously added a calendar to your site, you can now use it to schedule events for your team.

You can schedule an online meeting to welcome new users and discuss the purpose of the site.

1. Click **More** then **Calendar** to open the calendar.

2. Hover over a date on the calendar and click the **Add Event** icon (![Add Event icon]({% link content-services/images/ico-add-event.png %})).

3. Add an event title as the What; because you're holding the meeting online you don't need to enter a Where, but you can enter a description if you like.

4. The date you choose is pre-selected, with the time set at 12:00 PM till 1:00 PM. That sounds good so leave it and click **OK**.

    You can see that the event has been created and scheduled in the calendar. If you want to increase visibility of the events you schedule you can always add a calendar dashlet to the dashboard.

5. Click **Home** and you'll see the meeting in the Site Activities dashlet.

    ![Site activites dashlet]({% link content-services/images/gs-site-activities.png %})

### Adding users to your site

Now that you've created a site and added content, the next step is to invite other Alfresco Share users to the site.

1. Click the Add User icon (![Invite to Site]({% link content-services/images/invite-to-site-icon.png %})) at the top of the dashboard to open the Add Users page.

    > **Note:** You don't need to be on your site dashboard to do this - the **Add Users** option is available from everywhere in your site.

2. Type the full or partial name of a user you want to invite and click **Search**.

    > **Note:** An internal user is someone in your organization. This tutorial will add the test user, Alice Beecher, but if your Content Services administrator has already set up users, then you can add real users if you prefer.

3. Click **Select** to add the user to the **Set User Role** list.

4. Click **Select Role** and select **Collaborator**.

    > **Note:** You can set different roles for different users; take a look at the Alfresco Share [User roles and permissions]({% link content-services/latest/using/share/permissions.md %} for more details on user roles.

5. Click Add Users.

An email notification is sent to each person that you invited and they can start using the site immediately.

### Using social features

When you look at the site dashboard you can see site activity and details of content that has been added or edited.

1. If you aren't already on it, click **Site Dashboard**.

    You can see on the Site Content and Site Activities dashlets details of activity on the site such as adding documents and creating calendar events.

2. On the Site Content dashlet click the sorting menu - by default it shows content **I've Recently Modified**.

3. Select **My Favorites** from the sorting menu.

    You haven't marked any documents as favorites yet so the Site Content dashlet has nothing to display. Marking items as favorites is a great way to keep track of items you're really interested in, so you're now going to select an item as a favorite.

4. Click the sorting menu again and select **I've Recently Modified**, to display the modified content.

    Once that's done you can see there are **Favorite**, **Like** and **Comment** options.

    ![Site content dashlet]({% link content-services/images/gs-site-content-dashlet.png %})

5. Now click the **Favorite** option for one of the documents.

    A gold star now indicates that this document is a favorite.

6. Click **Like** as well to show that you approve of the document.

7. Next click **Comment**.

    Alfresco Share switches to the Comments field in the document preview.

8. Type "This is great!" and click **Add Comment**.

    Your comment is displayed under the document - you can use the comment feature to have discussions with other users about content items.

9. Now click **Site Dashboard** and on the Site Content dashlet select **My Favorites** from the view menu, and now only the document you made a favorite is displayed.

### Following users

There can be many users of a system, so it is likely that there will be some users whose activities will be of more importance to you. You can choose to follow these users so that you can easily keep track of what they've been doing.

1. Click **Site Dashboard**.

2. Click the sorting menu on the Site Activities dashlet.

    By default it shows **Everyone's activities**, but you can see that there are other options available including to only show activity from people **I'm following** and to show **My activites**.

    To follow another user you just need to visit their profile. You can do this by clicking on their name in the Site Activities dashlet or by searching for them in the **People** area of the site.

3. Click **People** at the top of the site dashboard.

    This opens the People Finder where you can search for other site members.

4. Type "a" in the search field and click **Search**.

    All users containing the letter "a" in their name are displayed.

5. Click the **Follow** button next to a user and you are now following the user.

6. Click your name at the top of the screen, then **My Profile**.

You'll see that the top of the page shows how many people you're following.

## More resources

This is the end of the Alfresco Share Getting Started guide, and you should now be able to use Alfresco Share in ways that will improve how you work on a day to day basis.

In this getting started guide you've learnt how to:

* Customize your own dashboard and user profile
* Create a site where your team can share content and collaborate
* Work with different kinds of content and add it to your site
* Add users to your site, set up meetings, and use social media-style features
* View and understand site activities

This is just the beginnings of what you can achieve with Alfresco Share; we'd really recommend that you take some time to look at our other learning resources and try out other features that will help you to do great work:

* Read the [(Using Alfresco Share)]({% link content-services/latest/using/share/index.md %}) documentation on other features
* Watch the Alfresco Share 'How To' videos [('How To' videos)]({% link content-services/latest/tutorial/index.md %})

> **Note:** The videos and labels within images are in English.
