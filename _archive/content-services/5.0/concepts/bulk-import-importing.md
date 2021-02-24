---
author: Alfresco Documentation
---

# Importing with the Bulk Import tool

You can bulk import by using the user interface, orwith a program.

Alfresco web scripts are used for bulk importing. If you choose to code the bulk import, code examples are provided to help you. In both cases, you can use the reference table to determine the fields and data that are required for a successful import.

If you need to troubleshoot or diagnose any issues with a bulk import, you can enable logging. To enable debugging for the Bulk Import tool, add the following command to the log4j.properties file before deployment:

```
log4j.logger.org.alfresco.repo.bulkimport=DEBUG
```

Set the debug statements to at least INFO level:

```
log4j.logger.org.alfresco.repo.batch.BatchProcessor=info
```

You can also enable logging for the transaction handler to identify any transactional issues during the import:

```
log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=info
```

For more information about log4j, see [log4j.properties file](dev-extensions-modules-module-log4j.md).

-   **[Bulk importing using the user interface](../concepts/bulk-import-via-the-ui.md)**  
The two types of bulk import \(streaming and in-place\) each have a user interface, which are implemented using Alfresco web scripts.
-   **[Bulk importing using a program](../concepts/bulk-import-programmatically.md)**  
Code examples show you how to complete a streaming bulk import and an in-place bulk import programmatically.
-   **[Bulk Import tool fields and values](../references/bulk-import-table.md)**  
The Bulk Import tool has a number of entry and display fields that are displayed in the user interface, but also referenced in the status.xml file that is used if you are programming a bulk import. The labels, fields, possible values and a summary of each entry is explained in this information.

**Parent topic:**[Using the Bulk Import tool](../concepts/Bulk-Import-Tool.md)

