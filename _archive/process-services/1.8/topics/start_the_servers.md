# Start the servers for Share Connector

1.  From the Application Manager, restart Alfresco Content Services to restart the Tomcat server. To ensure that the Alfresco Content Services server has fully started, check the application log and wait for the `INFO: Server startup in XXXX ms` message.
2.  After the Alfresco Content Services server and the demo LDAP server have started, run Process Services as instructed by the installer and navigate to the **Identity Management** app [http://127.0.0.1:8080/activiti-app/idm/](http://127.0.0.1:8080/activiti-app/idm/).
3.  Log in with admin/password defined in the demo LDAP.
4.  Go to the **Tenants** page \> **Alfresco Repositories** tab, and add a repository pointing to your Alfresco Content Services server:

|Field

|Value

|
|-------|-------|
|Name

|My server name

|
|Alfresco tenant

|Tenant name to use in Alfresco Content Services. When left blank, it uses the default tenant \(-default-\).

|
|Repository base url

|[http://127.0.0.1:8090/alfresco/](http://127.0.0.1:8090/alfresco/)

|
|Share base url

|[http://127.0.0.1:8090/share/](http://127.0.0.1:8090/share/)

|
|Alfresco Share connector

|\(enabled\)

|
|Secret

|activiti-share-connector-secret

|

**Notes**:

-   The default secret is the text `activiti-share-connector-secret`, which can be changed to a different value in the Alfresco Content Services alfresco-global.properties by the property `activiti.secret`.

-   After the repository is created, you can see your new repository in the **Alfresco Repositories** list. If the ID is set to 1, then all default values are fine. However, if it is set to something else, for example, `1002`, you must stop your servers and make sure your ID appears as `alfresco-1002` in the following files and then restart your servers:

-   In the alfresco-global.properties file, override the default setting by adding a new line, substituting the ID as appropriate:

    ```
    activiti.alfrescoRepositoryName=alfresco-1002
    ```


**Parent topic:**[Setting up the Share Connector Demo](../topics/demo_setup.md)

