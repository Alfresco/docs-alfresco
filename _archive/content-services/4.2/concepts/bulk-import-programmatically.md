---
author: Alfresco Documentation
---

# Bulk importing using a program

Code examples show you how to complete a streaming bulk import and an in-place bulk import programmatically.

## Streaming

```
   UserTransaction txn = transactionService.getUserTransaction();
   txn.begin();
            
   AuthenticationUtil.setRunAsUser("admin");
                  
   StreamingNodeImporterFactory streamingNodeImporterFactory = (StreamingNodeImporterFactory)ctx.getBean("streamingNodeImporterFactory");
   NodeImporter nodeImporter = streamingNodeImporterFactory.getNodeImporter(new File("importdirectory"));
   BulkImportParameters bulkImportParameters = new BulkImportParameters();
   bulkImportParameters.setTarget(folderNode);
   bulkImportParameters.setReplaceExisting(true);
   bulkImportParameters.setBatchSize(40);
   bulkImportParameters.setNumThreads(4);
   bulkImporter.bulkImport(bulkImportParameters, nodeImporter);

   txn.commit();
```

## In-place

```
   txn = transactionService.getUserTransaction();
   txn.begin();

   AuthenticationUtil.setRunAsUser("admin");

   InPlaceNodeImporterFactory inPlaceNodeImporterFactory = (InPlaceNodeImporterFactory)ctx.getBean("inPlaceNodeImporterFactory");
   NodeImporter nodeImporter = inPlaceNodeImporterFactory.getNodeImporter("default", "2011");
   BulkImportParameters bulkImportParameters = new BulkImportParameters();
   bulkImportParameters.setTarget(folderNode);
   bulkImportParameters.setReplaceExisting(true);
   bulkImportParameters.setBatchSize(150);
   bulkImportParameters.setNumThreads(4);
   bulkImporter.bulkImport(bulkImportParameters, nodeImporter);  
  
   txn.commit();
```

For more information about the Alfresco web scripts that you invoke to script a bulk import, see [Bulk importing using the user interface](bulk-import-via-the-ui.md).

For more information about the bulk import fields and their meanings, see [Bulk Import tool fields and values](../references/bulk-import-table.md).

**Parent topic:**[Importing with the Bulk Import tool](../concepts/bulk-import-importing.md)

