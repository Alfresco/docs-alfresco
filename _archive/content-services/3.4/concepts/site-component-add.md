---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: [knowledge base, developing]
---

# Adding Knowledge Base site components

Adding something to the knowledgebase region of the page involves building a Surf component and binding it to the region for it to render in that spot. You do this by writing a web script, which consists of a few simple files on disk that implement things like scriptable controllers and template views. Alfresco Share picks them up without the need for a server restart or recompilation.

A simple site page has a single web script. More complex pages, such as the document library page, may have many web scripts on a single page. Every web script has a web script descriptor file that follows a prescribed naming convention.

For a Knowledge Base component, you might call this file knowledgebase.get.desc.xml. The web script descriptor informs the web script dispatcher of basic properties about the web script, and describes the URL to which the web script will be bound.

```
<webscript> 
  <shortname>knowledgebase</shortname> 
  <description>Knowledge Base Component</description> 
  <url>/components/knowledgebase</url>  
</webscript> 
```

The dispatcher lets you define a scriptable controller to handle the request and begin populating the model using server-side JavaScript. You could use this for your Knowledge Base component and call the file knowledgebase.get.js.

This controller does all the data operations:

-   Calls out to Alfresco using CMIS
-   Retrieves Knowledge Base articles
-   Populates the model with results

The dispatcher then lets you define a template view that uses the values in your model to generate markup for the body of the web script using FreeMarker. You might call the file knowledgebase.get.html.ftl. This will generate the HTML markup for content in the knowledgebase region of the page.

**Parent topic:**[Configuring custom site pages](../concepts/custom-site-about.md)

