---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [JavaScript, API/Script]
keyword: [JavaScript API, ScriptNode API]
---

# ScriptNode Object API

In JavaScript code various parts of the underlying system can be conveniently exposed as objects of type `ScriptNode`. For example, the `companyhome`, `userhome`, `document`, `space`, and `person` objects are best represented as objects of type `ScriptNode`. The ScriptNode API provides access to properties and methods for manipulating this type of object.

## Properties

The following properties are available to use within scripts:

-   **`id`**

    The GUID for the node

-   **`storeType`**

    The store type for the node

-   **`storeId`**

    The store id for the node

-   **`nodeRef`**

    The NodeRef corresponding to this node

-   **`qNameType`**

    The QName type

-   **`type`**

    Fully qualified QName type of the node

-   **`typeShort`**

    Prefix string, or “short” QName type of the node

-   **`name`**

    Shortcut access to the `cm:name` property. Can be read and written to.

-   **`children`**

    A read-only JavaScript array of the child node objects

    Example: `mynode.children[0]`

-   **`hasChildren`**

    True if the node has children

-   **`assocs`**

    A read-only associative array of the target associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association.

    Example: `mynode.assocs["cm:translations"][0]`

-   **`associations`**

    The same as `assocs`

-   **`sourceAssocs`**

    A read-only associative array of the source associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association.

    Example: `mynode.assocs["cm:translations"][0]`

-   **`sourceAssociations`**

    The same as `sourceAssocs`

-   **`childAssocs`**

    A read-only associative array of the child associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association.

    Example: `myforumnode.childAssocs["fm:discussion"][0]`

-   **`childAssociations`**

    Same as childAssocs

-   **`parentAssocs`**

    A read-only associative array of the parent associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association.

    Example: `mynode.parentAssocs["cm:contains"][0]`

-   **`parentAssociations`**

    Same as parentAssocs

-   **`properties`**

    Provides access to all the properties of this node. The properties returned are accessed via an associative array. Properties of a node can be accessed in the following ways:

    Example: `node.properties["name"]`

    Example: `node.properties.name`

-   **`isContainer`**

    Returns true if the node is a folder node, or false otherwise

-   **`isDocument`**

    Returns true if this node is a link to a container, or false otherwise

-   **`isLinkToContainer`**

    Returns true if this node is a link to a container, or false otherwise

-   **`isLinkToDocument`**

    Returns true if this node is a link to a document, or false otherwise

-   **`isCategory`**

    Returns true if this node is a category, or false otherwise

-   **`aspectsSet`**

    A list of aspects applied to this node

-   **`aspects`**

    A read-only array of the fully qualified QName strings applied to the node

-   **`qnamePath`**

    A read-only QName type path to this node

-   **`displayPath`**

    A read-only display path to this node

-   **`icon16`**

    A read-only small icon image for this node

-   **`icon32`**

    A read-only large icon image for this node

-   **`isLocked`**

    Returns true if the node is locked, or false otherwise

-   **`parent`**

    Primary parent node. This will be null if this is the root node.

-   **`parents`**

    Array of the parent nodes

-   **`getPrimaryParentAssoc`**

    The primary prarent association so it is possible to obtain the association QName and the association type QName

-   **`siteShortName`**

    Returns the name of the site this node is contained within. If the node is not contained within a site, the value is null


## Additional APIs and properties

The ScriptNode object API also exposes a number of additional APIs which have been grouped by functional purpose in this documentation. These additional APIs include:

-   Security API
-   Ownership API
-   Modifying and creating API
-   Checkin/Checkout API
-   Versions API
-   Content API
-   ScriptContentData API
-   Transformation API
-   Thumbnail API
-   Tagging API

These APIs are documented in sub-sections of this topic.

-   **[childByNamePath](../references/API-JS-childbyNamePath.md)**  
`childByNamePath(path)`
-   **[childrenByXPath](../references/API-JS-childrenByXPath.md)**  
childrenByXPath\(xpath\)
-   **[childFileFolders](../references/API-JS-childFileFolders.md)**  
`childFileFolders` methods are used to obtain an array of child files and folders for the node.
-   **[getActiveWorkflows](../references/API-JS-getActiveWorkflows.md)**  
`getActiveWorkflows()`
-   **[isScriptContent](../references/API-JS-isScriptContent.md)**  
`isScriptContent(obj)`
-   **[hasAspect](../references/API-JS-hasAspect.md)**  
`hasAspect(type)`
-   **[isSubType](../references/API-JS-isSubType.md)**  
`isSubType(type)`
-   **[Security API](../references/API-JS-Security.md)**  
The Security ScriptNode API features several methods and properties related to permissions of nodes in the repository.
-   **[Ownership API](../references/API-JS-Ownership.md)**  
The Ownership ScriptNode API provides methods to get, set and take ownership of a node.
-   **[Modifying and creating API](../references/API-JS-ModifyCreate.md)**  
Most of the available ScriptNode API return read-only values, however, the Scripting API also supports writable objects and access to Alfresco repository services.
-   **[Check In/Check Out API](../references/API-JS-CheckInOut.md)**  
The Check in/Check out ScriptNode API features methods for check out, check in, and cancelling check out of working copies.
-   **[Versions API](../references/API-JS-Versions.md)**  
The Versions ScriptNode API provides several methods and properties for managing and retrieving the versions of a document.
-   **[Content API](../references/API-JS-Content.md)**  
 The Content API provides several properties to manipulate node content directly. The content can also be manipulated using the ScriptContentData API.
-   **[ScriptContentData API](../references/API-JS-ScriptContentData.md)**  
The ScriptContentData API provides several methods and properties related to node properties of type `d:content` \(for example, `document.properties.content`\).
-   **[Transformation API](../references/API-JS-Transformation.md)**  
The Transformation API provides document, image, and FreeMarker template processing services in Alfresco.
-   **[Thumbnail API](../references/API-JS-Thumbnail.md)**  
A thumbnail is a transformation of content into a specified destination MIME type. This is most commonly an image of a particular size, but can also be other things, for example, a Flash rendition. The `ScriptNode` class provides several methods for generating and handling thumbnails.
-   **[Tagging API](../references/API-JS-ScriptNode-Tagging.md)**  
A tag is a non-hierarchical keyword or term assigned to a piece of information.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

