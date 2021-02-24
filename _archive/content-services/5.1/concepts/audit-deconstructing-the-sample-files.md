---
author: Alfresco Documentation
---

# Deconstructing the sample files

The Sample Files provide a useful starting point for creating your own audit applications.

There are two Audit Application sample files in ./tomcat/shared/classes/alfresco/extension/audit:

-   alfresco-audit-example-login.xml.sample
-   alfresco-audit-example-extractors.xml.sample

See the documentation on [Using the auditing sample files](audit-sample-files.md).

**Note:** It is usual to put each audit application in its own file. The sample files however do combine more applications for ease of reference.

The following sections deconstruct the contents of the sample files.

## The login example \(alfresco-audit-example-login.xml.sample\)

**Audit Configuration**

The Audit Configuration section the Audit Configuration:

```

                    
<Audit
    xmlns="http://www.alfresco.org/repo/audit/model/3.2"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.alfresco.org/repo/audit/model/3.2 alfresco-audit-3.2.xsd"
    >
    ...    
</Audit>
                    
                
```

**Data Extractors**

The data extractor section describes any data extractors to be used to extract the value from the audit data. In this case the `SimpleValue` extractor provided out of the box:

```


<DataExtractors>
    <DataExtractor name="simpleValue" registeredName="auditModel.extractor.simpleValue"/>
</DataExtractors>

```

**Data Generators**

This section of the configuration defines the data generator to be used. In this case the `personFullName` generator is specified. This will activate when an inbound mapped path is present, but is not dependent on the value on that path. For example, `AuditExampleLogin2` triggers the `personFullName` generator when the `authenticate/no-error` path is present; this records the full name of the currently-authenticated user even though the inbound data for `authenticate/no-error` is `null`:

```

    
<DataGenerators>
   <DataGenerator name="personFullName" registeredName="auditModel.generator.personFullName"/>
</DataGenerators>

```

**Path Mappings**

This section defines the Path Mappings. Path Mappings map events into applications. The `source` event is linked to the audit application key specified in the `target` attribute. In effect the format for target is `<application_key/audit_path_key>`. So, taking the first path mapping, `/alfresco-api/post/AuthenticationService/authenticate` events are mapped to the `login` audit path key of the `auditexamplelogin1` application \(the applications are specified next in the file and you will need to examine these in order to understand path mappings\). If you look at the definition of `AuditExampleLogin1` you will see it has the audit path key "login" \(`<AuditPath key="login">`\). Now, the source event `/alfresco-api/post/AuthenticationService/authenticate` may have "sub events" such as `error` and `no-error`, for example: `/alfresco-api/post/AuthenticationService/authenticate/error`. What this means is that for the application `AuditExampleLogin1` it will record the username for both successful and unsuccessful logins. Notice however, that the path mapping for AuditExample2 is different. The source is `/alfresco-api/post/AuthenticationService/authenticate/no-error`, so only this event will be mapped into the application, specifically to the audit path with the key "login". The effect of this is that only successful logins will be recorded.

```

    <PathMappings>
        <PathMap source="/alfresco-api/post/AuthenticationService/authenticate" target="/auditexamplelogin1/login"/>
        <PathMap source="/alfresco-api/post/AuthenticationService/authenticate/no-error" target="/auditexamplelogin2/login"/>
    </PathMappings>                    
                    
```

**Audit Application**

Here, one or more audit applications are defined. See also the previous section for discussion on Path Mappings. Path Mappings are important to understanding how applications work. This audit application will record username for successful and failed logins.

```

    <Application name="AuditExampleLogin1" key="auditexamplelogin1">
        <AuditPath key="login">
            <AuditPath key="no-error">
                <RecordValue key="user" dataExtractor="simpleValue" dataSource="/auditexamplelogin1/login/args/userName"/>
            </AuditPath>
            <AuditPath key="error">
                <RecordValue key="user" dataExtractor="simpleValue" dataSource="/auditexamplelogin1/login/args/userName"/>
            </AuditPath>
        </AuditPath>
    </Application>                  
                    
```

**Audit Application**

Another audit application definition. See also the previous section for discussion on Path Mappings. This audit application will record full name for only successful logins.

```

<Application name="AuditExampleLogin2" key="auditexamplelogin2">
    <AuditPath key="login">
        <GenerateValue key="user" dataGenerator="personFullName"/>
    </AuditPath>
</Application>      
                    
```

## The data extractors sample \(alfresco-audit-example-extractors.xml.sample\)

```

            
<?xml version='1.0' encoding='UTF-8'?>

<!--                                                                                                                                                                                        
   An example of how user login details can be captured.                                                                                                                                    
-->

<Audit
    xmlns="http://www.alfresco.org/repo/audit/model/3.2"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.alfresco.org/repo/audit/model/3.2 alfresco-audit-3.2.xsd"
    >

    <DataExtractors>
       <DataExtractor name="simpleValue" registeredName="auditModel.extractor.simpleValue"/>
       <DataExtractor name="nullValue" registeredName="auditModel.extractor.nullValue"/>
       <DataExtractor name="nodeNameValue" registeredName="auditModel.extractor.nodeName"/>
       <DataExtractor name="nodeTypeValue" registeredName="auditModel.extractor.nodeType"/>
    </DataExtractors>

    <PathMappings>
        <PathMap source="/alfresco-api/post/NodeService/createNode" target="/auditexampleextractors"/>
    </PathMappings>

    <Application name="AuditExampleExtractors" key="auditexampleextractors">
        <AuditPath key="create">
            <AuditPath key="in">
                <RecordValue key="a" dataExtractor="simpleValue" dataSource="/auditexampleextractors/args/parentRef" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="b" dataExtractor="simpleValue" dataSource="/auditexampleextractors/args/nodeTypeQName" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="c" dataExtractor="simpleValue" dataSource="/auditexampleextractors/args/assocTypeQName" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="d" dataExtractor="simpleValue" dataSource="/auditexampleextractors/args/assocQName" dataTrigger="/auditexampleextractors/no-error"/>
            </AuditPath>
            <AuditPath key="out">
                <RecordValue key="a" dataExtractor="simpleValue" dataSource="/auditexampleextractors/result" dataTrigger="/auditexampleextractors/no-error"/>
            </AuditPath>
            <AuditPath key="derived">
                <RecordValue key="parent-node-null" dataExtractor="nullValue"     dataSource="/auditexampleextractors/args/parentRef" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="parent-node-name" dataExtractor="nodeNameValue" dataSource="/auditexampleextractors/args/parentRef" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="parent-node-type" dataExtractor="nodeTypeValue" dataSource="/auditexampleextractors/args/parentRef" dataTrigger="/auditexampleextractors/no-error"/>
            </AuditPath>
        </AuditPath>
    </Application>

</Audit>   
   

```

**Parent topic:**[Audit configuration](../concepts/audit-custom-audit-config.md)

