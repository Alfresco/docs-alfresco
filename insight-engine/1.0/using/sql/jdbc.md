---
title: JDBC driver and SSL Encryption 
---

Search and Insight Engine includes a JDBC thin client that can be used with Insight Zeppelin and other SQL clients. The JDBC driver can also be used directly from a Java application. See the following sample code using the JDBC driver:

```sql
String sql = "select DBID, LID from alfresco where cm_content = 'world' order by DBID limit 10 ";
String alfrescoJson = "{\"tenants\":[\"\"],\"locales\":[\"en_US\"],\"defaultNamespace\":\"http://www.alfresco.org/model/content/1.0\",\"textAttributes\":[],\"defaultFTSOperator\":\"OR\",\"defaultFTSFieldOperator\":\"OR\",\"anyDenyDenies\":true,\"query\":\"name:*\",\"templates\":[],\"allAttributes\":[],\"queryConsistency\":\"DEFAULT\",\"authorities\":[\"GROUP_EVERYONE\",\"ROLE_ADMINISTRATOR\",\"ROLE_AUTHENTICATED\",\"admin\"]}";

Properties props = new Properties();
props.put("alfresco.shards", "http://localhost:8983/solr/alfresco")
props.put("json", alfrescoJson);

String connectionString = "jdbc:alfresco://localhost:8080?collection=alfresco";
Connection con = null;
Statement stmt = null;
ResultSet rs = null;
    
try {
        con = DriverManager.getConnection(connectionString, props);
        stmt = con.createStatement();
        rs = stmt.executeQuery(sql);
        int i=0;
        while (rs.next()) {
            System.out.println(rs.getString("DBID"));
        }
    } finally {
        try { rs.close(); } catch(Exception e) {}
        try { stmt.close();} catch(Exception e) {}
        try { con.close();} catch(Exception e) {}
    }
}
```

## Authentication and Authorization

The Search and Insight Engine JDBC driver logs into Alfresco Content Services using the same user name and password used to access the Alfresco Content Services repository. The results of all queries are limited to the documents that the user has been authorized to read.

## Connection String

The connection string's host and port should point to the Alfresco Content Services repository. The Alfresco Content Services repository performs the authentication and applies the access control lists to the request before forwarding the request to Search and Insight Engine.

## SSL Encryption

By default the Search and Insight Engine JDBC driver communicates with the Alfresco Content Services repository using HTTP. The user name and password are sent using basic authentication and the password is base64 encoded and then sent unencrypted to the Alfresco Content Services repository.

The JDBC driver can also run using SSL encryption to encrypt the basic authentication credentials as well as all other data in the JDBC request and response. For the JDBC driver to use SSL the repository must also be running SSL. To turn on SSL for a specific JDBC connection, the port on the connection URL should point to the SSL port on the Alfresco Content Services repository and the `alfresco.enable.ssl` property must be set to `true`.

There are a number of other properties that can be added to support specific SSL configurations of the Alfresco Content Services repository.

The following connection properties can be added to configure the SSL truststore for the JDBC driver. The truststore is needed if the Alfresco Content Services repository is using a self signed certificate.

* `javax.net.ssl.trustStore`: Should point to the location on disk of the truststore on the same host as the JDBC driver.
* `javax.net.ssl.trustStoreType`: The type of truststore.
* `javax.net.ssl.trustStorePassword`: The passphrase for the truststore.

The following connection properties can be added to configure the SSL keystore for the JDBC driver. The keystore will be needed if the Alfresco Content Services repository is configured to require the X509 client authentication.

* `javax.net.ssl.keyStore`: Should point to the location on disk of the keystore on the same host as the JDBC driver.
* `javax.net.ssl.keyStoreType`: The type of keystore.
* `javax.net.ssl.keyStorePassword`: The passphrase for the keystore.

The `alfresco.ssl.checkPeerName` property must be set to `false` if the domain name of the Alfresco Content Services repository does not match the common name (CN) of the repository's SSL certificate.






