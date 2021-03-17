---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: JMX bean categories reference configuration
---

# JMX configuration beans

This section contains the list of configuration beans. Alfresco introduces an innovative way to manage the configuration of the individual Spring beans that compose the server. This feature is available for security and authentication configuration, which can be particularly complex to manage given the possibility of multiple-chained authentication services and authentication components, each with their own DAOs and other supporting services.

To help with the management of such configuration, the key properties of key authentication bean classes are annotated with a special `@Managed` annotation, that causes them to be exposed automatically through dynamic MBeans under the `Alfresco:Type=Configuration` naming tree. This means that the key beans that make up your authentication chain will become visible to a JMX client, no matter how they are named and wired together.

The current set of authentication classes that have this facility include:

-   Authentication Components, including chained, JAAS, LDAP and NTLM components
-   Authentication Services, including chained and unchained
-   Authentication DAOs
-   `LDAPInitialDirContextFactories`, encapsulating the parameters of the LDAP server
-   `LDAPPersonExportSource`, controlling the synchronization of person information with an LDAP server

In JConsole, the view of a server with a particularly complex authentication configuration that shows all the authentication classes are visible under the Alfresco:Type=Configuration naming tree and navigable with JConsole. These beans provide a read-only view of the configuration.

**Parent topic:**[JMX bean categories reference](../concepts/jmx-reference.md)

