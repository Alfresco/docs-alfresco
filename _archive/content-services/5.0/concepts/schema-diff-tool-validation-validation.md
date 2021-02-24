---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Troubleshooting, Schema Difference Tool]
keyword: Schema Difference Tool
---

# Validation

The Schema Difference tool can use schema reference XML files to perform validation in addition to that performed by simple differencing.

Validation allows the application of more complex rules than whether there is a difference between two property values. Validation is performed by `DbValidator` objects. A chain of `DbValidator` objects is associated with each database object in the reference schema. Each of these is executed in turn and given the chance to create validation errors based on the corresponding object in the target schema.

If an index has not been given a specific name then the RDBMS will auto-generate one at creation time. This means that the reference schema cannot specify the exact name that the index in the target database will have. This would lead to schema differences being reported if it were not for the use of validators. A `NameValidator` can be specified for such an index:

```


<index name="SQL120116153558430" unique="true">
  <validators>
    <validator class="org.alfresco.util.schemacomp.validator.NameValidator">
      <properties>
        <property name="pattern">SQL[0-9]+</property>
      </properties>
    </validator>
  </validators>
  <columnnames>
    <columnname>ID</columnname>
  </columnnames>
</index>

 
```

This example is from a DB2 schema reference file Schema-Reference-ALF.xml\) and indicates that although in the original reference schema the index was named `SQL120116153558430` any index having the appropriate parent table, column names \(and column order\) is valid as long as the name matches the regular expression `SQL[0-9]+`.

When the validator is invoked, it checks that the name property of the index matches the supplied regular expression. In addition to this, the validator reports, when configured to, that it takes responsibility for the name property of the index. This stops the Schema Difference Tool from applying the differencing logic to the property. A `DbValidator` can choose to apply its validation in addition to the differencing logic by not taking sole responsibility for any properties. Conversely a validator can also take sole responsibility for an entire database object in which case no differencing logic is applied to any part of the object.

A similar problem to the auto-generated name problem is when a database object is created automatically. DB2 creates indexes on the fly under certain circumstances. It is not known whether these indexes will exist at the time the Schema Difference Tool will be run. Furthermore, the indexes are an implementation detail for DB2 rather than an explicit declaration on how the Alfresco schema should appear. To suppress such errors an `IgnoreObjectValidator` can be used - it takes responsibility for validation of the associated database object, but performs no actual validation.

## Another index related example

Supposing an index is expected to be auto-generated and is defined in the schema reference file as:

```


<index name="SQL120116153558430" unique="true">
  <validators>
    <validator class="org.alfresco.util.schemacomp.validator.NameValidator">
      <properties>
        <property name="pattern">SQL[0-9]+</property>
      </properties>
    </validator>
  </validators>
  <columnnames>
    <columnname>ID</columnname>
  </columnnames>
</index>


```

Perhaps a specific unsupported upgrade path has introduced an unexpected schema change - it might not be a problem, but it is important that differences are highlighted so that a decision can be made on whether the difference represents a problem and whether a fix will need to be made. On running the Schema Difference Tool, the following might be observed in the log files:

```

2012-01-31 14:28:50,697  WARN  [domain.schema.SchemaBootstrap] [main] Schema validation found 1 potential problems, results written to:
/tomcat/temp/Alfresco/Alfresco-DB2Dialect-Validation-Post-Upgrade-alf_-4048062354335481885.txt
2012-01-31 14:28:51,440  INFO  [domain.schema.SchemaBootstrap] [main] Compared database schema with reference schema (all OK):
class path resource [alfresco/dbscripts/create/org.hibernate.dialect.DB2Dialect/Schema-Reference-AVM.xml]
2012-01-31 14:28:53,326  INFO  [domain.schema.SchemaBootstrap] [main] Compared database schema with reference schema (all OK):
class path resource [alfresco/dbscripts/create/org.hibernate.dialect.DB2Dialect/Schema-Reference-JBPM.xml]
2012-01-31 14:28:54,682  INFO  [domain.schema.SchemaBootstrap] [main] Compared database schema with reference schema (all OK):
class path resource [alfresco/dbscripts/create/org.hibernate.dialect.DB2Dialect/Schema-Reference-ACT.xml]

```

The AVM, JBPM and ACT database objects are all as expected, but there is a difference between the target schema and the ALF \(alf\_ prefixed database objects\) schema reference. Looking at that file it can be seen that an index that is expected to have been auto-generated has been created with an explicit name:

```

Validation: index ALFUSER.ALF_ACCESS_CONTROL_ENTRY.SQL120131142718040.name="idx_alf_ace_auth" fails to match rule: name must match pattern 'SQL[0-9]+'

```

Specifically, the error report is stating that the index defined in the schema reference having the name `SQL120131142718040` belonging to the table `ALF_ACCESS_CONTROL_ENTRY` is expected to be named in the same way: prefixed with SQL then a string of one or more digits.

In addition to automatic validation, validation can be manually invoked by use of the JMX interface.

**Note:** This is an enterprise only feature.

The JMX category **Alfresco**, **DatabaseInformation**, **SchemaValidator** contains one operation:

```

            void validateSchema()
            
```

The operation takes no parameters and returns nothing. However, if the operation is invoked then validation will be performed and the Alfresco log will show the results:

```
            
2012-01-31 14:51:46,770  INFO  [domain.schema.SchemaBootstrap] [RMI TCP Connection(13)-10.244.50.71] Compared database schema
with reference schema (all OK): class path resource
[alfresco/dbscripts/create/org.hibernate.dialect.PostgreSQLDialect/Schema-Reference-ALF.xml]
2012-01-31 14:51:47,360  INFO  [domain.schema.SchemaBootstrap] [RMI TCP Connection(13)-10.244.50.71] Compared database schema
with reference schema (all OK): class path resource
[alfresco/dbscripts/create/org.hibernate.dialect.PostgreSQLDialect/Schema-Reference-AVM.xml]
2012-01-31 14:51:49,847  INFO  [domain.schema.SchemaBootstrap] [RMI TCP Connection(13)-10.244.50.71] Compared database schema
with reference schema (all OK): class path resource
[alfresco/dbscripts/create/org.hibernate.dialect.PostgreSQLDialect/Schema-Reference-JBPM.xml]
2012-01-31 14:51:50,910  INFO  [domain.schema.SchemaBootstrap] [RMI TCP Connection(13)-10.244.50.71] Compared database schema
with reference schema (all OK): class path resource
[alfresco/dbscripts/create/org.hibernate.dialect.PostgreSQLDialect/Schema-Reference-ACT.xml]

```

In the example there were no problems found in the target schema.

**Parent topic:**[Performing schema validation](../concepts/schema-diff-tool-validation.md)

