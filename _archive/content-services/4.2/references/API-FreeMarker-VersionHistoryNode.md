---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# `VersionHistoryNode API`

The `VersionHistoryNode` is an extension of the `BaseContentNode` type. The `versionHistory` property of the `TemplateNode` object returns a sequence of `VersionHistoryNode` objects that represent the version history for the document.

## Properties

Each `VersionHistoryNode` objects have the following properties:

|Property|Description|
|--------|-----------|
|`aspects`|Returns the list of aspects applied to this node as a set of QNames.|
|`children`|Returns the children of this node as a list of `TemplateProperties` objects.|
|`createdDate`|Created date of the version.|
|`creator`|Creator of the version.|
|`description`|Version history description.|
|`id`|GUID for the node.|
|`isMajorVersion`|Boolean true if this was a major version.|
|`name`|Name property of the node version record.|
|`nodeRef`|`NodeRef` string for the node.|
|`parent`|Returns the primary parent of this node.|
|`properties`|Returns a map of the properties of the object.|
|`title`|Get the title of the node.|
|`type`|Fully qualified QName type of the node.|
|`url`|URL to the content stream for the frozen content state.|
|`versionLabel`|Version label of the version record.|

## Example

```


<#assign versionHistoryNodes = node.versionHistory>

<#list versionHistoryNodes as vhn>

  <p>aspects:</p>
  <ul>
    <#list vhn.aspects as aspect>
      <li>${aspect}</li>
    </#list>
  </ul>

 <p>children:</p>
 <#if vhn.children?exists>
   <ul>
     <#list vhn.children as child>
       <li>${child.properties.name}</li>
     </#list>
   </ul>
 <#else>
   <p>No children</p>
 </#if>

   <p>createDate (and time): ${vhn.createdDate?datetime}</p>
 
   <p>creator: ${vhn.creator}</p>
   <p>description: <#if vhn.description?exists>${vhn.description}<#else>None</#if></p>
   <p>id: ${vhn.id}</p>
   <p>isMajorVersion: <#if vhn.isMajorVersion>TRUE<#else>FALSE</#if></p>
   <p>name: ${vhn.name}</p>
   <p>nodeRef: ${vhn.nodeRef}</p>
   <p>parent: <#if vhn.parent?exists>${parent.id}<#else>None</#if></p>
   <p>type: ${vhn.type}</p>
   <p>url: ${vhn.url}</p>
   <p>versionLabel: ${vhn.versionLabel}</p>
   
  <hr/>
  
   <p>All properties for the VersionHistoryNode object:</p>

   <table border=1>
     <#assign object = vhn>
     <#assign props = object.properties?keys>
     <#list props as t>
     <#if object.properties[t]?exists>
       <#if object.properties[t]?is_date>
         <tr><td>${t} = ${object.properties[t]?date}</td></tr>
       <#elseif object.properties[t]?is_boolean>
         <tr><td>${t} = ${object.properties[t]?string("yes", "no")}</td></tr>
        <#elseif object.properties[t]?is_sequence>
          <tr><td>
              <#assign items = object.properties[t]>
              <#assign i = 0>
                ${t}=
                <#list items as item>
                  <p>${i}: ${item}</p>
                  <#assign i = i+1>
                </#list>
          </td></tr>
        <#else>
        <tr><td>${t} = ${object.properties[t]}</td></tr>
        </#if>
     </#if>
    </#list>
   </table>
   
   <hr/>

   <p>content: ${cropContent(vhn.properties.content, 150)}</p>
  
   <hr/>

   <p>auditable: <#if vhn.hasAspect("cm:auditable")>TRUE<#else>FALSE</#if></p>
   <p>author: <#if vhn.hasAspect("cm:author")>TRUE<#else>FALSE</#if></p>
   <p>title: <#if vhn.hasAspect("cm:titled")>TRUE<#else>FALSE</#if></p>
   <p>taggable: <#if vhn.hasAspect("cm:taggable")>TRUE<#else>FALSE</#if></p>
   
   <hr/>

</#list>

      
```

