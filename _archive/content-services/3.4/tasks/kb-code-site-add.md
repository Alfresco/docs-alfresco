---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: knowledge base
---

# Adding the custom site page code

Adding a custom site page in Alfresco Share involves adding a web script, Surf objects, components for your custom page, and a template instance.

**Parent topic:**[Customizing Alfresco Share \(basic\)](../concepts/kb-share-customize-about.md)

## Adding the web script

This code puts the web script descriptor, scriptable controller, template view, and html `<head>` renderer into place and sets up the configuration file and message bundle to provide I18N support.

1.  Define the Knowledge Base dashlet’s web script implementation as follows:

    Add the file knowledgebase.get.desc.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\knowledgebase

    knowledgebase.get.desc.xml

    ```
    <webscript>
       <shortname>Knowledge Base</shortname>
       <description>A summary of all Knowledge Base articles</description>
       <family>site-dashlet</family>
       <url>/components/dashlets/knowledgebase</url>
    </webscript>
    ```

2.  Define the Knowledge Base dashlet’s web script HEAD markup as follows:

    Add the file knowledgebase.get.head.ftl to the directory:

    <installLocation\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\knowledgebase

    knowledgebase.get.head.ftl

    ```
    <#include "../component.head.inc">
    
    <@link rel="stylesheet" type="text/css" 
           href="${page.url.context}-extension/components/dashlets/knowledgebase.css"
    />
    ```

3.  Define the Knowledge Base dashlet’s web script view as follows:

    Add the file knowledgebase.get.html.ftl to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\knowledgebase

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

4.  Define the Knowledge Base dashlet’s web script controller as follows:

    Add the file knowledgebase.get.js to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\knowledgebase

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

5.  Define the Knowledge Base dashlet’s default properties bundle as follows:

    Add the file knowledgebase.get.properties to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\knowledgebase

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

6.  Define the Knowledge Base dashlet’s configuration as follows:

    Add the file knowledgebase.get.config.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\components\\knowledgebase

    kbModel-model-context.xml

    ```
    <knowledgebase>
       <serviceFormat>json</serviceFormat>
       <!--<serviceFormat>cmis</serviceFormat>-->
    </knowledgebase>
    ```


## Adding the Surf page

This defines the Surf page to plug into your site. The page has the ID `knowledgebase` and is defined in a single file.

-   Define a Surf page for an Alfresco Share site as follows:

    Add the fileknowledgebase.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-data\\pages

    knowledgebase.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <page>
       <id>knowledgebase</id>
       <page-type>knowledgebase</page-type>
       <title>Knowledge Base</title>
       <title-id>page.knowledgebase.title</title-id>
       <description>Knowledge Base Page</description>
       <description-id>page.knowledgebase.description</description-id>
       <template-instance>knowledgebase</template-instance>
       <authentication>user</authentication>
    </page>
    ```


## Adding the Surf template instance

This defines the Surf template instance that provides additional configuration that the FreeMarker file may use while rendering.

-   Define the Surf template instance as follows:

    Add the file knowledgebase.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-data\\template-instances

    knowledgebase.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <template-instance>
       <template-type>org/alfresco/knowledgebase</template-type>
    </template-instance>
    ```


## Adding the Freemarker template

This defines the Freemarker template file that converts the page model into markup for the browser to consume.

-   Define the FreeMarker template as follows:

    Add the file knowledgebase.ftl to the directory:

    <installLocation\>tomcat\\shared\\classes\\alfresco\\web-extension\\templates\\org\\alfresco

    knowledgebase.ftl

    ```
    <#include "include/alfresco-template.ftl" />
    
    <@templateHeader/>
    
    <@templateBody>
       <div id="hd">
          <@region id="header" scope="global" protected=true />
          <@region id="title" scope="template" protected=true />
          <@region id="navigation" scope="template" protected=true />
       </div>
       <div id="bd">
          <div>
             <div id="yui-main">
                <div id="divknowledgebaseList">
                   <@region id="knowledgebase" scope="template" />
                </div>
             </div>
          </div>
       </div>
    </@>
    
    <@templateFooter>
       <div id="ft">
          <@region id="footer" scope="global" protected=true />
       </div>
    </@>
    ```


## Adding the Surf component bindings

For your new site page to work, you must bind the web scripts into the template regions. There are five regions on your site page; one is in the global scope and the other four are in the template scope. Spring Surf resolves the globally scoped region; you must define the other four or reuse existing Alfresco Share web scripts for three of them. Your new web script is then bound in as the new element. You bind it to the knowledgebase region.

1.  Bind the custom Knowledge Base web script to the Knowledge Base region as follows:

    Add the file template.knowledgebase.knowledgebase.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-data\\components

    template.knowledgebase.knowledgebase.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <component>
       <scope>template</scope>
       <region-id>knowledgebase</region-id>
       <source-id>knowledgebase</source-id>
       <url>/components/knowledgebase</url>
       <properties>
          <maxResults>25</maxResults>
       </properties>
    </component>
    ```

2.  Bind the stock navigation web script to the navigation region as follows:

    Add the file template.navigation.knowledgebase.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-data\\components

    template.navigation.knowledgebase.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <component>
       <scope>template</scope>
       <region-id>navigation</region-id>
       <source-id>knowledgebase</source-id>
       <url>/components/navigation/collaboration-navigation</url>
    </component>
    ```

3.  Bind the stock title web script to the title region as follows:

    Add the file template.title.knowledgebase.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-data\\components

    template.title.knowledgebase.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <component>
       <scope>template</scope>
       <region-id>title</region-id>
       <source-id>knowledgebase</source-id>
       <url>/components/title/collaboration-title</url>
    </component>
    ```

4.  Bind the stock toolbar web script to the toolbar region as follows:

    Add the file template.toolbar.knowledgebase.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-data\\components

    template.toolbar.knowledgebase.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <component>
       <scope>template</scope>
       <region-id>toolbar</region-id>
       <source-id>knowledgebase</source-id>
       <url>/components/knowledgebase/collaboration-toolbar</url>
    
    </component>
    ```


## Configuring your site page for Alfresco Share

After defining the site page, you must configure it to be available as a selectable option.

-   Configure the site page as follows:

    Add the file share-config-custom.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension

    The following code is an example of the custom Alfresco Share configuration file.

    share-config-custom.xml

    ```
    <alfresco-config>
    
       <!-- Add a custom page type -->
       <config evaluator="string-compare" condition="SitePages" replace="true">
          <pages>
             <page id="calendar">calendar</page>
             <page id="wiki-page">wiki-page?title=Main_Page</page>
             <page id="documentlibrary">documentlibrary</page>
             <page id="discussions-topiclist">discussions-topiclist</page>
             <page id="blog-postlist">blog-postlist</page>
             <page id="links">links</page>
             <page id="tasks">tasks</page>
             <page id="knowledgebase">knowledgebase</page>
          </pages>
       </config>
    
    </alfresco-config>
    ```


