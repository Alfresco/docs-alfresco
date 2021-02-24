---
author: Alfresco Documentation
---

# Key tools and files

Some initial information on key tools and file to get you started.

## Alfresco log file

The Alfresco log file, alfresco.log, is found in the directory where Alfresco is installed. Viewing audit log entries provides a useful way to get a feel for the auditing process.

## Global auditing configuration properties

Auditing configuration properties can be set in the tomcat/shared/classes/alfresco-global.properties file \(requires server restart for properties to be applied\).

## Log4J configuration

Log4J settings can be added in a file tomcat/shared/classes/alfresco/extension/audit-log4j.properties \(you could copy ./tomcat/shared/classes/alfresco/extension/custom-log4j.properties.sample and remove the .sample, or create the file from scratch\).

To see what information is available to audit, enable the following logging:

```
log4j.logger.org.alfresco.repo.audit.inbound=DEBUG
```

This would generate logging \(in alfresco.log\) such as:

```

15:55:26,590 User:admin DEBUG [repo.audit.inbound] 
Inbound audit values:
	/alfresco-node/beforeDeleteNode/node=workspace://SpacesStore/c4728f24-4a11-40f7-9062-315edf959d79
15:55:26,748 User:admin DEBUG [repo.audit.inbound] 
Inbound audit values:
	/alfresco-api/post/NodeService/deleteNode/no-error=null
	/alfresco-api/post/NodeService/deleteNode/args/nodeRef=workspace://SpacesStore/c4728f24-4a11-40f7-9062-315edf959d79                
              
```

Example from copying a file:

