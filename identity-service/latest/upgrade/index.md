---
title: Upgrade Identity Service
---

Use the following information to upgrade the Identity Service from version 1.4 to version 1.5.

> **Important:** Upgrading the Identity Service requires downtime and should be performed in a test environment before being attempted in a production environment.

* [Upgrade from version 1.2](#upgrade-from-version-1.2)
* [Remove **_SmallRye_** references](#Remove-**_SmallRye_**-references)
* [Upgrade a ZIP distribution installation](#upgrade-a-zip-distribution-installation)  
* [Upgrade a Kubernetes deployment with PostgreSQL database](#upgrade-a-kubernetes-deployment-with-postgresql-database)  

## Upgrade from version 1.2

If you are currently using the Identity Service 1.2 you must first modify the **_First Broker Login_** authentication before upgrading to version 1.5.

1. Log into the administration console and select the **Alfresco** realm.

2. Select **Authentication** from the menu on the left to open the authentication configuration page.

3. Select **First Broker Login** from the dropdown menu.

4. Ensure **Create User If Unique (create unique user config)** flow is set to **ALTERNATIVE**.

**Result:** You can now upgrade directly to version 1.5.

## Remove **_SmallRye_** references

> **Important:** You must manually remove all the **_SmallRye_** modules in the `standalone.xml` file before upgrading. From Keycloak 13.0.0 the modules called **_SmallRye_** have been removed from the [WildFly](#https://www.wildfly.org/){:target="_blank"} application. The server will not start if your configuration references them. For more information see [Migrating to 13.0.0](https://www.keycloak.org/docs/latest/upgrading/#migrating-to-13-0-0){:target="_blank"}.

## Upgrade a ZIP distribution installation

Use the following information to upgrade your ZIP installation:

1. Download the `alfresco-identity-service-1.5.0.zip` file from [Hyland Community](https://community.hyland.com/en/products/alfresco/release-notes/release-notes/alfresco-identity-service-version-150){:target="_blank"}.

2. Back up the database used by the Identity Service.

    For example, for a PostgreSQL database backup:

    ```bash
    pg_dump --clean --no-owner --no-acl -h ${POSTGRES_HOST} -p ${POSTGRES_PORT}  -U ${POSTGRES_USER} ${POSTGRES_DATABASE} | grep -v -E '(DROP\ SCHEMA\ public|CREATE\ SCHEMA\ public|COMMENT\ ON\ SCHEMA\ public|DROP\ EXTENSION\ plpgsql|CREATE\ EXTENSION\ IF\ NOT\ EXISTS\ plpgsql|COMMENT\ ON\ EXTENSION\ plpgsql)' > /backup/backup.sql
    ```

3. Remove the existing data from the database and stop the database service.

4. Stop the Identity Service service.

5. Unzip the ZIP file and configure your connection to the database using the Keycloak documentation. [Relational Database Setup]](https://www.keycloak.org/docs/latest/server_installation/#_database){:target="_blank"}.

6. Restart the database service and restore your backup database.

    For example, for a PostgreSQL database:

    ```bash
    psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -d ${POSTGRES_DATABASE} -U ${POSTGRES_USER} -f /backup/backup.sql
    ```

7. Run the standalone start script for the new version of the Identity Service:

    > **Note:** To bind to all public interfaces use `0.0.0.0` as the value of `IP_ADDRESS` otherwise use the address of a specific interface.

    For a Linux or Unix environment:

    ```bash
    cd alfresco-identity-service-1.5.0/bin
    /standalone.sh -b <IP_ADDRESS>
    ```

    For a Microsoft Windows environment using a bat script:

    ```bash
    alfresco-identity-service-1.5.0\bin\standalone.bat -b <IP_ADDRESS>
    ```

    For a Microsoft Windows environment using a Powershell script:

    ```bash
    alfresco-identity-service-1.5.0\bin\standalone.ps1 -b <IP_ADDRESS>
    ```

### General upgrade procedure

For upgrading the Identity Service, follow Keycloak's [upgrade procedure](https://www.keycloak.org/docs/latest/upgrading/).

Depending on the environment you are using you should follow these high-level steps:

1. Prior to applying the upgrade, handle any open transactions and delete the data/tx-object-store/ transaction directory.

2. Back up the old installation (configuration, themes, and so on).

3. Back up the database. For detailed information on how to back up the database, see the documentation for the relational database you are using.

4. Upgrade Keycloak [server](https://www.keycloak.org/docs/latest/upgrading/#_install_new_version).

   * Testing the upgrade in a non-production environment first, to prevent any installation issues from being exposed in production, is a best practice.

   * Be aware that after the upgrade the database will no longer be compatible with the old server

   * Ensure the upgraded server is functional before upgrading adapters in production.

5. If you need to revert the upgrade, first restore the old installation, and then restore the database from the backup copy.

### Upgrade a Kubernetes deployment with PostgreSQL database

#### Upgrade from chart `>=1.1.0` to `2.1.0`

The upgrade should be seamless.

#### Upgrade to chart `>=3.0.0`

1. Identify your chart release name and namespace and save them into variables.

    ```bash
    export RELEASENAME=<Your-Release-Name>
    export RELEASENAMESPACE=<Your-Release-Namespace>
    ```

2. Delete the postgresql StatefulSets.

    ```bash
    kubectl delete statefulsets.apps $RELEASENAME-postgresql-id --cascade=false --namespace $RELEASENAMESPACE
    ```

3. Upgrade Identity Service.

    ```bash
    helm upgrade $RELEASENAME alfresco-stable/alfresco-identity-service --version=3.0.0 --namespace $RELEASENAMESPACE
    ```

4. Delete the postgresql pod.

    ```bash
    kubectl delete pod $RELEASENAME-postgresql-id-0 --namespace $RELEASENAMESPACE
    ```

The Identity Service should be back up in a few minutes.
