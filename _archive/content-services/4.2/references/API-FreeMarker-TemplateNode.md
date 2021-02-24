---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# TemplateNode API

`TemplateNode` objects and any subsequent child node objects provide access to the common Alfresco concepts, such as properties, aspects, and associations. The following template API is provided. `TemplateNode` extends `BasePermissionsNode`.

|Properties|Description|
|----------|-----------|
|`aspects`|A sequence of the aspects \(as QName strings\) applied to the node.|
|`assocs`, `associations`|A map of the target associations for the node.Each entry in the map contains a sequence of the `Node` objects on the end of the association. For example:

```
mynode.assocs["cm:translations"][0]
```

|
|`auditTrail`|Returns a sequence of `AuditInfo` objects representing the Audit Trail for a node; available only if auditing is active for the repository.|
|`childAssocs`, `childAssociations`|A map of the child associations for the node.Each entry in the map contains a sequence of the `Node` objects on the end of the child association. For example:

```
myforumnod.childAssocs["fm:discussion"][0]
```

|
|`childByNamePath`|Returns a map capable of returning a single child node found by name path, such as:```
companyhome.childByNamePath["Data Dictionary/Content Templates"]
```

Under the covers, this method is building an XPath and executing a search against the `cm:name` attribute on children of the current node. This method allows you to find a specific child node if you know its name.

**Note:** The previous API calls use the node they are executed against as the current context for the query. For example, if you have a folder node called "myfolder" and you execute the call `myfolder.childByNamePath["MyChildFolder"]`, the search tries to find a folder called "MyChildFolder" as the child of the `myfolder` node.

|
|`children`|A sequence \(list\) of the child nodes. For example:```
mynode.children[0]
```

|
|`childrenByLuceneSearch`|Returns a map capable of executing a search against the entire repository based on a Lucene search string.It returns a sequence of nodes that represent the objects from the results of the search.

The value can be any valid Lucene search string supported by Alfresco. Note that you may need to escape Lucene special characters. The entire repository is searched; the current node is only used as an access point to retrieve the search object.

For example, execute a Lucene full-text search and list the resulting documents:

 ```


<table>
  <#list companyhome.childrenByLuceneSearch["TEXT:alfresco* AND TEXT:tutorial*"] as child>
    <tr><td><a href="/alfresco${child.url}" target="new">${child.properties.name}</a></td></tr>
  </#list>
</table>

```

|
|`childrenBySavedSearch`|Returns a map capable of executing a search based on a previously Saved Search object.It returns a sequence of child nodes that represent the objects from the results of the search. For example:

```
companyhome.childrenBySavedSearch["workspace://SpacesStore/92005879-996a-11da-bfbc-f7140598adfe"]
```

The value specified must be a NodeRef to an existing Saved Search object.

|
|`childrenByXPath`|Returns a map capable of executing an XPath query to find child nodes, such as:```
companyhome.childrenByXPath["*[@cm:name='Data Dictionary']/*"]
```

The map executes an XPath search against the current nod and returns a sequence of the nodes as results of the query.

|
|`content`|Returns the content for the default content property of the node as a string.|
|`directPermissions`|List of permissions applied to this Node which does not include inherited permissions. Strings returned are of the format `[ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION`, for example, `ALLOWED;kevinr;Consumer`. This format can be tokenized on the ';' character.|
|`displayMimetype`|The human-readable version of the MIME type encoding for the content attached to this node.|
|`displayPath`|The display path to this node; constructed from the `cm:name` property of each parent node in the hierarchy.|
|`downloadUrl`|The URL to the content stream for the default content property for this node as an HTTP1.1 attachment object.|
|`encoding`|The character encoding for content attached to the node from the default content property.|
|`exists`|Returns true if the node still exists.|
|`fullPermissions`|Returns a list of strings representing permissions applied to this Node, including inherited permissions. Strings returned are of the format `[ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION;[INHERITED|DIRECT]`, for example `ALLOWED;kevinr;Consumer`. The strings can be tokenized on the ';' character.|
|`getChildAssocsByType(String type)`|Returns a list of `TemplateNode` objects that represent the children of this node that match the specified object type.|
|`hasAspect(string aspectName)`|A function that returns true if a node has the specified aspect. For example:```
<#if userhome.hasAspect("cm:templatable")>...</#if>
```

|
|`hasChildren`|Returns a boolean, true if the node has children.|
|`hasPermission(permission)`|Returns true if the current user has the specified permission on the node. For example:```
<#if userhome.hasPermission("Write")>...</#if>
```

|
|`icon16`|A string representing the small icon image for this node.|
|`icon32`|A string representing the large icon image for this node.|
|`icon64`|A string representing the extra large icon image for this node.|
|`id`|GUID for the node.|
|`imageResolver`|Returns a `TemplateImageResolver` object which represents the image resolver instance used by this node.|
|`inheritsPermissions`|If the node inherits its parent node permissions, this is true; if the permissions are applied specifically, this is false.|
|`isCategory`|If the node is a category node, this is true; otherwise, it is false.|
|`isContainer`|If the node is a folder node, this is true; otherwise, it is false.|
|`isDocument`|If the node is a content node, this is true; otherwise, it is false.|
|`isLinkToContainer`|Returns true if this node is a link to a container, that is, a folderlink.|
|`isLinkToDocument`|Returns true if this node is a link to a document, that is, a filelink.|
|`isLocked`|If the node is locked, this is true; otherwise, it is false.|
|`isWorkingCopy`|Returns true if the node is a working copy.|
|`isTemplateContent(object)`|Returns true if the given object is a `TemplateContentData` instance; useful to determine if a value returned from a property is of the `d:content` datatype.|
|`isTemplateNodeRef(object)`|Returns true if the given object is a `TemplateNodeRef` instance; useful to determine if a value returned from a property is a `d:noderef` datatype.|
|`mimetype`|The MIME type encoding for content for the default content property attached to this node.|
|`name`|Shortcut access to the name property.|
|`nodeByReference`|Returns a map capable of executing a search for a single node by `NodeRef` reference. This method allows you to find a node if you have the full `NodeRef` string or `NodeRef` object.In another example, find a node from a `hardcodedNodeRef` value:

