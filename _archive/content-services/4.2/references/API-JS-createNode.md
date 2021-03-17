---
author: Alfresco Documentation
---

# `createNode`

`createNode` methods are used to create new nodes.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save\(\)](API-JS-node-save.md) first.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

## `createNode(name,type)`

This method creates a new node of the specified type \(a QName in either full or short form\).

### Parameters

-   **name**

    The node name. Name of the node to create \(can be null for a node without a 'cm:name' property\).

-   **type**

    The node type. QName type \(fully qualified or short form such as 'cm:content'\).


### Returns

Newly created node, or null if failed to create.

### Example

`var node = myforum.createNode("My Discussion", "fm:forum");`

## `createNode(name, type, assocType)`

This method creates a new node of the specified type as a child of the current node with the given child association type.

### Parameters

-   **name**

    The node name. Name of the node to create \(can be null for a node without a 'cm:name' property\).

-   **type**

    The node type. QName type \(fully qualified or short form such as 'cm:content'\).

-   **assocType**

    The QName of the child association type \(fully qualified or short form, for example, 'cm:contains'\)


### Example

`var node = myforum.createNode("My Discussion", "fm:forum", "fm:discussion");`

## `createNode(name, type, properties)`

This method creates a new node as a child of the current node with the specified properties.

### Parameters

-   **name**

    The node name. Name of the node to create \(can be null for a node without a 'cm:name' property\).

-   **type**

    The node type. QName type \(fully qualified or short form such as 'cm:content'\).

-   **properties**

    An associative array of the properties to be added to the node upon creation. This is useful when a type requires the setting of mandatory properties.


### Returns

Newly created node, or null if failed to create.

### Example

```

var node = companyhome.childByNamePath("Sites/test"); 
var forumName = "My Forum";
var properties = new Array();
properties['cm:title'] = "The forum title";
properties['cm:description'] = "The forum description";
var forum = node.createNode(forumName, "fm:forum", properties);   
        
```

## `createNode(name, type, properties, assocType)`

This method creates a new node as a child of the current node. The node contains the specified child association name with the specified properties with that child association type.

### Parameters

-   **name**

    The node name. Name of the node to create \(can be null for a node without a 'cm:name' property\).

-   **type**

    The node type. QName type \(fully qualified or short form such as 'cm:content'\).

-   **properties**

    An associative array of the properties to be added to the node upon creation.

-   **assocType**

    The QName QName of the child association type \(fully qualified or short form, for example, 'cm:contains'\).


```


        
```

## `createNode(name, type, properties, assocType, assocName)`

This method creates a new node as a child of the current node. The node contains the specified child association name with the specified properties, and the given child association type and name.

### Parameters

-   **name**

    The node name. Name of the node to create \(can be null for a node without a 'cm:name' property\).

-   **type**

    The node type. QName type \(fully qualified or short form such as 'cm:content'\).

-   **properties**

    An associative array of the properties to be added to the node upon creation

-   **assocType**

    The QName of the child association type \(fully qualified or short form, for example, 'cm:contains'\).

-   **assocName**

    The QName of the child association name \(fully qualified or short form, for example, 'fm:discussion'\).


```


        
```

