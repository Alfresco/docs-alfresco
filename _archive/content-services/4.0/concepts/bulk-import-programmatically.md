---
author: Alfresco Documentation
---

# Importing programmatically

The following code snippets show you how to complete a bulk import programmatically.

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

**Parent topic:**[Using the Bulk Import tool](../concepts/Bulk-Import-Tool.md)

