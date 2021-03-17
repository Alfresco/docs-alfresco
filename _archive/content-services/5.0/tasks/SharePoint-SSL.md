---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring SharePoint Protocol with SSL

You can configure Alfresco SharePoint Protocol to run over SSL, without the need to edit the Windows registry to allow non-SSL connections from MS Office \(for either Windows and Mac\).

If you want to configure the SharePoint Protocol with a non-SSL connection, see [Setting up SharePoint Protocol Support with a non-SSL connection](SharePoint-config-office2010.md). For general information on SSL, see [Microsoft support](http://support.microsoft.com/kb/2123563). In this task you will generate a new or modify and existing SSL certificate and configure Alfresco to use it:

1.  Create a new certificate or or modify an existing certificate \(for example, the standard certificate provided for Solr to Alfresco communication\) using this example. Save it as <classpathRoot\>/alfresco/extension/vti-custom-context.xml.

     

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://
    www.springframework.org/dtd/spring-beans.dtd'>                   
     <beans>
      <!--
      <bean id="vtiServerConnector" 
        class="org.mortbay.jetty.bio.SocketConnector"> 
        <property name="port"> 
        <value>${vti.server.port}</value> 
        </property>
        <property name="headerBufferSize"> 
           <value>32768</value>
        </property> 
      </bean>
      -->                  
      <!-- Use this Connector instead for SSL communications -->
      <!-- You will need to set the location of the KeyStore holding your -->
      <!-- server certificate, along with the KeyStore password -->
      <!-- You should also update the vti.server.protocol property to https 
      -->
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

    Change the default values for the `keystore`, `keyPassword`, and `password` properties.

    Ensure that if you do create a new certificate and you are using Solr, that you do not overwrite the Solr certificate \(unless you intend to use it to communicate between Solr and Alfresco\).

2.  Add the following attributes to your <extension\>/custom-vti.properties file:

    ```
    vti.server.port=7070
    vti.server.protocol=https
    vti.server.ssl.keystore=/opt/alfresco/alf_data/keystore/ssl.keystore
    vti.server.ssl.password=kT9X6oe68t
    vti.server.url.path.prefix=/alfresco
    vti.server.external.host=localhost
    vti.server.external.port=7070
    vti.server.external.protocol=https
    vti.server.external.contextPath=/alfresco
    ```

    Set vti.server.ssl.keystore and vti.server.ssl.password to point to your certificate.

    Remember to change the localhost value to your fully qualified domain name of the local host or server name \(that is, your-server-name.domain.com\).

    **Note:**

    -   This example configures SSL using the default port 7070, which avoids rewrites in some configuration files and templates.
    -   `vti.server.ssl.keystore` is the value used for the `-keystore` parameter.
    -   `vti.server.ssl.password` is the value used for the `-storepass` and `-keypass` parameters.
3.  Save vti-custom-context.xml.

4.  Use the Java `keytool` utility to generate a key pair for the connector:

    ```
    %JAVA_HOME%\bin\keytool.exe -genkeypair -alias alfresco -keystore
        D:\BUGS\ALF-6390\keystore.jceks -storepass changeit -keypass changeit  -keyalg RSA -validity 360
        -keysize 2048 -storetype JCEKS 
    ```

    Use the same store in this command and in the `vtiServerConnector` `keystore` property.

5.  Export the generated associated certificate into a file.

    ```
    %JAVA_HOME%\bin\keytool.exe -exportcert -alias alfresco -file
        D:\BUGS\ALF-6390\alfresco-ssl.cer -keystore  D:\BUGS\ALF-6390\keystore.jceks -storepass changeit
        -storetype JCEKS 
    ```

6.  Configure Alfresco and Tomcat for SSL, following the instructions on the Apache website [Apache Tomcat](http://tomcat.apache.org/tomcat-5.5-doc/ssl-howto.html).

    It is possible to use the same key store for Tomcat and Jetty.

    1.  Edit the Tomcat server.xml file.

    2.  Uncomment the `Connector port="8443"` section.

    3.  Save the server.xml file.

7.  Ensure that you set the sysAdmin subsystem properties.

8.  Configure Share to connect to Alfresco using SSL.

    1.  Import the certificate into a Java Trusted Store.

        This allows Java to connect successfully to the Alfresco context using SSL.

        ```
        %JAVA_HOME%\bin\keytool.exe -importcert -alias alfresco -file D:\BUGS\ALF-6390\alfresco-ssl.cer -keypass changeit -noprompt -trustcacerts -storetype 
        JCEKS -keystore %JAVA_HOME%\jre\lib\security\cacerts -storepass changeit
        ```

        **Note:** The `keystore` parameter points to the Java trusted cacerts file for JDK, which is configured for Tomcat. For example, %JAVA\_HOME%\\jre\\lib\\security\\cacerts. For more information on trusted certificates in Java, see [keytool](http://download.oracle.com/javase/6/docs/technotes/tools/solaris/keytool.html#Certificates).

    2.  Locate the <web-extension\>\\share-config-custom.xml file and edit or create the following section:

        The example shows the default HTTPS port as 8443.

        ```
        <config evaluator="string-compare" condition="Remote"> 
              <remote> 
                 <endpoint> 
                    <id>alfresco-noauth</id> 
                    <name>Alfresco - unauthenticated access</name> 
                    <description>Access to Alfresco Repository WebScripts that do not require authentication</description> 
                    <connector-id>alfresco</connector-id> 
                    <endpoint-url>https://localhost:8443/alfresco/s</endpoint-url> 
                    <identity>none</identity> 
                 </endpoint> 
        
                 <endpoint> 
                    <id>alfresco</id> 
                    <name>Alfresco - user access</name> 
                    <description>Access to Alfresco Repository WebScripts that require user authentication</description> 
                    <connector-id>alfresco</connector-id> 
                    <endpoint-url>https://localhost:8443/alfresco/s</endpoint-url> 
                    <identity>user</identity> 
                 </endpoint> 
        
                 <endpoint> 
                    <id>alfresco-feed</id> 
                    <name>Alfresco Feed</name> 
                    <description>Alfresco Feed - supports basic HTTP authentication via the EndPointProxyServlet</description> 
                    <connector-id>http</connector-id> 
                    <endpoint-url>https://localhost:8443/alfresco/s</endpoint-url> 
                    <basic-auth>true</basic-auth> 
                    <identity>user</identity> 
                 </endpoint> 
              </remote> 
           </config>
        ```

    3.  Change the <endpoint-url\> values.

    4.  Save the <web-extension\>\\share-config-custom.xml file.

9.  Restart the Alfresco application server.

10. Test that the configuration is successful by selecting an Office document in Alfresco Share and using the Edit online action.

    A warning message appears asking you to accept the Alfresco self-signed certificate.


If you cannot login to Share, and you see a message saying `The remote server may be unavailable or your authentication details have not been recognized.`, check the endpoint URLs and enable the `DEBUG` option for `org.springframework.extensions=DEBUG` in the Share log4j.properties file.

Ensure that there are no error messages saying `IO Error: during getObject() ... sun.security.validator.ValidatorException: PKIX path building failed`. If you see this message, this means that your certificate is not trusted.

When editing documents online in Office 2014 for Mac, you may see an error message saying `No connectivity with server`. To resolve this issue, upgrade your version of Office 2014 to version 14.3.6. You can download the Service Pack from [Microsoft Download Center](http://www.microsoft.com/en-us/download/details.aspx?id=39634).

**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

**Related information**  


[sysAdmin subsystem properties](../concepts/sysadmin-subsystem-props.md)

