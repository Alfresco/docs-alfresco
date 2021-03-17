---
author: Alfresco Documentation
---

# How to enable auditing

Generation of audit data is disabled by default as it can potentially impact the performance of Alfresco. To enable auditing, configuration must be added to the Alfresco global properties file.

The `audit.enabled` property \(which is set to `true` by default\) provides a way to globally enable or disable the auditing framework. However, enabling this property does not necessarily result in the generation of audit data. To enable generation of audit data that you can view in Share or the log files, you will need to enable the `audit.alfresco-access.enabled` property.

To enable auditing add the following settings to the tomcat/shared/classes/alfresco-global.properties file:

```

      
      ### Auditing config
      
      audit.enabled = true
      audit.alfresco-access.enabled=true
      
      ### Enabling sub-actions
      
      # Enable the auditing of sub-actions. Normally disabled as these values are
      # not normally needed by audit configurations, but may be useful to
      # developers
      #audit.alfresco-access.sub-actions.enabled=true
      
    
```

Once changes to the global properties file have been saved, you will need to restart the Alfresco server, for auditing to be fully enabled.

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

