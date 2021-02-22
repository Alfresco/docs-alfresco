---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
keyword: knowledge base
---

# Adding the common library code

Define common JavaScript functions for your custom Knowledge Base by adding a common server-side JavaScript library for use by custom dashlets and custom pages.

-   Define a common library as follows:

    Add the file knowledgebase.lib.js to the directory:

    <installLocation\>tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\knowledgebase

    The knowledgebase.lib.js file contains helper methods for performing Knowledge Base searches using JSON and CMIS. Both the custom dashlet and the custom page component web scripts use this file.

    knowledgebase.lib.js

    ```
    /**
     * CMIS Version
     *
     * Performs a CMIS search
     *
     * @method cmisSeachKnowledgeBaseArticles
     * @param site {string} The site to search in
     * @param pageSize {int} The maximum number of articles to return
     */
    function cmisSeachKnowledgeBaseArticles(site, pageSize)
    {
       // Get the nodeRef for the sites documentLibrary
       var connector = remote.connect("alfresco"),
           result = connector.get("/slingshot/doclib/container/" + 
              stringUtils.urlEncodeComponent(site) + "/documentLibrary"),
           data = eval('(' + result + ')'),
           container = data.container;
           docLibNodeRef = container ? container.nodeRef : null;
    
       // Do search limited to the site's document library
       var query = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?>" +
                   "<query xmlns:cmis=\"http://www.cmis.org/2008/05\">" +
                   "   <statement>" +
                   "      select d.*, s.* " +
                   "      from cmis:document as d " +
                   "       join kb:status as s on s.cmis:objectid = d.cmis:objectid " +
                   "      where in_tree('" + docLibNodeRef + "')" +
                   "      and d.cmis:objecttypeid &lt;&gt; 'D:cm:thumbnail'" +
                   "   </statement>" +
                   "   <pageSize>" + pageSize + "</pageSize>" +
                   "</query>";
       result = connector.post("/cmis/queries", query, "application/cmisquery+xml");
       var feed = atom.toFeed(result.response),
           entries = feed.entries,
           entriesLength = entries.size(),
           entryEl = null,
           objEl,
           propertiesEl,
           propertiesList,
           propertyEl,
           articles = [],
           article;
    
       // Convert to object format similar to the json response
       for (var ei = 0; ei < entriesLength; ei++)
       {
          entryEl = entries.get(ei);
          article = {
             properties: {}
          };
          objEl = getElementByTagName(entryEl.getExtensions(), "object");
          propertiesEl = getElementByTagName(objEl.getElements(), "properties");
          propertiesList = propertiesEl.getElements();
          for (var pi = 0, pl = propertiesList.size(); pi < pl; pi++)
          {
             propertyEl = propertiesList.get(pi);
             if (propertyEl.getAttributeValue("propertyDefinitionId") == "s.kb:status")
             {
                article.properties["kb_status"] = propertyEl.firstChild.text;
             }
             else if (propertyEl.getAttributeValue("propertyDefinitionId") == 
                      "d.cmis:name")
             {
                article.name = propertyEl.firstChild.text;
             }
             else if (propertyEl.getAttributeValue("propertyDefinitionId") == 
                      "d.cmis:lastModifiedBy")
             {
                article.modifiedByUser = propertyEl.firstChild.text;
                article.modifiedBy = article.modifiedByUser;
             }
             else if (propertyEl.getAttributeValue("propertyDefinitionId") == 
                      "d.cmis:lastModificationDate")
             {
                article.modifiedOn = propertyEl.firstChild.text;
             }         
             else if (propertyEl.getAttributeValue("propertyDefinitionId") == 
                      "d.cmis:objectId")
             {
                article.nodeRef = propertyEl.firstChild.text;
             }
          }
          articles.push(article);
       }
       return articles;
    }
    
    /**
     * Helper method that returns elements (org.apache.abdera.model.Element)
     * in the list (java.util.List) having an element tag name matching elTagName
     *
     * @method getElementByTagName
     * @param list {string} (mandatory) The list to look for elements in
     * @param elTagName {string} (optional) The tagName to look for
     * @return {array|object} An element in the list matching elTagName
     * @private
     */
    
    function getElementByTagName(list, elTagName)
    {
       var el;
       for (var i = 0, l = list.size(); i < l; i++)
       {
          el = list.get(i);
          if (el.QName.localPart == elTagName)
          {
             return el;
          }
       }
       return null;
    }
    
    /**
     * JSON version.
     * 
     * Returns person display name string as returned to the user.
     * Caches the person full name to avoid repeatedly querying the repository.
     *
     * @method jsonSeachKnowledgeBaseArticles
     * @param siteId {string} (mandatory) The site id
     * @param maxResults {int} (optional) The maximum number of results to return
     * @return {array|int} The found knowledgebase articles or integer status code on error
     */
    function jsonSeachKnowledgeBaseArticles(siteId, maxResults)
    {
       // Prepare the webscript url
       var url = "/slingshot/knowledgebase/search/site/" + stringUtils.urlEncode(siteId) + 
        (maxResults ? ("?maxResults=" + maxResults) : "")
    
       // Call server webscript
       var connector = remote.connect("alfresco");
       result = connector.get(url);
    
       if (result.status == 200)
       {
          // Return knowledgebase articles
          return eval('(' + result + ')').items;
       }
       else
       {
          // Return error code to indicate error
          return result.status;
       }
    }
    
    
    
    /**
     * Takes the articles and groups them by status.
     *
     * @method groupArticlesByStatus
     * @return {object} An object using statuses as keys and arrays of articles 
         as values
     */
    
    function groupArticlesByStatus(articles)
    {
       var articleGroups = {},
           status,
           article;
       for (var i = 0, l = articles.length; i < l; i++)
       {
          article = articles[i];
          status = article.properties ? article.properties["kb_status"] : null;
          if (status)
          {
             if (articleGroups[status] === undefined)
             {
                articleGroups[status] = [];
             }
             articleGroups[status].push(article);
          }
       }
       return articleGroups;
    }
    ```


**Parent topic:**[Customizing Alfresco Share \(basic\)](../concepts/kb-share-customize-about.md)

