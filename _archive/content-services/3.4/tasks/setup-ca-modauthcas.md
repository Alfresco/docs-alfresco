---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Set up Certificate Authority and issue Server and Client Certificates

The topic describes the instructions on how to set up a Certificate Authority \(CA\) and issue Server and Client Certificates on machine 1.

1.  Open the /etc/pki/tls/openssl.cnf file in a text editor. Edit the `[req_distinguished_name]` section so that it has defaults appropriate for your organization. For example:

    ```
    countryName_default = GB
    stateOrProvinceName_default = Berkshire
    localityName_default = Maidenhead
    0.organizationName_default = Alfresco Software Inc. 
    ```

2.  Create the self-signed certificate for Alfresco CA. Use the exact paths listed here, as they are already referenced in openssl.cnf. For CA certificate, use any name that best describes your CA, for example Alfresco Demo.

    ```
    mkdir /etc/pki/CA/{certs,crl,newcerts,private}
    touch /etc/pki/CA/index.txt
    echo 01 > /etc/pki/CA/serial
    cd /etc/pki/CA/
    umask 077
    openssl genrsa -out private/cakey.pem -des3 2048
    openssl req -new -x509 -days 365 -key private/cakey.pem -out cacert.pem -subj '/CN=Alfresco Demo'
    ```

    The following certificates are issued by CA:

    ```
    /etc/pki/CA/private/cakey.pem - CA key
    /etc/pki/CA/cacert.pem - CA certificate
    ```

3.  Ensure that certificates issued by Alfresco CA are trusted by the Apache HTTP server. We need to create a symbolic link to the certificate using a computed hash to add it to the chain of trust.

    ```
    cp cacert.pem /etc/pki/tls/certs/
    cd /etc/pki/tls/certs/
    ln -s cacert.pem `openssl x509 -hash -noout -in cacert.pem`.0
    ```

4.  Replace the HTTP server's test certificate with the certificate issued by Alfresco CA. The advantages of it being issued by the same CA are that fewer certificates need to be added to Alfresco Share's truststore later. When prompted for a certificate subject \(CN\), you must specify the external DNS name of machine 1. The use of `-nodes` option avoids the need to enter the key password every time Apache is started.

    ```
    cd /etc/pki/tls/certs
    openssl req -nodes -new -out localhost.csr -keyout ../private/localhost.key
    openssl x509 -req -days 365 -in localhost.csr -CA /etc/pki/CA/cacert.pem -CAkey /etc/pki/CA/private/cakey.pem -set_serial 01 -out localhost.crt
    rm localhost.csr
    ```

5.  Create Client Certificates that will be used in Alfresco Share to access repository. The Client Certificate securely identifies the Alfresco Share application to the Alfresco repository. You need to protect the private key with a password. Also, export the key and its certificate chain to a password protected PKCS12 keystore `alfresco-system.p12` in the Tomcat classspath so that it can be used by the Share application. Use the same password for both the key and the keystore. For the subject name, use alfresco-system.

    ```
    openssl genrsa -des3 -out ../private/alfresco-system.key 1024
    openssl req -new -key ../private/alfresco-system.key -out alfresco-system.csr -subj '/CN=alfresco-system'
    ```

    Sign the client certificate with our CA certificate:

    ```
    openssl x509 -req -days 365 -in alfresco-system.csr -CA /etc/pki/CA/cacert.pem -CAkey/etc/pki/CA/private/cakey.pem -set_serial 02 -out alfresco-system.crt  
    ```

    Package the client private and public keys in a P12:

    ```
    openssl pkcs12 -export -out alfresco-system.p12 -in alfresco-system.crt -inkey ../private/alfresco-system.key -certfile /etc/pki/CA/cacert.pem    
    ```

    Finally, copy alfresco-system.p12 to machine 2, the Alfresco server, into the /opt/alfresco/tomcat/shared/classes/alfresco/web-extension/ folder.


**Parent topic:**[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)

