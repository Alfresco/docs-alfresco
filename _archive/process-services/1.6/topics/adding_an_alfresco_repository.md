# Adding a repository

You can add a repository from the Identity Management app.

**To add a repository:**

1.  Start the Process Services server and log in as administrator.
2.  Open the **Profile Management \(Identity Management\)** app, and click **Tenants** tab \> **Alfresco Repositories**.
3.  In **Alfresco Repositories**, create a repository pointing to the Alfresco Content Services server and Share Connector. The following is an example of the form, assuming you are running Alfresco Content Services on the same machine and on port 8080:

    |Field

|Value

|
    |-------|-------|
    |Name

|Acme’s Server

|
    |Alfresco tenant

|Tenant name to use in Alfresco. When left blank, it uses the default tenant \(-default-\).

|
    |Repository base URL

|[http://127.0.0.1:8080/alfresco/](http://127.0.0.1:8080/alfresco/)

|
    |Share base URL

|[http://127.0.0.1:8080/share/](http://127.0.0.1:8080/share/)

|
    |Alfresco Share connector

|\(enabled\)

|
    |Secret

|activiti-share-connector-secret

|


**Note:** Once the repository is created, you can see your new repository in the **Alfresco Repositories** list. If the ID is set to 1, you are good to go and all default values are fine. However, if it is set to something else, for example, `1002`, you must stop the server and make sure your ID appears as `alfresco-1002` in the following files, and then restart your servers:

-   In the Alfresco Content Services tomcat/shared/classes/alfresco-global.properties - Override the default by adding a new line with `activiti.alfrescoRepositoryName=alfresco-1002`

-   In the Process Services tomcat/lib/activiti-app.properties - The property named `integration.login.alfresco-1.secret` should be named `integration.login.alfresco-1002.secret`


In addition, to make this repository work for features such as **Publish to Alfresco** or browse Alfresco for documents from Process Services, verify that a user has a user account for the repository.

**Parent topic:**[Alfresco Content Services settings](../topics/content_services_settings.md)

