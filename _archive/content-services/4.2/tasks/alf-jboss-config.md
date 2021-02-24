---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: JBoss
---

# Configuring JBoss for Alfresco

This section describes how to configure an Alfresco installation on JBoss.

These steps assume that you know the path of the JBoss directory, which is represented as <JBOSS\_EAP\_HOME\>.

1.  Install the JDBC driver for MySQL database.

    1.  To install the required JDBC driver as a core module, create the <JBOSS\_EAP\_HOME\>\\modules\\com\\mysql\\main directory.

    2.  Copy the JDBC driver, mysql-connector-java-5.1.20-bin.jar to <JBOSS\_EAP\_HOME\>\\modules\\com\\mysql\\main.

    3.  Create the <JBOSS\_EAP\_HOME\>\\modules\\com\\mysql\\main\\module.xml file with the following contents:

        ```
        <?xml version="1.0" encoding="UTF-8"?>
          <module xmlns="urn:jboss:module:1.0" name="com.mysql">
            <resources>
             <resource-root path="mysql-connector-java-5.1.20-bin.jar"/>
            </resources>
            <dependencies>
             <module name="javax.api"/>
            </dependencies>
          </module>
        ```

2.  Configure the MySQL datasource resource in the server subsystem.

    Modify the subsystem datasources in the <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\standalone.xml file to have the following content:

    ```
    <subsystem xmlns="urn:jboss:domain:datasources:1.1">
      <datasources>
        <datasource jndi-name="java:jboss/datasources/MySqlDS" pool-name="MySqlDS" enabled="true">
        <connection-url>jdbc:mysql://localhost:3306/alfresco</connection-url>
        <driver>com.mysql</driver>
            <pool>
              <min-pool-size>10</min-pool-size>
              <max-pool-size>100</max-pool-size>
              <prefill>true</prefill>
            </pool>
            <security>
              <user-name>alfresco</user-name>
              <password>alfresco</password>
            </security>
            <statement>
              <prepared-statement-cache-size>32</prepared-statement-cache-size>
              <share-prepared-statements>true</share-prepared-statements>
            </statement>
        </datasource>
        <drivers>
            <driver name="com.mysql" module="com.mysql">
            <xa-datasource-class>com.mysql.jdbc.jdbc2.optional.MysqlXADataSource</xa-datasource-class>
            </driver>
        </drivers>
      </datasources>
    </subsystem>
    ```

    **Note:** If Alfresco is deployed with MS SQL Server, set SNAPSHOT transaction isolation level by adding the following to the subsystem datasources:

    ```
    <new-connection-sql>SET TRANSACTION ISOLATION LEVEL SNAPSHOT;</new-connection-sql>
    ```

    Ensure that `ALLOW_SNAPSHOT_ISOLATION` database option is set to `ON`.

3.  **\(Optional\):** Configure another datasource for Activit's ID-generator that is used in activiti-context.xml \(recommended for production\). For simplicity, we will reuse `MySqlDS` defined above.

4.  Unzip alfresco-enterprise-4.2.7.ear and check/modify the WEB-INF\\jboss-web.xml file to have correct references to the main data source \(in this example, it is `MySqlDS`, which is defined in standalone.xml\) and to `activitiIdGeneratorDataSource` \(used in activiti-context.xml\):

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE jboss-web PUBLIC"-//JBoss
    //DTD Web Application 4.2//EN"
      "http://www.jboss.org/j2ee/dtd/jboss-web_4_2.dtd">
    <jboss-web>
       <resource-ref>
         <res-ref-name>jdbc/dataSource</res-ref-name>
         <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>
       </resource-ref>
       <resource-ref>
         <res-ref-name>jdbc/activitiIdGeneratorDataSource</res-ref-name>
         <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>
       </resource-ref>
    </jboss-web>
    ```

5.  Copy vaadin-application-server-class-loader-workaround-1.0.1.jar from <TEMP\>\\web-server\\lib to <ALFRESCO\_HOME\>\\WEB-INF\\lib of the unzipped alfresco-enterprise-4.2.7.ear.

    **Note:** <TEMP\> refers to the path of the temporary directory.

6.  Configure logging.

    1.  **\(For Windows\):** In <JBOSS\_EAP\_HOME\>\\bin\\standalone.conf.bat, add the following to `JAVA_OPTS`.

        ```
        set "JAVA_OPTS=%JAVA_OPTS% -Dorg.jboss.as.logging.per-deployment=false"
        ```

        **\(For Unix/Linux\):** In <JBOSS\_EAP\_HOME\>/bin/standalone.conf, add the following to `JAVA_OPTS`:

        ```
        JAVA_OPTS="$JAVA_OPTS -Dorg.jboss.as.logging.per-deployment=false"
        ```

    2.  Modify logging subsystem in <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\standalone.xml.

        -   Change the default level for `<root-logger>` from `INFO` to `ERROR` in `<subsystem xmlns="urn:jboss:domain:logging:1.3">`.
        -   Add the `logger` elements as children to `<subsystem xmlns="urn:jboss:domain:logging:1.3”>` with logging configuration taken from alfresco-enterprise-4.2.7.ear\\alfresco.war\\WEB-INF\\classes\\log4j.properties.
        **Note:** For more information on logging mapping elements, see [JBoss logging](../concepts/jboss-logging.md).

