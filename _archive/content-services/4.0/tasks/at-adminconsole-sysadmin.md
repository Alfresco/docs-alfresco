---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: sysadmin
---

# Viewing the system administration properties \(Sysadmin\)

The Sysadmin page shows the properties for server administration. These are properties that are used throughout Alfresco.

1.  Open the Admin Console, and then click **Sysadmin**.

2.  View the general properties:

    |General property|Default setting|What is it?|
    |----------------|---------------|-----------|
    |**Repository Context**|alfresco|This is the context path of the Alfresco web application. The default is alfresco.|
    |**Repository Host**|$\{localname\}|This is the externally resolvable host name of the Alfresco web application. The default value is $\{localname\}. If this is used for the value of this property, the token $\{localname\} will be automatically replaced by the domain name of the repository server.|
    |**Repository Port**|8080|This is the externally resolvable port number of the Alfresco web application URL. The default is 8080.|
    |**Repository Protocol**|http|This is the protocol component of the Alfresco web application. The default is http.|
    |**Share Context**|share|This is context path component of the Share web application URL The default is share.|
    |**Share Host**|$\{localname\}|This is the externally resolvable host name of the Share web application URL. The default value is $\{localname\}.|
    |**Share Port**|8080|This is the externally resolvable port number of the Share web application URL. The default is 8080.|
    |**Share Protocol**|http|This is the protocol to use. The default is http.|
    |**Allowed Users**|\(None\)|This is a comma-separated list of users who are allowed to log in. Leave this property empty if all users are allowed to log in.|
    |**Max Users**|-1|This is the maximum number of users who are allowed to log in or -1 if there is no limit.|
    |**Allowed Writes**|No|This is indicates whether the repository will allow write operations \(provided that the license is valid\). When you set this to No, the repository is in read-only mode.|


**Parent topic:**[Managing Alfresco using the Admin Console](../concepts/at-adminconsole.md)

