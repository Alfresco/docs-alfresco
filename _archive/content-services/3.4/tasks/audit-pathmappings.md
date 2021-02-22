---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
keyword: [audit, Records Management]
---

# Understanding PathMappings

To create an audit configuration file, it is necessary to know which data can be audited and how the data is mapped onto your application.

1.  Turn on debugging for the inbound data. For a better understanding, you can turn on debug logging for the mapping components as well, although this is more verbose.

    ```
    % cat <tomcatgt/shared/classes/alfresco/extension/audit-log4j.properties 
    log4j.logger.org.alfresco.repo.audit.AuditComponentImpl=DEBUG
    log4j.logger.org.alfresco.repo.audit.inbound=DEBUG
    ```

2.  Tail the log file and watch the output.

    1.  Login as admin.

        ```
        16:47:37,434  DEBUG [repo.audit.inbound] 
        Inbound audit values:
        	/alfresco-api/pre/AuthenticationService/authenticate/args/userName=admin
        16:47:37,443 User:admin DEBUG [repo.audit.inbound] 
        Inbound audit values:
        	/alfresco-api/post/AuthenticationService/authenticate/no-error=null
        	/alfresco-api/post/AuthenticationService/authenticate/args/userName=admin
        ```

    2.  From the inbound values \(and if you have the `AuditComponentImpl` debugging on\):

        ```
        16:47:37,445 User:System DEBUG [repo.audit.AuditComponentImpl] Extracted audit data: 
           Application: AuditApplication[ name=AuditExampleLogin2, id=7, disabledPathsId=7]
           Raw values:  {/auditexamplelogin2/login=null}
           Extracted:   {}
        16:47:37,447 User:admin DEBUG [repo.audit.AuditComponentImpl] New audit entry: 
           Application ID: 7
           Entry ID:       130
           Values:         {/auditexamplelogin2/login=null}
           Audit Data:     {/auditexamplelogin2/login/user=Administrator}
        16:47:37,447 User:System DEBUG [repo.audit.AuditComponentImpl] Extracted audit data: 
           Application: AuditApplication[ name=AuditExampleLogin1, id=6, disabledPathsId=6]
           Raw values:  {/auditexamplelogin1/login/no-error=null, /auditexamplelogin1/login/args/userName=admin}
           Extracted:   {/auditexamplelogin1/login/no-error/user=admin}
        16:47:37,449 User:admin DEBUG [repo.audit.AuditComponentImpl] New audit entry: 
           Application ID: 6
           Entry ID:       131
           Values:         {/auditexamplelogin1/login/no-error=null, /auditexamplelogin1/login/args/userName=admin}
           Audit Data:     {/auditexamplelogin1/login/no-error/user=admin}
        ```

        You can see that the `AuthenticationService.authenticate` method generate two sets of "inbound" data: the `/alfresco-api/pre/AuthenticationService/authenticate` data is passed through before the service call is processed; the `/alfresco-api/post/AuthenticationService/authenticate` data is passed through after the service call has been processed. When logging in successfully, the post-call data is generated with a `no-error` path.

    3.  Perform a failed login with user joe.

        ```
        17:02:09,697  DEBUG [repo.audit.inbound] 
        Inbound audit values:
        	/alfresco-api/pre/AuthenticationService/authenticate/args/userName=joe
        17:02:09,704  DEBUG [repo.audit.inbound] 
        Inbound audit values:
        	/alfresco-api/post/AuthenticationService/authenticate/error=08200014 Failed to authenticate 
           Started at: 
              org.alfresco.repo.security.authentication.AbstractChainingAuthenticationService.authenticate(AbstractChainingAuthenticationService.java:188)
              ...
        ```

        This is translated and recorded:

        ```
        17:02:09,704 User:System DEBUG [repo.audit.AuditComponentImpl] Extracted audit data: 
           Application: AuditApplication[ name=AuditExampleLogin1, id=6, disabledPathsId=6]
           Raw values:  {/auditexamplelogin1/login/error=08200014 Failed to authenticate 
           Started at: 
              org.alfresco.repo.security.authentication.AbstractChainingAuthenticationService.authenticate(AbstractChainingAuthenticationService.java:188)
              ...
        17:02:09,704  DEBUG [repo.audit.AuditComponentImpl] New audit entry: 
           Application ID: 6
           E6try ID:       135
           Values:         {/auditexamplelogin1/login/error=08200016 Failed to authenticate 
           Started at: 
              org.alfresco.repo.security.authentication.AbstractChainingAuthenticationService.authenticate(AbstractChainingAuthenticationService.java:188)
              ...
           Audit Data:     {/auditexamplelogin1/login/error/user=joe}
        ```

    4.  Notice that the failed login did not generate any data for audit application `AuditExampleLogin2`. To understand this, look at the `PathMappings` section of the example:

        ```
        <PathMappings>
                <PathMap source="/alfresco-api/post/AuthenticationService/authenticate" target="/auditexamplelogin1/login"/>
                <PathMap source="/alfresco-api/post/AuthenticationService/authenticate/no-error" target="/auditexamplelogin2/login"/>
            </PathMappings>
        ```

        Before any data is considered for persistence, the inbound data paths are remapped using the `PathMappings` configuration. The /auditexamplelogin2/login path is mapped onto `.../no-error` only, so failed logins were not recorded for the `AuditExampleLogin2` audit application, while the `AuditExampleLogin1` application recorded both successful and failed logins.


**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

