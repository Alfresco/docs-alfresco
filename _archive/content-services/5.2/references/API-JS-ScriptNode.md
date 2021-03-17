---
author: Alfresco Documentation
---

# ScriptNode API

In JavaScript code various parts of the underlying system can be conveniently exposed as objects of type `ScriptNode`. For example, the `companyhome`, `userhome`, `document`, `space`, and `person` objects are best represented as objects of type `ScriptNode`. The ScriptNode API provides access to properties and methods for manipulating this type of object.

## Additional APIs and properties

In addition to the properties shown in the [table](API-JS-ScriptNode.md#scriptnode-properties-table), the ScriptNode object API also exposes a number of additional properties and APIs which have been grouped by functional purpose in this documentation. These additional APIs include:

-   [Security API](API-JS-Security.md)
-   [Ownership API](API-JS-Ownership.md)
-   [Modifying and creating API](API-JS-ModifyCreate.md)
-   [Checkin/Checkout API](API-JS-CheckInOut.md)
-   [Versions API](API-JS-Versions.md)
-   [Content API](API-JS-Content.md)
-   [ScriptContentData API](API-JS-ScriptContentData.md)
-   [Transformation API](API-JS-Transformation.md)
-   [Thumbnail API](API-JS-Thumbnail.md)
-   [Tagging API](API-JS-ScriptNode-Tagging.md)

## Properties

The following properties are available to use within scripts:

|Property|Read/write|Description|
|--------|----------|-----------|
|`activeWorkflows`|Read-only|Returns an array of all active workflows in which this node is involved. Null is returned if the node is not part of an active workflow.

 The following code snippet obtains a list of workflow objects for the file TEST\_FILE\_0.TXT:

 ```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");
var workflows = node.activeWorkflows;

```

|
|`aspects`|Read-only|A read-only array of the fully qualified QName strings applied to the node|
|`aspectsSet`|Read-only|A list of aspects applied to this node|
|`aspectsShort`|Read-only|An array of aspects as short prefix qnames applied to this node|
|`associations`|Read-only|The same as `assocs`|
|`assocs`|Read-only|A read-only associative array of the target associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association. Example: `mynode.assocs["cm:translations"][0]`

|
|`childAssociations`|Read-only|Same as childAssocs|
|`childAssocs`|Read-only|A read-only associative array of the child associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association. Example: `myforumnode.childAssocs["fm:discussion"][0]`

|
|`children`|Read-only|A read-only JavaScript array of the child node objects Example: `mynode.children[0]`

|
|`content`|Read-write|The content string for this node from the default content property \(`ContentModel.PROP_CONTENT`\).|
|`displayPath`|Read-only|A read-only display path to this node|
|`downloadUrl`|Read-only|For a content document this is a read-only string representing the download \(as attachment\) URL for the content. For a container node this would be an empty string.|
|`hasChildren`|Read-only|True if the node has children|
|`icon16`|Read-only|A read-only small icon image for this node|
|`icon32`|Read-only|A read-only large icon image for this node|
|`id`|Read-only|The GUID for the node|
|`isCategory`|Read-only|Returns true if this node is a category, or false otherwise|
|`isContainer`|Read-only|Returns true if the node is a folder node, or false otherwise|
|`isDocument`|Read-only|Returns true if this node is a document, or false otherwise|
|`isLinkToContainer`|Read-only|Returns true if this node is a link to a container, or false otherwise|
|`isLinkToDocument`|Read-only|Returns true if this node is a link to a document, or false otherwise|
|`isLocked`|Read-only|Returns true if the node is locked, or false otherwise. Once a node is checked out it becomes locked.|
|`mimetype`|Read-write|A read/write value representing the MIME type of the content|
|`name`|Read-write|Shortcut access to the `cm:name` property. Can be read and written to.|
|`nodeRef`|Read-only|The NodeRef corresponding to this node|
|`parent`|Read-only|Primary parent node. This will be null if this is the root node.|
|`parentAssociations`|Read-only|Same as parentAssocs|
|`parentAssocs`|Read-only|A read-only associative array of the parent associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association. Example: `mynode.parentAssocs["cm:contains"][0]`

|
|`parents`|Read-only|Array of the parent nodes|
|`primaryParentAssoc`|Read-only|The primary parent association so it is possible to obtain the association QName and the association type QName|
|`properties`|Read-only|Provides access to all the properties of this node. The properties returned are accessed by using an associative array. Properties of a node can be accessed in the following ways: Example: `node.properties["name"]`

Example: `node.properties.name`

|
|`qnamePath`|Read-only|A read-only QName type path to this node|
|`qNameType`|Read-only|The QName type|
|`siteShortName`|Read-only|Returns the name of the site this node is contained within. If the node is not contained within a site, the value is null|
|`size`|Read-only|A read-only long value that represents the size \(in bytes\) of the content attached to the node from the default content property.|
|`sourceAssociations`|Read-only|The same as `sourceAssocs`|
|`sourceAssocs`|Read-only|A read-only associative array of the source associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association. Example: `mynode.assocs["cm:translations"][0]`

|
|`storeId`|Read-only|The store id for the node|
|`storeType`|Read-only|The store type for the node|
|`type`|Read-only|Fully qualified QName type of the node|
|`typeShort`|Read-only|Returns the type of the node as a short form qname.|
|`url`|Read-only|For a content document, this method returns the URL to the content stream for the default content property. For a container node, this method returns the URL to browse to the folder in the web-client.|
|`webdavUrl`|Read-only|A read-only string representing the webdav URL for the content|

-   **[getPropertyNames](../references/API-JS-getPropertyNames.md)**  
`getPropertyNames(useShortQNames)` returns all the property names defined for this node as an array.
-   **[getTypePropertyNames](../references/API-JS-getTypePropertyNames.md)**  
`getTypePropertyNames` returns all the property names defined for this node's type as an array.
-   **[childByNamePath](../references/API-JS-childbyNamePath.md)**  
`childByNamePath(path)` performs a path-based query based on the name property of the nodes.
-   **[childrenByXPath](../references/API-JS-childrenByXPath.md)**  
`childrenByXPath(xpath)` performs an XPath-based query relative to the current node.
-   **[childFileFolders](../references/API-JS-childFileFolders.md)**  
The `childFileFolders` methods are used to obtain an array of child files and folders for the node.
-   **[isScriptContent](../references/API-JS-isScriptContent.md)**  
`isScriptContent(obj)` determines whether the supplied node property value is a `ScriptContentData` object.
-   **[hasAspect](../references/API-JS-hasAspect.md)**  
`hasAspect(type)` returns true if an aspect was applied to the node.
-   **[getChildAssocsByType](../references/API-JS-getChildAssocsByType.md)**  
`getChildAssocsByType(String type)` returns an array of the associations from the referenced node that match a specific object type.
-   **[isSubType](../references/API-JS-isSubType.md)**  
`isSubType(type)` determines if this node is a subtype of the specified type.
-   **[exists](../references/API-JS-exists.md)**  
`exists()` checks whether the node exists in the repository.
-   **[reset](../references/API-JS-ScriptNode-reset.md)**  
`reset()` resets the node cached state of a node.
-   **[toJSON](../references/API-JS-toJSON.md)**  
`toJSON()` returns the JSON representation of this node.
-   **[Security/Permissions API](../references/API-JS-Security.md)**  
The Security ScriptNode API features several methods and properties related to permissions of nodes in the repository.
-   **[Ownership API](../references/API-JS-Ownership.md)**  
The Ownership ScriptNode API provides methods to get, set and take ownership of a node.
-   **[Modifying and creating API](../references/API-JS-ModifyCreate.md)**  
Most of the available ScriptNode API return read-only values, however the Scripting API also supports writable objects and access to repository services.
-   **[Check in/check out API](../references/API-JS-CheckInOut.md)**  
The check in/check out ScriptNode API features methods for check out, check in, and canceling check out of working copies.
-   **[Versions API](../references/API-JS-Versions.md)**  
The Versions ScriptNode API provides several methods and properties for managing and retrieving the versions of a document.
-   **[Content API](../references/API-JS-Content.md)**  
 The Content API provides several properties to manipulate node content directly. The content can also be manipulated using the ScriptContentData API.
-   **[ScriptContentData API](../references/API-JS-ScriptContentData.md)**  
The ScriptContentData API provides several methods and properties related to node properties of type `d:content`; for example, `document.properties.content`.
-   **[Transformation API](../references/API-JS-Transformation.md)**  
The Transformation API provides document, image, and FreeMarker template processing services in Alfresco.
-   **[Thumbnail API](../references/API-JS-Thumbnail.md)**  
A thumbnail is a transformation of content into a specified destination MIME type. This is most commonly an image of a particular size, but can also be other things, for example, a Flash rendition. The `ScriptNode` class provides several methods for generating and handling thumbnails.
-   **[Tagging API](../references/API-JS-ScriptNode-Tagging.md)**  
A tag is a non-hierarchical keyword or term assigned to a piece of information.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

