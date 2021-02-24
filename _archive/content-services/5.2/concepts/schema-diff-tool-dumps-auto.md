---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Automatic dumps

Schema dumps are performed automatically on server startup, if changes in database schema are detected.

Schema dumps are XML representations of the RDBMS schema. They should conform to the XSD: `http://www.alfresco.org/repo/db-schema/db-schema.xsd` The XSD file is embedded in the repository.

A schema dump is performed automatically during repository server start up, if there were changes made to the database schema. The log will indicate if any dumps were performed, and entries such as these will be present:

```
2017-02-16 11:51:19,907 INFO  [org.alfresco.repo.domain.schema.SchemaBootstrap] [localhost-startStop-1] Normalized schema dumped to file
/tomcat/temp/Alfresco/Alfresco-schema-PostgreSQLDialect-pre-upgrade-alf_-3894930030144419413.xml.
2017-02-16 11:51:19,907 INFO  [org.alfresco.repo.domain.schema.SchemaBootstrap] [localhost-startStop-1] Normalized schema dumped to file
/tomcat/temp/Alfresco/Alfresco-schema-PostgreSQLDialect-pre-upgrade-act_-4480941923294636682.xml.
```

Similar entries for the post-upgrade files will also be present.

**Note:** The legacy tool is still included and will create dumps of its own - the log messages look similar but should not be confused with the new format dumps.

**Note:** JBPM has been removed from Alfresco Content Services. Schema dump will ignore any JBPM tables and not treat their presence or absence as an error.

**Parent topic:**[Performing schema dumps](../concepts/schema-diff-tool-dumps.md)

