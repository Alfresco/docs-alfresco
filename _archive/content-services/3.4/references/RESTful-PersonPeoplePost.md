---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Add Person

Adds a new person based on the details provided.

`POST /alfresco/service/api/people`



-   **userName**

    mandatory - the user name for the new user

-   **firstName**

    mandatory - the given Name

-   **lastName**

    mandatory - the family name

-   **email**

    mandatory - the email address

-   **password**

    optional - the new user's password. If not specified then a value of "password" is used which should be changed as soon as possible.

-   **disableAccount**

    optional - If present and set to "true" the user is created but their account will be disabled.

-   **quota**

    optional - Sets the quota size for the new user, in bytes.

-   **groups**

    optional - Array of group names to assign the new user to.

-   **title**

    optional - the title for the new user.

-   **organisation**

    optional - the organisation the new user belongs to.

-   **jobtitle**

    optional - the job title of the new user.


The web script description document specifies the following options:

|`json`|The default response format|
|`admin`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Person](../references/RESTful-Person.md)

