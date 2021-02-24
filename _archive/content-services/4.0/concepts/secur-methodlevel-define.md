---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [public services, security]
---

# Method-level security definition

The beans required to support Spring ACEGI-based security around method invocation are defined in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\public-services-security-context.xml. This configures two Alfresco-specific beans: A voter that can authorize method execution based on the permissions granted to the current user for specific arguments to the method, and an after invocation provider to apply security to objects returned by methods.

Method access is defined in the normal ACEGI manner with some additions.

For the following information detailing preconditions and postconditions, these factors are all relevant:

-   **<authority\>**

    Represents an authority \(user name or group\).

-   **<\#\>**

    Represents a method argument index.

-   **<permission\>**

    Represents the string representation of a permission.


Preconditions take one of the following forms:

-   **ACL\_METHOD.<authority\>**

    Restricts access to the method to those with the given authority in Alfresco. This could be a user name or group. Dynamic authorities are not supported.

-   **ACL\_NODE.<\#\>.<permission\>**

    Restricts access control to users who have the specified permission for the node at the identified argument. If the argument is a NodeRef, it will be used; if it is a StoreRef, the root node for the store will be used; if it is a ChildAssociationRef, the child node will be used.

-   **ACL\_PARENT.<\#\>.<permission\>**

    Restricts access control to users who have the specified permission for the parent of the node on the identified argument. If the argument is a NodeRef, the parent of the node will be used; if it is a ChildAssociationRef, the parent node will be used.

-   **ROLE**

    Checks for an authority starting with ROLE\_.

-   **GROUP**

    Checks for an authority starting with GROUP\_.


If more than one ACL\_NODE.<\#\>.<permission\> , ACL\_PARENT.<\#\>.<permission\>, or ACL\_METHOD.<permission\> entry is present, then all of the ACL\_NODE and ACL\_PARENT permissions must be present and any one of the ACL\_METHOD restrictions, if present, for the method to execute.

Post-conditions take the forms:

-   **AFTER\_ACL\_NODE.<permission\>**

    Similar to ACL\_NODE.<\#\>.<permission\> but the restriction applies to the return argument.

-   **AFTER\_ACL\_PARENT.<permission\>**

    Similar to ACL\_PARENT.<\#\>.<permission\> but the restriction applies to the return argument.


The support return types are:

-   StoreRef
-   ChildAssociationRef
-   Collections of StoreRef, NodeRef, ChildAssociationRef, and FileInfo
-   FileInfo
-   NodeRef
-   Arrays of StoreRef, NodeRef, ChildAssociationRef, and FileInfo
-   PagingLuceneResultSet
-   QueryEngineResults
-   ResultSet

The post-conditions will create access denied exceptions for return types such as NodeRef, StoreRef, ChildAssociationRef, and FileInfo. For collections, arrays, and result sets, their members will be filtered based on the access conditions applied to each member.

Continuing the example from the permissions defined for the Ownable aspect, the definition for the security interceptor for the related OwnableService is shown in the following code snippet.

```
<bean id="OwnableService_security"
  class="org.alfresco.repo.security.permissions.impl.acegi.MethodSecurityInterceptor">
   <property name="authenticationManager"><ref bean="authenticationManager"/></property>
   <property name="accessDecisionManager"><ref local="accessDecisionManager"/></property>
   <property name="afterInvocationManager"><ref local="afterInvocationManager"/></property>
   <property name="objectDefinitionSource">
     <value>
      org.alfresco.service.cmr.security.OwnableService.getOwner=ACL_NODE.0.sys:base.ReadProperties
    org.alfresco.service.cmr.security.OwnableService.setOwner=ACL_NODE.0.cm:ownable.SetOwner
     org.alfresco.service.cmr.security.OwnableService.takeOwnership=ACL_NODE.0.cm:ownable.TakeOwnership
      org.alfresco.service.cmr.security.OwnableService.hasOwner=ACL_NODE.0.sys:base.ReadProperties
      org.alfresco.service.cmr.security.OwnableService.*=ACL_DENY
      </value>
    </property>
</bean>

```

Security for the four methods on the OwnableService is defined. To invoke the OwnableService getOwner\(\) method on a node, the invoker must have permission to read the properties of the target node. To set the owner of a node, a user must have been explicitly assigned the SetOwner permission or have all rights to the node. A user may have all rights to a node via the context-free ACL or be assigned a permission, which grants all permission or includes SetOwner. With the default configuration, a user will own any node they create and therefore be able to give ownership to anyone else and possibly not have the right to take ownership back.

The last entry catches and denies access for any other method calls other than those listed. If any additional methods were added to this service and no security configuration explicitly defined for the new methods, these methods would always deny access.

**Parent topic:**[Public services](../concepts/secur-public-service.md)

