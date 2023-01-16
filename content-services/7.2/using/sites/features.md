---
title: Site features
---

As well as the Document Library and Site Members area, there are lots of features that can be included in a site.

Site managers can easily add and remove features by [customizing a site]({% link content-services/7.2/using/sites/index.md %}#customizesite)

## Calendar

The site calendar lets you schedule and track events related to the current site.

Site members can create events that appear on the calendar for all site users to see. These events also display in the Site Calendar dashlet. You can view the calendar by day, week, or month. The Agenda view displays upcoming events.

### Accessing the calendar

Access the calendar to view upcoming events for the current site.

Within the calendar you can create events, as well as edit and delete any events that you created.

In a site click **More** then **Calendar**.

> **Note:** In each site the feature names can be customized. If the site manager has done this, the link might have a name other than **Calendar**.

    This opens the calendar which defaults to the Month view. Any events scheduled in the current month are displayed on the calendar.

### Browsing the calendar

The main view defaults to a calendar displaying the current month. The explorer panel to the left provides another calendar for navigating the months without affecting the main view.

1. In the calendar use the navigation buttons to change the main calendar view:

    a. Use the **Day**, **Week**, and **Month** buttons to change the main display to a daily, weekly, or monthly view.

    b. Use the Previous ![Previous]({% link content-services/images/ico-cal-left.png %}) and Next ![Next]({% link content-services/images/ico-cal-right.png %}) buttons to move forward and backward through the calendar, either a day, week, or month at a time, depending on the current view.

    c. Click **Agenda** to view a list of the upcoming events scheduled for this site.

    d. Click **Today** to display the current date.

        By default the Day and Week views display only the working hours. Click the ![Show working hours]({% link content-services/images/ico-cal-showall.png %}) Show all hours icon to display the full day.

2. Use the calendar in the browsing pane to navigate through the months without affecting the main view.

    a. Click ![Previous]({% link content-services/images/ico-cal-arrowleft.png %}) to display the previous month.

    b. Click ![Next]({% link content-services/images/ico-cal-arrowright.png %}) to display the next month.

    c. Click **This Month** beneath the calendar to reset it to the current month. The current day and any dates with scheduled events are highlighted.

3. Click a date on the browsing pane calendar to load the selected date on the calendar in the main view.

4. Click a tag in the **Tags** list to display only the events associated with that tag.

    Click **Show All Items** to display all events.

5. Click an event in the calendar to view its full details.

6. Click **iCal Feed** in the header to use the calendar data exchange.

### Viewing an event

The calendar displays only the event name and time, so to view full details you must open the event. Once open you can edit or delete the event.

1. In the calendar find the event you want to view in one of the following ways:

    * Navigate the calendar on the main view.
    * Navigate the calendar in the explorer panel and select a date to update the main view calendar.
    * Click **Agenda** to display upcoming events.

2. On the main view click the event you are interested in. You can do this in any view: Day, Week, Month, or Agenda.

    The Event Information dialog box displays the full details of the selected event. The Related Content section shows where you can find material associated with the event if a location has been provided. Click the link to jump to that folder in the library.

    If you have the correct permissions you can edit and delete the event from here.

3. Click **Close** to return to the calendar.

### Adding an event

Any site member can schedule an event in the site calendar. The event appears in the calendar and the Site Calendar dashlet.

1. In the calendar start the event creation in one of the following ways:

    * Click **Add Event**.
    * Click on an event date on the explorer panel calendar and then click **Add Event**.
    * Navigate the calendar on the main view and click an event date.

    > **Note:** To create an event in the Agenda view you must use the **Add Event** button in the header.

    Simply clicking **Add Event** causes the start and end dates to default to the current date. Specifying a date first, as in the other two methods, causes the start and end dates to default to the date selected.

    The **Add Event** dialog box opens. Fields marked with an asterisk (`*`) are required.

2. Type a name for the event in the **What** box.

3. Type the event location in the **Where** box.

4. Enter a **Description** of the event.

    > **Note:** The details you enter in these first three fields appear in the Agenda view for all users to see. In the other views only the event name displays.

5. Select the event start and end dates.

    The start and end dates default to the same day but events can span multiple days. Click the icon to the right of the date field to display a calendar then navigate to the required month and click a date to select it.

6. Specify the duration of the event:

    Select **All Day** to schedule a full day event. The start and end times are not applicable when you schedule an all day event. All times are in 24-hour clock.

7. Add existing or create new tags for the event as necessary.

8. Optionally, select a folder to indicate to users where material related to the event is located:

    > **Note:** The Related Content section is not visible by default. Contact your system administrator to update `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/modules/create-event.get.properties` and `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/components/calendar/info.get.properties` if you cannot see this feature.

    a. In the Related Content section, click **Browse**.

    b. On the Browse Folders dialog box navigate the library folder structure and select the appropriate folder.

    c. Click **OK**.

    The selected path is displayed on the **Add Event** page.

9. Click **Save**.

The dialog box closes and the calendar displays the new event as scheduled.

### Editing event details

Edit a scheduled event to change any of the details, including the location, date, and time. You can also add and remove tags, and change the library folder associated with the event.

1. In the calendar find and click on the event you want to edit.

2. Click **Edit** on the **Event Information** dialog box.

    The Edit Event dialog box displays the details for the selected event.

3. Make the required changes to the event and edit any tags as necessary.

    You can add and remove existing tags, or create new tags.

4. Add or change the library folder in the Related Content section to indicate where related event material is located.

    > **Note:** The Related Content section is not visible by default. Contact your system administrator to update `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/modules/create-event.get.properties` and `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/components/calendar/info.get.properties` if you cannot see this feature.

5. Click **Save**.

    The dialog box closes and the calendar displays the updated event. No changes will be evident on the calendar unless you changed the event name or time.

### Changing event date and time

You can easily change the day, time, and duration of an event.

1. In the calendar find the event you want to edit.

2. Select the **Day** or **Week** view.

3. Edit the event:

    1. Position the cursor on the resizing bar at the bottom of the event. Click and drag the bar to adjust the duration of the event.

    2. Position the cursor anywhere in the event span. Click and drag the entire event to a different time slot.

    3. (Week view only) Position the cursor anywhere in the event span. Click and drag the event to a different day and time.

### Deleting an event

When a scheduled event is cancelled you can easily delete it to remove it from the calendar. This also removes it from the Site Calendar dashlet.

1. In the calendar find and click on the event you want to delete.

    The Event Information dialog box displays the full details of the selected event.

2. Click **Delete**.

    A message prompts you to confirm the deletion.

3. Click **Delete**.

The dialog box closes and the calendar the event is removed from the calendar.

## Wiki

The wiki lets site users create pages for a collaborative wiki.

When you enter the wiki the page view displays the wiki main page. Click **Wiki Page List** to display the wiki list.

The wiki page list displays a summary of all pages created for the current site's wiki. Select a page in this list to view it in the page view.

In both views (wiki list and page view) you can create, delete, view details for, and edit a wiki page. You must be in the page view to rename a wiki page.

### Accessing the wiki

Access the wiki to view the wiki content related to the current site. In the wiki you can create, delete, rename, and edit the wiki pages. You can perform most actions from both the wiki list and the page view.

1. In a site click **More** then **Wiki**.

    > **Note:** In each site the feature names can be customized. If the site manager has done this, the link might have a name other than **Wiki**.

    This opens the wiki which displays the main wiki page for this site. When viewing a wiki page the actions you can perform appear as buttons (**New Page**, **Delete**, **Rename**) and as links at the top right of the content area (**View Page**, **Edit Page**, **Details**).

2. Click **Wiki Page List** to display the wiki list.

    The wiki list displays a summary of all pages in the wiki for the current site. In this view, the actions you can perform on a wiki page appear as buttons beneath the banner (only **New Page** is available in this view) and as links to the right of each page summary. You can perform most actions from both the wiki list and the page view.

    > **Note:** You can click **Main Page** to return to the previous view.

### Browsing the wiki pages

The browsing feature in the wiki lets you filter the wiki pages so you can easily locate specific content.

The wiki page list displays all wiki pages in the current site organized chronologically. The most recent page appears at the top of the list.

The browsing pane on the left side of the page lets you display a subset of the wiki content by selecting a specific view or a tag. Whether you are browsing by view or tag, the wiki list displays a summary of the pages matching the selected option. The summary includes:

* the wiki page name
* the user who created the page
* the date and time the page was created
* the user who last modified the page
* the date and time the page was last modified
* a sample of the content
* the tags associated with the page

The **Pages** list in the browsing pane provides the following views:

* **Recently Modified**: Displays the pages modified in the past seven days
* **All**: Displays all pages created in the wiki for the current site
* **Recently Added**: Displays the pages created in the past seven days
* **My Pages**: Displays the pages created by the currently signed in user

The **Tags** list displays the tags currently associated with one or more wiki pages. The number following the tag tells you how many wiki pages are associated with the tag.

To browse the wiki pages:

1. Click **Wiki Page List** on the page view to navigate to the wiki list if it is not already displayed.

2. Select an option in the browsing pane:

    * In the **Pages** list click a view to display all pages in the current site that correspond to that selection.
    * In the **Tags** list click the tag you're interested in to display all pages in the current site associated with that tag.

3. In the wiki list, click a wiki page title to display that full page.

The selected wiki page appears in the page view.

### Creating the wiki main page

When you create a new site, the site's wiki contains a main page, which is empty. You will likely choose to make this the introductory page for the site wiki.

1. In the wiki click **Main Page** if the main page is not already displayed.

2. Click **Edit Page**.

3. Type the content for the main page in the **Text** box.

    Use the features provided to format the text; insert bulleted and numbered lists; change the font color; and insert or edit links, anchors, and images. To assist with editing, use the undo, redo, and remove formatting features as needed. Additional functionality includes the ability to insert and customize tables; insert the current date and time; and view the editor in fullscreen mode. The text box includes other features you might find useful; position the cursor over an icon to display its function.

    The **Insert Library Image** feature displays a list of images in the site library. Click a thumbnail in this list to insert the related image into the wiki page at the current cursor position.

    The **Insert Document Link** feature enables you to insert a link to any piece of content in library of the site you are in. Navigate the library to locate the item you want to link to, then click Add. You can select any number of items. Click **OK** to insert links to the selected items at the current cursor position.

    Click and drag the bottom right corner to resize the text editor.

4. Optionally, add existing or create new tags for the main page.

    The newly associated tags appear beneath the **Text** box. Click a tag to remove it.

5. Click **Save**.

The page view displays the main page.

### Creating a new wiki page

You can create a new wiki page from both the wiki list and the page view.

1. In the wiki click **New Page**.

    The Create Wiki Page page appears.

2. Type a **Title** for the page.

    The **Title** does not support the following special characters: `\ / . ? # and |`. When the title contains a disallowed character the **Save** button is disabled.

    > **Note:** The title can include a period as long as it is not the last character.

3. Type the wiki page content in the **Text** box.

    Use the features provided to format the text; insert bulleted and numbered lists; change the font color; and insert or edit links, anchors, and images. To assist with editing, use the undo, redo, and remove formatting features as needed. Additional functionality includes the ability to insert and customize tables; insert the current date and time; and view the editor in fullscreen mode. The text box includes other features you might find useful; position the cursor over an icon to display its function.

    The **Insert Library Image** feature displays a list of images in the site library. Click a thumbnail in this list to insert the related image into the wiki page at the current cursor position.

    The **Insert Document Link** feature enables you to insert a link to any piece of content in library of the site you are in. Navigate the library to locate the item you want to link to, then click Add. You can select any number of items. Click **OK** to insert links to the selected items at the current cursor position.

    Click and drag the bottom right corner to resize the text editor.

    To create a link to another wiki page, type `[[Page Name]]`. If the page indicated does not exist, it is automatically created for you. Note that this creates an empty wiki page. It will not appear in the wiki list until you provide content for it.

4. Optionally, add existing or create new tags for the wiki page.

    The newly associated tags appear beneath the **Text** box. Click a tag to remove it.

5. Click **Save**.

    The new wiki page appears as users will see it.

6. Click **Wiki Page List** to return to the wiki list.

### Editing a wiki page

Edit a wiki page to create new content, edit existing content, and add tags.

1. In the wiki list find the wiki page you want to edit.

2. Click **Edit** for that page.

    If the wiki page you want to edit is already open in the page view, simply click **Edit Page**.

    The content of the selected wiki page displays in an editing box.

3. Edit the content as necessary.

    Use the features provided to format the text; insert bulleted and numbered lists; change the font color; and insert or edit links, anchors, and images. To assist with editing, use the undo, redo, and remove formatting features as needed. Additional functionality includes the ability to insert and customize tables; insert the current date and time; and view the editor in fullscreen mode. The text box includes other features you might find useful; position the cursor over an icon to display its function.

    The **Insert Library Image** feature displays a list of images in the site library. Click a thumbnail in this list to insert the related image into the wiki page at the current cursor position.

    The **Insert Document Link** feature enables you to insert a link to any piece of content in library of the site you are in. Navigate the library to locate the item you want to link to, then click Add. You can select any number of items. Click **OK** to insert links to the selected items at the current cursor position.

    Click and drag the bottom right corner to resize the text editor.

    To create a link to another wiki page, type `[[Page Name]]`. If the page indicated does not exist, it is automatically created for you. Note that this creates an empty wiki page. It will not appear in the wiki list until you provide content for it.

4. Edit the tags for this wiki page as necessary.

    You can add and remove existing tags, or create new tags.

5. Click **Save**.

The page view displays the updated wiki page.

### Renaming a wiki page

You rename a wiki page in the page view.

1. In the wiki list find the wiki page you want to rename.

2. Click the title of that page.

    The page view displays the selected wiki page.

3. Click **Rename**.

    The Rename page opens.

4. Type the new name for the wiki page.

    The wiki page title does not support the following special characters: `\ / . ? # and |`. When the title contains a disallowed character the **Save** button is disabled.

    > **Note:** The title can include a period as long as it is not the last character.

5. Click **Save**.

The page view reflects the name change and this wiki page retains the history of the original page. A page with the original name is also created. It contains a link to the updated page so that users will not be presented with broken links when using the wiki.

### Deleting a wiki page

Delete a wiki page when you no longer want it to appear in the wiki for the current site. You can perform this task from both the wiki list and the page view.

1. In the wiki list locate the wiki page you want to delete.

2. Click **Delete** for that page.

    > **Note:** Consider viewing the page first to ensure it is the one you want to delete. You can then select **Delete** in the page view.

    If the wiki page you want to delete is already open in the page view, simply click **Delete** on that page.

    A message prompts you to confirm the deletion.

3. Click **Delete** to delete the current wiki page.

### Viewing the wiki page details

View wiki page details to see the version history, view the tags associated with the page, and list the wiki pages that link to the selected page. You can view the page details from both the wiki list and the page view. On this page, you can view previous versions of the page and even revert to a specific version.

1. In the wiki list locate the wiki page whose details you want to view.

2. Click **Details** for that page.

    If the wiki page you want to view is already open in the page view, simply click **Details** on that page.

    The page view displays the wiki page content in expanded form to include the Version History, Tags, and Linked Pages. From here you can click **Edit Page**to make changes.

3. Work with the **Version History** as follows:

    * Select a previous version of the page from the **View version** menu to display an earlier version of the selected page.
    * Review the **Earlier version(s)** list beneath the content box to view the details of earlier versions. Click the version number to show and hide the details.
    * Click **Revert** for an earlier version to update the current page with the content from the selected version.

4. Click **View Page** to return to the page view.

    The wiki page displays in the page view.

## Discussion forum

The discussion forum lets you post user-generated content related to a site. These topics often take the form of questions or comments with threaded discussions.

Members of a site can create new topics and can also reply to a posting to take part in a discussion on a specific topic.

### Accessing the discussion forum

Access the discussion forum to view the discussion topics for the current site.

Within a discussion you can create new topics, as well as edit and delete topics you created. You can also take part in a discussion by replying to a topic.

1. In a site click **More** then **Discussions**.

    > **Note:** In each site the feature names can be customized. If the site manager has done this, the link might have a name other than **Discussions**.

    This opens the discussion forum. The main page defaults to the **New** view so you see a list of the topics created in the past seven days. The summary includes:

    * the topic title
    * the date and time the topic was created
    * the user who created the topic
    * the number of replies to the topic
    * a sample of the content
    * the tags associated with the topic

2. Use the **<<** and **>>** navigation buttons to move forward and backward through multiple pages of topics.

3. Click **Simple View** to display only the basic topic information: title, creation date/time, and author.

    Click **Detailed View** to display the summary view.

### Browsing the discussion topics

The browsing feature in the discussions forum lets you filter the discussion topics so you can more easily navigate the content.

The explorer panel on the left side of the page lets you display a subset of the discussion topics by selecting a specific view or a tag.

The **Topics** list in the browsing pane provides the following views:

* **New**: Displays the topics created or updated in the past seven days
* **Most Active**: Displays the topics with the most replies
* **All**: Displays all topics
* **My Topics**: Displays the topics created by the current user

The **Tags** list displays the tags currently associated with one or more discussion topics. The number following the tag tells you how many discussion topics are associated with the tag.

**To browse the discussion topics:**

1. In the Discussions feature select an option in the explorer panel:

    1. In the **Topics** list click a view to display the discussion topics in the current site that correspond to that selection.

    2. In the **Tags** list click the tag you're interested in to display all topics in the current site associated with that tag.

2. Click **Simple View** to display only the basic topic information: title, creation date/time, and author.

    Click **Detailed View** to display the summary view.

### Viewing a topic

The discussion forum topics display in either a summary view or a simple list. Viewing a topic allows you to see the full contents of the discussion.

Although you can perform actions on a topic from the main page, you might want to view the topic before you edit, delete, or reply to it in order to confirm that you have selected the correct one.

1. In the Discussions feature browse the discussion topics to find the one you want to view.

2. Click the name of the topic to open it.

    > **Note:** Alternately, click **View** to the right of the topic or click **Read** beneath the topic. If the main page displays the simple view, the **Read** action is not available.

    The topic view displays the selected topic in its entirety along with any replies.

3. Click **Discussions Topic List** to return to the main view.

### Replying to a discussion

Reply to a topic to take part in the discussion. You can reply to the original discussion topic or any replies already created for that topic. Each reply is nested to visually indicate the discussion flow.

1. In the Discussions feature click the name of a topic to open it.

    The topic view displays the selected topic in its entirety along with any existing replies.

2. Click **Reply**.

3. Type your content in the **Add Reply** box.

    Use the features provided to format the text; insert bulleted and numbered lists; change the font color; and insert or edit links, anchors, and images. To assist with editing, use the undo, redo, and remove formatting features as needed. Additional features are also provided; position the cursor over an icon to display its function.

    Click and drag the bottom right corner to resize the text editor.

4. Click **Create**.

The reply appears beneath and indented from its parent topic or reply.

#### Editing a reply

You can edit a reply just as you edit a discussion topic.

1. In the topic list, find and then click on a topic.

    The topic view displays the selected topic in its entirety, along with its replies.

2. Click **Edit** to the right of the reply you want to change.

    The selected reply appears in its entirety in an edit box.

3. Make the changes to the topic title and content.

4. Click **Update**.

The updated reply appears as users will see it. The text (Updated) appears to indicate it has been edited.

### Creating a new topic

Create a new topic to start a discussion relevant to the current site. All site members will have access to this content.

1. In the Discussion feature click **New Topic**.

    The Create New Topic page appears.

2. Type a **Title** for the topic.

3. Type the topic content in the **Text** box.

    Use the features provided to format the text; insert bulleted and numbered lists; change the font color; and insert or edit links, anchors, and images. To assist with editing, use the undo, redo, and remove formatting features as needed. Additional features are also provided; position the cursor over an icon to display its function.

    Click and drag the bottom right corner to resize the text editor.

4. Optionally, add existing or create new tags for the discussion topic.

    The newly associated tags appear beneath the **Text** box. Click a tag to remove it.

5. Click **Save**.

    The new topic appears as users will see it.

6. Click **Discussions Topic List** to return to the main view.

### Editing a topic

Edit an existing discussion topic to modify or add to the content.

Only a Site Manager, a Site Collaborator, and the user who created the topic can edit it.

1. In the Discussions feature click **Edit** to the right of the topic you want to edit.

    > **Note:** Consider viewing the topic first to ensure it is the one you want to edit. You can then select **Edit** on the topic page.

    The Edit Topic page appears displaying the selected topic.

2. Make the required changes to the topic title and content.

    Use the features provided to format the text; insert bulleted and numbered lists; change the font color; and insert or edit links, anchors, and images. To assist with editing, use the undo, redo, and remove formatting features as needed. Additional features are also provided; position the cursor over an icon to display its function.

    Click and drag the bottom right corner to resize the text editor.

3. Edit the tags for this topic as necessary.

    You can add and remove existing tags, or create new tags.

4. Click **Save**.

    The updated topic appears as users will see it. The text (Updated) appears after the title.

5. Click **Discussions Topic List** to return to the main view.

### Deleting a topic

Delete a topic to permanently remove it from the discussions forum. This action also deletes all replies to that topic.

Only the Site Manager and the user who created the topic can delete it.

1. In the Discussions feature click **Delete** to the right of the topic you want to delete.

    > **Note:** Consider viewing the topic first to ensure it is the one you want to delete. You can then select **Delete** on the topic page.

    A message prompts you to confirm the deletion.

2. Click **Delete**.

A message indicates the selected topic has been deleted.

## Blog

The site blog lets you add commentary, descriptions of events, and other material related to your site.

Site members can create, edit, and add comments to blog postings. The postings can be saved as drafts and then, when ready, published to the internal blog.

### Accessing the blog

Access the blog to view all published blog posts for the current site. You can also see your own unpublished (draft) posts.

In the blog you can write new posts and you can edit, publish, and delete posts that you previously created. You can also add comments to other members' blog posts.

1. In a site click **More** then **Blog**.

    > **Note:** In each site the feature names can be customized. If the site manager has done this, the link might have a name other than **Blog**.

    This opens the blog. The main page defaults to the **Latest** view so you see a list of the internally published posts that have been created or edited in the past seven days. The summary includes the following details (where applicable):

    * the post title followed by related status indicators
    * the date and time the post was published
    * the user who created the post
    * a link to the external post
    * a sample of the content
    * the number of replies to the post
    * the tags associated with the post

    Where the list contains more posts than can be displayed on a single page, navigation links become enabled at the top and bottom of the item list. The number in bold indicates your current page. Click a page number to display a specific page. Use the previous (<<) and next (>>) links to move forward and backward through multiple pages of posts.

2. Click **Simple View** to display only the basic blog post information: title, date/time of publishing, and author.

    Click **Detailed View** to display the summary view.

### Browsing blog posts

The browsing feature in the blog lets you filter the posts so you can easily navigate the blog content.

The explorer panel on the left side of the Blog lets you display a subset of the blog posts by selecting a specific view, a period of time (month), or a tag.

The **Posts** list in the browsing pane provides the following views:

* **All**: Displays all posts in the blog
* **Latest**: Displays the internally published posts created or edited in the past seven days
* **My Drafts**: Displays the posts created by the current user that are saved as drafts (not yet published)
* **My Published**: Displays the posts created and internally published by the current user

The **Archives** list organizes posts by month and year.

The **Tags** list displays all tags currently associated with one or more blog posts. The number following the tag tells you how many blog posts are associated with the tag.

To browse the blog posts:

1. In the Blog select an option in the explorer panel:

    1. In the **Posts** list click a view to display the blog posts in the current site that correspond to that selection.
    2. In the **Archives** list click a date to display the blog posts in the current site published during the month and year selected.
    3. In the **Tags** list click the tag you're interested in to display all posts in the current site associated with that tag.

2. Click **Simple View** to display only the basic blog post information: title, date/time of publishing, and author.

    Click **Detailed View** to display the summary view.

### Viewing a blog post

Browsing the blog displays the existing posts in the main view. These posts display in either a summary view or a simple list. Viewing a post lets you to see the full contents of the post.

Although you can perform actions on a post from the main page, viewing a post lets you confirm you have selected the correct post before performing an irreversible action, such as deleting the post. While both the simple view and the detailed view display all available actions, you must view a post in order to add a comment to it.

1. Browse the blog posts to locate the post you want to view.

2. Click the title of the post or click **Read** beneath the post.

    > **Note:** If the main page displays the simple view you must click the title of the post.

    The post view displays the selected blog post in its entirety along with any related comments.

3. Click **Blog Post List** to return to the main view.

### Creating a blog post

Create a new blog post to add information or a commentary related to the current site.

When you create a new post you can save it as a draft without publishing it or you can immediately publish it to the current site’s blog. This makes it available for other site users to view and comment on.

1. Click **New Post**.

    The Create Blog Post page appears.

2. Type a **Title** for the post.

3. Type your content in the **Text** box.

    Use the features provided to format the text; insert bulleted and numbered lists; change the font color; and insert or edit links, anchors, and images. To assist with editing, use the undo, redo, and remove formatting features as needed. Additional features are also provided; position the cursor over an icon to display its function.

    Click and drag the bottom right corner to resize the text editor.

4. Optionally, add existing or create new tags for the blog post.

    The newly associated tags appear beneath the text editor. Click a tag to remove it.

5. Save or publish the new blog post:

    * Click **Save as Draft** to save the post without publishing it. The post will not appear in the post list.
    * Click **Publish Internally** to publish the post to the internal blog, making it available for other users of this site.

    The new post appears as users will see it. The text (Draft) appears after the title if the post remains unpublished. The text **(Published)** appears after the title once the post has been published externally.

6. Click **Blog Post List** to return to the main view.

### Editing a blog post

Edit an existing blog post to modify or add to its content.

Only a Site Manager, a Site Collaborator, and the user who created the blog post can edit it.

1. In the Blog click **Edit** to the right of the post you want to edit.

    > **Note:** You can view the post first to ensure it is the one you want to edit, then select **Edit** on the post view page.

    The Edit Blog Post page appears displaying the selected post.

2. Make the required changes to the post title and content.

    Use the features provided to format the text; insert bulleted and numbered lists; change the font color; and insert or edit links, anchors, and images. To assist with editing, use the undo, redo, and remove formatting features as needed. Additional features are also provided; position the cursor over an icon to display its function.

    Click and drag the bottom right corner to resize the text editor.

3. Edit the tags for this post as necessary.

    You can add and remove existing tags, or create new tags.

4. Click **Update** to save the changes.

    > **Note:** When you choose this option for a post that has previously been published externally, the text **(Out of sync)** appears after the title to indicate the version in the internal blog does not match the version in the external blog.

    The updated post appears as users will see it. The text (Updated) appears after the title.

5. Click **Blog Post List** to return to the main view.

### Deleting a blog post

Delete a blog post to permanently remove it from the current site's blog.

Deleting a post also deletes all of its comments. Only a Site Manager and the user who created the blog post can delete it.

1. In the Blog post list find the blog post you want to delete.

2. Click **Delete**.

    > **Note:** You can view the post first to ensure it is the one you want to delete, then select **Delete** on the post view page.

    A message prompts you to confirm the deletion.

3. Click **Delete**.

A message indicates the selected blog post has been deleted.

### Working with comments

Adding comments to a blog post helps make the site blog interactive. While all users with access to the site can view the blog conversations, only site members can add comments.

The number of replies added to a post is recorded and displayed for each posting. You must view a post to add, view, and manage the related comments.

#### Adding a comment to a post

In the blog you can add a comment to reply to any published blog post.

1. In the Blog browse the posts to find the one you want to comment on.

2. Click the post title to view the post.

    The post view displays the selected blog post in its entirety along with any related comments.

3. Click **Add Comment**.

4. Enter your comment in the box provided.

    Use the features provided to format the text; insert bulleted and numbered lists; and change the font color. To assist with editing, use the undo, redo, and remove formatting features as needed.

5. Click **Add Comment**.

    The comment displays beneath the post.

6. Click **Blog Post List** to return to the main view.

#### Editing a comment

Edit a blog comment to modify or add to its content.

Only a Site Manager, a Site Collaborator, and the user who created the comment can edit it.

1. In the Blog browse the posts to find the one whose comment you want to edit.

2. Click the post title to view the post.

    The post view displays the selected blog post and the related comments.

3. Position your cursor over the comment you want to edit to display the available actions and then click the ![Edit]({% link content-services/images/ico-configure.png %}) Edit icon.

    This action is available only when the currently signed in user has permission to edit the comment.

    The **Edit Comment** box appears displaying the selected comment.

4. Make changes to the comment.

    Use the features provided to format the text; insert bulleted and numbered lists; and change the font color. To assist with editing, use the undo, redo, and remove formatting features as needed.

5. Click **Save**.

    The updated comment displays beneath the post.

6. Click **Blog Post List** to return to the main view.

#### Deleting a comment

Delete a comment to permanently remove it from a blog post.

Only a Site Manager, a Site Collaborator, and the user who created the comment can delete it.

1. In the Blog browse the posts to find the one whose comment you want to delete.

2. Click the post title to view the post.

    The post view displays the selected blog post and the related comments.

3. Position your cursor over the comment you want to delete to display the available actions and then click the ![Delete]({% link content-services/images/ico-delete.png %}) Delete option.

    This action is available only when the currently signed in user has permission to delete the comment.

    A message prompts you to confirm the deletion.

4. Click **Delete**.

    The comment is removed from the page.

5. Click **Blog Post List** to return to the main view.

## Data list

The data lists component lets site members create and manage lists of data relevant to the site. Users can work with their own lists and can also contribute to lists created by other site members.

### Accessing the Data Lists component

Access the data lists component to view the lists created for the current site.

In this component you can create new lists, as well as edit and delete any lists that you created.

In a site click **More** then **Data Lists**.

> **Note:** In each site the feature names can be customized. If the site manager has done this, the link might have a name other than **Data Lists**.

    This opens the feature. The browsing pane displays a list of all existing data lists for the current site.

### Viewing a list

The **Lists** section of the explorer panel displays the data lists for the current site. Once you select a list to view you can apply filters to display specific list items within that list.

The **Items** list in the explorer panel provides the following options for filtering the rows displayed in the current list:

* **All**: Displays all list items
* **Recently Added**: Displays the list items created in the past seven days
* **Recently Modified**: Displays the list items modified in the past seven days
* **Created by Me**: Displays the list items created by the current user

1. In the Data lists explorer panel click the list you want to view.

    The main view displays the selected list in its entirety. Where the list contains more items than can be displayed on a single page, navigation links become enabled at the top and bottom of the list. The number in bold indicates your current page. Click a page number to display a specific page. Use the previous (<<) and next (>>) links to move forward and backward through multiple pages of items.

2. In the **Items** list click the view representing the list items you want to display.

    The current list displays only the list items that correspond to the selection.

3. In the table click a column headings to sort the results by that column.

### Creating a new list

Create a new list for the current site.

1. In the Data lists feature click **New List**.

    The New List dialog box appears.

2. Select the type of list you want to create.

3. Type a **Title** (required) and **Description** (optional) for the list.

    CAUTION:

    You are not warned if you create lists with duplicate titles. Review the existing lists to ensure that your list name is unique.

4. Click **Save**.

    The name of the new list appears in the **Lists** section of the browsing pane.

5. Click the list name to display the list in the main view.

    A new list contains no list items.

### Editing the list details

Edit an existing list to modify its title and description.

Only a Site Manager, a Site Collaborator, and the user who created the list can edit it.

1. In the Data lists explorer panel position your cursor over the list you want to edit to display the available actions.

2. Click the ![Edit]({% link content-services/images/ico-configure.png %}) Edit icon.

    The Edit List Details dialog box appears displaying the current list details.

3. Make the changes to the title and description.

    >**CAUTION**: You are not warned if you create lists with duplicate titles. Review the existing lists to ensure that your list name is unique.

4. Click **Save**.

### Deleting a list

Delete a list to permanently remove it from the site.

Only the Site Manager and the user who created the list can delete it.

1. In the Data lists explorer panel position your cursor over the list you want to delete to display the available actions.

2. Click the ![Delete]({% link content-services/images/ico-delete.png %}) Delete option.

    A message prompts you to confirm the deletion of the selected list.

3. Click **Delete**.

A message indicates the selected list has been deleted.

### Working with list items

Once you create a list you can populate it with list items.

You can add items to both your own lists and lists created by other site members. Do this by creating new items or duplicating existing list items.

To maintain your lists you can also edit and delete items.

#### Creating a list item

Create list items in an an existing data list.

1. Click on a data list in the Data lists explorer panel.

2. Click **New Item** in the header.

    The Create New Item dialog box appears. The fields displayed on this page vary depending on the type of list currently selected.

3. Complete the information as required.

    Fields marked with an asterisk (*) are required. In addition to text boxes and lists the page can include the following buttons:

    * Calendar icon: Click the icon to display a calendar and then select the date.
    * **Select** button (**Assigned To** and **Assignee**): Click **Select** then search for and add the user(s).
    * **Select** button (**Attachments**): Click **Select** then browse the library structure to locate and add the content item(s).

4. Click **Save**.

    The new item appears in the list.

#### Editing a list item

Edit an existing list item to modify it.

Only a Site Manager, a Site Collaborator, and the user who created the item can edit it.

1. Click on a data list in the Data lists explorer panel.

2. Position your cursor over the list item you want to edit to display the available actions.

3. Click the ![Edit]({% link content-services/images/ico-configure.png %}) Edit icon.

    The Edit Data Item dialog box appears displaying the details for the selected item.

4. Make the required changes to the item details.

5. Click **Save**.

    The updated item appears in the list.

#### Duplicating a list item

Quickly and easily create a new list item by duplicating an existing item in the same list. This is a particularly useful action if the two items have similar details.

1. Click on a data list in the Data lists explorer panel.

2. Position your cursor over the list item you want to duplicate to display the available actions.

3. Click the ![Duplicate]({% link content-services/images/ico-datalist-duplicate.png %}) Edit icon.

    The new item is created. Its details are identical to the selected list item.

4. Edit the new list item as necessary.

#### Deleting a list item

Delete a list item to permanently remove it from the current data list.

Only the Site Manager and the user who created the item can delete it.

1. Click on a data list in the Data lists explorer panel.

2. Position your cursor over the list item you want to delete to display the available actions.

3. Click the ![Delete]({% link content-services/images/ico-delete.png %}) Delete option.

    A message prompts you to confirm the deletion.

4. Click **Delete**.

### Working with multiple list items

In the data lists component you can select multiple list items to quickly and easily perform a single task on the selected items.

#### Selecting multiple list items

There are two methods to select multiple list items in the current data list. You can select any number of items.

1. In a data list select list items in one of the following ways:

    * Click a check box to select the associated list item.
    * Click **Select** at the top of the data list and click **All**.

    Click **None** to clear the list selections. Click **Invert Selection** to toggle the check boxes to their opposite state.

The appropriate check boxes appear selected in the data list.

#### Performing actions on multiple list items

Once you select the list items you want to work with you can select an action to perform.

The **Selected Items** list displays the actions that you can perform on multiple items. They are:

* **Duplicate**: Copies the selected list items and adds them to the current list
* **Delete**: Deletes the selected list items
* **Deselect All**: Clears the check boxes of the currently selected list items

When a data list is longer than one page you can select items on multiple pages. However, the selected action is performed only on the items on the page currently displayed.

1. Click on a data list in the Data lists explorer panel.

2. Select items by clicking the check box next to them.

3. Click **Selected Items**.

    A list displays the available actions.

4. Click the required action.

    Click **Deselect All** to clear the selected items. When you select this option you cannot perform another action until you reselect the list items.

## Site links

The links component lets site members compile a list of web links that are related to the site or that might be of interest to site users. These can be internal links pointing to site pages or external links pointing to any web address.

The comment feature allows site members to add and manage comments on the site links.

### Accessing the site links

Access the site links component to view the web links compiled for the current site.

In this component you can create new links, as well as edit and delete the links that you created. You can add a comment to any link listed.

1. In a site click **More** then **Links**.

    > **Note:** In each site the feature names can be customized. If the site manager has done this, the link might have a name other than **Links**.

    This opens the component. The main view defaults to the **All Links** view so you are seeing a list of all web links created for the site. The summary includes:

    * the link title
    * the link URL
    * the date and time the link was created
    * the user who created the link
    * a description of the link
    * the tags associated with the link

2. Use the **<<** and **>>** navigation buttons to move forward and backward through multiple pages of links.

3. Click **Simple View** to display only the basic link details: title and URL.

    Click **Detailed View** to display the summary view.

### Browsing the site links

The explorer panel on the main view enables you to filter the links for easier navigation.

The explorer panel on the left side of the page lets you display a subset of the links by selecting a specific view or a tag.

The **Links** list in the browsing pane provides the following options for browsing links:

* **All Links**: Displays all links
* **My Links**: Displays the links created by the current user
* **Recently Added**: Displays the links created in the past seven days

The **Tags** list displays all tags currently associated with one or more links.

To browse the links:

1. In the Links feature select an option in the explorer panel:

    a. In the **Links** list click a view to display the links in the current site that correspond to that selection.

    b. In the **Tags** list click the tag you're interested in to display all links in the current site associated with that tag.

2. Click **Simple View** to display only the basic link details: title and URL.

    Click **Detailed View** to display the summary view.

3. Position the cursor over an item in this list to display its available actions.

### Viewing a link

The main view of the Links feature displays the existing links for this site. You can choose a summary view or a simple list. Viewing a link enables you to see the full link details as well as any comments that have been added.

Although you can perform actions on a link from the main page, you might want to view the link before you edit or delete it in order to confirm that you have selected the correct one.

1. In the Links feature browse the links to find the one you want to view.

2. Click the title of the link to display the full details.

    The link view displays the selected link in its entirety, along with any comments that have been added.

3. Click **Links List** to return to the main view.

### Creating a new link

Create a new site link to provide easy access to information that could be of interest or use to the site members. You can add any internal or external web address.

1. In the Links feature click **New Link**.

    The Create Link page appears.

2. Type a **Title** and **Description** for the link.

3. In the **URL** box type the web address for the link you are creating.

4. To have the link open in the same browser window, select **Internal**.

    Leave this option blank to have the link open in a new browser window or tab.

5. Optionally, add existing or create new tags for the link.

    The newly associated tags appear. Click a tag to remove it.

6. Click **Save**.

    The new link appears.

7. Click **Links List** to return to the main view.

### Editing a link

Edit an existing link to modify it.

Only a Site Manager, a Site Collaborator, and the user who created the link can edit it.

1. In the Links feature browse the links to find the one you want to edit.

2. Position your cursor over the link to display the available actions and then click **Edit**.

    > **Note:** You can view the link first to ensure it is the one you want to edit, then select **Edit** on the link view page.

    The Edit Link page appears displaying the selected link.

3. Make the changes to the link details.

4. Edit the tags for this link as necessary.

    You can add and remove existing tags, or create new tags.

5. Click **Update**.

    The link view displays the updated details.

6. Click **Links List** to return to the main view.

### Deleting a link

Delete a link to permanently remove it from the current site. This action also deletes any comments on the link.

Only the Site Manager and the user who created the link can delete it.

1. In the Links feature browse the links to find the one you want to delete.

    When deleting more than one link you can use the multiple selection feature provided.

2. Position your cursor over the link to display the available actions and then click **Delete**.

    > **Note:** Consider viewing the link first to ensure it is the one you want to delete. You can then select **Delete** on the link view page.

    A message prompts you to confirm the deletion.

3. Click **Delete**.

A message indicates the selected link has been deleted.

#### Deleting multiple links

In the links list you can quickly delete multiple links rather than removing them one at a time.

1. In the Links feature browse the links to find the ones you want to delete.

2. In the links list select the links you want to delete:

    * Click the check box to left of each link you want to delete.
    * Click **Select** at the top of the list and click **All** to select all links in the current view.

    Click **None** to clear the list selections. Click **Invert Selection** to toggle the check boxes to their opposite state.

    The appropriate check boxes appear selected in the links list.

3. In the header click **Selected Items** and then **Delete**.

    > **Note:** Click **Deselect All** to clear the selected check boxes.

    A message prompts you to confirm the deletion.

4. Click **Delete**.

### Adding a comment to a link

In the links feature you can add a comment to a link.

1. In the Links feature find and click the link you want to comment on.

    The detail view displays the selected link along with any related comments.

2. Click **Add Comment**.

3. Enter your comment in the box provided.

    Use the features provided to format the text; insert bulleted and numbered lists; and change the font color. To assist with editing, use the undo, redo, and remove formatting features as needed.

4. Click **Add Comment**.

    The comment displays beneath the link.

5. Click **Links List** to return to the main view.

#### Editing a link comment

You can edit a comment on a link to modify or add to its content.

Only a Site Manager, a site Collaborator, and the user who created the comment can edit it.

1. In the Links feature find and click the link containing the comment you want to edit.

    The detail view displays the selected link along with any related comments.

2. Position your cursor over the comment you want to edit to display the available actions and then click the ![Edit]({% link content-services/images/ico-configure.png %}) Edit icon.

    This action is available only when the currently signed in user has permission to edit the comment.

    The **Edit Comment** box appears displaying the selected comment.

3. Make the changes to the comment.

    Use the features provided to format the text; insert bulleted and numbered lists; and change the font color. To assist with editing, use the undo, redo, and remove formatting features as needed.

4. Click **Save**.

    The updated comment displays.

5. Click **Links List** to return to the main view.

#### Deleting a link comment

Delete a comment to permanently remove it from a link.

Only a Site Manager and the user who created the comment can delete it.

1. In the Links feature find and click the link containing the comment you want to delete.

    The detail view displays the selected link along with any related comments.

2. Position your cursor over the comment you want to delete to display the available actions and then click the ![Delete]({% link content-services/images/ico-delete.png %}) Delete option.

    This action is available only when the currently signed in user has permission to delete the comment.

    A message prompts you to confirm the deletion.

3. Click **Delete**.

    The comment is removed from the page.

4. Click **Links List** to return to the main view.
