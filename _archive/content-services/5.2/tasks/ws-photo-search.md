---
author: Alfresco Documentation
---

# Creating a photo search script

This tutorial shows you how to develop a script that provides the ability to search a site for photos.

There are no prerequisites for this tutorial.

This tutorial takes you through the creation of a simple web script to search a site for photos.

1.  Create the web script description file:In your favorite editor create the file photo-search.get.desc.xml with the following contents:

    ```
    <webscript>
       <shortname>Photo Search</shortname>
       <description>Searches the specified site for photos</description>
       <url>/photo-search/{site}?maxResults={maxResults?}</url>
       <format default="html">extension</format>
       <authentication>user</authentication>
    </webscript>
    ```

    Save the file in the following directory <installLocation\>/tomcat/shared/classes/alfresco/extension/templates/webscripts. You will need to create the templates and webscripts sub-directories as they do not exist by default. You might also need to change this directory path if you are using a Java application server other than Tomcat.

2.  In the same directory create the JavaScript controller, photo-search.get.js:

    ```
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

3.  Now create a template file, photo-search.get.html.ftl, in the same directory, to display some information about the photos found:

    ```
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

    This FreeMarker template displays some EXIF information for each photo.

4.  Restart Alfresco Content Services to ensure that the newly created templates/webscripts directory is added to the Tomcat classpath.

5.  In Share, create a sample site such as `sample-site`.

6.  Upload a number of different files, including some photos, into your sample site's document library.

7.  Run the script using a URL such as `http://localhost:8080/alfresco/service/photo-search/<sample-site>`. You can change `<sample-site>` to be the name of a site you have created.


**Parent topic:**[Web Script tutorials](../tasks/ws-tutorials.md)

