---
author: [Alfresco Documentation, Alfresco]
---

# Generating Repository SSL Keystores

This task describes how to create an SSL public/private keystore and a certificate for the repository.

The following instructions creates an RSA public/private key pair for the repository with a certificate signed by the Alfresco Certificate Authority \(CA\). It also creates a truststore for the repository containing the CA certificate that is used to authenticate connections to specific repository URLs from Solr. The instructions assume the existence of the Alfresco CA key and certificate to sign the repository certificate. However, for security reasons these may not available. You can either generate your own CA key and certificate or use a recognised Certificate Authority, such as Verisign. To generate your own CA key and certificate, see [Generating CA key and certificate](generate-repo-ca-key.md).

**Note:** <store password\> is the keystore password. The file C:\\Alfresco\\alf\_data\\keystore\\ssl-keystore-passwords.properties contains passwords for the SSL keystore, whereas, the file C:\\Alfresco\\alf\_data\\keystore\\ssl-truststore-passwords.properties contains passwords for the SSL truststore.

1.  Generate the repository public/private key pair in a keystore.

    ```
    $ keytool -genkey -alias repo -keyalg RSA -keystore ssl.keystore -storetype JCEKS -storepass <store password>
    Enter keystore password:  
    Re-enter new password: 
    What is your first and last name?
      [Unknown]:  Alfresco Repository
    What is the name of your organizational unit?
      [Unknown]:  
    What is the name of your organization?
      [Unknown]:  Alfresco Software Ltd.
    What is the name of your City or Locality?
      [Unknown]:  Maidenhead 
    What is the name of your State or Province?
      [Unknown]:  UK
    What is the two-letter country code for this unit?
      [Unknown]:  GB
    Is CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB correct?
      [no]:  yes
    
    Enter key password for <repo>
    	(RETURN if same as keystore password):
           
    ```

2.  Generate a certificate request for the repository key.

    ```
    $ keytool -keystore ssl.keystore -alias repo -certreq -file repo.csr -storetype JCEKS -storepass <store password>
    ```

3.  Alfresco CA signs the certificate request and creates a certificate that is valid for 365 days.

    ```
    $ openssl x509 -CA ca.crt -CAkey ca.key -CAcreateserial -req -in repo.csr -out repo.crt -days 365
    Signature ok
    subject=/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Alfresco Repository
    Getting CA Private Key
    Enter pass phrase for ca.key:
    ```

4.  Import the Alfresco CA key into the repository keystore.

    ```
    $ keytool -import -alias AlfrescoCA -file ca.crt -keystore ssl.keystore -storetype JCEKS -storepass <store password>
    Enter keystore password:  
    Owner: CN=Alfresco CA, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    Issuer: CN=Alfresco CA, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    Serial number: 805ba6dc8f62f8b8
    Valid from: Fri Aug 12 13:28:58 BST 2011 until: Mon Aug 09 13:28:58 BST 2021
    Certificate fingerprints:
    	 MD5:  4B:45:94:2D:8E:98:E8:12:04:67:AD:AE:48:3C:F5:A0
    	 SHA1: 74:42:22:D0:52:AD:82:7A:FD:37:46:37:91:91:F4:77:89:3A:C9:A3
    	 Signature algorithm name: SHA1withRSA
    	 Version: 3
    
    Extensions: 
    
    #1: ObjectId: 2.5.29.14 Criticality=false
    SubjectKeyIdentifier [
    KeyIdentifier [
    0000: 08 42 40 DC FE 4A 50 87   05 2B 38 4D 92 70 8E 51  .B@..JP..+8M.p.Q
    0010: 4E 38 71 D6                                        N8q.
    ]
    ]
    
    #2: ObjectId: 2.5.29.19 Criticality=false
    BasicConstraints:[
      CA:true
      PathLen:2147483647
    ]
    
    #3: ObjectId: 2.5.29.35 Criticality=false
    AuthorityKeyIdentifier [
    KeyIdentifier [
    0000: 08 42 40 DC FE 4A 50 87   05 2B 38 4D 92 70 8E 51  .B@..JP..+8M.p.Q
    0010: 4E 38 71 D6                                        N8q.
    ]
    
    [CN=Alfresco CA, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB]
    SerialNumber: [    805ba6dc 8f62f8b8]
    ]
    
    Trust this certificate? [no]:  yes
    Certificate was added to keystore
    ```

5.  Import the CA-signed repository certificate into the repository keystore.

    ```
    $ keytool -import -alias repo -file repo.crt -keystore ssl.keystore -storetype JCEKS -storepass <store password>
    Enter keystore password:  
    Certificate reply was installed in keystore
    ```

6.  Convert the repository keystore to a pkcs12 keystore \(for use in browsers, such as Firefox\). Specify the keystore passowrd for pkcs12 keystore as 'alfresco'.

    ```
    keytool -importkeystore -srckeystore ssl.keystore -srcstorepass <keystore password> -srcstoretype JCEKS -srcalias 
    repo -srckeypass kT9X6oe68t -destkeystore firefox.p12 -deststoretype pkcs12 -deststorepass alfresco -destalias repo 
    -destkeypass alfresco
    ```

7.  Create a repository truststore containing the Alfresco CA certificate.

    ```
    keytool -import -alias AlfrescoCA -file ca.crt -keystore ssl.truststore -storetype JCEKS -storepass <store password>
    ```

8.  Copy the keystore and truststore to the repository keystore location defined by the property `dir.keystore`.

9.  Update the SSL properties \(properties starting with the prefixes `alfresco.encryption.ssl.keystore` and `alfresco.encryption.ssl.truststore`\).


-   **[Generating a Certificate Authority \(CA\) Key and Certificate](../tasks/generate-repo-ca-key.md)**  
This task describes how to create Alfresco CA key and certificate to sign the repository certificate.

**Parent topic:**[Solr security](../concepts/solrsecurity-intro.md)

