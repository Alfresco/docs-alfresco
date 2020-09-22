---
author: Alfresco Documentation
---

# Generating secure keys for SSL communication

Use this information to generate certificates for SSL/mutual TLS authentication between the repository and Alfresco Search and Insight Engine, using secure keys specific to your installation.

A certificates generator script, `run.sh` \(for Linux\) and `run.cmd` \(for Windows\) is provided in a GitHub project. The script consists of two parts - the first part is based on OpenSSL \(to generate the certificates\), and the second part is based on the Java `keytool` \(to build the keystores and truststores\). Here, we'll focus on running the script for a standalone Linux or Windows operating system.

Before you start, you must already have OpenSSL and `keytool` available in your system path.

1.  Browse to the [https://github.com/Alfresco/alfresco-ssl-generator](https://github.com/Alfresco/alfresco-ssl-generator) GitHub project and click Clone or download.

    If you downloaded the project, extract the files to a suitable location.

2.  Change directory to the following location and run the script:

    \(For Linux\)

    ```
    cd /ssl-tool
    ./run.sh
    ```

    \(For Windows\)

    ```
    cd ssl-tool-win
    run.cmd
    ```

    By default, this creates a `keystores` folder in your current working directory.

    **Note:** If the `keystores` folder isn't empty, the script exits without producing any keystore or truststore. You can safely, remove the `keystores` folder if you need to re-run the script.


See [Keystore directory structure](../concepts/keystore-structure.md) for more and [Customizing certificate generation](../concepts/customize-keys.md) for a full list of parameters that allow you to customize your certificates. It is recommended that you set your own passwords when generating certificates.

**Parent topic:**[Generating secure keys overview](../concepts/generate-keys-overview.md)