```

Inbound audit values:
    /alfresco-access/transaction/type=cm:content
    /alfresco-access/transaction/properties/add/cm:content=contentUrl=store://2015/12/7/16/30/b1bbb8ce-5d5f-47dc-be1d-1fa1542b2b60.bin|mimetype=application/pdf|size=381778|encoding=UTF-8|\
locale=en_US_|id=267
    /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf
    /alfresco-access/transaction/action=COPY
    /alfresco-access/transaction/properties/add/cm:name=Copy of Project Contract.pdf
    /alfresco-access/transaction/sub-actions=createNode createContent updateNodeProperties addNodeAspect copyNode createVersion
    /alfresco-access/transaction/copy/from/node=workspace://SpacesStore/1a0b110f-1e09-4ca2-b367-fe25e4964a4e
    /alfresco-access/transaction/aspects/add/cm:copiedfrom=null
    /alfresco-access/transaction/aspects/add/cm:titled=null
    /alfresco-access/transaction/version-properties/versionType=MAJOR
    /alfresco-access/transaction/version-properties={versionType=MAJOR}
    /alfresco-access/transaction/node=workspace://SpacesStore/6dd0021c-1e36-461c-9451-7e5ebfba00a1
    /alfresco-access/transaction/properties/add/cm:creator=admin
    /alfresco-access/transaction/properties/add/sys:store-identifier=SpacesStore
    /alfresco-access/transaction/properties/add/cm:modified=Tue Dec 15 12:42:54 GMT 2015
    /alfresco-access/transaction/properties/add/sys:locale=en_GB
    /alfresco-access/transaction/properties/add/sys:store-protocol=workspace
    /alfresco-access/transaction/properties/add/cm:autoVersion=true
    /alfresco-access/transaction/properties/add/cm:autoVersionOnUpdateProps=false
    /alfresco-access/transaction/properties/add/cm:modifier=admin
    /alfresco-access/transaction/copy/from/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Project Contract.pdf
    /alfresco-access/transaction/properties/add/cm:author=Alice Beecher
    /alfresco-access/transaction/properties/add/cm:initialVersion=true
    /alfresco-access/transaction/aspects/add/cm:versionable=null
    /alfresco-access/transaction/properties/add/sys:node-dbid=881
    /alfresco-access/transaction/properties/add={{http://www.alfresco.org/model/content/1.0}autoVersionOnUpdateProps=false, {http://www.alfresco.org/model/content/1.0}created=Tue Dec 15 1\
2:42:54 GMT 2015, {http://www.alfresco.org/model/content/1.0}title={en_US=Project Contract for Green Energy}, {http://www.alfresco.org/model/content/1.0}description={en_US=Contract for th\
e Green Energy project}, {http://www.alfresco.org/model/content/1.0}creator=admin, {http://www.alfresco.org/model/system/1.0}node-uuid=6dd0021c-1e36-461c-9451-7e5ebfba00a1, {http://www.al\
fresco.org/model/content/1.0}name=Copy of Project Contract.pdf, {http://www.alfresco.org/model/system/1.0}store-protocol=workspace, {http://www.alfresco.org/model/content/1.0}content=cont\
entUrl=store://2015/12/7/16/30/b1bbb8ce-5d5f-47dc-be1d-1fa1542b2b60.bin|mimetype=application/pdf|size=381778|encoding=UTF-8|locale=en_US_|id=267, {http://www.alfresco.org/model/system/1.0\
}store-identifier=SpacesStore, {http://www.alfresco.org/model/system/1.0}node-dbid=881, {http://www.alfresco.org/model/system/1.0}locale=en_GB, {http://www.alfresco.org/model/content/1.0}\
versionLabel=1.0, {http://www.alfresco.org/model/content/1.0}modifier=admin, {http://www.alfresco.org/model/content/1.0}modified=Tue Dec 15 12:42:54 GMT 2015, {http://www.alfresco.org/mod\
el/content/1.0}autoVersion=true, {http://www.alfresco.org/model/content/1.0}initialVersion=true, {http://www.alfresco.org/model/content/1.0}author=Alice Beecher}
    /alfresco-access/transaction/properties/add/cm:description={en_US=Contract for the Green Energy project}
    /alfresco-access/transaction/aspects/add/cm:author=null
    /alfresco-access/transaction/properties/add/cm:versionLabel=1.0
    /alfresco-access/transaction/copy/from/type=cm:content
    /alfresco-access/transaction/properties/add/sys:node-uuid=6dd0021c-1e36-461c-9451-7e5ebfba00a1
    /alfresco-access/transaction/properties/add/cm:created=Tue Dec 15 12:42:54 GMT 2015
    /alfresco-access/transaction/properties/add/cm:title={en_US=Project Contract for Green Energy}
    /alfresco-access/transaction/user=admin
    /alfresco-access/transaction/aspects/add=[{http://www.alfresco.org/model/content/1.0}versionable, {http://www.alfresco.org/model/content/1.0}copiedfrom, {http://www.alfresco.org/model\
/content/1.0}author, {http://www.alfresco.org/model/content/1.0}titled]                  
                
```

**Note:** A large number of log entries will be generated in alfresco.log.

To see which data is being produced, rejected or recorded, switch DEBUG for:

```
log4j.logger.org.alfresco.repo.audit.AuditComponentImpl=DEBUG
```

This will result in entries such as:

