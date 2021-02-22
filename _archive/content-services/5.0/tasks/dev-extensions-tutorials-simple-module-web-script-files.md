---
author: Alfresco Documentation
---

# Create the web script files

In this task you will learn how to locate the web script files in your module directory structure. This simple module implements a web script that searches for photos in the specified site. You will create the files and position them within the module directory structure.

There are three files that comprise the web script that need to be located within the module directory structure:

-   photo-search.get.desc.xml
-   photo-search.get.html.ftl
-   photo-search.get.js

These files will be located in the directory config/alfresco/extension/templates/webscripts. Note that when the module is installed this directory will be automatically mapped into the target web application's classpath, specifically \(for Tomcat\) ./tomcat/webapps/alfresco/WEB-INF/classes/alfresco/extension/templates/webscripts.

1.  Create the web script description file photo-search.get.desc.xml with the following content:

    ```
    
                        
    <!-- photo-search.get.desc.xml -->
    <webscript>
       <shortname>Photo Search</shortname>
       <description>Searches the specified site for photos</description>
       <url>/photo-search/{site}?maxResults={maxResults?}</url>
       <format default="html">extension</format>
       <authentication>user</authentication>
    </webscript>                      
                        
                        
    ```

    Ensure this file is located in the directory config/alfresco/extension/templates/webscripts.

2.  Create the web script FreeMarker template file with the following content:

    ```
    
                            
    <!-- photo-search.get.html.ftl -->
    <p>List of photos in site: ${site}</p>
    <table border="3">
      <tr><th>File name</th><th>Properties</th><th>Manufacturer</th><th>dateTimeOriginal</th><th>focalLength</th></tr>
    
      <#assign manufacturer = "{http://www.alfresco.org/model/exif/1.0}manufacturer"/>  
      <#assign dateTimeOriginal = "{http://www.alfresco.org/model/exif/1.0}dateTimeOriginal"/>  
      <#assign focalLength = "{http://www.alfresco.org/model/exif/1.0}focalLength"/>  
    
      <#list nodes as node>
        <tr>
          <td>${node.name}</td>
          <td>
            <#assign keys = node.properties?keys/>
            <#list keys as k>
              ${k}
            </#list>
         </td>
          <td>
            <#if node.properties[manufacturer]?exists>
              ${node.properties[manufacturer]}
            </#if>
          </td>
          <td>
            <#if node.properties[dateTimeOriginal]?exists>
              ${node.properties[dateTimeOriginal]?date}
            </#if>
          </td>
          <td>
            <#if node.properties[focalLength]?exists>
              ${node.properties[focalLength]}
            </#if>
          </td>
        </tr>
      </#list>
    </table>
                            
                            
                        
    ```

    Ensure this file is located in the directory config/alfresco/extension/templates/webscripts.

3.  Create the web script JavaScript controller file:

    ```
    
                            
    // photo-search.get.js
    
    const DEFAULT_MAX_RESULTS = 500;
    const SITES_SPACE_QNAME_PATH = "/app:company_home/st:sites/";
    
    function doSearch(siteId, maxResults)
    {
        var alfQuery =
            'ASPECT:"exif:exif"' +
            ' AND PATH:"' + SITES_SPACE_QNAME_PATH + '/cm:' + siteId +
            '/cm:documentLibrary//*"' +
            ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}thumbnail"' +
            ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}folder"';
    
        var queryDef = {
            query: alfQuery,
            language: "fts-alfresco",
            page: {maxItems: maxResults},
            templates: []
        };
    
        return search.query(queryDef);
    }
    
    function main()
    {
        var siteId = url.templateArgs.site;
        var maxResults = (args.maxResults !== null) ? parseInt(args.maxResults) : 
            DEFAULT_MAX_RESULTS; 
    
        var nodes = doSearch(siteId, maxResults);
    
        model.nodes = nodes;
        model.site = siteId;
    }
    
    main();                        
                            
                        
    ```

    Ensure this file is located in the directory config/alfresco/extension/templates/webscripts.


At this point you have created all of the necessary files for this module in the module directory structure.

**Parent topic:**[Creating a simple module with Ant](../tasks/dev-extensions-tutorials-simple-module.md)

