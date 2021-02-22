---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: knowledge base
---

# Configuring a dashlet as an option on the site dashboard

A dashlet consists of a Spring web script. Modifying the dashlet's web script descriptor lets it display as an option on the Alfresco Share site dashboard configuration screen.

1.  Open the dashlet's web script descriptor.

2.  Set the dashlet's web script descriptor `family` element to `site-dashlet` as follows:

    ```
    <webscript> 
      <shortname>Knowledge Base</shortname> 
      <description>A summary of all knowledge base articles</description> 
      <family>site-dashlet</family> 
      <url>/components/dashlets/knowledgebase</url> 
    </webscript>
    ```

    Dashlet web scripts must provide `GET` handlers. If you define a scriptable controller for the HTTP GET method, your template view outputs to the HTML format. If you add your dashlet to a user or site dashboard, Alfresco Share renders it in the context of the entire page.


**Parent topic:**[Building custom dashlets](../concepts/kb-dashlet.md)

