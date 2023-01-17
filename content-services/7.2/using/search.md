---
title: Search
---

You can use the search box on the toolbar to search for files, sites, and people.

Type your search into the search box, and a list of matching files, sites, and people will be shown as you type.

If you're in a site you can click **Search all content** or **Search in ***sitename***** to search all sites or just the site you're in. Private sites that you're not a member of, and their files, aren't shown.

There are lots of [search tips](#searchtips) available, including:

* Type `*` to complete a word if you don't know the full word you're searching for. For example, both `*resco` and `alf*` will show results for `alfresco`.
* To search for items that contain only one of several words, use `OR` and surround your search with brackets, for example, `(big OR red)`. If you don't use brackets, search results are returned containing both `big` and `red`.

The five most relevant files, sites, and people are shown, but you can click **More** to see further results.

You can either:

* Click on one of the results to go straight to it, or
* Press Enter (with the cursor in the search box) to view all the [search results](#searchresults) for all files found by your search.

> **Note:** Wiki pages and blog postings are shown under along with other files. Previews aren't shown for calendar events, site-related web links, discussion topics, or data lists and list items. You need to press Enter to search for them.

## Search results {#searchresults}

If you press Enter in the Search box then all the files and folders found by your search are shown.

You can now:

* Click on a result thumbnail to preview it.
* Click on a result name to open it.
* Click on one or more of the filter options to switch them on and off and narrow down the search results.
* Hover over a result and click **Actions** and select an option from the menu.
* Select multiple results and click **Selected Items** to select an action option.

    > **Tip:** The main file actions are available here, but you may find more options available when you preview the file.

    You can delete a file this way but the search results won't be updated until you run a new search.

> **Note:** Click the **Search in** menu to search in all sites or just in the site you're in.

If you're a [Search Manager]({% link content-services/7.2/using/permissions.md %}#searchmanager) super user then you'll have an additional **Search Manager** option you can click where you can create new search filters.

As well as the search box on the toolbar, there are also additional advanced search features for finding [people](#peoplefinder), [sites](#sitefinder), and [content](#advancedsearch).

> **Tip:** If a file is a Microsoft Office, PDF, or other text-based file type (not an image or video) then you can also click ![Advanced Search icon]({% link content-services/images/advanced-search-icon.png %}) on the file preview to search for text in the file.

## Search tips {#searchtips}

There are multiple options you can use to make your search more specific.

> **Note:** File and folder names have additional search support for product names, product codes, camel case word extraction, general file naming conventions and more.

|To search for|Enter the search criteria|This searches|
|-------------|-------------------------|-------------|
|the word *banana* anywhere it exists|`banana`<br><br>or<br><br>`=banana`|names, titles, descriptions, and content|
|the exact phrase *banana peel* anywhere it exists|`banana peel`|names, titles, descriptions, and content|
|the words *banana*, *peel*, and *slippery* where they all appear together in any order or position|`banana AND peel AND slippery`|names, titles, descriptions, and content|
|content containing any of the words *banana*, *peel*, and *slippery*|`banana peel slippery` <br><br>or<br><br>`banana OR peel OR slippery`|names, titles, descriptions, and content|
|the word *banana* where it is used in a title|`title:banana`|titles|
|the word *banana* where it is used in a name|`name:banana`|names of folders and content items in the library; wiki page titles|
|the word *banana* where it is used in the description|`description:banana`|descriptions of folders and content items in the library; descriptions of data lists|
|the word *banana* where it is used in site content|`TEXT:banana`|wiki pages, blog postings, content items, and discussion items and replies|
|content created on September 26, 2011|`created:"2011-09-26"`|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists. You can search just by year, or go down to month and day level.|
|content created between September 26 and September 30, 2011|`created:["2011-09-26" to "2011-09-30"]`|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists. You can search just by year, or go down to month and day level.|
|any content modified on September 26, 2011|`modified:"2011-09-26"`|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists. You can search just by year, or go down to month and day level.|
|any content modified between September 26 and September 30, 2011|`modified:["2011-09-26" to "2011-09-30"]`|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists. You can search just by year, or go down to month and day level.|
|any content created by a specific user|`creator:<username>`|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists.|
|any content modified by a specific user|`modifier:<username>`|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists.|
|any content containing the letter sequence *use*. The results returned will include references to *use*, *user*, *reuse*, etc.|`TEXT:*use*`|wiki pages, blog postings, library folders, content items, and discussion topics.|

## Using the Site Finder {#sitefinder}

You can search for sites using the search box on the toolbar or you can use the Site Finder to get more detailed site information.

From the search results you can navigate to a site, join or leave sites, and delete a site (managers only).

1. Open the **Sites** menu and click **Site Finder**.

2. Type a full or partial site name in the search box.

    > **Tip:** Leave the search box empty to display all sites you have permission to access.

    The search looks for sites starting with your search criteria, so entering the search criteria `awe` won't find the site *Project Awesome*. If you add `*`, so your search criteria is `*awe`, then you will find the site.

3. Click **Search**.

    A list of sites matching your criteria is shown. This list includes public sites, moderated public sites, sites you created, and private sites that you belong to. To the right of a site, the actions **Join** and **Request to Join** indicate you are not a site member; the action **Leave** indicates you are a site member.

## Using the People Finder {#peoplefinder}

You can search for people using the search box on the toolbar or you can use the People Finder to get more detailed user information.

When you find the user you are looking for you can use the Follow/Unfollow option. You can also view their user profile.

1. Click **People** on the toolbar.

2. Type a full or partial name in the search box.

    You must enter at least one character. The search is not case sensitive.

    The search looks for user names starting with your search criteria, so entering the search criteria 1 won't find the user User1. If you add `*`, so your search criteria is `*1`, then you will find the user.

    **Note:** See the search tips provided on the People Finder page to perform more complex searches.

3. Click **Search**.

4. In the results list, click a user name to display that user's profile.

### Reviewing a user profile

When you search for a user, you can view their profile details.

The profile details are organized across several pages:

* **Info**: Displays the user's personal details, including contact information, company details, and a photo.
* **Sites**: Lists the sites the user belongs to.
* **Content**: Displays two lists detailing the user's recent site activities. The **Recently added** list displays the last three pieces of content that the user added to any site. This includes wiki pages, blog postings, library content, and discussion items. The **Recently modified** list displays the last three pieces of content the user edited.
* **Following (#)**: Displays a list of people the user is following.The number to the right of the page label indicates how many people are currently being followed by this user. If the user has marked their list as private, this page will not appear in the profile.

## Using the Advanced Search {#advancedsearch}

Use the search box in the toolbar to access the advanced search.

1. Click ![Advanced Search icon]({% link content-services/images/advanced-search-icon.png %}) in the search box then click **Advanced Search**.

    The Advanced Search screen displays.

2. Choose a search type:

    * **Content**: Searches for all types of content
    * **Folders**: Searches for all folders and containers, such as library folders and data lists

3. Enter your search criteria.

    To search by modification date, click the calendar icon to select a date from a calendar.

    To search by the user who last modified the content, enter the appropriate user name in the **Modifier** field.

    **Tip:** You can type `*` to complete a word if you don't know the full word you're searching for. For example, both `*resco` and `alf*` will show results for `alfresco`.

4. Click **Search**.

    All the files and folders found by your search are shown. You can now:

    * Click on a result to open it.
    * Click on one or more of the filter options to switch them on and off and narrow down the search results.
    * Hover over a result and click **Actions** and select an option from the menu.

    > **Tip:** You can delete a file this way but the search results won't be updated until you run a new search.
