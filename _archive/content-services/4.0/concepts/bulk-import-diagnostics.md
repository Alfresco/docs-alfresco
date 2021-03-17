---
author: Alfresco Documentation
---

# Bulk Import diagnostics

To troubleshoot or diagnose any issues with bulk import, you can enable logging.

To enable debugging for the Bulk Import tool, use the following command:

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

**Parent topic:**[Using the Bulk Import tool](../concepts/Bulk-Import-Tool.md)

