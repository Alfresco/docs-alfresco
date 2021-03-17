---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Documentation
---

# Configuring Solr with Alfresco Content Services running on WebSphere

Use this information to configure Solr to communicate with Alfresco Content Services deployed on WebSphere.

Solr must be deployed on a separate Tomcat instance.

-   Configure Solr using the following instructions: [Configure Solr search service](../concepts/configure-solr4.md).
-   Ensure that Alfresco Content Services is installed on WebSphere using the instructions described in [Installing Alfresco Content Services on WebSphere](alf-websphere-install.md).

1.  Generate a keystore for the Solr host and export the self signed certificate using the below script:

    **Note:** Set ALFRESCO\_HOME to the right location in your installation.

    ```
    @rem Please edit the variables below to suit your installation
    @rem Note: for an installation created by the Alfresco installer, you only need to edit ALFRESCO_HOME 
    
    @rem Alfresco installation directory
    set ALFRESCO_HOME=C:\alfresco-one
    set JAVA_HOME=%ALFRESCO_HOME%\java
    @rem Location in which new keystore files will be generated
    set CERTIFICATE_HOME=%USERPROFILE%
    @rem The repository server certificate subject name, as specified in tomcat\conf\tomcat-users.xml with roles="repository"
    set REPO_CERT_DNAME=CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    @rem The SOLR client certificate subject name, as specified in tomcat\conf\tomcat-users.xml with roles="repoclient"
    set SOLR_CLIENT_CERT_DNAME=CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    @rem The number of days before the certificate expires
    set CERTIFICATE_VALIDITY=36525
    
    @rem Ensure certificate output dir exists
    @if not exist "%CERTIFICATE_HOME%" mkdir "%CERTIFICATE_HOME%"
    
    @rem Generate new self-signed certificates for solr
    "%JAVA_HOME%\bin\keytool" -genkeypair -keyalg RSA -dname "%SOLR_CLIENT_CERT_DNAME%" -validity %CERTIFICATE_VALIDITY% -alias ssl.repo.client -keypass kT9X6oe68t 
    -keystore "%CERTIFICATE_HOME%\ssl.repo.client.keystore" -storetype JCEKS -storepass kT9X6oe68t"%JAVA_HOME%\bin\keytool" 
    -exportcert -alias ssl.repo.client -file "%CERTIFICATE_HOME%\ssl.repo.client.crt" 
    -keystore "%CERTIFICATE_HOME%\ssl.repo.client.keystore" -storetype JCEKS -storepass kT9X6oe68t
    ```

2.  Transfer the generated `ssl.repo.client.crt` to the WebSphere host.

3.  Generate a keystore for the repository in the WebSphere host and export the self signed certificate using the following script:

    **Note:** Set `JAVA_HOME` to the right location in the WebSphere installation.

    ```
    #! /bin/sh
    
    # Please edit the variables below to suit your installation
    
    # Set JAVA_HOME to the JDK used by WebSphere
    JAVA_HOME=/opt/alfresco/IBM/WebSphere/AppServer/java_1.7_64
    
    # Location in which new keystore files will be generated
    CERTIFICATE_HOME=$HOME
    
    # The repository server certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repository"
    REPO_CERT_DNAME="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The SOLR client certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repoclient"
    SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The number of days before the certificate expires
    CERTIFICATE_VALIDITY=36525
    
    # Ensure certificate output dir exists
    mkdir -p "$CERTIFICATE_HOME"
    
    # Generate new self-signed certificates for the repository
    "$JAVA_HOME/bin/keytool" -genkeypair -keyalg RSA -dname "$REPO_CERT_DNAME" -validity
    $CERTIFICATE_VALIDITY -alias ssl.repo -keypass kT9X6oe68t -keystore
    "$CERTIFICATE_HOME/ssl.keystore" -storetype JCEKS -storepass kT9X6oe68t
        
    "$JAVA_HOME/bin/keytool" -exportcert -alias ssl.repo -file
    "$CERTIFICATE_HOME/ssl.repo.crt" -keystore "$CERTIFICATE_HOME/ssl.keystore" -storetype JCEKS -storepass kT9X6oe68t
    ```

4.  Transfer the generated `ssl.repo.crt` to the Solr host.

