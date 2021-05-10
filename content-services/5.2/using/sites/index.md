---
title: Building a site
---

Now that you've personalized your own dashboard and profile, you're ready to set up a site.

Collaboration in Alfresco Share is based around the concept of creating sites that teams can share content in, but an Alfresco Share site is more than just a place to share and manage content. You can schedule and manage meetings and calendars, publish blogs and set up forums where you can have team discussions, and even write content online and publish it to a wiki.

-   **[Creating a new site](#creating-a-new-site)**  
The first thing that you need to do is to create a site and choose its settings.
-   **[Customizing the site dashboard](#customizing-the-site-dashboard)**  
A site dashboard displays all information and activities associated with the site. You can customize the site dashboard just as you did with your personal dashboard.
-   **[Adding features to a site](#adding-features-to-a-site)**  
You can add features to your site such as a discussion forum, a wiki, or a blog.


## Creating a new site {#creating-a-new-site}

The first thing that you need to do is to create a site and choose its settings.

1.  Click **Create Site** on the **My Sites** dashlet or click the **Sites** menu at the top of the screen and select **Create Site**.

    Whichever method you choose will open up the **Create Site** dialog box.

2.  Now enter site details as shown. You'll notice that the URL Name is automatically created.

    -   Name: Marketing Content
    -   Description: This site is for sharing and collaborating on marketing content.
    -   Visibility: Public

        > **Note:** By setting the site to **Public** all users in your organization can see and join the site. Selecting **Moderated** means that everyone can see it but a site manager has to approve requests to join. If you set the site visibility to **Private**, only users that you, the Site Manager, add to a site will be able to see and join the site. The visibility setting you select is displayed next to the site name when a user is in the site. See [Alfresco Share sites](#sites) for more information on site visibility settings.

    ![Create Site]({% link content-services/images/gs-create-site.png %})

3.  If you have modules such as Records Management installed, then there will be an additional Type option. Select **Collaboration Site** to create a standard site.

4.  Click **Create** and the dashboard for your new site is now shown.

    Now that you've created a site, you can start to customize it, in much the same way as you did with your personal dashboard.


This video shows the steps in the tutorial.

  



## Customizing the site dashboard {#customizing-the-site-dashboard}

A site dashboard displays all information and activities associated with the site. You can customize the site dashboard just as you did with your personal dashboard.

1.  Click ![Customize Dashboard icon]({% link content-services/images/settings-icon.png %}) then Customize Dashboard.

2.  Leave the current layout as it is and click **Add Dashlets**.

    > **Note:** Notice how the dashlets differ to those available for your personal dashboard. The personal dashlets help you to configure what you want to see such as activity on sites that you are a member of, whereas the site dashlets are designed to help with team collaboration.

3.  Drag the **Wiki** dashlet onto Column 1 and click **OK**.


You can resize the dashlets on the site dashboard as required. You are now nearly ready to add content to your site, just one more step first to customize the site further.

This video shows the steps in the tutorial.

  


## Adding features to a site {#adding-features-to-a-site}

You can add features to your site such as a discussion forum, a wiki, or a blog.

At the top of your site dashboard are tabs for areas of your site. By default you have Site Dashboard, Document Library, and Site Members. You can add additional features as needed for a site and [choose a site homepage](#choosing-a-site-homepage) . If you look at the Wiki dashlet that you added previously, you'll see that it says that no page is configured. You're now going to configure a wiki for the site.

1.  Click ![Customize Dashboard icon]({% link content-services/images/settings-icon.png %}) and then **Customize Site**.

2.  Drag the Wiki and Calendar icons down into the Current Site Pages area, and click **OK**.

    > **Note:** Take a look at [(Alfresco site features)]({% link content-services/5.2/using/sites/features.md %}#site-features) for more details on these features.


Back on the site dashboard you can see that the wiki and calendar have been added. You now have a site set up! It's time to start adding some content...

This video shows the steps in the tutorial.

  



## Adding users to your site {#adding-users-to-your-site}

Now that you've created a site and added content, the next step is to invite other Alfresco Share users to the site.

1.  Click the Add User icon (![Invite to Site]({% link content-services/images/invite-to-site-icon.png %}) ) at the top of the dashboard to open the Add Users page.

    >**Tip:** You don't need to be on your site dashboard to do this - the **Add Users** option is available from everywhere in your site.

2.  Type the full or partial name of a user you want to invite and click **Search**.

    > **Important:** An internal user is someone in your organization. This tutorial will add the test user, Alice Beecher, but if your Alfresco Content Services administrator has already set up users, then you can add real users if you prefer.

3.  Click **Select** to add the user to the **Set User Role** list.

4.  Click **Select Role** and select **Collaborator**.

    > **Note:** You can set different roles for different users; take a look at the Alfresco Share [User roles and permissions]({% link content-services/5.2/using/permissions.md %}#user-roles-and-permissions) for more details on user roles.

5.  Click Add Users.


An email notification is sent to each person that you invited and they can start using the site immediately.

This video shows the steps in the tutorial.

  


## Sites {#sites}

A site is a area where you can share content and collaborate with other site members.

Any user can create a site. The site creator becomes the Site Manager by default, though additional or alternate managers can be added after this.

Each site has a visibility setting that marks the site as public, moderated, or private. This setting controls who can see the site and how users become site members.

-   **Public site**

    All users can view the content but only site members can work with the content.

    Any user can join the site.

-   **Moderated site**

    All users can access the site but only site members can see and work with the content.

    Users must ask to join the site.

-   **Private site**

    Only site members can access the site.

    Users must be added to the site by a site manager.


The manager of any site—whether public or private—can add users.

> **Note:** The visibility setting of a site is displayed next to the site name when you're in the site.

You can remove yourself from a site at any time by clicking ![]({% link content-services/images/settings-icon.png %}) in the site and selecting **Leave Site**.

-   **[Accessing existing sites](#accessing-existing-sites)**  
Accessing an existing site is easy.
-   **[Site dashboard](#site-dashboard)**  
The site dashboard contains information specific to the current site, and like your user dashboard, site information is organized and displayed in dashlets.
-   **[Managing a site](#managing-a-site)**  
Creating a site is quick and simple. You can then customize it to build a fully functional project site.
-   **[Managing site members](#managing-site-members)**  
Site users can easily see who else is a member of the site, and site managers can edit user roles and remove a user from the site.



## Accessing existing sites {#accessing-existing-sites}

Accessing an existing site is easy.

You can search for sites using the Site Finder, the search box on the toolbar, or you might receive an email notification that you've been added to a site.

If you see a link to a site anywhere in Alfresco Share, just click the link to have a look.

You can see all the sites you're a member of by clicking **Sites** then **My Sites** on the Alfresco toolbar.

-   **[Joining a site](#joining-a-site)**  
When you join sites you gain access to the content that's stored on them.
-   **[Leaving a site](#leaving-a-site)**  
It's quick and easy to leave a site when you no longer want to be a member.
-   **[Entering a site](#entering-a-site)**  
You can access a site from several places in Alfresco Share.
-   **[Moving around a site](#moving-around-a-site)**  
The default areas available in a site are the **Site Dashboard**, **Document Library**, and the **Site Members** areas. If a site has additional site features then you'll also see a **More** menu.



## Joining a site {#joining-a-site}

When you join sites you gain access to the content that's stored on them.

> **Note:** You can see all the sites you're a member of on the **My Sites** dashlet or by clicking **Sites** then **My Sites** on the toolbar.

1.  Click **Sites** to see your Recent Sites and the site tools available.

2.  Click **Site Finder**.

3.  Enter a search term and click **Search**.

    > **Note:** You can leave the search field empty to search for all available sites.

    All sites meeting your search criteria are now displayed. You have options to:

    -   **Join** a public site
    -   **Request to join** a moderated public site
    -   **Leave** a site that you're a member of
    -   **Delete** a site that you're a manager of
4.  Click on a site to go straight to the site dashboard.

    >**Tip:** Click ![Customize Dashboard icon]({% link content-services/images/settings-icon.png %}) to leave or join a site, depending on whether you're already a member or not. If you request to join a moderated site then site managers are notified and you'll need to wait until they give you access.

5.  Click **Sites** and you can add or remove the current site from your favorite sites list.

    >**Tip:** When you favorite a site you can quickly access it from the **Sites** menu.


## Leaving a site {#leaving-a-site}

It's quick and easy to leave a site when you no longer want to be a member.

1.  On the dashboard of the site you want to leave, click ![]({% link content-services/images/settings-icon.png %}) then **Leave Site**.

2.  Click **OK** to confirm that you want to leave the site.

    **Restriction:** All sites require a site manager so if you're the only manager of a site you can't leave it.

    >**Tip:** You can also leave a site by clicking **Leave** in the Site Finder.


## Entering a site {#entering-a-site}

You can access a site from several places in Alfresco Share.

It's easy to get to sites you're a member of from the My Sites dashlet or by clicking **Sites** then **My Sites** on the toolbar. If the site you want to access isn't there, you can search for it on the Site Finder page, or in the search box on the toolbar.

1.  Click **Home**.

2.  On the My Sites dashlet click the name of the site you want to access.

    >**Tip:** You can access your favorite sites or recent sites you've visited by selecting them from the Sites menu. There's no need to return to your dashboard.


The dashboard for the selected site appears.


## Moving around a site {#moving-around-a-site}

The default areas available in a site are the **Site Dashboard**, **Document Library**, and the **Site Members** areas. If a site has additional site features then you'll also see a **More** menu.

Additional features can be set up by a site manager when they're [customizing a site](#customizing-a-site).

1.  In a site click **Document Library**, **Site Members**, or **More** and select an option from the **More** menu.

    The site feature you've selected will open; see the links for further details on each of these.

    >**Tip:** You can click **Site Dashboard** at any point to return to the site dashboard.

## Site dashboard {#site-dashboard}

The site dashboard contains information specific to the current site, and like your user dashboard, site information is organized and displayed in dashlets.

The site name is displayed at the top of the screen. The site manager has additional options under the ![]({% link content-services/images/settings-icon.png %}) tools menu and an additional ![Invite to Site]({% link content-services/images/invite-to-site-icon.png %}) add users button to set up and manage the site and it's members.

Sites are made up of different features, or pages, which you can find under the **More** menu. Each new site includes only a library, but a site manager can customize the site to include any combination of pages, including a wiki, a blog, a calendar, a discussion forum, web links, and data lists.

> **Note:** Site managers can [choose a site homepage](#choosing-a-site-homepage) other than the dashboard, or remove the dashboard altogether.

There's a **Site Members** link for managing the site membership.

> **Note:** When more features are added to a site you can find this option on the **More** menu.

A site manager can resize most dashlets by clicking and dragging on the bottom edge of the dashlet until it's the height you want. This is saved between sessions.

>**Tip:** If you hover over a dashlet header then a ![Add Event icon]({% link content-services/images/help-1.png %}) icon appears. Click it for an explanation of what the dashlet does. This stays open until you close it or navigate away from the dashboard.

-   **[Choosing a site homepage](#choosing-a-site-homepage)**  
Site dashboards are the default homepage on all Alfresco Share sites.
-   **[What can I do with the site dashlets?](#what-can-I-do-with-the-site-dashlets?)**  
As well as giving you an overview of activity and information on Alfresco Share, the dashlets also give you links to various areas of Share and let you carry out a range of actions.



## Choosing a site homepage {#choosing-a-site-homepage}

Site dashboards are the default homepage on all Alfresco Share sites.

Site managers have the option to remove the site dashboard for individual sites. Whichever page comes first in the Current Site Pages will then become the default homepage for the site. You can also keep the dashboard, but reorder the pages to that a different page is the homepage.

1.  Enter a site.

2.  Click ![]({% link content-services/images/settings-icon.png %}) then **Customize Site**.

    The Site Dashboard is shown by default as one of your Current Site Pages.

3.  Click **Remove** to remove it from the site.

    Alternatively, change the order of the Current Site Pages so that a different page comes first (from left to right). This page will become the site homepage.

4.  Click **OK** to save your changes.


The site displays with it's new homepage.

You can always add the site dashboard back later.



## What can I do with the site dashlets? {#what-can-I-do-with-the-site-dashlets}

As well as giving you an overview of activity and information on Alfresco Share, the dashlets also give you links to various areas of Share and let you carry out a range of actions.

>**Tip:** When a user name, site name, or item appears as a link, you can click it to navigate to the related page. When you hover over some dashlets additional options are displayed.

> **Note:**

The RSS Feed, Alfresco Add-ons RSS Feed, and Web View site dashlets on the site dashboard are identical to those on your personal dashboard.

The My Discussions, Site Search, and Saved Search dashlets are identical to those on your user dashboard, but on the site dashboard the results displayed are specific to the current site.

Any combination of the site dashlets can appear on the dashboard:

-   **Site Members**

    Displays the current members of this site (to a maximum of 100 members) and their assigned roles.

    -   Click a member’s name to view their user profile.
    -   Click **All Members** to display all site members.
    -   Click **Add Users** to add users this site. This is available only if you are a site manager.
-   **Site Content**

    Lists the library content that has been added or edited in the past seven days.

    -   Click a content item name or thumbnail to preview or work with that item in the library.
    -   Select a view option: **Simple** or **Detailed**.
    -   Mark an item as a favorite or remove it from the Favorites list (Detailed view only).
    -   Like or unlike an item (Detailed view only).
    -   Click the **Comment** link to add a comment on an item (Detailed view only).
-   **Site Activities**

    Tracks the most recent activities performed in this site such as content additions, edits, and deletions, as well as changes in site membership.

    -   Use the filter to display the activities by ownership, type, and time period. You can display only your activities, only other users’ activities, or all activities. You can also view only a specific type of activity, such as changes in membership or status updates.
    -   Click the RSS Feed icon to subscribe to the feed to automatically receive the activity updates.
    > **Note:** The only users notified of deletions are the user who made the deletion and the Alfresco Administrator.

-   **Site Profile**

    Displays a summary of the site details.

-   **Site Calendar**

    Lists the upcoming events scheduled in this site's calendar.

-   **Wiki**

    Displays a selected page from the site wiki.

    -   Click the name of the wiki page in the dashlet header to navigate to the wiki.
    -   Click the ![]({% link content-services/images/ico-configure.png %}) configure icon to select a different wiki page to display in the dashlet. This is available only if you are a site manager.
-   **Site Links**

    Displays the web links compiled by site users.

    -   Click a link to open the related website.
    -   Click the ![]({% link content-services/images/ico-link-details.png %}) link's details icon to view the full link and any related comments.
-   **Image Preview**

    Displays a thumbnail of all images stored in the site's library.

    -   Click a thumbnail to open the image in the current window.
    -   Click the View Details icon to preview or work with the image in the library.
    -   Click the Download icon to download a copy of the image to your computer.
    -   Click the ![]({% link content-services/images/ico-configure.png %}) configure icon to specify a folder. The dashlet will display the images in just that folder.
-   **Site File Type Breakdown**

    Displays a detailed breakdown of all files stored in the site's library.

    -   Hover over a section of the breakdown chart to see more details.
-   **Site Contributor Breakdown**

    Displays a breakdown of all site members contributing content to the site's library.

    -   Select a time period to view contributions for.
    -   Hover over a section of the breakdown chart to see more details on a specific contributor.
    -   Click on a section of the chart to open that users profile.
-   **Web View**

    Displays a website configured by a site manager.

    -   Click the ![]({% link content-services/images/ico-configure.png %}) configure icon to select a website to display.
-   **Site Notice**

    Displays a custom message posted by a site manager

    -   Click the ![]({% link content-services/images/ico-configure.png %}) configure icon to edit or change the message. This is available only if you are a site manager.
    >**Tip:** This dashlet title can be customized, so the dashlet will probably have a label other than **Site Notice**.

-   **RSS Feed**

    Displays the Alfresco website feed by default.

    -   Click the ![]({% link content-services/images/ico-configure.png %}) configure icon to change the RSS feed.
-   **Alfresco Add-ons RSS Feed**

    Displays the Newest Add-ons feed from the Alfresco Add-ons website by default.

    -   Click the ![]({% link content-services/images/ico-configure.png %}) configure icon to change the RSS feed.
-   **Site Data Lists**

    Lists this site's data lists.

    -   Click a list to open it.
    -   Click Create Data List to create a new list for this site. This action is not available for users with the role Consumer.
-   **My Discussions**

    Shows the most recent topics created in the site discussion forum.

    -   Use the filter to choose the information you want to see.
-   **Site Search**

    Lets you search in the current site.

    -   Enter search criteria and click **Search** (or press ENTER).
    -   Select the maximum number of results you want to display.
-   **Saved Search**

    Displays the results of a pre-configured search.

    -   Click the ![]({% link content-services/images/ico-configure.png %}) configure icon to define the search.

-   **[Configuring the RSS feed dashlets](#configuring-the-rss-feed-dashlets)**  
There are two RSS feed dashlets that you can include on your personal and site dashboards: RSS Feed and Alfresco Add-ons RSS Feed. On both dashlets you can edit the default URL to display any RSS feed.
-   **[Configuring the Wiki dashlet](#configuring-the-wiki-dashlet)**  
Configure the Wiki site dashlet to display the content of a specific wiki page.
-   **[Setting up the Site Notice dashlet](#setting-up-the-site-notice-dashlet)**  
Setting up the Site Notice site dashlet to display a message for the site users.



## Configuring the RSS feed dashlets {#configuring-the-rss-feed-dashlets}

There are two RSS feed dashlets that you can include on your personal and site dashboards: RSS Feed and Alfresco Add-ons RSS Feed. On both dashlets you can edit the default URL to display any RSS feed.

1.  Click the **Configure** icon on the dashlet title.

2.  Specify the feed you want to subscribe to.

3.  Select the number of feed items you want to display.

4.  Select **Open links in new window** to have the target story display in a new window.

5.  Click **OK**.




## Configuring the Wiki dashlet {#configuring-the-wiki-dashlet}

Configure the Wiki site dashlet to display the content of a specific wiki page.

To perform this task the wiki has to have at least one page. Only a site manager can configure this dashlet.

1.  Enter a site.

2.  On the Wiki dashlet, click **Configure**.

    The Select Wiki Page dialog box displays all pages in this site's wiki.

3.  Select the page you want to display in the dashlet.

4.  Click **OK**.


## Setting up the Site Notice dashlet {#setting-up-the-site-notice-dashlet}

Setting up the Site Notice site dashlet to display a message for the site users.

Only a site manager can set up this dashlet.

1.  Enter a site.

2.  On the Site Notice dashlet, click the **Configure** icon.

    > **Note:** If this dashlet has been edited before, it will probably have a title other than **Site Notice**.

    The Configure Site Notice dialog box opens.

3.  In the **Title** field, type the text you want to appear in the dashlet header.

4.  In the **Text** box, edit the current message or type a new one.

    Use the features provided to format the text; insert bulleted and numbered lists; insert links and images; and help with editing.

5.  Click **OK**.



## Managing a site {#managing-a-site}

Creating a site is quick and simple. You can then customize it to build a fully functional project site.

When you create a new site, you are automatically made the manager. This gives you full access to the site features.

-   **[Creating a site](#creating-a-site)**  
You can create a site from anywhere in Alfresco Share, and are automatically made the manager of the site you create.
-   **[Customizing a site](#customizing-a-site)**  
Once you've created a site you can customize it to add extra features.
-   **[Customizing the site dashboard](#customizing-the-site-dashboard)**  
Like your user dashboard, site information is organized and displayed in dashlets. As a site manager you can change the site layout, choose dashlets, and configure the display order.
-   **[Editing site details](#editing-site-details)**  
You can change the name, description, and visibility of a site after it is created.
-   **[Favoriting a site](#favoriting-a-site)**  
You can mark a site as a favorite to add it to the Favorites list in the Sites menu. This lets you quickly access the site from anywhere in Alfresco Share. You can mark any number of sites this way.
-   **[Deleting a site](#deleting-a-site)**  
Delete a site to move it and all of its content to your Trashcan.



## Creating a site {#creating-a-site}

You can create a site from anywhere in Alfresco Share, and are automatically made the manager of the site you create.

>**Tip:** A site *can* have multiple managers.

1.  Open the **Sites** menu on the toolbar and click **Create Site**.

    >**Tip:** You can also create a site from your My Sites dashlet: click **Create Site**.

2.  Enter the site details:

    -   **Name**: The title of the site.
    -   **URL Name**: You'll notice that the URL Name is automatically created but you can edit it if you want.
    -   **Description**: Enter a description that will help users know what the site is for.
3.  If you have modules such as Records Management installed, then there will be an additional Type option. Select **Collaboration** to create a standard site.

4.  Select the site visibility:

    -   **Public**: All users can view a public site in their own organization, whether or not they have joined the site. Users who join the site are listed as site members and can work with the site content, depending on their assigned roles.
    -   **Moderated**: The same as a **Public** site but the site manager must approve a users request to join.
    -   **Private**: Only available to the site manager and any users added to the site.
    > **Note:** The visibility setting you select is displayed next to the site name when a user is in the site. See [Alfresco Share sites](#sites) for more information on site visibility settings.

5.  Click **Save**.


You'll see the dashboard for the new site which you can now customize. Sites that you create are automatically added to your **Favorites** list.

This video shows you how to create a site.

  



## Customizing a site {#customizing-a-site}

Once you've created a site you can customize it to add extra features.

Each new site contains a library, and the site manager can [add other features]({% link content-services/5.2/using/sites/features.md %}#site-features), such as a wiki, a blog, and a calendar. These features can be further customized by renaming, and creating a theme or color scheme. You can also [choose a site homepage](#choosing-a-site-homepage).

1.  Enter a site.

2.  Click ![]({% link content-services/images/settings-icon.png %}) then **Customize Site**.

3.  Choose a site theme.

4.  Drag and drop pages from the **Available Site Pages** to the **Current Site Pages** to add them to the site.

    You have to move the pages one at a time. You can drag the pages around to reorder them the way you want to see them in the site. The leftmost page will become the site homepage.

    > **Note:** You can **Rename** pages or **Remove** them from a site - each of the Current Site Pages displays the option to do this.

5.  Click **OK** to save your changes.


The site dashboard displays the new theme, if one was selected. You can select the new pages by clicking **More** on the dashboard.

With the site customized you can now customize the site dashboard to display information that's relevant to the site.

This video shows you how to customize a site.

  


## Customizing the site dashboard {#customizing-the-site-dashboard}

Like your user dashboard, site information is organized and displayed in dashlets. As a site manager you can change the site layout, choose dashlets, and configure the display order.

>**Tip:** Filters on the Site Activities dashlet let you customize the activities it displays. You can add multiple copies of this dashlet and then set the filters so that each one displays different information.

1.  Enter a site.

2.  Click ![]({% link content-services/images/settings-icon.png %}) then **Customize Dashboard**.

    The Customize Dashboard page displays the current layout and configuration of your dashboard.

3.  Change the site dashboard layout:

    1.  Click **Change Layout**.

    2.  Click the layout you want to use. You can click the image or the **Select**button beside it.

4.  Select the site dashlets:

    1.  Click **Add Dashlets**.

    2.  Drag and drop dashlets from the Add Dashlets section onto the columns below.

        >**Tip:** Some dashlets are about specific site features, for example, the Wiki dashlet displays a page from the site wiki. If you haven't added a wiki to the site then the Wiki dashlet won't have anything to show.

    3.  Drag and drop a dashlet to the garbage can to remove it (or press DELETE).

5.  Drag the dashlets within and across columns to organize the display order.

6.  Click **OK** to save the dashboard configuration.

    You can resize most dashlets. Drag the bottom edge of the dashlet until it is the height you want.


This video shows you how to customize a site dashboard.

  


## Editing site details {#editing-site-details}

You can change the name, description, and visibility of a site after it is created.

Only a site manager can edit the site details.

1.  Enter a site.

2.  Click ![Settings icon]({% link content-services/images/settings-icon.png %}) then **Edit Site Details**.

3.  Change the site details as necessary.

    You cannot change the site's URL name.

4.  Click **OK**.


## Favoriting a site {#favoriting-a-site}

You can mark a site as a favorite to add it to the Favorites list in the Sites menu. This lets you quickly access the site from anywhere in Alfresco Share. You can mark any number of sites this way.

-   While in a site, open the **Sites** menu on the toolbar and click **Add Current Site to Favorites**.

    > **Note:** If a site is already a favorite you instead have the option to **Remove Current Site from Favorites**.

    The current site now appears in the **Favorites** list in the Sites menu and the My Sites dashlet.



## Deleting a site {#deleting-a-site}

Delete a site to move it and all of its content to your Trashcan.

Only a site manager can delete a site.

1.  Enter a site.

2.  Click ![Settings icon]({% link content-services/images/settings-icon.png %}) then **Delete Site**.

3.  Click **OK** to confirm the deletion.

    The selected site and all its content is deleted. The site member roles are stored in case you want to restore the site. When you empty your Trashcan all site details and content including site member roles are permanently deleted.

    > **Note:** You can also delete sites in the **Site Finder**.


## Managing site members {#managing-site-members}

Site users can easily see who else is a member of the site, and site managers can edit user roles and remove a user from the site.

Enter a site and click **Site Members** to view or search for members of the site.

-   **Users**

    Use this page to search for a site member or view a list of all members. A site manager can add users, edit user roles, and remove site members from here.

-   **Groups**

    Use this page to search for a site group or view a list of all groups. A site manager can add groups to the site, change a group's role, and remove a site group from here.

-   **Pending**

    Use this page to view users who have been invited to, or requested to join the site. You can cancel invitations here. Only site managers see the Pending page.

    > **Note:** From Alfresco Share version 5.1 or later, invites are only sent if your Alfresco administrator has specifically configured this option. Unless they have then users can access a site as soon as they are added by a Site Manager.


-   **[Adding users to a site](#adding-users-to-a-site)**  
Site managers can quickly add users to a site.
-   **[Approving users to join a moderated site](#approving-users-to-join-a-moderated-site)**  
When a user requests to join a moderated site, the request needs to be approved by a site manager.
-   **[Adding groups to a site](#adding-groups-to-a-site)**  
Inviting users one at a time to join your site can be time consuming. To save time you can add entire user groups.
-   **[Reviewing the site members](#reviewing-the-site-members)**  
Use the search feature to find a particular site member. You can also list all site members.
-   **[Reviewing site groups](#reviewing-site-groups)**  
Use the search feature to find a particular site member. You can also list all site members.
-   **[Changing a site role](#changing-a-site-role)**  
A site manager can amend a member or group role to change what they can do in a site.
-   **[Becoming a site manager](#becoming-a-site-manager)**  
If your account is an administrator account, then you can make yourself a site manager of any site that you're a member of.
-   **[Removing a site member or site group](#removing-a-site-member-or-site-group)**  
When you remove members or groups from a site they can no longer access it, but if the site is public they can rejoin it.
-   **[Managing pending invitations](#managing-pending-invitations)**  
A site manager can view the outstanding invitations. You can revoke an invitation until the recipient accepts or declines it.


## Adding users to a site {#adding-users-to-a-site}

Site managers can quickly add users to a site.

You can add any user, either internal to your organization or an external user.

> **Note:** External users can only be added if your Alfresco administrator has [enabled the external users panel]({% link content-services/5.2/develop/share-ext-points/share-config.md %}#enabling-external-users-panel).

1.  Click ![Invite to Site]({% link content-services/images/invite-to-site-icon.png %}) in the site you want to add users to, or click **Add Users** in the Site Members dashlet.

    >**Tip:** You can also open the Add Users page directly from the Site Members page.

    > **Important:** You must be a site manager to add a user.

2.  Enter a search term such as a user name and click **Search**.

    >**Tip:** You need to enter at least one character. The search is not case sensitive.

    > **Note:** If you don't see any users then try a different search term and check that your Alfresco administrator has [created users]({% link content-services/5.2/admin/users-groups.md %}#managing-users).

3.  Click **Select** for each user you want to add.

4.  Set the site role for each user, or use **Set all roles to** to assign the same role to all users. This controls what the user can do in the site.

    >**Tip:** See [User roles and permissions]({% link content-services/5.2/using/permissions.md %}#user-roles-and-permissions) for more about site roles.

    Once you've selected site roles for all the users you've selected, the **Add Users** button will be switched on.

5.  Click **Add Users**.

    A message displays showing the number of users you've added. All these users receive an email notification and can now use the site. You can continue to add more users as required.

    > **Note:** This feature is disabled if your installation doesn't support inviting new users. Talk to your system administrator about enabling this feature with the `notification.email.siteinvite` property. See [Outbound SMTP configuration properties]({% link content-services/5.2/config/email.md %}#outbound-smtp-configuration-properties) for more information.


## Approving users to join a moderated site {#approving-users-to-join-a-moderated-site}

When a user requests to join a moderated site, the request needs to be approved by a site manager.

All managers of a site will be receive an email and be given a new approval task when a request to join the site is made. Any of the managers can complete this task.

1.  Click **Site Members** then **Pending**.

    You'll see a list of pending requests to join the site.

    >**Tip:** You can also click **Tasks** then **My Tasks** to get to the approval task, or access it direct from the notification email that was sent.

    > **Note:** You'll also see any Pending Invites. From Alfresco One version 5.1 or later, users are added to sites and invites are only sent if your Alfresco Administrator has specifically configured this option.

2.  Click **Approve**, or click **View** to view the approval task where you can approve, reject, and comment on the request to join.

    The task is cleared from your task list and the user is added to the site.


## Adding groups to a site {#adding-groups-to-a-site}

Inviting users one at a time to join your site can be time consuming. To save time you can add entire user groups.

1.  Click ![Invite to Site]({% link content-services/images/invite-to-site-icon.png %}) in the site you want to add groups to, or click **Add Users** in the Site Members dashlet.

    >**Tip:** You can open the Add Users page directly from the Site Members page.

    > **Important:** You must be a site manager to add groups.

2.  Click **Groups** and then click **Add Groups**.

3.  Enter a search term such as a group name and click **Search**.

    >**Tip:** You need to enter at least one character. The search is not case sensitive.

4.  Click **Add** for each group you want to add.

5.  Set the site role for each group, or use **Set all roles to** to assign the same role to all groups. This controls what the groups users can do in the site.

    >**Tip:** See [User roles and permissions]({% link content-services/5.2/using/permissions.md %}#user-roles-and-permissions) for more about site roles.

    Once you've selected site roles for all the groups you've selected, the **Add Groups** button will be switched on.

6.  Click **Add Groups** to add the groups listed.

    A message displays showing the number of groups you've added. All these groups can now use the site. You can continue to add more groups as required.

    > **Note:** You can click **back to Site Groups** to return to the Search for Site Groups page without adding any groups.


## Reviewing the site members {#reviewing-the-site-members}

Use the search feature to find a particular site member. You can also list all site members.

1.  In a site click **Site Members**, or **More** then **Site Members** if the site has additional features.

    >**Tip:** You can also click **Groups** to view groups that are members of the site.

2.  Type the full or partial name of a user.

    >**Tip:** Leave the search box empty to display all site members.

3.  Click **Search**.


## Reviewing site groups {#reviewing-site-groups}

Use the search feature to find a particular site member. You can also list all site members.

1.  In a site click **Site Members**, or **More** then **Site Members** if the site has additional features.

2.  Click **Groups**.

3.  Type the full or partial name of a site group.

    >**Tip:** Leave the search box empty to display all site members.

4.  Click **Search**.


## Changing a site role {#changing-a-site-role}

A site manager can amend a member or group role to change what they can do in a site.

1.  In a site click **Site Members**, or **More** then **Site Members** if the site has additional features.

2.  Select **Users** or **Groups** in the Members component.

3.  Search for the site member or group whose role you want to change.

    Type a full or partial name, or leave the search box empty to display all members or groups. The results list includes the assigned role.

4.  Click the current role and select a new role from the list.


## Becoming a site manager {#becoming-a-site-manager}

If your account is an administrator account, then you can make yourself a site manager of any site that you're a member of.

> **Note:** Users who aren't an Alfresco administrator don't have this option. They need to request a role change from an existing site manager.

1.  In a site click ![]({% link content-services/images/settings-icon.png %}) then **Become Site Manager**.


You are now a manager of the site. You'll see that you have additional options available when you click ![]({% link content-services/images/settings-icon.png %}).



## Removing a site member or site group {#removing-a-site-member-or-site-group}

When you remove members or groups from a site they can no longer access it, but if the site is public they can rejoin it.

> **Note:** Only a site manager can remove members from a site.

1.  In a site click **Site Members**, or **More** then **Site Members** if the site has additional features.

2.  Select **Users** or **Groups**.

3.  Search for the site member or group you want to remove.

    Type a full or partial name, or leave the search box empty to display all members or groups.

4.  Click **Remove**.


## Managing pending invitations {#managing-pending-invitations}

A site manager can view the outstanding invitations. You can revoke an invitation until the recipient accepts or declines it.

> **Note:** If you're using Alfresco Share version 5.1 or later, then when a user is added to a site they can use the site immediately and no invitation is sent. In earlier versions of Share users aren't added to a site until they've accepted the invitation that is sent when they're invited to join the site.

If you've recently upgraded to Alfresco Share 5.1 or later then you can still manage any pending invites sent before the upgrade.

1.  In a site click **Site Members**, or **More** then **Site Members** if the site has additional features.

2.  Click **Pending**.

    This page lists the users who haven't responded to their site invitation, as well as any users who've requested to join the site.

3.  Use the search feature if you need to filter the list.

4.  Manage the site invitations using the buttons to the right of each user:

    -   Click **Cancel** to revoke the user's invitation to this site.
5.  You can click **Cancel** to revoke the user's invitation to this site.


