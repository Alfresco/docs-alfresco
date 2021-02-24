---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Controlling site creation permissions

By default, any authenticated user can create sites in Share. The creator of the new site is given the Site Manager role and they control who has access to the site and in what role.

The beans that enforce security to the repository services based on the currently authenticated user are defined in the [public-services-security-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/public-services-security-context.xml) file.

1.  Copy the following code and add it to the <extension\>/custom-model-context.xml file.

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
        <bean id="SiteService_security" class="org.alfresco.repo.security.permissions.impl.acegi.MethodSecurityInterceptor">
            <property name="authenticationManager"><ref bean="authenticationManager"/></property>
            <property name="accessDecisionManager"><ref bean="accessDecisionManager"/></property>
            <property name="afterInvocationManager"><ref bean="afterInvocationManager"/></property>
            <property name="objectDefinitionSource">
                <value>
                   org.alfresco.service.cmr.site.SiteService.cleanSitePermissions=ACL_NODE.0.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.createContainer=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.createSite=ACL_METHOD.GROUP_SITE_CREATORS
                   org.alfresco.service.cmr.site.SiteService.deleteSite=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.findSites=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.getContainer=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.listContainers=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.getMembersRole=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getMembersRoleInfo=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.resolveSite=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getSite=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.getSiteShortName=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.getSiteGroup=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getSiteRoleGroup=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getSiteRoles=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getSiteRoot=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.hasContainer=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.hasCreateSitePermissions=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.hasSite=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.isMember=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listMembers=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listMembersInfo=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listMembersPaged=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listSiteMemberships=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listSites=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.listSitesPaged=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.removeMembership=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.canAddMember=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.setMembership=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.updateSite=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.countAuthoritiesWithRole=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.isSiteAdmin=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.*=ACL_DENY
                </value>
            </property>
        </bean>
    </beans>
    ```

2.  Modify the inserted `SiteService_security` bean to match your requirements. For example:

    To give permission to only Administrators to create site, change:

    ```
    org.alfresco.service.cmr.site.SiteService.createSite=ACL_ALLOW
    ```

    to

    ```
    org.alfresco.service.cmr.site.SiteService.createSite=ACL_METHOD.ROLE_ADMINISTRATOR
    ```

    where, `ACL_ALLOW` executes a method that allows access to all users and `ACL_METHOD.ROLE_ADMINISTRATOR` executes a method that allows access to users who are members of the administrator group.

3.  Save the file.

4.  Restart Alfresco Content Services.


**Parent topic:**[Defining permissions](../concepts/secur-permissions.md)