5.  Import the transferred `ssl.repo.client.crt` and the generated `ssl.repo.crt` to the repository truststore on WebSphere using the following script:

    **Note:** Set `JAVA_HOME` to the right location in the WebSphere installation.

    ```
    #! /bin/sh
    
    #Please edit the variables below to suit your installation
    
    # Set JAVA_HOME to the JDK used by WebSphere
    JAVA_HOME=/opt/alfresco/IBM/WebSphere/AppServer/java_1.7_64
    
    # Location in which new keystore files will be generated
    CERTIFICATE_HOME=$HOME
    
    # The repository server certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repository"
    REPO_CERT_DNAME="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The SOLR client certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repoclient"
    SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The number of days before the certificate expires
    CERTIFICATE_VALIDITY=36525
    
    # Ensure certificate output dir exists
    mkdir -p "$CERTIFICATE_HOME"
    
    # Generate new self-signed certificates for the repository and solr
    "$JAVA_HOME/bin/keytool" -importcert -noprompt -alias ssl.repo.client -file
    "$CERTIFICATE_HOME/ssl.repo.client.crt" -keystore "$CERTIFICATE_HOME/ssl.truststore" -storetype JCEKS -storepass kT9X6oe68t
    
    "$JAVA_HOME/bin/keytool" -importcert -noprompt -alias ssl.repo -file "$CERTIFICATE_HOME/ssl.repo.crt" 
    -keystore "$CERTIFICATE_HOME/ssl.truststore" -storetype JCEKS -storepass kT9X6oe68t
    ```

6.  In the Solr host, import the transferred `ssl.repo.crt` to the Solr truststore using the following script:

    **Note:** Set `ALFRESCO_HOME` to the right location in your installation.

    ```
    @rem Please edit the variables below to suit your installation
    
    @rem Note: for an installation created by the Alfresco installer, you only need to edit ALFRESCO_HOME
    
    @rem Alfresco installation directory
    
    set ALFRESCO_HOME=C:\alfresco-one
    
    set JAVA_HOME=%ALFRESCO_HOME%\java
    
    @rem Location in which new keystore files will be generated
    
    set CERTIFICATE_HOME=%USERPROFILE%
    
    @rem The repository server certificate subject name, as specified in tomcat\conf\tomcat-users.xml with roles="repository"
    
    set REPO_CERT_DNAME=CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    
    @rem The SOLR client certificate subject name, as specified in tomcat\conf\tomcat-users.xml with roles="repoclient"
    
    set SOLR_CLIENT_CERT_DNAME=CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    
    @rem The number of days before the certificate expires
    
    set CERTIFICATE_VALIDITY=36525
    
    @rem Ensure certificate output dir exists
    
    @if not exist "%CERTIFICATE_HOME%" mkdir "%CERTIFICATE_HOME%"
        
    "%JAVA_HOME%\bin\keytool" -importcert -noprompt -alias ssl.repo -file
    "%CERTIFICATE_HOME%\ssl.repo.crt" -keystore "%CERTIFICATE_HOME%\ssl.repo.client.truststore" -storetype JCEKS 
    -storepass kT9X6oe68t
    ```

7.  Optionally, generate `browser.p12` for use with the browser using the following script:

    ```
    #! /bin/sh
    
    # Please edit the variables below to suit your installation
    
    # Note: for an installation created by the Alfresco installer, you only need to edit `ALFRESCO_HOME`
    JAVA_HOME=/opt/alfresco/IBM/WebSphere/AppServer/java_1.7_64
    
    # Location in which new keystore files will be generated
    CERTIFICATE_HOME=$HOME
    
    # The repository server certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repository
    "REPO_CERT_DNAME="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The SOLR client certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repoclient"
    SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The number of days before the certificate expires
    CERTIFICATE_VALIDITY=36525
    
    # Ensure certificate output dir exists
    mkdir -p "$CERTIFICATE_HOME"
    
    # Generate new self-signed certificates for browser
    "$JAVA_HOME/bin/keytool" -importkeystore -srckeystore "$CERTIFICATE_HOME/ssl.keystore" -srcstorepass kT9X6oe68t 
    -srcstoretype JCEKS -srcalias ssl.repo -srckeypass kT9X6oe68t -destkeystore
    "$CERTIFICATE_HOME/browser.p12" -deststoretype pkcs12 -deststorepass alfresco -destalias ssl.repo -destkeypass alfresco
    ```

