---
title: Troubleshooting Solr Index and SSL configurations
---
Use this information to repair a transaction that failed to index.

> **Note:** The default URL for the Solr index is http://localhost:8080/solr/....

To repair an unindexed or failed transaction (as identified by the REPORT option in the [Unindexed Solr Transactions](solr-unindex.md) section), run the following report:

```http
http://localhost:8080/solr/admin/cores?action=FIX 
```

The `FIX` parameter compares the database with the index and identifies any missing or duplicate transactions. It then updates the index by either adding or removing transactions.

Use the PURGE parameter to remove transactions, acl transactions, nodes and acls from the index. It can also be used for testing wrong transactions and then to fix them.

```http
http://localhost:8080/solr/admin/cores?action=PURGE&txid=1&acltxid=2&nodeid=3&aclid=4
```

Use the REINDEX parameter to reindex a transaction, acl transactions, nodes and acls.

```http
http://localhost:8080/solr/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4
```

Use the INDEX parameter to create entries in the index. It can also be used to create duplicate index entries for testing.

```http
http://localhost:8080/solr/admin/cores?action=INDEX&txid=1&acltxid=2&nodeid=3&aclid=4
```

Use the RETRY parameter to retry indexing any node that failed to index and was skipped. In other words, it enables the users to attempt to fix documents that failed to index in the past and appear in the solr report (http://localhost:8080/solr/admin/cores?action=REPORT&wt=xml) with the field **Index error count**.

```http
http://localhost:8080/solr/admin/cores?action=RETRY
```

Use the following setting to specify an option core for the report. If it is absent, a report is produced for each core. For example:

```bash
&core=alfresco
&core=archive
```

You can also fix index issues, check the index cache and backup individual indexes by using JMX. The status of the index can be checked using the JMX client on the **JMX MBeans > Alfresco > solrIndexes > <store>** tabs. The default view is the Solr core summary. The operations run the same consistency checks that are available by URL.

## Solr troubleshooting for SSL configurations

When you have an Alfresco Content Services installation that requires an SSL configuration, you might encounter connection issues.

If Solr search and/or the Solr tracking is not working properly, you might see this message on the Tomcat console:

```bash
Aug 22, 2011 8:19:21 PM org.apache.tomcat.util.net.jsse.JSSESupport handShake
WARNING: SSL server initiated renegotiation is disabled, closing connection 
```

This message indicates that one side of the SSL connections is trying to renegotiate the SSL connection. This form of negotiation was found to be susceptible to man-in-the-middle attacks and it was disabled in the Java JSEE stack until a fix could be applied.

Refer to the following link for more information: [https://www.oracle.com/technetwork/java/javase/documentation/tlsreadme2-176330.html](https://www.oracle.com/technetwork/java/javase/documentation/tlsreadme2-176330.html).

Refer also to the following links: 

* [https://www.gremwell.com/enabling\_ssl\_tls\_renegotiation\_in\_java](https://www.gremwell.com/enabling_ssl_tls_renegotiation_in_java)
* [https://tomcat.apache.org/tomcat-6.0-doc/config/http.html](https://tomcat.apache.org/tomcat-6.0-doc/config/http.html)

If your version of Java does not have the fix, you need to re-enable renegotiation by performing the following steps: 

1. Add the `-Dsun.security.ssl.allowUnsafeRenegotiation=true` option to `JAVA_OPTS`.
2. Add the `allowUnsafeLegacyRenegotiation="true"` option to the Tomcat SSL connector.
