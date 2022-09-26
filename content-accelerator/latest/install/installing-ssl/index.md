---
title: Installing SSL
---

# Steps to Set up SSL From ACA

Update the config.properties as well as hpi.properties to point to the proper port (usually 8443) and have the https. If you have a DER file you may skip straight to the Java installation instructions.

##  OpenSSL

Take the generated p7b and convert it to PEM with the following command.

`openssl pkcs7 inform der -print_certs -in cert.p7b -out cert.pem`

Take the PEM and convert it to DER

`openssl x509 -outform der -in cert.pem out cert.der`



## Java Installation Instructions

Open an Administrator Elevated command prompt and navigate to where Java 8 JRE bin is located.

Run the following

`keytool -importcert -file "E:\PATH TO DER\cert.der" -keystore "E:\PATH TO JAVA\jre\lib\security\cacerts" -storepass "changeit" -alias "ALIAS"`

When asked if you should trust this certificate answer "yes"

The certificate is now added to the Java trusted Keystore.