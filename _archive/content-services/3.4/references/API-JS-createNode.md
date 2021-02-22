---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, createNode]
---

# `createNode`

The `createNode` methods are used to create new nodes.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

## `createNode(name,type)`

This method creates a new node of the specified type \(a QName in either full or short form\).

### Parameters

-   **name**

    The node name


-   **type**

    The node type


-   **assocType**

    The QName of the child association type to create


### Example

`var node = myforum.createNode("My Discussion", "fm:forum", fm:discussion");`

## `createNode(name,type, assocType)`

This method creates a new node of the specified type as a child of the current node with the given child association type.

### Parameters

-   **name**

    The node name


-   **type**

    The node type


-   **assocType**

    The QName of the child association type to create


### Example

`var node = myforum.createNode("My Discussion", "fm:forum", fm:discussion");`

## `createNode(name, type, properties)`

This method creates a new node as a child of the current node with the specified properties.

### Parameters

-   **name**

    The node name


-   **type**

    The node type


-   **properties**

    An associative array of the properties to be added to the node upon creation. This is useful when a type requires the setting of mandatory properties.


## `createNode(name, type, properties, assocType)`

This method creates a new node as a child of the current node. The node contains the specified child association name with the specified properties with that child association type.

### Parameters

-   **name**

    The node name


-   **type**

    The node type


-   **properties**

    An associative array of the properties to be added to the node upon creation


-   **assocType**

    The QName of the child association type to create


## ``c`reateNode(nam`e, type, properties, assocType, assocName)``

This method creates a new node as a child of the current node. The node contains the specified child association name with the specified properties, and the given child association type and name.

### Parameters

-   **name**

    The node name


-   **type**

    The node type


-   **properties**

    An associative array of the properties to be added to the node upon creation

-   **assocType**

    The QName of the child association type to create


-   **assocName**

    The QName of the child association type to create


