# REST API Authorization

The REST API uses authorization rules to determine a user’s access control for a process instance or task.

You can use any of the following methods for REST API user authentication:

-   Basic authentication
-   [OAuth 2 SSO](../concepts/OAuth-overview.md)
-   Impersonation

If you are using basic authentication, you must set all requests with the *Authorization* header.

If you are using OAuth 2 to authenticate users for SSO, see [OAuth 2 SSO](../concepts/OAuth-overview.md) for more information.

If you choose to use Impersonation, you can impersonate a user with an Admin account to authenticate and set a different user for authorization. To enable this, add the *activiti-user* and *activiti-user-value-type* request headers to the REST API. Where, *activiti-user* should be set to the required user account identifier and *activiti-user-value-type* to the user account identifier type. The header *activiti-user-value-type* can be one of the following values:

-   *userIdType*: User’s database ID

-   *userEmailType*: User’s Email address

-   *userExternalIdType*: User’s ID in an external authentication service such as LDAP or Active Directory


For example, in the *external-form-example* Web application, an Admin account is used for authentication and a different user account to implement authorization.

**Note:** You must have an Admin role to be able to add the above request headers. In addition, the users should have already been added to Alfresco Process Services manually, or by synchronization with LDAP or Active Directory.

-   **[OAuth 2 SSO overview](../concepts/OAuth-overview.md)**  
The OAuth 2.0 authorization framework enables an application to access protected resources on behalf of a user without storing a password.

**Parent topic:**[REST API](../topics/rest_api.md)