```
Found: ${companyhome.nodeByReference["workspace://SpacesStore/e661dccb-ecc0-11da-9974-63f65406985a"].id}
```

|
|`nodeRef`|NodeRef string for the node.|
|`parent`|Parent node will only be null if this is the root node.|
|`parentTypeShort`|Parent in short name format. Parent node will only be null if this is the root node.|
|`permissions`|Sequence of the permissions explicitly applied to this node; strings returned are of the format:```
[ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION'
```

For example, `ALLOWED;kevinr;Consumer` can be easily tokenized on the semicolon \(;\) character.

|
|`primaryParentAssoc`|Returns the `ChildAssociationRef` instance for the node.|
|`properties`|A map of the properties for the node, such as `userhome.properties.name`.

Properties may return several different types of objects. This depends entirely on the underlying property type in the repository. If the property is multi-value, the result will be a sequence that can be indexed like any other sequence or array. If the result is an unknown or unsupported type, the `toString()` result is generally used; therefore, the result will mostly be a string type. If the property can potentially contain a 'null' value, take care when accessing it and use the `exists` FreeMarker built-in method to check for null values before accessing.

Date and boolean property values should be handled carefully. The FreeMarker built-in methods `is_date` and `is_boolean` can be used to check if the page developer is unsure of the property value type. These values can then be formatted as appropriate.

For example, iterate over all properties for a node called `document` and render the values as appropriate for the data-types returned:

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

If the type of the property is a `NodeRef` object \(`d:noderef` in the content model\), the template model will automatically convert the property type into another `TemplateNode` object. This means the template developer can continue to dynamically walk the object hierarchy for that node. For example, if a document node has a `NodeRef` property called `locale`, you could execute the following to retrieve the name of the node the property references:

```
${document.properties.locale.properties.name}
```

If a property is of the datatype `d:content`, additional API methods are available on the returned object. Methods are provided to retrieve the `content`, `mimetype`, `displayMimetype`, `encoding`, `size`, and `url` for the content property. For example:

```
${document.properties.content.mimetype}
${document.properties.content.content}

```

As most document nodes are derived from the default Content Model type `cm:content`, shortcut APIs to access properties on the default `cm:content` content property are supplied directly on the `TemplateNode` object.

Helper methods to perform some simple textual operations on the content properties are also provided:

-   **content.getContentMaxLength\(length\)**

Returns content up to a maximum length.

-   **content.getContentAsText\(length\)**

Converts binary content \(such as Word and PDF\) to text, up to a maximum length.


|
|`qnamePath`|QName-based path to the node; useful for building Lucene PATH: style queries that constrain to a path location.|
|`serviceUrl`|Returns a string that represents the service URL.|
|`shareUrl`|This method returns a URL string which resolves to an Alfresco Share view of this node. Note that in order for this method to return meaningful data, the SysAdminParams bean must have been configured. Currently this method only produces valid URLs for documents and not for folders.|
|`siteShortName`|Returns the short name of the site this node is located within. If the node is not located within a site null is returned.|
|`size`|The size, in bytes, of content attached to this node for the default content property.|
|`sourceAssocs`, `sourceAssociations`|A map of the associations to this node.Each entry in the map contains a sequence of the `Node` objects for the given association that reference this node. For example:

```
mynode.sourceAssocs["cm:avatarOf"][0]
```

|
|`storeId`|Returns the store ID for the node.|
|`storeType`|Returns the store type for the node.|
|`type`|Fully qualified QName type of the node.|
|`typeShort`|Prefix string or "short" QName type of the node.|
|`url`|The URL to the content stream for the default content property for this node.|
|`versionHistory`|Returns a list of `VersionHistoryNode` objects, representing the version history for the node.|
|`webdavUrl`|The WebDav URL to the node, based on the `cm:name` based path to the content for the default content property.|
|`xmlNodeModel`|Returns the XML DOM model object for the content of the node.If the node content is valid XML and the XML can be parsed, then this method returns the root of the DOM for this node. The DOM can be walked and processed using the syntax as per the FreeMarker XML Processing Guide.

For example, process the XML document content of the current document, assuming the node content contains the following XML:

 ```

          
<?xml version="1.0" standalone="yes"?>
<book title="Book Title">
  <chapter>
    <title>Chapter 1</title>
    <para>p1.1</para>
    <para>p1.2</para>
    <para>p1.3</para>
  </chapter>
  <chapter>
    <title>Chapter 2</title>
    <para>p2.1</para>
    <para>p2.2</para>
  </chapter>
</book>

<#if document.mimetype = "text/xml">
   <#assign dom=document.xmlNodeModel>
   <h1>${dom.book.@title}</h1>
   <#list dom.book.chapter as c>
      <h2>${c.title}</2>
   </#list>  
</#if>


```

|

**Parent topic:**[Alfresco Repository FreeMarker Template reference](../references/API-FreeMarker-intro.md)

