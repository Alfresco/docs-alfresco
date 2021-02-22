---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: [knowledge base, developing]
---

# Adding the custom dashlet code

Adding code for the custom dashlet to Alfresco Share makes it available to plug into a site dashboard.

1.  Define the Knowledge Base dashlet web script implementation as follows:

    Add the file knowledgebase.get.desc.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\dashlet

    knowledgebase.get.desc.xml

    ```
    <webscript>
       <shortname>Knowledge Base</shortname>
       <description>A summary of all Knowledge Base articles</description>
       <family>site-dashlet</family>
       <url>/components/dashlets/knowledgebase</url>
    </webscript>
    ```

2.  Define the Knowledge Base dashlet web script HEAD markup as follows:

    Add the file knowledgebase.get.head.ftl to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\dashlet

    knowledgebase.get.head.ftl

    ```
    <#include "../component.head.inc">
    
    <@link rel="stylesheet" type="text/css" 
           href="${page.url.context}-extension/components/dashlets/knowledgebase.css"
    />
    ```

3.  Define the Knowledge Base dashlet web script view as follows:

    Add the file knowledgebase.get.html.ftl to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\dashlet

    knowledgebase.get.html.ftl

    ```
    <div class="dashlet knowledgebase">
       <div class="title">${msg("header.knowledgebase")}</div>
       <div class="body">
          <div class="msg">
    <#if (error?exists)>
             <div>${msg("error.call")}</div>          
    <#else>
             <table>
                <tr>
                   <td>${msg("label.all")}:</td>
                   <td>${all}</td>
                </tr>
                <tr>
                   <td><a href="${url.context}/page/site/${page.url.templateArgs.site!""}/documentlibrary?filter=tag&filterData=draft#" class="theme-color-1">${msg("label.drafts")}</a>:</td>
                   <td>${drafts}</td>
                </tr>
                <tr>
                   <td><a href="${url.context}/page/site/${page.url.templateArgs.site!""}/documentlibrary?filter=tag&filterData=pending#" class="theme-color-1">${msg("label.pendingApprovals")}</a>:</td>
                   <td>${pendingApprovals}</td>                   
                </tr>
                <tr>
                   <td><a href="${url.context}/page/site/${page.url.templateArgs.site!""}/documentlibrary?filter=tag&filterData=current#" class="theme-color-1">${msg("label.current")}</a>:</td>
                   <td>${current}</td>
                </td>
                <tr>
                   <td><a href="${url.context}/page/site/${page.url.templateArgs.site!""}/documentlibrary?filter=tag&filterData=archived#" class="theme-color-1">${msg("label.archived")}</a>:</td>
                   <td>${archived}</td>
                </td>
             </table>
    </#if>
          </div>
       </div>
    </div> 
    ```

4.  Define the Knowledge Base dashlet web script controller as follows:

    Add the file knowledgebase.get.js to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\dashlet

    knowledgebase.get.js

    ```
    <import resource="classpath:alfresco/web-extension/site-webscripts/org/alfresco/ \
                      components/knowledgebase/knowledgebase.lib.js">
    
    /**
     * Gathers information on all knowledgebase articles within the site.
     *
     * @method main
     */
    function main()
    {
       var knowledgeBaseConfig = new XML(config.script);
       var site = page.url.templateArgs.site;
       var serviceFormat = knowledgeBaseConfig.serviceFormat ? 
                           knowledgeBaseConfig.serviceFormat : "json";
       var maxResults = args.maxResults ? parseInt(args.maxResults) : 50;
       var articles;
    
       // Search for all knowledge base articles in the site
       // The service either returns an Array of results (can be empty)
       // or an integer status code
       if (serviceFormat == "json")
       {
          articles = jsonSeachKnowledgeBaseArticles(site, maxResults);
       }
       else if (serviceFormat == "cmis")
       {
          articles = cmisSeachKnowledgeBaseArticles(site, maxResults);
       }
    
       if (articles instanceof Array)
       {
          // Group articles and prepare model
          var articleGroups = groupArticlesByStatus(articles);
          model.all = articles.length;
          model.drafts = articleGroups["Draft"] ? articleGroups["Draft"].length : 0;
          model.pendingApprovals = articleGroups["Pending Approval"] ? 
                                   articleGroups["Pending Approval"].length : 0;
          model.current = articleGroups["Current"] ? articleGroups["Current"].length:0;
          model.archived = articleGroups["Archived"] ? 
                              articleGroups["Archived"].length : 0;
       }
       else
       {
          // An error code was returned
          model.error = articles;
       }
    }
    
    main();
    ```

5.  Define the Knowledge Base dashlet default properties bundle as follows:

    Add the file knowledgebase.get.properties to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\dashlet

    knowledgebase.get.properties

    ```
    header.knowledgebase=Knowledge Base
    label.all=Total number of articles
    label.drafts=Drafts
    label.pendingApprovals=Pending for approval
    label.current=Current
    label.archived=Archived
    error.call=An error occured when getting the knowledge base summary
    ```

6.  Define the Knowledge Base dashlet configuration as follows:

    Add the file knowledgebase.get.config.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\dashlet

    kbModel-model-context.xml

    ```
    <knowledgebase>
       <serviceFormat>json</serviceFormat>
       <!--<serviceFormat>cmis</serviceFormat>-->
    </knowledgebase>
    ```


**Parent topic:**[Customizing Alfresco Share \(basic\)](../concepts/kb-share-customize-about.md)

