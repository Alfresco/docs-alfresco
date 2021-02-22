# Troubleshooting the Share Connector

**To see debug messages from Share Connector:**

1.  Rename the custom-log4j.properties.sample file in the following location:

    ```
    tomcat/shared/classes/alfresco/extension/
    ```

2.  Remove the .sample suffix, and add the following line:

    ```
    log4j.logger.com.activiti.alfresco=debug
    ```


**Parent topic:**[Alfresco Process Services configuration](../topics/process_services_config.md)

