# External Identity Management \(LDAP/Active Directory\)

It’s possible to hook up a centralized user data store with Alfresco Process Services. Any server supporting the LDAP protocol can be used. Special configuration options and logic has been included to work with Active Directory \(AD\) systems too.

From a high-level overview, the external Identity Management \(IDM\) integration works as follows:

-   Periodically, all user and group information is synchronized asynchronously. This means that all data for users \(name, email address, group membership and so on\) is copied to the Alfresco Process Services database. This is done to improve performance and to efficiently store more user data that doesn’t belong to the IDM system.

-   If the user logs in to Alfresco Process Services, the authentication request is passed to the IDM system. On successful authentication there, the user data corresponding to that user is fetched from the Alfresco Process Services database and used for the various requests. Note that no passwords are saved in the database when using an external IDM.


Note that the LDAP sync only needs to be activated and configured on one node in the cluster \(but it works when activated on multiple nodes, but this will of course lead to higher traffic for both the LDAP system and the database\).

-   **[Configuring external IDM](../topics/configuration.md)**  
The configuration of the external IDM authentication/synchronization is done in the same way as the regular properties. There is a properties file named activiti-ldap.properties in the WEB-INF/classes/META-INF/ folder in the WAR file. The values in a file with the same name on the classpath have precedence over the default values in the former file.
-   **[Server connection configuration](../topics/server_connection_configuration.md)**  
The following code snippet shows the properties involved in configuring a connection to an LDAP server \(Active Directory is similar\). These are the typical parameters used when connecting with an LDAP server. Advanced parameters are commented out in the example below:
-   **[Authentication](../topics/authentication.md)**  
 To enable authentication via LDAP or AD, set the following property:
-   **[Synchronization](../topics/synchronization.md)**  
The synchronization component will periodically query the IDM system and change the user and group database. There are two synchronization *modes*: full and differential.

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

