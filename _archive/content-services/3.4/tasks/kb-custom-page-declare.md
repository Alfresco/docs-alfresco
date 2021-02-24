---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: [knowledge base, developing]
---

# Configuring Alfresco Share

Once you have built your page, you must declare it available to Alfresco Share through the Alfresco Share configuration file.

1.  To declare a new page, add the new configuration in the Alfresco Share configuration file.

    For example:

    ```
    <config evaluator="string-compare" condition="SitePages">
       <pages>
          <page id="calendar">calendar</page>
          <page id="wiki-page">wiki-page?title=Main_Page</page>
          <page id="documentlibrary">documentlibrary</page>
          <page id="discussions-topiclist">discussions-topiclist</page>
          <page id="blog-postlist">blog-postlist</page>
          <page id="links">links</page>
          <page id="tasks">tasks</page>
          **<page id=”knowledgebase”\>knowledgebase</page\>**
       </pages>
    </config>
    ```

    The new configuration appears in bold in the preceding code.


**Parent topic:**[Configuring custom site pages](../concepts/custom-site-about.md)

