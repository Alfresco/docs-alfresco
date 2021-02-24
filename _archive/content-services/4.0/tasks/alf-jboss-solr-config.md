---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Installation, Alfresco Server]
keyword: JBoss
---

# Configuring Solr with JBoss running on Alfresco

This section describes how to configure Solr to communicate with Alfresco deployed on JBoss. The steps describe how to allow Solr to communicate with Alfresco deployed on JBoss 5.1 EAP.

Solr must be deployed on a separate Tomcat instance.

-   Configure Solr using the following instructions: [Configuring Solr](solr-install-config.md).

Ensure that Alfresco is installed on JBoss using the instructions described in the section [Installing Alfresco on JBoss](alf-jboss-install.md) .

These steps assume that you know the path of the JBoss directory, which is represented as <JBOSS\_HOME\>.

1.  Create a file called tomcat-users.xml in the <JBOSS\_HOME\>/server/default/conf directory.

2.  Enter the following content in the tomcat-users.xml file:

    ```
    <?xml version='1.0' encoding='utf-8'?>
    <!--
      Licensed to the Apache Software Foundation (ASF) under one or more
      contributor license agreements.  See the NOTICE file distributed with
      this work for additional information regarding copyright ownership.
      The ASF licenses this file to You under the Apache License, Version 2.0
      (the "License"); you may not use this file except in compliance with
      the License.  You may obtain a copy of the License at
    
          http://www.apache.org/licenses/LICENSE-2.0
    
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License.
    -->
    <tomcat-users>
      <user username="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB" roles="repoclient" password="null"/>
    </tomcat-users>
    ```

3.  Create a folder called <JBOSS\_HOME\>/server/default/keystore and then copy all of the files from<alfresco.war\>/WEB-INF/classes/alfresco/keystore to the new folder.

4.  Configure the SSL connector by adding the following to the <JBOSS\_HOME\>/server/default/deploy/jbossweb.sar/server.xml file \(should be a child of the `<Service>` tag\):

    ```
       <Connector port="8443"
            protocol="HTTP/1.1" SSLEnabled="true" maxThreads="150" scheme="https"    
            keystoreFile="<JBOSS_HOME>/server/default/keystore/ssl.keystore"
            keystorePass="kT9X6oe68t" keystoreType="JCEKS" secure="true"
            connectionTimeout="240000" clientAuth="false" sslProtocol="TLS"
            truststoreFile="<JBOSS_HOME>/server/default/keystore/ssl.truststore"
            truststorePass="kT9X6oe68t" truststoreType="JCEKS"
            address="${jboss.bind.address}"/>    
    ```

5.  Configure the JBoss realm by adding the following to the <JBOSS\_HOME\>/server/default/deploy/jbossweb.sar/server.xml file \(should be a child of the `<Host>` tag\):

    ```
    <Realm className="org.apache.catalina.realm.MemoryRealm" 
           pathname="<JBOSS_HOME>/server/default/conf/tomcat-users.xml" />
    ```

6.  Edit the <JBOSS\_HOME\>/server/default/conf/alfresco-global.properties file by adding following properties:

    ```
    dir.keystore=<JBOSS_HOME>/server/default/keystore
    index.subsystem.name=solr
    solr.host=<host_of_tomcat_inctance_where_solr_is_running>
    solr.port=8080
    solr.port.ssl=8443
    ```

7.  Start the Alfresco server.


You may see a message on the JBoss console similar to the following:

```
12:23:15,713 WARN  [JSSESocketFactory] SSL renegotiation is disabled, closing connection
```

You may find that Solr search and/or the Solr tracking is not working.

In this situation, use the following steps:

-   Add the `allowUnsafeLegacyRenegotiation="true"` option to the JBoss SSL connector.
-   Add the `-Dsun.security.ssl.allowUnsafeRenegotiation=true` option to `JAVA_OPTS`.

**Parent topic:**[Installing Alfresco on JBoss](../tasks/alf-jboss-install.md)

