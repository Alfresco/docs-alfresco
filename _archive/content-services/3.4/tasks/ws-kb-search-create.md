---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, knowledge base search web script]
---

# Creating a Knowledge Base Search web script

A web script to support a Knowledge Base sample application provides the back-end search capability for querying knowledge base articles within a knowledge base. Knowledge articles are identified by their attached knowledge `article` aspect and located in the document library of a knowledge base site in Alfresco Share. The Knowledge Base Search web script searches the Alfresco content repository for knowledge base articles within a specified Alfresco Share site using the fts-alfresco \(full text search\) query language. It returns a JSON formatted response containing the found articles.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

3.  Create a folder to represent the top-level package structure \(skip this step if the **org** space already exists\):

    1.  In the Create menu, click **Create Space**.

    2.  Enter the name for the folder in the Name field, such as: org

    3.  Click **Create Space**.

4.  Create a sub-package \(skip this step if the **example** space already exists\):

    1.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org**.

    2.  In the Create menu, click **Create Space**.

    3.  Enter the name for the folder in the Name field, such as: example

5.  Create a web script description document for your Knowledge Base Search:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field, such as: kb-search.get.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript>
           <shortname>Knowledge Base Search</shortname>
           <description>Searches for knowledge base articles</description>
           <url>/slingshot/knowledgebase/search/site/{site}?maxResults={maxResults?}</url>
           <format default="json">argument</format>
           <authentication>user</authentication>
        </webscript>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

6.  Create a controller script for your Knowledge Base Search web script:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: kb-search.get.js

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Enter the following in the Enter Content box:

        ```
        /**
         * KnowledgeBase Search Component
         *
         * Inputs:
         *   mandatory: siteId = site ID to search in
         *   optional:  maxResults = max items to return.
         *
         * Outputs:
         *   data.items/data.error - object containing list of search results
         */
        
        /**
         * Search constants
         */
        const DEFAULT_MAX_RESULTS = 500;
        const SITES_SPACE_QNAME_PATH = "/app:company_home/st:sites/";
        
        /**
         * Performs a search for knowledge base articles in a site
         *
         * @method doSearch
         * @param siteId {string} The site to search in
         * @param maxResults {int} Maximum number of results to return
         * @return {array} Articles matching the query
         */
        function doSearch(siteId, maxResults)
        {
           // The initial template
           var alfQuery =
             'ASPECT:"{http://www.alfresco.org/model/knowledgebase/1.0}article"' +
             ' AND PATH:"' + SITES_SPACE_QNAME_PATH + '/cm:' + siteId +
             '/cm:documentLibrary//*"' +
             ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}thumbnail"' +
             ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}folder"';
        
           // Perform fts-alfresco language query for articles
           var queryDef = {
              query: alfQuery,
              language: "fts-alfresco",
              page: {maxItems: maxResults},
              templates: []
           };
        
           // Get article nodes
           var nodes = search.query(queryDef),
              articles = [],
              item;
        
           // Turn nodes into article objects
           for (var i = 0, j = nodes.length; i < j; i++)
           {
              // Create core object
              node = nodes[i];
              item =
              {
                 nodeRef: node.nodeRef.toString(),
                 type: node.typeShort,
                 name: node.name,
                 title: node.properties["cm:title"],
                 description: node.properties["cm:description"],
                 modifiedOn: node.properties["cm:modified"],
                 modifiedByUser: node.properties["cm:modifier"],
                 createdOn: node.properties["cm:created"],
                 createdByUser: node.properties["cm:creator"],
                 author: node.properties["cm:author"],
                 nodeDBID: node.properties["sys:node-dbid"],
                 properties: {}
              };
        
              // Calculate display names for users
              var person = people.getPerson(item.modifiedByUser);
              item.modifiedBy = (person != null ? (person.properties.firstName +
                " " + person.properties.lastName) : item.modifiedByUser);
              person = people.getPerson(item.createdByUser);
              item.createdBy = (person != null ? (person.properties.firstName +
                " " + person.properties.lastName) : item.createdByUser);
        
              // Add the Article namespace properties
              for (var k in node.properties)
              {
                 if (k.match("^{http://www.alfresco.org/model/knowledgebase/1.0}") == 
                   "{http://www.alfresco.org/model/knowledgebase/1.0}")
                 {
                    item.properties["kb_" + k.split('}')[1]] = node.properties[k];
                 }
              }
              articles.push(item);
           }
        
           return articles;
        }
        
        /**
         * The WebScript bootstrap method
         *
         * @method main
         */
        function main()
        {
           // Gather webscript parameters
           var siteId = url.templateArgs.site;
           var maxResults = (args.maxResults !== null) ? parseInt(args.maxResults) : 
             DEFAULT_MAX_RESULTS; 
        
           // Perform search
           var articles = doSearch(siteId, maxResults);
        
           // Generate model from results
           model.data = {
              items: articles
           };
        }
        
        main();
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

7.  Create a response template for your Knowledge Base Search web script:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: kb-search.get.json.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Enter the following in the Enter Content box:

        ```
        <#escape x as jsonUtils.encodeJSONString(x)>
        {
           "items":
           [
              <#list data.items as item>
              {
                 "nodeRef": "${item.nodeRef}",
                 "type": "${item.type}",
                 "name": "${item.name}",
                 "title": "${item.title!''}",
                 "description": "${item.description!''}",
                 "modifiedOn": "${xmldate(item.modifiedOn)}",
                 "modifiedByUser": "${item.modifiedByUser}",
                 "modifiedBy": "${item.modifiedBy}",
                 "createdOn": "${xmldate(item.createdOn)}",
                 "createdByUser": "${item.createdByUser}",
                 "createdBy": "${item.createdBy}",
                 "author": "${item.author!''}",
                 "nodeDBID": "${item.nodeDBID}",
                 "properties":
                 {
                 <#assign first=true>
                 <#list item.properties?keys as k>
                    <#if item.properties[k]??>
                       <#if !first>,<#else><#assign first=false></#if>"${k}":
                          <#assign prop = item.properties[k]>
                          <#if prop?is_date>"${xmldate(prop)}"
                          <#elseif prop?is_boolean>${prop?string("true", "false")}
                          <#elseif prop?is_enumerable>[
                             <#list prop as p>
                                "${p}"<#if p_has_next>, </#if>
                             </#list>]
                          <#elseif prop?is_number>${prop?c}
                          <#else>"${prop}"
                       </#if>
                    </#if>
                 </#list>
                 }
              }<#if item_has_next>,</#if>
              </#list>
           ]
        }
        </#escape>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

8.  Register the Knowledge Base Search web script with Alfresco.

    1.  In a web browser, enter: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**. A message indicates there is one additional web script.


-   **[Testing Knowledge Base Search](../tasks/ws-kb-search-test.md)**  
Before testing the Knowledge Base Search web script, you must have knowledge articles to search for. To create knowledge articles you can develop another web script.
-   **[How Knowledge Base Search works](../concepts/ws-kb-search.md)**  
Authentication is required, as the web script needs to query the Alfresco content repository.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

