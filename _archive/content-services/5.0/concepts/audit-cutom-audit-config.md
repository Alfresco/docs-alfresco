---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: audit
---

# Custom audit configuration

The most common reason to customize the audit configuration is if there is a need to extract individual property or aspect values that have special meaning to a particular Alfresco installation.

For example, a security clearance level has been added to content and it is important to include that clearly in the persisted audit data, rather than having to find it deep within a map of all properties. The default configuration includes an example. It extracts the `name` property. It is generally a good idea to create a new audit configuration file that includes a mapped path to avoid confusion with the default. If running under Tomcat place the audit configuration file in the <tomcat\>/shared/classes/alfresco/extension/audit directory. The following example is simply a cut down version of the default with the path mapped to a new value.

The following is an example of the myApp.xml file.

```
<?xml version="1.0" encoding="UTF-8"?>
<Audit xmlns="http://www.alfresco.org/repo/audit/model/3.2"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.alfresco.org/repo/audit/model/3.2
    alfresco-audit-3.2.xsd">

  <DataExtractors>
    <DataExtractor name="simpleValue"
        registeredName="auditModel.extractor.simpleValue"/>
  </DataExtractors>

  <PathMappings>
    <PathMap source="/alfresco-access" target="/my-app" />
  </PathMappings>

  <Application name="my-app" key="my-app">
    <RecordValue
        key="action" dataExtractor="simpleValue"
        dataSource="/my-app/transaction/action"
        dataTrigger="/my-app/transaction/action" />
    <RecordValue
        key="user" dataExtractor="simpleValue"
        dataSource="/my-app/transaction/user"
        dataTrigger="/my-app/transaction/user" />
    <RecordValue
        key="path" dataExtractor="simpleValue"
        dataSource="/my-app/transaction/path"
        dataTrigger="/my-app/transaction/path" />
  </Application>

</Audit>
```

The following shows the AccessAuditor debug for a move action.

```
Audit data:
    /my-app/action=MOVE
    /my-app/path=/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:Word 123.docx
    /my-app/user=admin

Inbound audit values:
    /alfresco-access/transaction/action=MOVE
    /alfresco-access/transaction/node=workspace://SpacesStore/90a398d1-8e0d-462a-8c3b-f0b17a2d1143
    /alfresco-access/transaction/move/from/node=workspace://SpacesStore/a82446e9-4dca-49d2-9ce0-4526687fb310
    /alfresco-access/transaction/move/from/path=/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:folder1/cm:Word 123.docx
    /alfresco-access/transaction/move/from/type=cm:folder
    /alfresco-access/transaction/path=/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:Word 123.docx
    /alfresco-access/transaction/sub-action/00/action=moveNode
    /alfresco-access/transaction/sub-action/00/move/from/node=workspace://SpacesStore/a82446e9-4dca-49d2-9ce0-4526687fb310
    /alfresco-access/transaction/sub-action/00/move/from/path=/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:folder1/cm:Word 123.docx
    /alfresco-access/transaction/sub-action/00/move/from/type=cm:folder
    /alfresco-access/transaction/sub-action/01/action=readContent
    /alfresco-access/transaction/sub-actions=moveNode readContent
    /alfresco-access/transaction/type=cm:content
    /alfresco-access/transaction/user=admin
```

**Parent topic:**[Content auditing customizations](../concepts/audit-cust.md)

