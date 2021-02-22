---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring Alfresco as a Windows service

To configure Alfresco to run as a Windows service, you need to set up the application server \(Tomcat\) to run as a Windows service.

Before you start, ensure that Alfresco and a JRE are installed on your Windows system.

**Note:** For more information on editing, updating, installing a Windows service, see the Apache documentation for the version of Tomcat that you are using:

-   For Tomcat 8: [Updating services](https://tomcat.apache.org/tomcat-8.0-doc/windows-service-howto.html#Updating_services)
-   For Tomcat 7: [Updating services](https://tomcat.apache.org/tomcat-7.0-doc/windows-service-howto.html#Updating_services)

1.  To install Alfresco as a service, run the following command from a command prompt:

    ```
    service.bat install alfresco
    ```

2.  Open the Services panel.

3.  Locate the service named **alfresco**, and then select **Start the service**.

    Alfresco start running as a Windows service.

4.  To uninstall the service, run the following commands from a command prompt:

    ```
    cd c:\alfresco\tomcat\bin 
    service.bat uninstall alfresco
    ```


**Parent topic:**[Installing Alfresco on Tomcat](../tasks/alf-tomcat-install.md)

