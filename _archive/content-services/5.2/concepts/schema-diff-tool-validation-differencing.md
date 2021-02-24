---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Differencing

Differencing produces similar information to that obtained by using the Unix tool `diff` against a known 'good' reference schema dump and a potentially problematic target schema dump.

However, since the tool is designed for performing a comparison between two database schemas, rather than arbitrary text, the output is more specific about the types of difference. The types of difference that can be reported are:

-   A database object appears in both the reference and target schemas, but has differences in its properties. For example if an index appears in both schemas but has a different name.
-   A database object appears in the reference schema but no corresponding object has been identified in the target database.
-   A database object appears in the target schema but no corresponding object has been identified in the reference database.

One advantage of the Schema Differencing Tool differencing over traditional diff tool comparisons is that an index is not recognized by the exact text appearing in a dump. Instead it is identified by which table the index belongs to, which columns are indexed and in what order. If an index has the expected name and belongs to the correct table but has the wrong columns, or the correct columns in the wrong order, then differences will be reported. Or conversely, if the correct table has an index with the correct columns in the correct order, but has the wrong index name, then this will be reported. The name can be ignored during comparisons \(useful for auto-generated index names\) or can be taken into account. Part of the task of producing reference schema files is to specify this behavior using `DbValidator` objects, which are explained in the following sections.

## Index related example

Supposing we have the following index defined in the reference schema:

|Index name|`permission_id`|
|Parent table|`alf_access_control_entry`|
|Columns|`permission_id`, `authority_id`, `allowed`, `applies`|

This index is specified in the schema reference file in this way \(parts omitted for brevity\):

```


<table name="alf_access_control_entry">
  <!-- column definitions, primary keys and foreign keys ommitted -->
  <indexes>
    <index name="permission_id" unique="true">
      <columnnames>
        <columnname>permission_id</columnname>
        <columnname>authority_id</columnname>
        <columnname>allowed</columnname>
        <columnname>applies</columnname>
      </columnnames>
    </index>
    <!-- further index definitions ommitted -->
  </indexes>
</table>


```

When the target schema's index is compared against this reference then firstly a list of candidate matches are produced. There can be more than one matching index in the target schema, in which case a redundant database object warning is issued.

Candidate matches are produced dependent on object type. For indexes:

1.  If the parent table is the same and the index name is the same, then it is considered the same index.
2.  If the name is different but the parent table is the same and the columns indexed are the same, and in the same order, then it is is considered to be the same index.

Taking the first scenario for matching and using the `permission_id` index defined in the example, then if the `permission_id` index in the target database has the `allowed` and `applies` columns in the reverse order than is expected, the log file would notify us of validation problems:

```

2012-01-31 11:24:24,280  WARN  [domain.schema.SchemaBootstrap] [RMI TCP Connection(11)-10.244.50.71]
Schema validation found 2 potential problems, results written to:
/tomcat/temp/Alfresco/Alfresco-PostgreSQLDialect-Validation-alf_-5903917616348258838.txt

```

The contents of the report file would look similar to the following:

```
        
Difference: expected index .alf_access_control_entry.permission_id.columnNames[2]="allowed",
but was .alf_access_control_entry.permission_id.columnNames[2]="applies"
Difference: expected index .alf_access_control_entry.permission_id.columnNames[3]="applies",
but was .alf_access_control_entry.permission_id.columnNames[3]="allowed"

```

Each line shows a problem with a particular database property. Here it indicates that the property at the path `.alf_access_control_entry.permission_id.columnNames[2]` has the value `applies` but according to the reference schema should be allowed. The leading dot of the path can be ignored \(the schema name would be present before the leading dot in the case of Oracle for example\), then there is the table name `alf_access_control_entry`, the index name `permission_id` within that, and a zero-indexed list property within that. The third item \(index 2\) is the property at fault: `columnNames[2]`.

Similarly, the next line indicates that the next item in the column name list, `columnNames[3]`, has the value `allowed` but was expected to be `applies`.

**Parent topic:**[Performing schema validation](../concepts/schema-diff-tool-validation.md)

