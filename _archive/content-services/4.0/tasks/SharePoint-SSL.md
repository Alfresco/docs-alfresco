---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring SharePoint Protocol with SSL

You can configure the Alfresco `vti` module to allow SharePoint Protocol support over SSL.

If you want to configure the SharePoint Protocol with a non-SSL connection, see [Setting up SharePoint Protocol Support to work with Office 2010](SharePoint-config-office2010.md). For general information on SSL, see [Microsoft support](http://support.microsoft.com/kb/2123563).

Ensure that you have a private key and certificate for the domain that runs the SharePoint Protocol. Do not confuse this key pair with the public/private key pair that is stored in the ssl.keystore and ssl.truststore for Solr communication.

In your production environment, ensure that you use a certificate that is signed by a trusted Certificate Authority \(CA\), and that your private key and entire certificate chain are stored in a SunJCE keystore file \(using the JCEKS format\). Depending on how you obtain your certificate and your Certificate Authority, the key and the certificate chain affects the file format. You can use the Java keytool to convert your certificate chain files into JCEKS format and store them in the JCE keystore.

1.  Stop the Alfresco server.

2.  Create a new file or modify an existing file in <classpathRoot\>/alfresco/extension/vti-custom-context.xml to include this content:

     

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://
    www.springframework.org/dtd/spring-beans.dtd'>                   
     <beans>
      <bean id="vtiServerConnector" class="org.mortbay.jetty.security.SslSocketConnector">
        <property name="port">
           <value>${vti.server.port}</value>
        </property>
        <property name="headerBufferSize">
           <value>32768</value>
        </property>
        <property name="maxIdleTime">
           <value>30000</value>
        </property>
        <property name="keystore">
           <value>${vti.server.ssl.keystore}</value>
        </property>
        <property name="keyPassword">
           <value>${vti.server.ssl.password}</value>
        </property>
        <property name="password">
           <value>${vti.server.ssl.password}</value>
        </property>
        <property name="keystoreType">
           <value>JCEKS</value>
        </property>
      </bean>
    </beans>
     
    ```

3.  Save vti-custom-context.xml.

4.  Create a new file or modify an existing file in <classpathRoot\>/alfresco/extension/custom-vti.properties file to include the following attributes:

    ```
    vti.server.port=7070   
    vti.server.protocol=https   
    vti.server.ssl.keystore=/path/to/your/keystore.jks   
    vti.server.ssl.password=changeme   
    vti.server.url.path.prefix=/alfresco   
    vti.server.external.host=alfresco.example.com   
    vti.server.external.port=7070   
    vti.server.external.protocol=https   
    vti.server.external.contextPath=/alfresco
    ```

    Set vti.server.ssl.keystore and vti.server.ssl.password to point to the keystore that you created in preparation for this task.

    Ensure that vti.server.external.host is set to the fully qualified domain name of the server that the certificate is issued to \(that is, your-server-name.domain.com\).

5.  Save custom-vti.properties.

6.  Start your Alfresco server to apply the changes.

7.  Check that the server is running correctly by opening this URL:

    ```
    http://<your-server>:7070/alfresco
    ```

    Ensure you use a web browser that alerts you to error messages, so that you can see whether the connection is failing.

8.  Test that the configuration is successful by selecting an Office document in Alfresco Share and using the Edit online action.


If you cannot connect to the server, check the server log file for errors relating to the `vti` module.

If the server responds, but the client is not able to establish an SSL connection \(for example, with an `ssl_error_no_cypher_overlap` error in Firefox\), it is likely that the key and certificates contained in your keystore cannot be used to establish the connection. Check the contents of your keystore using this Java keytool command:

```
keytool -list -v –keystore /path/to/your/keystore -storetype JCEKS -passkey changeme
```

Common errors include:

-   Not all intermediate certificates required for the trust chain are contained in the keystore
-   The private key has a key length or format that is not accepted by the client

You can use log4j to capture more information about the SSL handshake process by using these settings:

```
log4j.logger.org.mortbay=debug  
log4j.logger.org.alfresco.module.vti=debug
```

or you can add the following argument to the JVM running the applications erver:

```
-Djavax.net.debug=ssl,handshake,data,trustmanager
```

See [Debugging SSL/TLS connections](http://docs.oracle.com/javase/7/docs/technotes/guides/security/jsse/ReadDebug.html) for more information about debugging.

**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

**Related information**  


[sysAdmin subsystem properties](../concepts/sysadmin-subsystem-props.md)

