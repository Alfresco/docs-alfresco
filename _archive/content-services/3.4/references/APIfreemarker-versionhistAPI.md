---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Version History API

Through the Version History API, you can obtain metadata and content for a previous version of a versioned document node.

## `versionHistory`

Returns a sequence of Version History record objects for a versioned `TemplateNode`.

Each Version History record object has the following API:

|Type|Description|
|----|-----------|
|`id`|GUID for the node.|
|`nodeRef`|`NodeRef` string for the node.|
|`name`|Name property of the node version record.|
|`type`|Fully qualified QName type of the node.|
|`createDate`|Created date of the version.|
|`creator`|Creator of the version.|
|`versionLabel`|Version label of the version record.|
|`isMajorVersion`|Boolean true if this was a major version.|
|`description`|Version history description.|
|`url`|URL to the content stream for the frozen content state.|

In addition, the `properties` and `aspect` APIs as described for `TemplateNode` are available, which return the frozen history state of the properties and aspects for the node version record.

For example, show the version history for the current document, with links to content for the previous versions:

```
<#if document?exists>
   <h3>Document Version History for: ${document.name}</h3>
   <table cellspacing=4>
      <tr align=left><th>Version</th><th>Name</th><th>Description</th><th>Created Date</th><th>Creator</th></tr>
      <#list document.versionHistory as record>
         <tr>
            <td><a href="/alfresco${record.url}" target="new">${record.versionLabel}</a></td>
            <td><a href="/alfresco${record.url}" target="new">${record.name}</a></td>
            <td><#if record.description?exists>${record.description}</#if></td>
            <td>${record.createdDate?datetime}</td>
            <td>${record.creator}</td>
         </tr>
      </#list>
   </table>
<#else>
   No document found!
</#if>
```

**Parent topic:**[Template models](../concepts/APIfreemarker-models.md)

