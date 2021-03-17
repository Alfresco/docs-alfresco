---
author: [Alfresco Documentation, Alfresco]
---

# Generating a Certificate Authority \(CA\) Key and Certificate

This task describes how to create Alfresco CA key and certificate to sign the repository certificate.

1.  Generate the CA private key.

    ```
    $ openssl genrsa -des3 -out ca.key 1024
    Generating RSA private key, 1024 bit long modulus
    ..........++++++
    ..++++++
    e is 65537 (0x10001)
    Enter pass phrase for ca.key:
    Verifying - Enter pass phrase for ca.key:
    ```

2.  Generate the CA self-signed certificate.

    ```
    $ openssl req -new -x509 -days 3650 -key ca.key -out ca.crt
    Enter pass phrase for ca.key:
    You are about to be asked to enter information that will be incorporated
    into your certificate request.
    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:GB
    State or Province Name (full name) [Some-State]:UK
    Locality Name (eg, city) []:Maidenhead
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Alfresco Software Ltd.
    Organizational Unit Name (eg, section) []:
    Common Name (eg, YOUR name) []:Alfresco CA
    Email Address []:
    ```


**Parent topic:**[Generating Repository SSL Keystores](../tasks/generate-repo-ssl-keystore.md)

