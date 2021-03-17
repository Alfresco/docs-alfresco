---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: createPerson
---

# `createPerson`

The `createPerson` methods create a person \(`cm:person`\).

**Parent topic:**[People API](../references/API-JS-People.md)

## `createPerson(username)`

`createPerson(username)`

This method creates a person \(`cm:person`\) with the given user name.

### Parameters

-   **userName**

### Returns

Returns the `person` node created or null if the user name already exists.

## `createPerson(firstName, lastName, emailAddress, createUserAccount, setAccountEnabled)`

`createPerson(firstName, lastName, emailAddress, createUserAccount, setAccountEnabled)`

This method creates a person \(`cm:person`\) with a generated user name.

### Parameters

-   **firstName**

-   **lastName**

-   **emailAddress**

-   **createUserAccount**

-   **setAccountEnabled**

### Returns

Returns the `person` node created or null if the user cannot be created.