The preceding code would generate output similar to the following:

```

aspects:

{http://www.alfresco.org/model/content/1.0}auditable
{http://www.alfresco.org/model/system/1.0}referenceable
{http://www.alfresco.org/model/content/1.0}titled
{http://www.alfresco.org/model/rendition/1.0}renditioned
{http://www.alfresco.org/model/content/1.0}taggable
{http://www.alfresco.org/model/content/1.0}author
{http://www.alfresco.org/model/system/1.0}localized
{http://www.alfresco.org/model/forum/1.0}discussable
{http://www.alfresco.org/model/application/1.0}inlineeditable
{http://www.alfresco.org/model/forum/1.0}commentsRollup
{http://www.alfresco.org/model/content/1.0}versionable

children: No children

createDate (and time): Jan 9, 2012 2:16:43 PM

creator: admin

description: None

id: 7a37ec71-8b40-44be-be1d-5e2123cf0098

isMajorVersion: FALSE

name: TEST

nodeRef: versionStore://version2Store/7a37ec71-8b40-44be-be1d-5e2123cf0098

parent: None

type: {http://www.alfresco.org/model/content/1.0}content

url: /d/d/versionStore/version2Store/7a37ec71-8b40-44be-be1d-5e2123cf0098/TEST

versionLabel: 1.8

All properties for the VersionHistoryNode object:

{http://www.alfresco.org/model/content/1.0}creator = admin
{http://www.alfresco.org/model/content/1.0}author = Tony
{http://www.alfresco.org/model/content/1.0}autoVersion = yes
{http://www.alfresco.org/model/content/1.0}autoVersionOnUpdateProps = yes
{http://www.alfresco.org/model/system/1.0}locale = en_US
{http://www.alfresco.org/model/forum/1.0}commentCount = 2
{http://www.alfresco.org/model/system/1.0}store-protocol = workspace
{http://www.alfresco.org/model/content/1.0}taggable=
0: workspace://SpacesStore/fd353ba5-bfc3-4b32-b178-02206cf48d19

1: workspace://SpacesStore/e8fc0d83-8127-4015-942d-212303112ef1

2: workspace://SpacesStore/d05e3921-063e-4ced-b2ae-dc918ed3e14c

3: workspace://SpacesStore/43aacfb5-899a-4185-83a1-e88f51861d99

4: workspace://SpacesStore/5f8cebc4-ae48-404f-bdb5-5ed2e73aa180

{http://www.alfresco.org/model/application/1.0}editInline = yes
{http://www.alfresco.org/model/content/1.0}content = org.alfresco.repo.template.BaseContentNode$TemplateContentData@34df2786
{http://www.alfresco.org/model/content/1.0}title = My sample test program
{http://www.alfresco.org/model/system/1.0}node-uuid = eae9d90f-706f-46ba-9cc5-63b31e1e7fcb
{http://www.alfresco.org/model/content/1.0}modifier = admin
{http://www.alfresco.org/model/content/1.0}name = TEST
{http://www.alfresco.org/model/content/1.0}modified = Jan 9, 2012
{http://www.alfresco.org/model/content/1.0}initialVersion = yes
{http://www.alfresco.org/model/system/1.0}store-identifier = SpacesStore
{http://www.alfresco.org/model/content/1.0}created = Jan 5, 2012
{http://www.alfresco.org/model/system/1.0}node-dbid = 1,927
{http://www.alfresco.org/model/content/1.0}versionLabel = 1.8
{http://www.alfresco.org/model/content/1.0}description = A sample test program

content: The first 150 bytes content of the file ...

auditable: TRUE

author: TRUE

title: TRUE

taggable: TRUE

...
      
```

-   **[hasAspect](../references/API-FreeMarker-VersionHistoryNode-hasAspect.md)**  
`hasAspect(aspect)` returns a boolean corresponding to whether or not the node has the specified aspect.

**Parent topic:**[Alfresco Repository FreeMarker Template reference](../references/API-FreeMarker-intro.md)

