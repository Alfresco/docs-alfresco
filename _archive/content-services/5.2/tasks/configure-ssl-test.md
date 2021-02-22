---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring SSL for a test environment

If you are configuring SSL in a development or test environment, you can edit some configuration files to enable SSL.

**Note:** These instructions should only be used for configuring a test environment. If you are configuring a production environment you should use a proxy server to handle all SSL communication. See [Configuring SSL for a production environment](configure-ssl-prod.md) for more information.

Several proxy application servers are available to configure for SSL communications; for example, Apache Tomcat, HAProxy or Nginx. We explain how to configure SSL using Tomcat on Linux.

1.  Navigate to <TOMCAT\_HOME\>/conf/server.xml and add a new Connector configuration.

    The default `Connector port` is set to 8443, and `SSLEnabled` is set to true. Port 8443 is configured on installation as an SSL port, but should only be used for SSL communication between Solr and the repository.

    Use one of the following three options for your new Connector configuration and replace `keystoreFile="/path/to/ssl.keystore"` and `keystorePass="password"` with appropriate values:

    1.  Start Tomcat on an alternative port \(for example, port 7070\), and create a redirect rule from the default HTTPS port 443 to your chosen port, as shown in the example:

        ```
        <Connector port="7070" proxyPort="443" URIEncoding="UTF-8" 
        protocol="org.apache.coyote.http11.Http11Protocol"  
        SSLEnabled="true" maxThreads="150" scheme="https"  
        keystoreFile="/path/to/ssl.keystore"
        keystorePass="password"  
        keystoreType="JCEKS"  
        secure="true" connectionTimeout="240000"
        clientAuth="false"
        sslProtocol="TLS"
        allowUnsafeLegacyRenegotiation="true"
        maxHttpHeaderSize="32768"
        sslEnabledProtocols="TLSv1.2,TLSv1.1,TLSv1,SSLv2Hello" />
        ```

        A non-privileged user cannot start a server on a port below 1024, therefore port 443 is not accessible.

        Edit the server's iptables configuration to specify the redirection:

        ```
        # Redirect external packets
        -A PREROUTING -j NAT-Port-Redirect
        
        # redirect http traffic
        -A NAT-Port-Redirect -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 8080
        # redirect https traffic
        -A NAT-Port-Redirect -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 7070
        ```

        Add this line to your alfresco-global.properties file:

        ```
        aos.baseUrlOverwrite=https://<external-proxy-host-name>/alfresco/aos
        ```

    2.  Alternatively, configure an available port \(for example, port 7070\) without a proxy port, as shown in the example:

        ```
        <Connector port="7070" URIEncoding="UTF-8" 
        protocol="org.apache.coyote.http11.Http11Protocol"  
        SSLEnabled="true" maxThreads="150" scheme="https"  
        keystoreFile="/path/to/ssl.keystore"
        keystorePass="password"  
        keystoreType="JCEKS"  
        secure="true" connectionTimeout="240000"  
        clientAuth="false"  
        sslProtocol="TLS"
        allowUnsafeLegacyRenegotiation="true"  
        maxHttpHeaderSize="32768"
        sslEnabledProtocols="TLSv1.2,TLSv1.1,TLSv1,SSLv2Hello" />
        ```

        This is the similar to the previous Connector configuration, except that there is no proxy port.

    3.  Alternatively, configure SSL on the default port 443 directly, as shown in the example:

        ```
        <Connector port="443" URIEncoding="UTF-8" 
        protocol="org.apache.coyote.http11.Http11Protocol"  
        SSLEnabled="true" maxThreads="150" scheme="https"  
        keystoreFile="/path/to/ssl.keystore"
        keystorePass="password"  
        keystoreType="JCEKS"  
        secure="true" connectionTimeout="240000"  
        clientAuth="false"  
        sslProtocol="TLS"
        allowUnsafeLegacyRenegotiation="true"  
        maxHttpHeaderSize="32768"
        sslEnabledProtocols="TLSv1.2,TLSv1.1,TLSv1,SSLv2Hello" />
        ```

        This is the similar to the earlier Connector configurations, except that the Connector port is set to 443, and there is no proxy port.

2.  Edit the alfresco-global.properties file with these values \(if you are using example b\):

    ```
    alfresco.protocol=https
    alfresco.host=servername
    alfresco.port=7070
    alfresco.context=alfresco
    share.protocol=https
    share.host=servername
    share.port=7070
    share.context=share
    ```

    where `servername` is your host name, `port` is the external facing port of your choice, and `context` is the path that you use for your context path.


**Parent topic:**[Secure Sockets Layer \(SSL\) and the repository](../concepts/configure-ssl-intro.md)

