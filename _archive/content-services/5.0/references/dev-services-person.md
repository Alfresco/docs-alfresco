# PersonService

This service encapsulates the management of people and groups. People and groups may be managed entirely in the repository or entirely in some other implementation such as LDAP or via NTLM. Some properties may be in the repository and some in another store. Individual properties may or may not be mutable.

|Information|PersonService|
|-----------|-------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The Person service supports various methods relating to users. The methods relating to the Person service include the ability to:

 -   Look up people from user names
-   Create user information
-   Delete user information
-   Modify user information

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/security/PersonService.html)|
|Java example|```

                  
// Create user with authentication
if (authenticationService.authenticationExists(userName) == false)
{
   authenticationService.createAuthentication(userName, password.toCharArray());

   Map user = new Map();
   user.put(ContentModel.PROP_USERNAME, userName);
   user.put(ContentModel.PROP_FIRSTNAME, "firstName");
   user.put(ContentModel.PROP_LASTNAME, "lastName");
   user.put(ContentModel.PROP_EMAIL, userName+"@example.com");
   user.put(ContentModel.PROP_JOBTITLE, "jobTitle");

   NodeRef person = personService.createPerson(user);

   // ...
}  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

