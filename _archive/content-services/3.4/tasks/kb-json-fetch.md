---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
option: knowledge base
---

# Viewing content in JSON

You can use Alfresco Explorer and/or desktop integration via CIFS to create and modify Knowledge Base articles. All these articles are stored in the Alfresco repository as pure content objects with metadata, aspects, and content types. You can also fetch this content via HTTP by calling into your Knowledge Base web script. The HTTP interface lets third-party systems or external applications \(such as Alfresco Share\) interact with your Knowledge Base and interrogate the data inside.

1.  Open a browser and enter the following URL:

    http://localhost:8080/alfresco/service/knowledgebase/search

2.  If prompted for authentication credentials, you can use the following administration credentials:

    -   User name: `admin`
    -   Password `admin`
    A JSON \(JavaScript Object Notation\) structure is returned as text that may show up in your browser or you may be asked to download it. The JSON text is pure data, and contains the search results for content in the Knowledge Base. This includes your Article1.txt file, which is ready for consumption by external applications, including Alfresco Share.


**Parent topic:**[Getting started](../concepts/kb-about.md)

