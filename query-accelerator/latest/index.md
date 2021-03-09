---
title: Alfresco Query Accelerator 
---

The Query Accelerator is a mechanism for optimising selected queries in very large content repositories. We would
suggest using this feature to support large transactional deployments with hundreds of millions of nodes, where
documents are automatically imported from other systems, rather than traditional collaborative content management
system where humans are creating documents. In transactional deployments there typically is a case id and one or two
other properties, which identify a related collection of documents.

An administrator may define a combination of properties and aspects as a `query set`, to support a faster alternative to
TMDQ (Transactional MetaData Query) or Solr. Properties may be from multiple types or aspects. A single query set can
speed up more than one query if the queries share common search properties or aspects. A number of different query sets
may be created to support queries with different search properties or aspects.

This performance comes at the cost of additional space for denormalized databases tables and indexes as well as a minimal increased time on ingestion and update. This will however allow customers to make that decision. Having many properties in a query set or having lots of query sets should be avoided, as the cost will be high and generally indicates that
there is something wrong with the data model design.

## Operational overview

1. Query sets may be applied to an existing Alfresco repository. For example a query set could be applied to a system
which has been upgraded to 7.0.0 that already contains hundreds of millions of documents.

2. Multiple (zero or more but typically not more than 10) query sets may be defined. Each will have its own name. It will
be possible to replace a query set with a new version or to remove it completely. The definition can include the
properties or aspects applied to nodes and if necessary (for selected databases) the order of columns
in compound indexes. Query sets are defined using JSON files.

3. Administrator's perform a query set refresh in the Alfresco Administration Console. The addition of new query sets, 
the replacement of an existing query set or complete removal does not require a restart, an outage or have a major impact on normal operations. The `alfresco.log` will contain messages to reflect progress. When a new query set is identified, the system will start populating a denormalized 
table in the background. It will also abandon the table population before it is complete, if a new 
version of the query set is created. The implementation will also need to identify a query 
set or if a previous version is no longer needed and issue a message to the `alfresco.log` to advise that the query set 
can be deleted.

4. Once a denormalized table has been created and fully populated, it will automatically start being used.

5. The Query Accelerator will provide ATOMIC (transactionally consistent) results.

6. The Query Accelerator is only an enterprise edition feature.
