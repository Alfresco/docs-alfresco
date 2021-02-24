---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: getPerson
---

# `getPerson`

`getPerson(username)` returns a person object given the person's user name.

## Parameters

-   **username**

    A string representing the user name of the user to return.


## Returns

Returns a `TemplateNode` object representing the user with the specified user name.

## Example

```


<p><#assign myPerson = people.getPerson("admin")></p>
<p>${myPerson.properties.userName}: ${myPerson.type}</p>

<table>
  <#-- Get a list of all the property names for the document -->
  <#assign props = myPerson.properties?keys>
  <#list props as t>
    <#-- If the property exists -->
    <#if myPerson.properties[t]?exists>

      <#-- If it is a date, format it accordingly-->
      <#if myPerson.properties[t]?is_date>
        <tr><td>${t} = ${myPerson.properties[t]?date}</td></tr>
       
      <#-- If it is a boolean, format it accordingly-->
      <#elseif myPerson.properties[t]?is_boolean>
        <tr><td>${t} = ${myPerson.properties[t]?string("yes", "no")}</td></tr>
       
      <#-- Otherwise treat it as a string -->
     <#else>
       <tr><td>${t} = ${myPerson.properties[t]}</td></tr>
     </#if>
    </#if>
  </#list>
</table>

```

The preceding code snippet would produce output similar to the following:

```

admin: {http://www.alfresco.org/model/content/1.0}person

{http://www.alfresco.org/model/content/1.0}name = c0d30157-535e-4e31-b2fa-2a194ab5a8e6
{http://www.alfresco.org/model/content/1.0}firstName = Administrator
{http://www.alfresco.org/model/content/1.0}homeFolder = Node Type: {http://www.alfresco.org/model/content/1.0}folder	Node Ref: workspace://SpacesStore/ea0f4d70-7edf-42db-b25a-a1acf7ee70d8
{http://www.alfresco.org/model/content/1.0}homeFolderProvider = bootstrapHomeFolderProvider
{http://www.alfresco.org/model/content/1.0}owner = admin
{http://www.alfresco.org/model/content/1.0}email = admin@alfresco.com
{http://www.alfresco.org/model/system/1.0}locale = en_US
{http://www.alfresco.org/model/content/1.0}userName = admin
{http://www.alfresco.org/model/system/1.0}store-protocol = workspace
{http://www.alfresco.org/model/system/1.0}store-identifier = SpacesStore
{http://www.alfresco.org/model/content/1.0}organizationId =
{http://www.alfresco.org/model/content/1.0}preferenceValues = org.alfresco.repo.template.BaseContentNode$TemplateContentData@2b80c6ea
{http://www.alfresco.org/model/system/1.0}node-dbid = 27
{http://www.alfresco.org/model/system/1.0}node-uuid = c0d30157-535e-4e31-b2fa-2a194ab5a8e6
{http://www.alfresco.org/model/content/1.0}lastName =
      
```

**Parent topic:**[People API](../references/API-FreeMarker-People.md)

