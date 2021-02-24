---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
option: 
---

# Home page

In the Quick Start Share site, the **root** section of the **Quick Start Editorial** branch drives the content and configuration of the website Home page.

The topics in this section enable you to explore the Home page features by configuring the page templates, navigation links, and carousel. To do this you will use the following content in the Quick Start Share site:

-   **Alfresco Quick Start \> Quick Start Editorial \> root**

    This section contains the website sections: **blog**, **contact**, **news**, and **publications**. The metadata for the **root** section defines the template mappings and rendition configurations for the Home page and, potentially, for other section pages if they are defined to inherit the parent configurations.

-   **Alfresco Quick Start \> Quick Start Editorial \> root \> collections**

    This folder contains the asset collections for the various regions of the Home page.


-   **[Specifying a template](../tasks/qs-template-specify.md)**  
In Share, you configure template mappings at the section level. This enables you to specify one or more templates to use for content contained within each section.
-   **[Configuring the navigation links](../tasks/qs-navlinks-configure.md)**  
The website template defines that each section \(folders of the type `ws:section`\) in the **Quick Start Editorial** branch of the library appears in the web page header navigation links, either as a top-level item or within a sub-menu. Within Share, you can configure the order in which these navigation links display or you can choose to exclude a section so that it does not appear in the header at all.
-   **[Configuring the Home page carousel](../tasks/qs-carousel-configure.md)**  
The carousel template component at the top of the Home page in the demo website is a static asset collection in the **root** section. With this asset collection, named **news.featured**, you can manually select the content you wish to display.

**Parent topic:**[Using Alfresco Web Quick Start](../concepts/qs-intro.md)

