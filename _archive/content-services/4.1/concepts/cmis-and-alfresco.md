---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [API/Script, CMIS]
keyword: [CMIS, CMIS and Alfresco]
---

# Using CMIS with Alfresco

The Alfresco CMIS implementation is the basis for many existing CMIS applications, and you can use CMIS too to integrate your application with Alfresco. Most applications that use CMIS opt for the simpler AtomPub protocol rather than the SOAP protocol. However, if your application has a strong web services framework you may want to use the SOAP bindings.

If you are programming CMIS applications in Java, you can use the Apache Chemistry implementation of OpenCMIS. Apache Chemistry provides bindings for both the AtomPub and SOAP protocols.To use CMIS with PHP, use one of the PHP web frameworks.

Use CMIS for building a new application or integrating and existing application with Alfresco to make the application portable to other systems. Note that the CMIS specification describes a core set of services of a typical content management system. Some of the services provided by Alfresco are not included in this core set. CMIS does provide extension points and these have been used by the Alfresco OpenCMIS Extension to provide access to Alfresco aspects using the CMIS API.

Use web scripts to access other Alfresco services that are not part of the CMIS specification. For example use web scripts to:

-   Add or manage workflows
-   Apply actions or rules
-   Perform any records management operations
-   Perform any management or administrative task such as user or group management, or indexing control

You can also integrate web scripts with the AtomPub protocol of CMIS.

-   **[Using SOAP 1.2 with Alfresco](../tasks/cmis-soap12.md)**  
When using SOAP bindings, the Alfresco CMIS implementation uses the SOAP 1.1 protocol by default. If your application client uses the SOAP 1.2 protocol, you can change the Alfresco configuration to use SOAP 1.2 using the following procedure.

**Parent topic:**[Programming with CMIS](../concepts/cmis-about.md)

**Related information**  


[The Alfresco OpenCMIS Extension](opencmis-ext-intro.md)

[Web Scripts](ws-architecture.md)

[OpenCMIS Client API Developer's Guide](http://chemistry.apache.org/java/developing/guide.html)

[Apache Chemistry](http://chemistry.apache.org/)

[Public Alfresco CMIS Server](http://cmis.alfresco.com)

[The CMIS 1.0 specification](http://docs.oasis-open.org/cmis/CMIS/v1.0/os/cmis-spec-v1.0.html)

