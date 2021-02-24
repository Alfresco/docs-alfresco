---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library]
---

# jsNode reference

`jsNode` is the preferred object to access node properties and aspects by using JavaScript on the browser.

When dealing with DataTable records, `record.jsNode` should be available.

**Note:** It is the responsibility of any code that updates DataTable records to also ensure the `jsNode` property is updated \(usually within the AJAX success callback\).

To create a `jsNode` instance, use:

```
jsNode = new Alfresco.util.Node(p_node)
```

where `p_node` can either be a JavaScript object or JSON string. In either case, it should be in the format returned by the doclist-v2 data web scripts.

## Methods

The jsNode methods are:

|
|`getNode`|Returns original node object. If a JSON string was passed in, this method returns a JavaScript object|
|`toJSON`|Return the JSON string serialization of the node|
|`setNodeRef`|Sets a new nodeRef - doesn't requery node properties however. Used solely when generating new page urls|
|`hasAspect`|Returns true if this node has the given aspect|
|`hasTag`|Returns true if this node has the given tag applied|

Also new to v4.0 is the **slingshot-documentlibrary-context.xml** file containing all bean definitions for web tier evaluators.

## Properties

The `jsNode` properties are:

|**Core node properties**|
|`nodeRef`|NodeRef|
|`type`|The node’s type in short QName format|
|`isContainer`|Returns true if the node is a container type|
|`isLink`|Returns true if the node is a file or folderlink type|
|`isLocked`|Returns true if the node has been locked by any user|
|`linkedNode`|If this node is a link, returns a jsNode instance of the linked node|
|**Content nodes**|
|`contentURL`|Of the format /api/node/content/\{nodeRef\}/\{filename\}|
|`mimetype`|Content mimetype|
|`size`|Content size in bytes|
|**Properties**|
|`properties`|All properties are available either by using:```
properties[“my:property”]
```

or

```
properties.my_property
```

Note that `cm:` properties are available without the prefix, i.e. "`properties.description`", "`properties.title`"

|
|**Aspects**|
|`aspects`|Array of aspects present on this node. See also `hasAspect()`|
|**Permissions**|
|`permissions`|The permissions the current user has on this node. The list of permissions is defined in the `applicationScriptUtils` bean configuration.|
|**Tags**|
|`tags`|Array of tags. See also `hasTag()`|
|**Categories**|
|`categories`|Returns an array of the format \[`categoryName`, `category path`\]|

**Parent topic:**[Reference](../concepts/doclib-reference.md)

