---
title: Building reports and dashboards
---

Search and Insight Engine comes with a number of out-of-the box reports and a dashboard builder with pre-configured reports based on Insight Zeppelin. Insight Zeppelin is a web-based notebook that enables data-driven, interactive data analytics, data visualization, and collaborative documents using SQL.

To use the reports and dashboard builder, you need to install Insight Zeppelin.

> **Note:** For this version of Search and Insight Engine, cluster mode is not supported.

Use `http://localhost:9090/zeppelin` to access Insight Zeppelin user interface.

For information on Insight Zeppelin user Interface see [Explore Apache Zeppelin UI](https://zeppelin.apache.org/docs/0.8.1/quickstart/explore_ui.html){:target="_blank"}.

## Installation options

There are several options for installing Insight Zeppelin:

* [Installing with a distribution zip](#installing-with-a-distribution-zip).
* [Installing with Docker Compose](#installing-with-docker-compose).

> **Note** You do not need to install Insight Zeppelin in order to use Search and Insight Engine.

## Install with a distribution zip

Use this information to manually install Insight Zeppelin using a distribution zip.

1. Download the `alfresco-insight-zeppelin-2.0.0.zip` file from the [Support Portal](https://support.alfresco.com/){:target="_blank"}.

2. Unzip the file.

3. Run the following script:

    On Unix-like systems: `ZEPPELIN_HOME/bin/substituter.sh`

    On Microsoft Windows: `ZEPPELIN_HOME/bin/substituter.cmd`

    This script reads the `zeppelin.properties` file in ZEPPELIN_HOME. Use the `zeppelin.properties` file to change the Alfresco Content Services repository connection details.

    Alternatively, you can pass `REPO_PROTOCOL`, `REPO_HOST`, and `REPO_PORT` to the script from the command line. For example, `REPO_PROTOCOL=https REPO_HOST=myhost REPO_PORT=8443./substituter.sh`. You don't have to pass all the variables just the ones you want to override. The default values are: `REPO_PROTOCOL=http, REPO_HOST=localhost, and REPO_PORT=8080`. The port number, context path or other properties can be changed in `ZEPPELIN_HOME/conf/zeppelin-env.sh` on Unix like systems (or `ZEPPELIN_HOMEconfzeppelin-env.cmd` for Microsoft Windows). See [Apache Zeppelin Configuration](https://zeppelin.apache.org/docs/0.7.3/install/configuration.html){:target="_blank"} for a full list of properties.

4. To start the Insight Zeppelin Server, run:

    On Unix like systems: `ZEPPELIN_HOME/bin/zeppelin-daemon.sh`

    On Microsoft Windows: `ZEPPELIN_HOMEbinzeppelin.cmd`

5. Open the user interface using:

    `http://localhost:9090/zeppelin`

6. Log in with your Alfresco Content Services credentials.

7. Create a new notebook or use the one provided.

8. To stop Insight Zeppelin, run:

    On Unix-like systems: `ZEPPELIN_HOME/bin/zeppelin-daemon.sh`

    On Microsoft Windows: Ctrl + C

By default Insight Zeppelin uses Alfresco Content Services to authenticate users, which means every user in Alfresco Content Services will be able to access Zeppelin. To limit the number of users, comment out all the `alfrescoRealm` related configuration settings in `ZEPPELIN_HOME/conf/shiro.ini`. You can configure your LDAP or AD to allow specific users access to Insight Zeppelin.

See the following configuration example showing that only users in the `ZeppelinUsers` group have access to the application.

```bash
ldapRealm = org.apache.zeppelin.realm.LdapRealm
ldapRealm.contextFactory.systemUsername = <principal>
ldapRealm.contextFactory.systemPassword = <password>
ldapRealm.searchBase = OU=Users,DC=test,DC=com
ldapRealm.userSearchFilter = (&(objectclass=person)(sAMAccountName={0})(memberOf:=CN=ZeppelinUsers,OU=Users,DC=test,DC=com))
ldapRealm.userSearchScope = subtree
ldapRealm.authorizationEnabled = true
ldapRealm.contextFactory.url = <ldap-url>
ldapRealm.userSearchAttributeName = sAMAccountName
ldapRealm.contextFactory.authenticationMechanism = simple
ldapRealm.userObjectClass = person
ldapRealm.groupObjectClass = group
ldapRealm.memberAttribute = member
securityManager.realms=$ldapRealm
```

### SSL encryption

Ideally Insight Zeppelin is deployed on a separate server. If Insight Zeppelin is using SSL to communicate with Alfresco Content Services you must add the following settings to each Interpreter configured with Insight Zeppelin:

```bash
alfresco.enable.ssl=true
alfresco.ssl.checkPeerName=false (If using Self Signed certificates)
javax.net.ssl.keyStoreType=JCEKS
javax.net.ssl.keyStore=../keystore/ssl.repo.client.keystore
javax.net.ssl.keyStorePassword=kT9X6oe68t
javax.net.ssl.trustStoreType=JCEKS
javax.net.ssl.trustStore=../keystore/ssl.repo.client.truststore
javax.net.ssl.trustStorePassword=kT9X6oe68t
```

Alternatively you can add the settings directly to the following JSON file: `ZEPPELIN_HOME/conf/interpreter.json`:

```json
"alfresco.enable.ssl": {
  "value": "true",
  "type": "string"
},
"solr.ssl.checkPeerName": {
  "value": "false",
  "type": "string"
},
"javax.net.ssl.keyStore": {
  "value": "/zeppelin/keystore/ssl.repo.client.keystore",
  "type": "string"
},
"javax.net.ssl.keyStorePassword": {
  "value": "kT9X6oe68t",
  "type": "string"
},
"javax.net.ssl.keyStoreType": {
  "value": "JCEKS",
  "type": "string"
},
"javax.net.ssl.trustStore": {
  "value": "/zeppelin/keystore/ssl.repo.client.truststore",
  "type": "string"
},
"javax.net.ssl.trustStorePassword": {
  "value": "kT9X6oe68t",
  "type": "string"
},
"javax.net.ssl.trustStoreType": {
  "value": "JCEKS",
  "type": "string"
}
```

Also, if the domain name of the Alfresco Content Services repository does not match the common name (CN) of the repository's SSL certificate, set the `solr.ssl.checkPeerName` property to `false`.

## Install with Docker Compose

You can deploy Insight Zeppelin by inserting the container details into the same Docker Compose file that you use for deploying Alfresco Content Services 6.2 and Search and Insight Engine.

For details about deployment using the Docker Compose file, see [Installation options]({% link insight-engine/latest/install/options.md %}#installing-with-docker-compose).

1. Open your `docker-compose.yml` file, and insert the following container information:

    ```YAML
    zeppelin:
        image: quay.io/alfresco/insight-zeppelin:2.0.0
        environment:
                - REPO_HOST=alfresco
                - REPO_PORT=8080
        ports:
        - “9090:9090”
    ```

2. Save the file.

3. Run Insight Zeppelin using `http://localhost:9090/zeppelin`.

## Create reports and dashboards

Insight Zeppelin lets you create reports using SQL. The reports can be put together to make a dashboard. You can also use other business intelligence tools.

### Insight Zeppelin

> **Note:** Before upgrading Insight Zeppelin ensure you backup your notes first. Then once the upgrade is complete you can re-import them. See [Export/Import Insight Zeppelin Notes](#export/import-insight-zeppelin-notes)

This is a list of pre-configured reports:

* Repository reports
  * Total storage used in bytes
  * Total number of documents
  * Total folders
  * Count of documents by MIMEtype

* Site reports
  * Total documents by site
  * Total documents by site and MIMEtype
  * Total volume by site in bytes
  * Activity reports

* Count of content created per day in the last 60 days
  * Count of content modified per day in the last 60 days
  * New documents by user and site
  * Modified documents by user and site
  * Count of locked content by user
  * Top largest documents

The following image shows an example dashboard created using the pre-configured reports.

![]({% link insight-engine/images/exampledashboard1.png %})

### Other business intelligence tools

In addition to using Insight Zeppelin for reporting you can also use any application that supports ODBC connectivity.

The CData ODBC Driver for Alfresco 2019 enables you to have real-time access to your data so you can run reports on the contents of the repository. Currently Alfresco has tested Tableau and Microsoft Excel. For more information and how to install the CData ODBC Driver see the following documentation [CData ODBC Driver for Alfresco 2019](http://cdn.cdata.com/help/SJE/odbc/default.htm).

### Export/Import Insight Zeppelin notes

Before upgrading Search and Insight Engine ensure you export each individual Insight Zeppelin note so you can reimport them after the upgrade. If you don't do this your notes will be lost as they do not carry over during the upgrade.

> **Note:** When importing an Insight Zeppelin note you may need to set its note permissions again.

Use these steps to export and import your Insight Zeppelin notes.

1. Go to Insight Zeppelin.

2. On the Welcome to Zeppelin home page access a note.

3. Click the **Export this note** button.

4. Return to the Welcome to Zeppelin home page and repeat the procedure for all your notes.

5. Once the upgrade is complete return to the Welcome to Zeppelin home page.

6. Click **Import note**.

7. Click **Select JSON file** and select the note you want to reimport.

    If you want to reimport the note with a different name you can enter it into the **Import as** field.

8. Repeat the procedure for all your notes.
