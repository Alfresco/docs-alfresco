# AuthenticationService

This service provides an API to allow authentication of users using various methods, such as username and password and authentication tickets.

|Information|AuthenticationService|
|-----------|---------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Authentication is required at various access points into the Repository. For example web scripts, CMIS, CIFS, FTP, WebDAV, and web clients represent access points where authentication needs to take place. Authentication can be via Alfresco ticket, a username and password pair, or some other mechanism. The authentication service provides an API to:

 -   Authenticate using a user name and password
-   Authenticate using a ticket
-   Create, update and delete authentication information
-   Clear the current authentication
-   Invalidate a ticket
-   Get the username for who is currently authenticated
-   Get a ticket for subsequent re-authentication
-   Determine if the current user is "the system user"

 Not all implementations will support creating, updating and deleting authentication information.

 The authenticated username is used as the key to obtain other security information such as group membership, the details about the person, to record a user as the owner of an object. It is one of the identifiers against which permissions may be assigned.

 The authentication service does not provide any details about a user other than authentication.

 The authentication service stores authentication information on the calling thread. Application developers should ensure that this information is cleared.

 The authentication service brings together three components:

 -   The authentication component
-   The authentication DAO
-   The ticket component

 The authentication component supports authentication only. The authentication DAO provides an API to create, delete and update authentication information. The ticket component is resposible for managing and storing tickets that may be obtained after authentication and used in place of authentication.

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/security/AuthenticationService.html)|
|Java example|```

                  

// Get service registry
ServiceRegistry serviceRegistry = (ServiceRegistry) beanFactory.getBean(ServiceRegistry.SERVICE_REGISTRY);

// Get services
AuthenticationService authService = (AuthenticationService)serviceRegistry.getAuthenticationService();
PersonService personService = (PersonService)serviceRegistry.getPersonService();

// Get current user
NodeRef person = personService.getPerson(authService.getCurrentUserName());


               
```

|
|More Information|-   [Authentication Documentation](../concepts/implserv-authentication.md)
-   [AuthorityService JavaScript API documentation](API-JS-AuthorityService.md)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

