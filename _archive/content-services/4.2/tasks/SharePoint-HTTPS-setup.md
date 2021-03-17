---
author: Alfresco Documentation
audience: 
---

# Setting up SharePoint Protocol Support to work with HTTPS

This section describes how to configure the Jetty server so that the SharePoint Protocol Support will run over HTTPS.

1.  Open the vti-context.xml file.

2.  Configure `SslSocketConnector` for Jetty.

    Comment out the existing `vtiServerConnector` bean, and uncomment the `<bean id="vtiServerConnector" class="org.mortbay.jetty.security.SslSocketConnector">` bean:

    Change the default values for the `keystore`, `keyPassword`, and `password` properties.

    ```
        <bean id="vtiServerConnector" class="org.mortbay.jetty.security.SslSocketConnector"> 
         <property name="port"> 
         <value>${vti.server.port}</value> 
         </property> 
            <property name="headerBufferSize"> 
                 <value>8192</value> 
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
                 <value>JKS</value> 
            </property> 
        </bean>
    ```

    For more information, refer to [http://docs.codehaus.org/display/JETTY/Ssl+Connector+Guide](http://docs.codehaus.org/display/JETTY/Ssl+Connector+Guide) and [http://jetty.codehaus.org/jetty/jetty-6/apidocs/org/mortbay/jetty/security/SslSocketConnector.html](http://jetty.codehaus.org/jetty/jetty-6/apidocs/org/mortbay/jetty/security/SslSocketConnector.html).

    **Note:**

    -   This example configures HTTPS using the default port 7070, which avoids rewrites in some configuration files and templates.
    -   `vti.server.ssl.keystore` is the value used for the `-keystore` parameter.
    -   `vti.server.ssl.password` is the value used for the `-storepass` and `-keypass` parameters.
3.  Save the vti-context.xml file.

4.  Use the Java `keytool` utility to generate a key pair for the connector:

    ```
    %JAVA_HOME%\bin\keytool.exe -genkeypair -alias alfresco -keystore
        D:\BUGS\ALF-6390\keystore.jks -storepass changeit -keypass changeit  -keyalg RSA -validity 360
        -keysize 2048 -storetype JKS 
    ```

    Use the same store in this command and in the `vtiServerConnector` `keystore` property.

5.  Export the generated associated certificate into a file.

    ```
    %JAVA_HOME%\bin\keytool.exe -exportcert -alias alfresco -file
        D:\BUGS\ALF-6390\alfresco-ssl.cer -keystore  D:\BUGS\ALF-6390\keystore.jks -storepass changeit
        -storetype JKS 
    ```

6.  Configure Alfresco and Tomcat for HTTPS, following the instructions on the Apache website [http://tomcat.apache.org/tomcat-5.5-doc/ssl-howto.html](http://tomcat.apache.org/tomcat-5.5-doc/ssl-howto.html).

    It is possible to use the same key store for Tomcat and Jetty.

    1.  Edit the Tomcat server.xml file.

    2.  Uncomment the `Connector port="8443"` section.

    3.  Save the server.xml file.

7.  Ensure that you set the sysAdmin subsystem properties.

8.  Configure Share to connect to Alfresco using SSL.

    1.  Import the certificate into a Java Trusted Store.       

        This allows Java to connect successfully to the Alfresco context using HTTPS.

        ```
        %JAVA_HOME%\bin\keytool.exe -importcert -alias alfresco -file D:\BUGS\ALF-6390\alfresco-ssl.cer -keypass changeit -noprompt -trustcacerts -storetype 
        JKS -keystore %JAVA_HOME%\jre\lib\security\cacerts -storepass changeit
        ```

        **Note:** The `keystore` parameter points to the Java trusted cacerts file for JDK, which is configured for Tomcat. For example, %JAVA\_HOME%\\jre\\lib\\security\\cacerts. For more information on trusted certificates in Java, refer to [http://download.oracle.com/javase/6/docs/technotes/tools/solaris/keytool.html\#Certificates](http://download.oracle.com/javase/6/docs/technotes/tools/solaris/keytool.html#Certificates)

    2.  Locate the <web-extension\>\\share-config-custom.xml file and edit or create the following section.

        The following example shows the default HTTPS port as 8443.

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


The SharePoint Support module will be able to handle requests using HTTPS on 7070 port only.

If you cannot login to Share, and you see message saying `The remote server may be unavailable or your authentication details have not been recognized.`, check the endpoint URLs and enable the `DEBUG` option for `org.springframework.extensions=DEBUG` in the Share log4j.properties file.

Ensure that there are no error messages saying `IO Error: during getObject() ... sun.security.validator.ValidatorException: PKIX path building failed`. If you see this message, this means that your certificate is not trusted.

When editing documents online in Office 2014 for Mac, you may see an error message saying `No connectivity with server`. To resolve this issue, upgrade your version of Office 2014 to version 14.3.6. You can download the Service Pack from [http://www.microsoft.com/en-us/download/details.aspx?id=39634](http://www.microsoft.com/en-us/download/details.aspx?id=39634).

**Related information**  


[sysAdmin subsystem properties](../concepts/sysadmin-subsystem-props.md)

