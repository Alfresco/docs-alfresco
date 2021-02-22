---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
option: 
---

# Configuring the navigation links

The website template defines that each section \(folders of the type `ws:section`\) in the **Quick Start Editorial** branch of the library appears in the web page header navigation links, either as a top-level item or within a sub-menu. Within Share, you can configure the order in which these navigation links display or you can choose to exclude a section so that it does not appear in the header at all.

This task assumes you are in the Document Library page component of the Quick Start site and that the **Show Folders** feature is enabled.

1.  Navigate to **Alfresco Quick Start \> Quick Start Editorial \> root**.

2.  Locate a section folder \(**blog**, **news**, or **publications**\) and click **Edit Metadata** in the associated action list.

    The **Title** field contains the text that will appear in the web page header for the related link.

3.  Edit the value in the **Order Index** field to change the display order of the links in the header.

    The template uses the value in this field to order the section links. The section with the lowest value in this field appears to the right of the Home link and the remaining links are added in ascending numerical order. Negative numbers are accepted. Upon installation, the website sections are configured to appear in the order News \(20\), Publications \(50\), and Blog \(80\).

    Changing the **Order Index** value for the **blog** section to 10 will change the order in the header to Blog, News, Publications.

    You change the order of the links in the sub-menus in the same manner. The section with the lowers value appears as the first item in the sub-menu.

    **Note:** You can enable the option **Exclude from navigation** to remove the Blog link from the header.

4.  Click **Submit**.

    In the Quick Start website, navigate to the Home page to view the changes. Refresh the page if the changes are not immediately visible.


**Parent topic:**[Home page](../concepts/qs-homepage.md)

