---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, Knowledge Base Search]
---

# How Knowledge Base Search works

Authentication is required, as the web script needs to query the Alfresco content repository.

The Knowledge Base site to search is passed in as a value within the Web script URI path through the `{site}` token. An Alfresco FTS \(Full Text Search\) query statement is constructed, which searches within the content repository path that represents the document library of the specified site:

`/app:company_home/st:sites/cm:{site}/cm:documentLibrary`

The query also filters results to knowledge articles by selecting only items that have the knowledge article aspect attached. Having constructed the query statement, the query is executed through the search root object where the result set is optionally constrained to a maximum number of items, as specified by the `{maxResults}` URI query parameter.

Each row of the result set is converted to a knowledge-article item whose properties are fully calculated where necessary, such as the calculation of the author’s full name. The converted result set is placed into the web script model with the name data. A default JSON response format is specified in the web script descriptor, for which a single response template is provided. Each knowledge article item in the data model is visited and rendered into JSON. To ensure valid JSON is generated, the template uses the FreeMarker escape capability with the web script JSON encoding helper named `jsonUtils.encodeJSONString()`.

**Parent topic:**[Creating a Knowledge Base Search web script](../tasks/ws-kb-search-create.md)

