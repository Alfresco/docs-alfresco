---
author: Alfresco Documentation
---

# Adding the Knowledge Base Search web script

This installs the Knowledge Base Search web script into the Alfresco repository.

1.  Install the Knowledge Base search web script descriptor file as follows:

    Add the file kb-search.get.desc.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension \\templates\\webscripts\\org\\alfresco\\knowledgebase

    kb-search.get.desc.xml

    ```
    <webscript>
       <shortname>Knowledge Base Search</shortname>
       <description>Searches for knowledge base articles</description>
       <url>/knowledgebase/search?maxResults={maxResults?}</url>
       <url>/knowledgebase/search/site/{site}?maxResults={maxResults?}</url>
       <format default="json">argument</format>
       <authentication>user</authentication>
    </webscript>
    
    ```

2.  Install the Knowledge Base search web script controller as follows:

    Add the file kb-search.get.js to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension\\templates\\webscripts\\ org\\alfresco\\knowledgebase

    kb-search.get.js

    ```
    /**
     * Knowledge Base Search Web Script
     *
     * Inputs:
     *   optional:  siteId = site ID to search in
     *   optional:  maxResults = max items to return.
     *
     * Outputs:
     *   data.items/data.error - object containing list of search results
     *
     * If siteId is null, the entire repository will be searched.
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
     * @param siteId {string} The site to search in (or null to search full repository)
     * @param maxResults {int} Maximum number of results to return
     * @return {array} Articles matching the query in the same format that toArticle()   
                       method returns
     */
    function doSearch(siteId, maxResults)
    {
       // The initial template
       var alfQuery='ASPECT:"{http://www.alfresco.org/model/knowledgebase/1.0}article"'
          + ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}thumbnail"'
          + ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}folder"';
    
       // if you have a siteId, append it into the query
       if (siteId != null)
       {
          alfQuery += ' AND PATH:"' + SITES_SPACE_QNAME_PATH + '/cm:' + siteId;
          alfQuery += '/cm:documentLibrary//*"';
       }
    
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
          item.modifiedBy = (person != null ? (person.properties.firstName + " " + 
                            person.properties.lastName) : item.modifiedByUser);
          person = people.getPerson(item.createdByUser);
          item.createdBy = (person != null ? (person.properties.firstName + " " + 
                           person.properties.lastName) : item.createdByUser);
    
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

3.  Install the Knowledge Base search web script JSON template as follows:

    Add the file kb-search.get.json.ftl to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension\\templates\\webscripts\\org\\ alfresco\\knowledgebase

    kb-search.get.json.ftl

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
                <#if prop?is_date>
                   "${xmldate(prop)}"
                <#elseif prop?is_boolean>
                   ${prop?string("true", "false")}
                <#elseif prop?is_enumerable>
                  [<#list prop as p>"${p}"<#if p_has_next>,</#if></#list>]
                <#elseif prop?is_number>${prop?c}
                <#else>"${prop}"
                </#if>
             </#if>
             </#list>
             }
          }
          <#if item_has_next>,</#if>
       </#list>
       ]
    }
    </#escape>
    ```


**Parent topic:**[Getting started](../concepts/kb-about.md)

