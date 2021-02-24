# Communication between Process Services and Alfresco Content Services

Process Services uses the CMIS REST bindings available in Alfresco Content Services and the *OpenCMIS* client library to communicate.

When connecting to Alfresco Content Services, it uses the `org.apache.chemistry.opencmis.client.runtime.SessionFactory.createSession(Map<String, String> parameters)` method.

Use the following parameters for user credentials:

```
parameters.put(SessionParameter.USER, username);
parameters.put(SessionParameter.PASSWORD, password);
```

If a user account for the repository is already defined inside the Process Services Identity Management app, then the user name and password of that user account will be used.

However, if there is no user account defined and the repository configuration in the Identity Management app is configured to use the Share Connector, then Process Services will pass a secret key with the user name to Alfresco Content Services to create a ticket. The username is defined in the *EXTERNAL\_ID* column of the *USERS* database table.

The secret key can be retrieved by calling a REST service \(web script\) in Alfresco Content Services, which was deployed when installing the Share Connector module in the repository, using the following HTTP call:

```
POST http://alfrescoserver.com/alfresco/service/activiti/sso/alfresco-ticket
{
    "secret": "activiti-share-connector-secret",
    "username": "kermit"
}
```

​…which will return 200 with the following response body…

```
{
    "ticket": "abc123"
}
```

When Process Services receives this ticket, it will use the string `"ROLE_STRING"` \(instead of using a "real" username\) as the user parameter and the ticket as the password parameter:

```
parameters.put(SessionParameter.USER, "ROLE_TICKET");
parameters.put(SessionParameter.PASSWORD, ticket);
```

In addition, Process Services uses the Public API \(for example, when listing sites for a user\) and regular HTTP calls with `basic auth`. For an existing user account, the user name and password are specified in the same way. However, if the Share Connector is configured for the repository, use the constant `ROLE_TICKET` as the user name and the ticket received from Alfresco Content Services as password with basic authentication.

**Parent topic:**[Integrating Process Services with Alfresco Content Services](../topics/integrating_process_content_services.md)

