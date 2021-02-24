---
author: [Alfresco Documentation, Alfresco Documentation]
---

# AuthorityService

The service that encapsulates authorities granted to users. This service will refuse to create any user authorities. These should be managed using the AuthenticationService and PersonService. Methods that try to change alter users will throw an exception. A string key is used to identify the authority. These follow the contract defined in AuthorityType. If there are entities linked to these authorities this key should be used to find them, as userName is used to link user and person.

|Information|AuthorityService|
|-----------|----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Authority is a general term to describe a group, user, or role. The AuthorityService provides an API to: -   Add and delete authorities.
-   Get authorities.
-   Retrieve authority details such as short name.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/AuthorityService.html)|
|Java example|```


    /**
     * Search the root groups, those without a parent group.
     * 
     * @param paging Paging object with max number to return, and items to skip
     * @param sortBy What to sort on (authorityName, shortName or displayName)
     * @return The root groups (empty if there are no root groups)
     */
    public ScriptGroup[] searchRootGroupsInZone(String displayNamePattern, String zone, ScriptPagingDetails paging, String sortBy)
    {
        Set<String> authorities;
        try 
        {
            authorities = authorityService.findAuthorities(AuthorityType.GROUP,
                    null, true, displayNamePattern, zone);
        }
        catch (UnknownAuthorityException e)
        {
            authorities = Collections.emptySet();
        }
        return makeScriptGroups(authorities, paging, sortBy, serviceRegistry, this.getScope());
    }
                 
               
```

|
|More Information|-   [Authentication service documentation](../concepts/implserv-authentication.md)
-   [AuthorityService JavaScript API documentation](API-JS-AuthorityService.md)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

