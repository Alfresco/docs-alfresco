---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Alfresco reports

The Alfresco Report page displays the Alfresco core and archive core properties. These properties are used to judge the relative health of the indexes.

See [Unindexed Solr Transactions](solr-unindex.md) for more information.

|Parameter|Description|
|---------|-----------|
|Alfresco version|Specifies the version of Alfresco this Solr was built for.|
|DB transaction count|Specifies the transaction count on the database.|
|DB acl transaction count|Specifies the acl transaction count on the database.|
|Count of duplicated transactions in the index|Specifies the number of transactions that appear more than once in the index. The value of this parameter should be zero. If not, there is an issue with the index.|
|Count of duplicated acl transactions in the index|Specifies the number of ACL transactions that appear more than once in the index. The value of this parameter should be zero. If not, there is an issue with the index.|
|Count of transactions in the index but not the DB|Specifies the number of transactions in the index but not in the database. This count includes empty transactions that have been purged from the database. The value of this parameter should be zero. If not, there may be an issue with the index.|
|Count of acl transactions in the index but not the DB|Specifies the number of acl transactions in the index but not in the database. The value of this parameter should be zero. If not, there is an issue with the index. Note that the empty acl transactions are not currently purged from the database.|
|Count of missing transactions from the Index|Specifies the number of transactions in the database but not in the index. The value of this index should be zero when the index is up-to-date.|
|Count of missing acl transactions from the Index|Specifies the number of acl transactions in the database but not in the index. The value of this index should be zero when the index is up-to-date.|
|Index transaction count|Specifies the number of transactions in the index.|
|Index acl transaction count|Specifies the number of acl transactions in the index.|
|Index unique transaction count|Specifies the number of unique transactions in the index.|
|Index unique acl transaction count|Specifies the number of unique acl transactions in the index.|
|Index leaf count|Specifies the number of documents and folders in the index.|
|Count of duplicate leaves in the index|Specifies the number of duplicate documents or folders in the index. The value of this parameter should be zero. If not, there is an issue with the index.|
|Index aux count|Specifies the count of the auxilary documents \(ID starts with `AUX-`\) in the index. They are created for nodes during index update.|
|Count of duplicate aux docs in the index|Specifies the count of the duplicate auxilary documents in the index. The value of this parameter should be zero. If not, there is an issue with the index.|
|Index error count|Specifies the count of the error documents \(ID starts with `ERROR-`\) in the index. It is used to mark nodes that failed to be indexed. If the value of this parameter is not zero, then there is an issue with the index.|
|Count of duplicate error docs in the index|Specifies the count of the duplicate error documents in the index. The value of this parameter should be zero. If not, there is an issue with the index.|
|Index unindexed count|Specifies the count of the unindexed documents \(ID starts with `UNINDEXED-`\) in the index. It is created for nodes that have `PROP_IS_INDEXED` property set to `false` in the metadata. This property is set to control indexing process, so it can be \> 0. For example, hidden and rendition nodes have this property set to `FALSE`.|
|Count of duplicate unindexed docs in the index|Specifies the count of the duplicate unindexed docs in the index. The value of this parameter should be zero. If not, there is an issue with the index.|
|Last index commit time|Specifies the time stamp for the last transaction added to the index. It also indicates that transactions after this time stamp have not yet been indexed.|
|Last Index commit date|Specifies the time stamp as date for the last transaction added to the index. It also indicates that transactions after this date have not yet been indexed.|
|Last TX id before holes|Specifies that transactions after this id will be checked again to make sure they have not been missed. This is computed from the index at start up time. By default, it is set an hour after the last commit time found in the index. Solr tracking, by default, goes back an hour from the current time to check that no transactions have been missed.|

**Parent topic:**[Connecting to the SSL-protected Solr web application](../tasks/ssl-protect-solrwebapp.md)

**Related information**  


[Unindexed Solr Transactions](solr-unindex.md)

