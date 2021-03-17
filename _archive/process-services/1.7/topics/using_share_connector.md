# Use the Share Connector

This section describes how to get started with using the Share Connector.

**Note:** Make sure that LDAP is running before you start Alfresco Content Services and Alfresco Process Services so they can sync their user databases against the LDAP server.

1.  View Alfresco Share on [http://127.0.0.1:8090/share/](http://127.0.0.1:8090/share/) and Process Services on [http://127.0.0.1:8080/activiti-app/](http://127.0.0.1:8080/activiti-app/)
2.  Login as a user that exist in the demo LDAP system:

    |Username

|Password

|Alfresco Process Services role

|Alfresco Content Services role

|
    |----------|----------|--------------------------------|--------------------------------|
    |jluc

|password

|tenant manager

|user

|
    |kirk

|password

|tenant admin

|user

|
    |wesley

|password

|user

|user

|
    |admin

|password

|admin

|admin

|

    **Note:** The password for the admin user is *password* instead of the credentials used for installing Alfresco Content Services. This is because the password set in the demo LDAP server is applicable for users.

3.  On the Alfresco Content Services personal dashboard page, click **Tools** and add the *My Activiti Tasks* dashlet.

When logging into Process Services as an *admin*, you can view the process definitions and *Review Processes* app inside the App Designer application by selecting the *Shared with Me* filter.

**Parent topic:**[Setting up the Share Connector Demo](../topics/demo_setup.md)