```

2015-12-15 12:50:39,476 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-8]
Extracted audit data:
    Application:    AuditApplication[ name=AuditExampleLogin1, id=4, disabledPathsId=3317]
    Values:
        /auditexamplelogin1/loginAsGuest/args=null
        /auditexamplelogin1/loginAsGuest/no-error=null

    New Data:

2015-12-15 12:50:39,476 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-8]
Nothing audited:
    Application ID: 4
    Entry ID:       null
    Values:
        /auditexamplelogin1/loginAsGuest/args=null
        /auditexamplelogin1/loginAsGuest/no-error=null

2015-12-15 12:50:41,092 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-9]
New audit entry:
    Application ID: 6
    Entry ID:       127
    Values:
        /alfresco-access/login=null
        /alfresco-access/loginUser=admin

    Audit Data:
        /alfresco-access/login/user=admin

2015-12-15 12:50:41,095 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-9]
Extracted audit data:
    Application:    AuditApplication[ name=AuditExampleLogin2, id=5, disabledPathsId=3318]
    Values:
        /auditexamplelogin2/login=null

    New Data:

2015-12-15 12:50:41,100 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-9]
New audit entry:
    Application ID: 5
    Entry ID:       128
    Values:
        /auditexamplelogin2/login=null

    Audit Data:
        /auditexamplelogin2/login/user=Administrator
 
...

2015-12-15 12:50:49,724 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-2]
Extracted audit data:
    Application:    AuditApplication[ name=alfresco-access, id=6, disabledPathsId=3431]
    Values:
        /alfresco-access/transaction/sub-actions=readContent
        /alfresco-access/transaction/action=READ
        /alfresco-access/transaction/node=workspace://SpacesStore/50574108-d6a1-4b5c-9378-c14b696787a7
        /alfresco-access/transaction/type=cm:thumbnail
        /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf/cm:doclib
        /alfresco-access/transaction/user=admin

    New Data:
        /alfresco-access/transaction/sub-actions=readContent
        /alfresco-access/transaction/action=READ
        /alfresco-access/transaction/type=cm:thumbnail
        /alfresco-access/transaction/user=admin
        /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf/cm:doclib

...

2015-12-15 12:50:49,739 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-2]
New audit entry:
    Application ID: 6
    Entry ID:       130
    Values:
        /alfresco-access/transaction/sub-actions=readContent
        /alfresco-access/transaction/action=READ
        /alfresco-access/transaction/node=workspace://SpacesStore/50574108-d6a1-4b5c-9378-c14b696787a7
        /alfresco-access/transaction/type=cm:thumbnail
        /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf/cm:doclib
        /alfresco-access/transaction/user=admin

    Audit Data:
        /alfresco-access/transaction/sub-actions=readContent
        /alfresco-access/transaction/action=READ
        /alfresco-access/transaction/type=cm:thumbnail
        /alfresco-access/transaction/user=admin
        /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf/cm:doclib

...
                
```

## View the available web scripts and details

Use the following scripts:

-   Script index: [http://localhost:8080/alfresco/service/](http://localhost:8080/alfresco/service/)
-   Audit scripts: [http://localhost:8080/alfresco/service/index/package/org/alfresco/repository/audit](http://localhost:8080/alfresco/service/index/package/org/alfresco/repository/audit)

## HTTP client

`curl` will be used as the HTTP client in this section of the documentation. This provides an easy way to explore the auditing REST API.

## Sample files

Audit sample files are distributed in the tomcat/shared/classes/alfresco/extension/audit directory. Activate the sample files by removing the .sample extension and restarting the Alfresco server.

## Test source code \(can provide a useful set of examples\)

For JUnit code, the unit test code demonstrates use of the Audit APIs and configuration:

```
org.alfresco.repo.audit.AuditComponentTest
```

-   alfresco-audit-test-authenticationservice.xml: This is used by the test to capture both successful and unsuccessful login attempts in the audit data.
-   `testAuditAuthenticationService`: This demonstrates the use of the `auditSearch` method.

## Records Management auditing code

For Records Management \(DOD5015\) and auditing, the module pulls in audit data from the `AuthenticationService` but adds more data around the individual actions that take place during Records Management processes.

```
org.alfresco.module.org_alfresco_module_dod5015.audit.*
```

-   `RecordsManagementAuditServiceImpl$RMAuditTxnListener`: This transaction listener generates Records Management-specific data for events \(it is a `Data Producer`\). It generates node property deltas.
-   config/alfresco/module/org\_alfresco\_module\_dod5015/audit/rm-audit.xml: This defines how the data produced by the `AuthenticationService` and the Records Management module is persisted. There are some custom `DataGenerator`s and `DataRecorder`s.
-   `RecordsManagementAuditServiceImpl.getAuditTrailImpl`: This method demonstrates how the Records Management use-case searches the audit data. Further query extensions are required to extend the search filters available using the `auditQuery` API.

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

