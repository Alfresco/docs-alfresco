---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Documentation
---

# Configuring Solr with Alfresco running on WebSphere

These steps describe how to allow Solr to communicate with Alfresco deployed on WebSphere 7.0.

Solr must be deployed on a separate Tomcat instance.

-   Configure Solr using the following instructions: [Configuring Solr](solr-install-config.md).

Ensure that Alfresco is installed on WebSphere using the instructions described in the section [Installing Alfresco on WebSphere](alf-websphere-install.md) .

1.  Copy the sunjce\_provider.jar file within the Oracle JDK directory to the $WAS\_INSTALL\_ROOT/java/jre/lib/ext folder.

2.  Edit $WAS\_INSTALL\_ROOT/lib/alfresco-global.properties by adding following properties to it:

    ```
    dir.keystore=<WAS_INSTALL_ROOT>/keystore
    index.subsystem.name=solr
    solr.host=<host_of_tomcat_instance_where_solr_is_running>
    solr.port=8080
    solr.port.ssl=8443  
    ```

3.  Create a folder called $WAS\_INSTALL\_ROOT/keystore and then copy all of the files from <alfresco.war\>/WEB-INF/classes/alfresco/keystore to the new folder.

4.  In the Administration Console, go to**Security – SSL certificate and key management – Key stores and certificates**, and then select **New**.

5.  On the opened page, enter the following parameters, and then select **OK**:

    ```
    Name: AlfrescoKeyStore
    Path: <WAS_INSTALL_ROOT>/keystore/ssl.keystore
    Password: kT9X6oe68t
    Confirm password: kT9X6oe68t
    Type: JCEKS                 
    ```

6.  Save the changes to the master configuration.

7.  Create another key store using following parameters:

    ```
    Name: AlfrescoTrustStore
    Path: <WAS_INSTALL_ROOT>/keystore/ssl.truststore
    Password: kT9X6oe68t
    Confirm password: kT9X6oe68t
    Type: JCEKS  
    ```

8.  Save the changes to the master configuration.

9.  Go to **Security – SSL certificate and key management – SSL configurations – NodeDefaultSSLSettings**.

10. Change the **Trust Store Name** parameter value to `AlfrescoTrustStore`.

11. Change the **Key Store Name** parameter value to `AlfrescoKeyStore`.

12. Select **Get certificate aliases**, and then select **OK**.

13. Save the changes to the master configuration.


**Parent topic:**[Installing Alfresco on WebSphere](../tasks/alf-websphere-install.md)

