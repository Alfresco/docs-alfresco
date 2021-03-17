---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [public services, Access Control Extension, security]
---

# Access Control Extension

The Access Control model is used for all nodes in the content repository except those related to the Records Management extension. Records Management is used as an example here to outline how to extend access control.

The Records Management authorization is based around a fixed set of capabilities that are part of the DOD 5015.2 specification. These capabilities describe records management operations for which there is not a direct mapping to an Alfresco public service method call. There are separate Records Management implementations of the ACEGI AccessDecisionVoter and AfterInvocationProvider interfaces to support this mapping. The AccessDecisionVoter allows or denies access on method entry. The AfterInvocationProvider allows or denies access based on the method return value; it can also alter the return value. All Records Management nodes carry a marker aspect \(an aspect that defines no properties or associations\). If this marker is present, the default voter will abstain; if this marker is absent, the Records Management voter will abstain.

Public services are protected for Records Management in the same manner as already described but with two sets of configuration: one for each of the two different implementations. It is more complex to map the Records Management capabilities and caveats \(for example, security clearance\) to public service method calls and to enforce the restrictions. For example, the node service updateProperties method has to incorporate the idea of updating declared and undeclared records, allow updates to selected properties, and to restrict access to some properties that should only be updated as part of state management. The Records Management voter has additional Records Management hard-coded policies to protect the public services in order to encapsulate the logic for this and related use cases.

In Records Management, normal users cannot pass on their rights to other users.

**Parent topic:**[Setting up Alfresco authentication and security](../concepts/auth-intro.md)

**Related information**  


[Access Control Lists](secur-acl.md)

