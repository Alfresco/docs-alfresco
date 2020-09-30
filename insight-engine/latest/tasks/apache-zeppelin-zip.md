---
title: Install with distribution zip
---
## Deploy Alfresco Insight Zeppelin using a distribution zip

Use this information to manually install Alfresco Insight Zeppelin using a distribution zip.

1. Download the alfresco-insight-zeppelin-2.0.0.zip file from the [Support Portal](http://support.alfresco.com/).

2. Unzip the file.

3. Run the following script:

    On Unix-like systems: ZEPPELIN\_HOME/bin/substituter.sh

    On Microsoft Windows: ZEPPELIN\_HOME/bin/substituter.cmd

    This script reads the zeppelin.properties file in ZEPPELIN\_HOME. Use the zeppelin.properties file to change the Alfresco Content Services repository connection details.

    Alternatively, you can pass `REPO_PROTOCOL`, `REPO_HOST`, and `REPO_PORT` to the script from the command line. For example, `REPO_PROTOCOL=https REPO_HOST=myhost REPO_PORT=8443./substituter.sh`. You don't have to pass all the variables just the ones you want to override. The default values are: `REPO_PROTOCOL=http, REPO_HOST=localhost, and REPO_PORT=8080`. The port number, context path or other properties can be changed in `ZEPPELIN_HOME/conf/zeppelin-env.sh` on Unix like systems (or `ZEPPELIN_HOME\conf\zeppelin-env.cmd` for Microsoft Windows). See [Apache Zeppelin Configuration](https://zeppelin.apache.org/docs/0.7.3/install/configuration.html) for a full list of properties.

4. To start the Alfresco Insight Zeppelin Server, run:

    On Unix like systems: `ZEPPELIN_HOME/bin/zeppelin-daemon.sh`

    On Microsoft Windows: `ZEPPELIN_HOME\bin\zeppelin.cmd`

5. Open the user interface using:

    `http://localhost:9090/zeppelin`

6. Log in with your Alfresco Content Services credentials.

7. Create a new notebook or use the one provided.

8. To stop Alfresco Insight Zeppelin, run:

    On Unix-like systems: `ZEPPELIN_HOME/bin/zeppelin-daemon.sh`

    On Microsoft Windows: Ctrl + C

By default Alfresco Insight Zeppelin uses Alfresco Content Services to authenticate users, which means every user in Alfresco Content Services will be able to access Zeppelin. To limit the number of users, comment out all the `alfrescoRealm` related configuration settings in ZEPPELIN\_HOME/conf/shiro.ini. You can configure your LDAP or AD to allow specific users access to Alfresco Insight Zeppelin.

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

### SSL Encryption

Ideally Alfresco Insight Zeppelin is deployed on a separate server. If Alfresco Insight Zeppelin is using SSL to communicate with Alfresco Content Services you must add the following settings to each Interpreter configured with Alfresco Insight Zeppelin:

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

**Parent topic:**[Building reports and dashboards](../concepts/installing-apache.md)
