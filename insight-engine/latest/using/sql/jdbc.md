---
title: JDBC driver
---

Search and Insight Engine includes a JDBC thin client that can be used with Insight Zeppelin and other SQL clients.

To access the client log into [https://nexus.alfresco.com/nexus/#welcome](https://nexus.alfresco.com/nexus/#welcome) and search for `alfresco-insight-jdbc-2.0.0.jar`.

> **Note:** Contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"} for log in credentials.

## Connection string

The connection string's host and port should point to the Alfresco Content Services repository. The Alfresco Content Services repository performs the authentication. It applies the access control lists to the request before forwarding the request to Search and Insight Engine.

The JDBC connection string uses the following format:

```bash
jdbc:solr://<alfresco-server-name>:<alfresco-server-port>?collection=alfresco
```

For example, this database URL property value:

```bash
jdbc:solr://localhost:8080?collection=alfresco
```

Will generate the following request:

`http://localhost:8080/alfresco/api/-default-/public/search/versions/1/jdbc`

> **Note:** When using the default HTTP port of 80 you do not need to add it to the database URL.

## Alfresco using web proxy with HTTPS

When Alfresco Content Services is configured to use HTTPS with a WebProxy like Apache HTTPd or NGINX, the JDBC connection string uses the following format:

```bash
jdbc:alfresco://localhost?collection=alfresco
```

> **Note:** When using the default connection port of 443 you do not need to add it to the connection string.

When using HTTPs you need to add the following driver properties:

```bash
javax.net.ssl.trustStoreType: JKS
javax.net.ssl.trustStore: /docker-compose/stores/trusted.jks
javax.net.ssl.trustStorePassword: alfresco

alfresco.enable.ssl: true
alfresco.ssl.checkPeerName: false
```

> **Note:** The trusted.jks file is a truststore that includes the public certificate of your Alfresco Content Services HTTPs endpoint. If you are using an SSL certificate that is trusted by your JVM, and it includes the real DNS in the CN field of the certificate, you only need to include the following configuration in the driver properties:

```bash
alfresco.enable.ssl: true
```

## Alfresco using mTLS

When Alfresco Content Services is configured to use mTLS to communicate with SOLR, the JDBC connection string uses the following format:

```bash
jdbc:alfresco://localhost:8443?collection=alfresco
```

You need to add the truststore and keystore from SOLR to the properties of the driver using the following:

```bash
javax.net.ssl.trustStoreType: JCEKS
javax.net.ssl.trustStore: /docker-compose/keystores/solr/ssl.repo.client.truststore
javax.net.ssl.trustStorePassword: kT9X6oe68t

javax.net.ssl.keyStoreType: JCEKS
javax.net.ssl.keyStore: /docker-compose/keystores/solr/ssl.repo.client.keystore
javax.net.ssl.keyStorePassword: kT9X6oe68t

alfresco.enable.ssl: true
alfresco.ssl.checkPeerName: false
```

## Authentication and authorization

The Search and Insight Engine JDBC driver logs into Alfresco Content Services using the same credentials used to access the Alfresco Content Services repository. The results of all queries are limited to the documents the user has been authorized to read.

### Usage

The Alfresco JDBC driver can be used from programs like [DbVisualizer](https://www.dbvis.com/) and [SquirrelSql](http://squirrel-sql.sourceforge.net/) but you can also write custom code using Java to perform SQL queries. For example:

```java
String sql = "select DBID, LID from alfresco where cm_content = 'world' order by DBID limit 10 ";
String alfrescoJson = "{"tenants":[""],"locales":["en_US"],"defaultNamespace":"http://www.alfresco.org/model/content/1.0","textAttributes":[],"defaultFTSOperator":"OR","defaultFTSFieldOperator":"OR","anyDenyDenies":true,"query":"name:*","templates":[],"allAttributes":[],"queryConsistency":"DEFAULT","authorities":["GROUP_EVERYONE","ROLE_ADMINISTRATOR","ROLE_AUTHENTICATED","admin"]}";

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

### Additional notes

When using trusted certificates (included by default on the JVM), the java.net.ssl.trustStore properties setting can be skipped.

Trusted certificates (CAs) that appear by default in your local JVM can be obtained with the following command:

```bash
$ keytool -list -cacerts
```

When using a certificate, including the name of the server of the real DNS in the CN attribute of the certificate, the `alfresco.ssl.cheekPeerName` setting can be skipped.