7.  Set appropriate memory values for `–Xms`, `-Xmx`, `-XX:MaxPermSize` and other JVM options in:

    -   <JBOSS\_EAP\_HOME\>\\bin\\standalone.conf.bat **\(For Windows platform\)** or
    -   <JBOSS\_EAP\_HOME\>/bin/standalone.conf **\(For Unix/Linux OS\)**.
8.  Configure `URI_ENCODING` with UTF-8. Set the following system properties in standalone.xml after `extensions` tag:

    ```
    <system-properties>
     <property name="org.apache.catalina.connector.URI_ENCODING" value="UTF-8"/>
     <property name="org.apache.catalina.connector.USE_BODY_ENCODING_FOR_QUERY_STRING" value="true"/>
    </system-properties>
    ```

9.  Disable the JBoss webservices subsystem as it conflicts with Alfresco CMIS. The following lines should be removed from <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\standalone.xml:

    ```
    <extension module="org.jboss.as.webservices"/>
    ```

    ```
    <subsystem xmlns="urn:jboss:domain:webservices:1.2">
        <modify-wsdl-address>true</modify-wsdl-address>
        <wsdl-host>${jboss.bind.address:127.0.0.1}</wsdl-host>
        <endpoint-config name="Standard-Endpoint-Config"/>
        <endpoint-config name="Recording-Endpoint-Config">
          <pre-handler-chain name="recording-handlers" protocol-bindings="##SOAP11_HTTP ##SOAP11_HTTP_MTOM ##SOAP12_HTTP ##SOAP12_HTTP_MTOM">
            <handler name="RecordingHandler" class="org.jboss.ws.common.invocation.RecordingServerHandler"/>
          </pre-handler-chain>
        </endpoint-config>
    </subsystem>
    ```

10. Compress alfresco.war and alfresco-enterprise-4.2.7.ear to include the changes made.

11. Start the standalone JBoss server.

12. Set the server's IP address in the JBoss Management Console.

    1.  Open the **JBoss Management Console**.

    2.  Set the server's IP address in **Profiles \> General Configurations \> Interfaces \> Network Interfaces \> Available Interfaces**.

13. Set the server's IP address in all the corresponding Alfresco configuration files, including alfresco-global.properties.

14. Deploy Alfresco.

    1.  Open the **JBoss Management Console**.

    2.  Navigate to **Runtime \> Manage Deployments**.

    3.  Click the **Add** button.

    4.  Browse and select the modified alfresco-enterprise-4.2.8.ear file.

    5.  After the EAR file is added, click the **Enable** button.


Alfresco is successfully deployed.

**Note:** Oracle JMX is not supported when using JBoss EAP. This is a known issue; see JBoss issue [AS7-1859](https://issues.jboss.org/browse/AS7-1859). Alfresco recommends that you use JBoss JMX instead. For information on how to connect to the JBoss AS7 JMX MBeanServer from jconsole, see the [JBoss Developer documentation](https://community.jboss.org/wiki/UsingJconsoleToConnectToJMXOnAS7).

-   **[JBoss logging](../concepts/jboss-logging.md)**  
This topic lists the logger elements that you can add to the <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\standalone.xml file for configuring JBoss logging.

**Parent topic:**[Installing Alfresco on JBoss](../tasks/alf-jboss-install.md)

**Related information**  


[Installing Solr on JBoss 6 EAP with Java 7](solr-jboss-install.md)

[Configuring Alfresco on JBoss with Solr installed on a Tomcat instance](solr-tomcat-install.md)

