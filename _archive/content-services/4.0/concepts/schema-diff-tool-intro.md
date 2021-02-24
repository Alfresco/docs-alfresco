---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Troubleshooting, Schema Difference Tool]
keyword: Schema Difference Tool
---

# Troubleshooting schema-related problems

This topic provides an introduction to the Schema Difference Tool.

The Schema Difference Tool provides a way of identifying and troubleshooting problems in Alfresco database schemas. Such problems can sometimes arise when performing certain version upgrades or customized installations.

## Background

The Schema Difference Tool may be used when troubleshooting or examining the database schema for an Alfresco repository. The tool has two main functions:

1.  Producing schema dumps as XML files.
2.  Validating a database schema.

Schema dumps were available in previous versions of Alfresco. However, prior to the introduction of the Schema Difference Tool, the only way to judge the validity of the schema was to examine the file manually and compare schemas with simple text tools such as the Unix diff command. The Schema Difference Tool performs a certain amount of automatic comparison that removes much of the effort needed in making these comparisons.

If any changes are made to the database schema during server start-up \(such as when installing Alfresco afresh\) then the tool performs both schema dumping and validation as described below. The dumps and validation are made both pre-upgrade \(that is before the schema changes\) and post-upgrade.

## Definition of terms used

The terms below are used throughout the rest of this document.

-   **Database object**

    A schema, sequence, table, column, index, primary key or foreign key.

-   **Reference schema**

    The definitive representation of an Alfresco repository schema for a given schema version on a vendor specific RDBMS. The reference schema is a model for what should be present in the database after installing or upgrading an Alfresco repository to a particular version. A reference schema is presented in the same XML format as a schema dump. For example a schema reference may be produced for MySQL on version 5025 of the Alfresco repository schema.

-   **Target schema**

    The database schema that will be compared and validated with respect to a reference schema. For example, if installing an Alfresco repository from scratch, then the newly created schema will be a target schema for comparison against the appropriate reference schema.


-   **[Performing schema dumps](../concepts/schema-diff-tool-dumps.md)**  
Schema dumps are XML representations of the database schema.
-   **[Performing schema validation](../concepts/schema-diff-tool-validation.md)**  
.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

