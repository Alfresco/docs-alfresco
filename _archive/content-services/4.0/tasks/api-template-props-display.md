---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Template API, API/Script]
---

# Using the Template API to display properties

This example uses an Embedded API \(Template API\) to display properties for a given document.

The template iterates over all the properties for a node called `document` and renders the values as appropriate for the data types returned.

-   The following code \(`documentProperties.ftl`\) gets a list that displays all the property names for a document.

    ```
    <table>
     <#-- Get a list of all the property names for the document -->  
     <#assign props = document.properties?keys>  
     <#list props as t>
        <#-- If the property exists -->
        <#if document.properties[t]?exists>
           <#-- If it is a date, format it accordingly-->
           <#if document.properties[t]?is_date>
           <tr><td>${t} = ${document.properties[t]?date}</td></tr>
           
           <#-- If it is a boolean, format it accordingly-->
           <#elseif document.properties[t]?is_boolean>
           <tr><td>${t} = ${document.properties[t]?string("yes", "no")}</td></tr>
           
           <#-- Otherwise treat it as a string -->
           <#else>
           <tr><td>${t} = ${document.properties[t]}</td></tr>
           </#if>
        </#if>
     </#list>
     </table>
    ```


**Parent topic:**[Using Embedded APIs](../concepts/serv-api-embedded-about.md)

**Related information**  


[Using Embedded APIs](../concepts/serv-api-embedded-about.md)

