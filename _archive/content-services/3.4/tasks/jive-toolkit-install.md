---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Jive Toolkit, Extensions/Third Party]
keyword: [Jive, Toolkit]
---

# Installing the Jive Toolkit on Jive

These steps describe how to install the Jive Toolkit on Jive.

The following instructions assume that you create a default user name with an ID `admin` and a password `admin` during the Jive install wizard.

1.  Install Jive SBS Engage 5.0.1.0.

2.  Expand Jive Toolkit zip file.

    The expanded zip file contains the following JAR file:

    ```
    alfresco-jivetoolkit-jive-1.0.6.jar
    ```

3.  In Jive, open the **Admin Console \> System \> Plugins \> Add Plugin** page.

4.  Install the Jive plug-in alfresco-jivetoolkit-jive-1.0.6.jar file.

5.  Open the **Admin Console \> System \> System Properties** page, and then add the following system properties:

    |Property|Description|
    |--------|-----------|
    |`jivetoolkit.alfresco.url=`|Specifies the base URL of the Alfresco instance. The format of the URL should include the port number and the application context \(if any\).|
    |`jivetoolkit.alfresco.user=`|Specifies the system user name of the user that will be used by Jive to authenticate calls to the Alfresco instance.|
    |`jivetoolkit.alfresco.password=`|Specifies the password of the system user defined in the `jivetoolkit.alfresco.user=` property.|
    |`jivetoolkit.shared.password=`|Specifies a password that will be used to secure communication between Jive and Alfresco. The password that you specify here must be the same in the Alfresco configuration.

**Important:** Do not leave this property empty or blank. You must enter a value for this password, otherwise Alfresco will not start.

Also, if the passwords in Alfresco and Jive are different, the communication will fail.

|

    ```
    jivetoolkit.alfresco.url=http://alfrescoserver.acme.com:8080/alfresco          
    jivetoolkit.alfresco.user=admin                
    jivetoolkit.alfresco.password=admin         
    jivetoolkit.shared.password=CHANGEME!
    ```

6.  Check that the shared passwords are identical between Jive and Alfresco.

7.  Restart Jive.


**Parent topic:**[Alfresco Jive Toolkit installation](../concepts/jive-install-artifact.md)

