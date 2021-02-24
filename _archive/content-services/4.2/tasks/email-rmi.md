---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
option: RMI email service
---

# Configuring the RMI email service

You can run the email server remotely on a separate JVM and server, and have it interact with the Alfresco server using Remote Method Invocation \(RMI\).

1.  Browse to the folder <configRoot\>/classes/alfresco.

2.  Open the configuration file remote-email-service-context.xml.

    This file contains the `emailService` bean, specifying the related RMI configuration.

3.  Modify the RMI configuration as required. For example:

    |**Value**|**Description**|
    |---------|---------------|
    |`<serviceUrl>`</serviceUrl>``|Specifies the valid RMI URL.|
    |``<serviceInterface>``</serviceInterface>``|Specifies the interface used for RMI.|


**Parent topic:**[Configuring email](../concepts/email-intro.md)

