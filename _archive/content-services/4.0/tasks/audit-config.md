---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
keyword: [audit, Records Management]
---

# Enabling auditing

Generation of audit data is disabled by default. To enable auditing permanently, settings must be added to the Alfresco global properties file as shown in the following text.

To enable auditing permanently, add the following settings to the alfresco-global.properties file:

```

audit.enabled=true
audit.alfresco-access.enabled=true
    
```

**Note:**

The `audit.enabled` property provides a way to globally enable or disable the auditing framework. However, enabling this property does not necessarily result in the generation of audit data.

To enable generation of audit data that you can view in Explorer or Share, you will need to enable the `audit.alfresco-access.enabled` property.

Once changes to the global properties file have been saved, you will need to restart the Alfresco server, for auditing to be fully enabled.

You can check the status of auditing conveniently from the command line by using a tool such as `curl` to access the Audit Control web script.

To check the global status of auditing issue a command such as:

```

curl -u admin:password "http://localhost:8080/alfresco/service/api/audit/control"      

```

This invokes the web script with a GET request. This will result in a JSON response such as the following if auditing is currently enabled:

```

{
   "enabled" : true,
   "applications": 
   [
      {
         "name": "Alfresco Tagging Service",
         "path" : "/tagging",
         "enabled" : true
      }
         ,
      {
         "name": "alfresco-access",
         "path" : "/alfresco-access",
         "enabled" : true
      }
         
   ]
}
    
```

While this does return the global status of the auditing framework, audit data will only be generated if `audit.alfresco-access.enabled` is enabled.

If auditing is currently disabled the response will be:

```

{
   "enabled" : false
}  

```

In this case no audit data will be generated as the audit framework is disabled.

Auditing can also be globally enabled or disabled using the control web script. To do this a POST request is sent to the web script. For example, using `curl`, auditing can be enabled using the following command:

```

curl -u admin:password -d "" "http://localhost:8080/alfresco/service/api/audit/control?enable=true"

```

This results in the following response:

```

{
   "enabled" : true
}  

```

To disable auditing issue the following command:

```

curl -u admin:password -d "" "http://localhost:8080/alfresco/service/api/audit/control?enable=false"

```

This results in the following response:

```

{
   "enabled" : false
}  

```

While the global status of the auditing framework can be switched on and off in this manner, audit data will only be generated if `audit.alfresco-access.enabled` is enabled in the global properties file.

**Note:** Enabling or disabling auditing using the Audit Control web script only remains valid in force while the server is running; the setting will not be retained following a server restart, but will subsequently be set according to the values in alfresco-global.properties.

## Using JMX to control auditing

A JMX client can be used to access global properties. The properties can be modified using the JMX client. A server restart will be required for changes to properties to take effect.

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

