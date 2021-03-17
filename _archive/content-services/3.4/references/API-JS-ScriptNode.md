---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [JavaScript, API/Script]
keyword: [JavaScript API, ScriptNode API]
---

# ScriptNode API

The `companyhome`, `userhome`, `document`, `space`, and `person` objects represent Alfresco node objects and provide access to common Alfresco concepts such as properties, aspects, and associations.

-   **[childByNamePath](../references/API-JS-childbyNamePath.md)**  
`childByNamePath(path)`
-   **[childrenByXPath](../references/API-JS-childbyXPath.md)**  
childrenByXPath\(xpath\)
-   **[activeWorkflows](../references/API-JS-activeWorkflows.md)**  
`activeWorkflows()`
-   **[isScriptContent](../references/API-JS-isScriptContent.md)**  
`isScriptContent(obj)`
-   **[hasAspect](../references/API-JS-hasAspect.md)**  
`hasAspect(type)`
-   **[specializeType](../references/API-JS-specializeType.md)**  
`specializeType(type)`
-   **[isSubType](../references/API-JS-isSubType.md)**  
`isSubType(type)`

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

## Properties

The following properties are available to use within scripts:

-   **`properties`**

    properties


-   **`children`**

    A read-only JavaScript array of the child nodes

    Example: `mynode.children[0]`


-   **`assocs`**

    A read-only associative array of the target associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association.

    Example: `mynode.assocs["cm:translations"][0]`


-   **`sourceAssocs`**

    A read-only associative array of the source associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association.

    Example: `mynode.assocs["cm:translations"][0]`


-   **`childAssocs`**

    A read-only associative array of the child associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association.

    Example: `myforumnode.childAssocs["fm:discussion"][0]`


-   **`parentAssocs`**

    A read-only associative array of the parent associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association.

    Example: `mynode.parentAssocs["cm:contains"][0]`


-   **`aspects`**

    A read-only array of the fully qualified QName strings applied to the node


-   **`isContainer`**

    Returns true if the node is a folder node, or false otherwise


-   **`isDocument`**

    Returns true if the node is a content node, or false otherwise


-   **`content`**

    Content of the node on the default `cm:content` property as a string value \(can be modified to update the content of the node\)


-   **`url`**

    A read-only URL to the content stream for this node


-   **`downloadUrl`**

    A read-only URL to the content stream for this node


-   **`mimetype`**

    MIME type encoding for content on the default


-   **`size`**

    A read-only size in bytes of content on the default `cm:content` property attached to this node


-   **`displayPath`**

    A read-only display path to this node


-   **`qnamePath`**

    A read-only QName type path to this node


-   **`icon16`**

    A read-only small icon image for this node


-   **`icon32`**

    A read-only large icon image for this node


-   **`isLocked`**

    Returns true if the node is locked, or false otherwise


-   **`id`**

    The authentication process


-   **`nodeRef`**

    nodeRef as a string for the node


-   **`name`**

    Shortcut access to the `cm:name` property


-   **`type`**

    Fully qualified QName type of the node


-   **`typeShort`**

    Prefix string, or ‘short’ QName type of the node


-   **`parent`**

    Primary parent node. This will be null if this is the root node.


-   **`parents`**

    Array of the parent nodes


-   **`isCategory`**

    Returns true if this is a category node, or false otherwise


