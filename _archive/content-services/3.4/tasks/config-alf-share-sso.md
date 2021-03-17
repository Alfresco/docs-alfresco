---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configure Alfresco and Share to use SSO external authentication

This topic describes how to configure Alfresco and Share on machine 2 to use SSO external authentication.

1.  Run the Alfresco installation wizard, installing it to, for example, /opt/alfresco directory.

2.  Configure the AJP connector in server.xml in the /opt/alfresco/tomcat/conf directory. You must set `tomcatAuthentication=false`.

    ```
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" tomcatAuthentication="false" />  
    ```

3.  Configure the alfresco-global.properties file at /opt/alfresco/tomcat/shared/classes/alfresco-global.properties as shown below:

    ```
    authentication.chain=external1:external
    # Note! This must be set up if you are using client certificate
    external.authentication.proxyUserName=alfresco-system
    external.authentication.proxyHeader=X-Alfresco-Remote-User
    ```

4.  Configure the Share default port by following the instructions specified in the [Configuring the Share default port](share-change-port.md) topic. Remember to replace http://localhost:8080/ with http://rhel-CAS-112/.


**Parent topic:**[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)

