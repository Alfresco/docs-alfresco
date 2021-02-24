---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Authentication service

This topic describes the features of authentication service and how to configure it.

The authentication service provides an API for:

-   Authenticating using a user name and password
-   Authenticating using a ticket
-   Creating, updating and deleting authentication information
-   Clearing the current authentication
-   Invalidating a ticket
-   Getting the user name for currently authenticated users
-   Getting a ticket for subsequent re-authentication

The authenticated user name is used as the key to obtain other security information, such as group membership, the details about the person or to record a user as the owner of an object. It is one of the identifiers against which permissions may be assigned.

The authentication service does not provide any details about a user other than authentication. It stores authentication information on the calling thread. Application developers should ensure that this information is cleared.

The authentication service brings together three components:

-   authentication component, which supports authentication;
-   authentication DAO, which provides an API to create, delete and update authentication information; and
-   ticket component, which manages and stores tickets that may be obtained after authentication and used in place of authentication.

The implementation and configuration for this service can be found in the authentication-services-context.xml file. This default implementation coordinates two service providers for `AuthenticationComponent` and `MutableAuthenticationDAO`. It also uses the permission service provider interface to clear up permissions as users are deleted. Tickets are supported using the ticket component.

**Parent topic:**[Implementation and services](../concepts/secur-implserv.md)

