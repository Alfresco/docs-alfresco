# Installing Alfresco Content Services

1.  Install Alfresco Content Services using the installer in Advanced mode. For Tomcat Port configuration, make sure you bump up each port by 10, for example, 8080 to 8090 and so on.
2.  After the installation is complete, start Alfresco Content Services using the Application Manager app located in the home folder.
3.  Verify if Alfresco Content Services works on [http://127.0.0.1:8090/share/](http://127.0.0.1:8090/share/), log out, and stop just the *Tomcat Server* in the Application Manager app.
4.  Copy the following files from the activiti-share-connector.zip to their corresponding folders inside the Alfresco Content Services installation directory:
    -   <zip\>/alfresco/amps/activiti.alfresco.repo-X.X.X.amp to <alfresco-dir\>/amps

    -   <zip\>/alfresco/amps\_share/activiti.alfresco.share-X.X.X.amp to <alfresco-dir\>/amps\_share

    -   <zip\>/alfresco/tomcat/webapps-ldap \(copy the folder\) to <alfresco-dir\>/tomcat

        The webapps-ldap folder is maintained separately to ensure that it boots up before Alfresco Content Services and becomes available when it tries syncing its database against the LDAP server.

5.  To configure the webapps-ldap folder to get picked up and run before *webapps* by Tomcat, copy the xml snippet in <zip\>/alfresco/tomcat/conf/server-ldap-snippet.xml into your <alfresco-dir\>/tomcat/conf/server.xml and make sure it’s placed above the existing `<Service>` element.
6.  Open the alfresco-global-properties file and add the following configuration setting:

    ```
    authentication.chain=ldap1:ldap
    ```

7.  Copy the folder alfresco/extension/subsystems/Authentication/ldap/ldap1/ldap-authentication.properties from the activiti-share-connector.zip to tomcat/webapps/alfresco/WEB-INF/classes/alfresco/extension/subsystems/Authentication/ldap/ldap1/ldap-authentication.properties
8.  Install the amps into Alfresco Content Services by running the following command on a terminal from your installation directory, and then follow the instructions:

    ```
    bin/apply_amps.sh
    ```

    **Note:** With the standard installs you are likely to have `OutOfMemoryExceptions` due to Perm Gen space issues if you run Java 1.6 or 1.7. To prevent this, edit tomcat/bin/setenv.sh or equivalent and make sure to set XX:MaxPermSize to 512M as follows:

    ```
    JAVA_OPTS="-XX:MaxPermSize=512M -Xms512M -Xmx8192M $JAVA_OPTS"
    ```


**Parent topic:**[Setting up the Share Connector Demo](../topics/demo_setup.md)

