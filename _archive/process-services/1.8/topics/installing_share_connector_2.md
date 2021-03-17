# Installing Share Connector

Follow these steps to install the Share Connector:

1.  Install Alfresco Process Services using the installer.
2.  Verify the database configuration. By default, the demo H2 database is used, therefore you might want to configure Process Services to use the same database as your Alfresco Content Services installation.
    -   Typically, you should create a new database schema for Process Services to use, and then configure it as described in [Database configuration](databaseConfiguration.md#).

3.  Make sure your Process Services app has a license installed. You can add a license file manually to the Tomcat/lib directory, or load it through the user interface.

    To load a license file from the UI, see [Uploading a license from the Landing Page](uploading_a_license_from_the_user_interface_ui.md#) Make sure you sign out from Process Services and stop the server.

4.  To use the same demo LDAP server, copy the following file from activiti-share-connector.zip into its corresponding folder in the Process Services installation directory:

    ```
    <zip>/activiti/tomcat/lib/activiti-ldap.properties_ to _<activiti-dir>/tomcat/lib
    ```

5.  Uncomment or add the following lines at the bottom of the tomcat/lib/activiti-app.properties file inside the installation folder.

    ```
    # Enable the Alfresco Share Connector app
    app.review-workflows.enabled=true
    ```


**Parent topic:**[Setting up the Share Connector Demo](../topics/demo_setup.md)

