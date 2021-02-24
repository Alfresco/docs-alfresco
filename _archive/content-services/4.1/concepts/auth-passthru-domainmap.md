---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, pass-through, passthru, authentication]
---

# Domain mappings

Domain mappings are used to determine the domain a client is a member of when the client does not specify its domain in the login request. If the client uses a numeric IP address to access the web server it will not send the domain in the NTLM request as the browser assumes it is an Internet address.

To specify the domain mapping rules that are used when the client does not supply its domain in the NTLM request you can use the `filesystem.domainMappings` composite property of the file server subsystem. Specify the file server subsystem settings in the alfresco-global.properties file.

There are two ways of defining a domain mapping, either by specifying an IP subnet and mask, or by specifying a range of IP addresses. The following example defines mappings for two domains: `ALFRESCO` and `OTHERDOM`.

```
filesystem.domainMappings=ALFRESCO,OTHERDOM
filesystem.domainMappings.value.ALFRESCO.subnet=192.168.1.0
filesystem.domainMappings.value.ALFRESCO.mask=192.168.1.0
filesystem.domainMappings.value.OTHERDOM.rangeFrom=192.168.1.0
filesystem.domainMappings.value.OTHERDOM.rangeTo=192.168.1.100
```

The mask value masks the IP address to get the subnet part, and in this example, the mask value is 192.168.1.0. An alternative is to use 255.255.255.0. A value of 255.255.255.0 will get the subnet, which is then checked against the subnet value. If there were two subnets, 192.168.1.0 and 192.168.2.0, then a mask value of 255.255.255.0 and subnet value of 192.168.1.0 would only match addresses in the 192.168.1.0 range.

The pass through subsystem can use the domain prefixed server name format of the `passthru.authentication.servers` property along with the domain mappings to route authentication requests to the appropriate server. A sample NTLM authentication component server list:

```
passthru.authentication.servers=ALFRESCO\\ADSERVER,OTHERDOM\\OTHERSRV
```

**Parent topic:**[Configuring pass-through](../concepts/auth-passthru-intro.md)

**Related information**  


[Setting composite properties in the global properties file](../tasks/global-props-composite.md)