8.  In the WebSphere host, copy `ssl.keystore` and `ssl.truststore` from `$HOME` to <WEBSPHERE\_HOME\>/alf\_data/keystore directory.

9.  In the Solr host, copy `ssl.repo.client.keystore` and `ssl.repo.client.truststore` from the user home directory \(for example, c:\\Users\\<username\>\) to the following two folders:

    -   <ALFRESCO\_HOME\>/SOLR4/archive-SpacesStore/conf
    -   <ALFRESCO\_HOME\>/SOLR4/workspace-SpacesStore/conf
10. Edit the solrcore.properties \(in the Solr host\) for archive-Spacestore \( <ALFRESCO\_HOME\>/SOLR4/archive-SpacesStore/conf\) and workspace-Spacestore \(<ALFRESCO\_HOME\>/SOLR4/workspace-SpacesStore/conf \)to specify the WebSphere host, port, and SSL port.

    For example:

    ```
    alfresco.host=KAlfWebsphere
    alfresco.port=8080
    alfresco.port.ssl=9443
    ```

11. On the WebSphere host, edit the alfresco-global.properties file to include the Solr host, port, and SSL port.

    For example:

    ```
    index.subsystem.name=solr4
    solr.host=kavdesktop
    solr.port=8080
    solr.port.ssl=8443
    solr.secureComms=https
    encryption.keystore.provider=IBMJCE 
    encryption.ssl.keystore.provider=IBMJCE 
    encryption.ssl.truststore.provider=IBMJCE
    ```

12. Add the JVM option `-Dhttps.protocols="TLSv1"` to Tomcat to make JDK 1.8 use `TLSv1`.

13. Edit server.xml `SSL CONNECTOR` to change the keystores to the repository client keystores.

    Solr is now communicating with the WebSphere host, so the existing repository keystores are not valid.

    ```
    <Connector port="8443" URIEncoding="UTF-8" protocol="org.apache.coyote.http11.Http11Protocol" 
    SSLEnabled="true"  maxThreads="150" scheme="https"
     keystoreFile="C:/alfresco-one/solr4/archive-SpacesStore/conf/ssl.repo.client.keystore"
     keystorePass="kT9X6oe68t" keystoreType="JCEKS" secure="true" connectionTimeout="240000"
     truststoreFile="C:/alfresco-one/solr4/archive-SpacesStore/conf/ssl.repo.client.truststore"
     truststorePass="kT9X6oe68t" truststoreType="JCEKS" clientAuth="want" sslProtocol="TLS"
     allowUnsafeLegacyRenegotiation="true" maxHttpHeaderSize="32768" maxSavePostSize="-1" />
    ```

14. In the WebSphere Administration Console, go to **Security \> SSL certificate and key management \> Key stores and certificates**, and then select **New**.

15. Specify the following parameters and then select **OK**.

    ```
    **Name:** AlfrescoKeyStore 
    **Path:** <WAS_INSTALL_ROOT>/alf_data/keystore/ssl.keystore
    **Password:** kT9X6oe68t
    **Confirm password:** kT9X6oe68t
    **Type:** JCEKS
    ```

    Save the changes to the master configuration.

16. Create another keystore using following parameters:

    ```
    **Name:** AlfrescoTrustStore
    **Path:** <WAS_INSTALL_ROOT>/alf_data/keystore/ssl.truststore
    **Password:** kT9X6oe68t
    **Confirm password:** kT9X6oe68t
    **Type:** JCEKS  
    ```

    Save the changes to the master configuration.

17. Go to **Security \> SSL certificate and key management \> SSL configurations \> NodeDefaultSSLSettings**, and make the following updates:

    1.  Specify AlfrescoTrustStore as the **Trust store name**.

    2.  Specify AlfrescoKeyStore as the **Keystore name**.

    3.  Click **Get certificate aliases** and then select **OK**.

    4.  Under **Additional Properties**, select **Quality of protection \(QoP\)**.

    5.  Set **Client Authentication** to **Supported**.

    6.  Set **Protocol** to **TLS**.

    7.  Select **OK**.

    8.  Save the changes to the master configuration.


**Parent topic:**[Installing Alfresco Content Services on WebSphere](../tasks/alf-websphere-install.md)

