---
author: Alfresco Documentation
---

# `createPerson`

`createPerson` creates a person \(`cm:person`\) object.

**Parent topic:**[People API](../references/API-JS-People.md)

## `createPerson(username)`

`createPerson(username)` creates a person \(`cm:person`\) with the given user name.

### Parameters

-   **userName**

    A string representing the username for the user to be created.


### Returns

Returns the `person` node created or null if the user name already exists.

## `createPerson(userName, firstName, lastName, emailAddress)`

`createPerson(userName, firstName, lastName, emailAddress)` creates a person \(`cm:person`\) with a generated user name.

### Parameters

-   **userName**

    A string representing the username for the user to be created.

-   **firstName**

    A string representing the user's first name.

-   **lastName**

    A string representing the user's last name.

-   **emailAddress**

    A string representing the user's email address.


### Returns

Returns the `person` node created or null if the user cannot be created.

## `createPerson(username, firstName, lastName, emailAddress, password, setAccountEnabled)`

`createPerson(username, firstName, lastName, emailAddress, password, setAccountEnabled)` creates a person \(`cm:person`\) with a generated user name.

### Parameters

-   **userName**

    A string representing the username for the user to be created.

-   **firstName**

    A string representing the user's first name.

-   **lastName**

    A string representing the user's last name.

-   **emailAddress**

    A string representing the user's email address.

-   **setAccountEnabled**

    A boolean. Set to true to create an enabled user account. Set to false to create a disabled user account.


### Returns

Returns the `person` node created or null if the user cannot be created.

## `createPerson(username, firstName, lastName, emailAddress, password, setAccountEnabled, notifyByEmail)`

`createPerson(username, firstName, lastName, emailAddress, password, setAccountEnabled, notifyByEmail)` creates a person \(`cm:person`\) with a generated user name.

### Parameters

-   **userName**

    A string representing the username for the user to be created.

-   **firstName**

    A string representing the user's first name.

-   **lastName**

    A string representing the user's last name.

-   **emailAddress**

    A string representing the user's email address.

-   **setAccountEnabled**

    A boolean. Set to true to create an enabled user account. Set to false to create a disabled user account.

-   **notifyByEmail**

    A boolean. Set to true to have an automated email sent to the user's account when the account is created. This only works if the username and password are provided. If set to false no email will be sent.


### Returns

Returns the `person` node created or null if the user cannot be created.

### Example

```

    var testUser = people.createPerson("joe.user", "Joe", "User", "joe.user@alfresco.com", "password", true, true);
    if (testUser){
        // user account created
    }          
        
```

