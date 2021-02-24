---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: [knowledge base, Alfresco Share]
---

# Adding a custom message bundle

A custom message bundle defines text values for the default locale.

1.  Define custom message bundle elements for Alfresco Share as follows:

    Add the file kbsite.properties to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\messages

    kbsite.properties

    ```
    page.kbSiteDashboard.title=Knowledge Base Site Dashboard
    page.kbSiteDashboard.description=Knowledge Base site's dashboard page
    
    # Customize site
    page.knowledgebase.title=Knowledge Base
    page.knowledgebase.description=Displays the Knowledge Base content
    
    # Create site preset
    title.kbSite=Knowledge Base Site
    ```

2.  If a file of the same name exists, overwrite it.


**Parent topic:**[Customizing Alfresco Share \(basic\)](../concepts/kb-share-customize-about.md)

**Parent topic:**[Adding Alfresco Share customizations](../tasks/kb-code-share.md)

