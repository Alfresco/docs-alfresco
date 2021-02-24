---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# Audit configuration files

This section describes the location and basic structure of the audit configuration files.

Audit configuration files are picked up automatically using the following search paths.

-   classpath\*:alfresco/audit/\*.xml
-   classpath\*:alfresco/enterprise/audit/\*.xml
-   classpath\*:alfresco/module/\*/audit/\*.xml
-   classpath\*:alfresco/extension/audit/\*.xml

The XML schema is located at <configRoot\>/classes/alfresco/audit/alfresco-audit-3.2.xsd.

The configuration file structure is divided into four basic sections:

-   **<DataExtractors\>**

    In this section, DataExtractors are declared for use in the `<Application>` sections of the configuration files. A DataExtractor is a component that uses input data to produce some output, either transforming the data or outputting the data verbatim. The simplest extractor is the `SimpleValueDataExtractor`, which returns whatever data is passed in. A more complex extractor is the `NodeNameDataExtractor`, which is able to produce the `cm:name` value of a node, assuming the data passed in is a NodeRef. For the complete set of built-in generators, see the `org.alfresco.repo.audit.extractor` package, or the `auditModel.extractor.*` beans, which are declared in `alfresco/audit-services-context.xml`.

    The extractors can be declared in-line, for example:

    ```
        <DataExtractors>
           <DataExtractor name="simpleValue" class="org.alfresco.repo.audit.extractor.SimpleValueDataExtractor"/>
           ...
        </DataExtractors>
    ```

    Or they can be declared in Spring configuration and referenced in the audit configuration \(see the alfresco/audit-services-context.xml file\), for example:

    ```
        <DataExtractors>
           <DataExtractor name="simpleValue" registeredName="auditModel.extractor.simpleValue"/>
           ...
        </DataExtractors>
    ```

-   **<DataGenerators\>**

    In this section, DataGenerators are declared for use in the `<Application>` sections of the configuration files. A DataGenerator is a component that produces data without any input, that is, data is produced when a data path is active, but is independent of the values at that path. Examples of generators are the `AuthenticatedUserDataGenerator` component, which produces the name of the currently-authenticated user \(user in context\) and the `AuthenticatedPersonDataGenerator` component, which produces the full name of the currently-authenticated user \(person in context\). For the complete set of built-in generators, see the `org.alfresco.repo.audit.generator` package or the `auditModel.generator.*` beans, which are declared in the alfresco/audit-services-context.xml file.

    The generators can be declared in-line, for example:

    ```
        <DataGenerators>
           <DataGenerator name="currentUser" class="org.alfresco.repo.audit.generator.AuthenticatedUserDataGenerator"/>
           <DataGenerator name="personFullName" class="org.alfresco.repo.audit.generator.AuthenticatedPersonDataGenerator"/>
        </DataGenerators>
    ```

    Or they can be declared in Spring configuration and referenced in the audit configuration \(see the alfresco/audit-services-context.xml file\), for example:

    ```
        <DataGenerators>
           <DataGenerator name="currentUser" registeredName="auditModel.generator.user"/>
           <DataGenerator name="personFullName" registeredName="auditModel.generator.personFullName"/>
        </DataGenerators>
    ```

-   **<PathMappings\>**

    The expanded map coming from the Data Producers is passed through the path mappings. This is a raw remapping of the input data based on the path names in the data map.

    ```
        <PathMappings>
            <PathMap source="/DOD5015" target="/DOD5015"/>
            <!-- Force the fullName generator to trigger -->
            <PathMap source="/DOD5015/event/node" target="/DOD5015/event/person"/>
            <PathMap source="/alfresco-api/post/AuthenticationService/authenticate" target="/DOD5015/login"/>
        </PathMappings>
    ```

    In this example, all paths starting with `/DOD5015` are mapped verbatim, but without the declaration, the data paths starting with `/DOD5015` are discarded. A small subset of the Alfresco API data is used \(only the `AuthenticationService.authenticate` call\) by mapping all values starting with that path to `/DOD5015/login`.

-   **<Application\>**

    This section defines how the mapped data is to be used by DataGenerators or by DataExtractors.

    ```
        <Application name="DOD5015" key="DOD5015">
            <AuditPath key="login">
                <AuditPath key="args">
                    <AuditPath key="userName">
                        <RecordValue key="value" dataExtractor="simpleValue"/>
                    </AuditPath>
                </AuditPath>
                <AuditPath key="no-error">
                    <GenerateValue key="fullName" dataGenerator="personFullName"/>
                </AuditPath>
                <AuditPath key="error">
                    <RecordValue key="value" dataExtractor="nullValue"/>
                </AuditPath>
            </AuditPath>
        </Application>
    ```


**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

