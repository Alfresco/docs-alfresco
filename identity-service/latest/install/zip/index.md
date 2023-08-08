---
title: Install Identity Service from ZIP file
---

The Identity Service can be installed using a standalone ZIP distribution.
A default realm called `Alfresco` is installed.

## Prerequisites

* Java 11 JDK installed

## Installation steps

1. Download the `alfresco-identity-service-2.0.0.zip` file from [Hyland Community](https://community.hyland.com/en/products/alfresco/release-notes/release-notes/alfresco-identity-service-version-200){:target="_blank"}.

2. Move the downloaded zip file to install location of choice and unzip the contents:

    For a Linux or Unix environment:

    ```bash
    $ unzip alfresco-identity-service-2.0.0.zip
    ```

    For a Windows environment:

    ```bash
    > unzip alfresco-identity-service-2.0.0.zip
    ```

3. Change directory to the `bin` directory of the unzipped folder and run the start script:

    For a Linux or Unix environment:

    ```bash
    $ cd alfresco-identity-service-2.0.0/bin
    $ ./kc.sh start --import-realm --http-relative-path="/auth" --hostname=<HOSTNAME> --https-certificate-file=<PATH_TO_CERT_FILE> --https-certificate-key-file=<PATH_TO_CERT_KEY_FILE>
    $ # alternatively, without HTTPS:
    $ ./kc.sh start --import-realm --http-relative-path="/auth" --hostname=<HOSTNAME> --http-enabled=true --hostname-strict-https=false
    ```

    For a Windows environment using a bat script:

    ```bash
    ...\alfresco-identity-service-2.0.0\bin\kc.bat start --import-realm --http-relative-path="/auth" --hostname=<HOSTNAME> --https-certificate-file=<PATH_TO_CERT_FILE> --https-certificate-key-file=<PATH_TO_CERT_KEY_FILE>
    :: alternatively, without HTTPS:
    ...\alfresco-identity-service-2.0.0\bin\kc.bat start --import-realm --http-relative-path="/auth" --hostname=<HOSTNAME> --http-enabled=true --hostname-strict-https=false
    ```

4. Navigate to `http://localhost:8080/auth` once the service has started.

5. Enter a username and password to create an administrator user for the master realm.

The administrator console for the `Alfresco` realm can be accessed at `http://localhost:8080/auth/admin/alfresco/console/`. The administrator user for this realm has the following credentials:

|Property|Value|
|--------|-----|
|Administrator username|`admin`|
|Administrator password|`admin`|
|Administrator email address|`admin@app.activiti.com`|
|Alfresco client redirect URIs|`*`|

> **Important:** Reset the administrator password for the `Alfresco` realm when first signing into its administrator console.

The Identity Service can be [configured]({% link identity-service/latest/config/index.md %}) further.
