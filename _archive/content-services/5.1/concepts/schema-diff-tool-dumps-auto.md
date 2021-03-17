---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Troubleshooting, Schema Difference Tool]
keyword: Schema Difference Tool
---

# Automatic dumps

Schema dumps are performed automatically on Alfresco server startup, if changes in database schema are detected.

Schema dumps are XML representations of the RDBMS schema. They should conform to the XSD: `http://www.alfresco.org/repo/db-schema/db-schema.xsd` The XSD file is embedded in the repository.

A schema dump is performed automatically during repository server startup if there were changes made to the database schema. The Alfresco log will indicate if any dumps were performed - entries such as these will be present:

```

2012-01-30 17:46:58,517  INFO  [domain.schema.SchemaBootstrap] [main] Normalized schema dumped to file
/tomcat/temp/Alfresco/Alfresco-schema-PostgreSQLDialect-pre-upgrade-alf_-5548956643327704619.xml.
2012-01-30 17:46:58,518  INFO  [domain.schema.SchemaBootstrap] [main] Normalized schema dumped to file
/tomcat/temp/Alfresco/Alfresco-schema-PostgreSQLDialect-pre-upgrade-avm_-2166257481854030130.xml.
2012-01-30 17:46:58,518  INFO  [domain.schema.SchemaBootstrap] [main] Normalized schema dumped to file
/tomcat/temp/Alfresco/Alfresco-schema-PostgreSQLDialect-pre-upgrade-jbpm_-2230905975269998715.xml.
2012-01-30 17:46:58,519  INFO  [domain.schema.SchemaBootstrap] [main] Normalized schema dumped to file
/tomcat/temp/Alfresco/Alfresco-schema-PostgreSQLDialect-pre-upgrade-act_-8103448407472298481.xml.

```

Similar entries for the post-upgrade files will also be present.

**Note:** The legacy tool is still included and will create dumps of its own - the log messages look similar but should not be confused with the new format dumps.

**Note:** JBPM has been removed from Alfresco. Schema dump will ignore any JBPM tables and not treat their presence or absence as an error.

**Parent topic:**[Performing schema dumps](../concepts/schema-diff-tool-dumps.md)

