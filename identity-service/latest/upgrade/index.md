---
title: Upgrade Identity Service
---

Use the following information to upgrade the Identity Service from version 1.4 to version 1.5.

> **Important:** Upgrading the Identity Service requires downtime and should be performed in a test environment before being attempted in a production environment.

* [Upgrade a Kubernetes deployment](#upgrade-a-kubernetes-deployment)  
* [Upgrade a ZIP distribution installation](#upgrade-a-zip-distribution-installation)  

## Upgrade a Kubernetes deployment

Use the following steps as a reference to upgrade a Kubernetes deployment:

Normally the infrastructure chart that contains the Identity Service will be deployed as part 
of another product chart such as Alfresco Content Services or Alfresco Process Services. 

As an example, the following upgrade steps reference the infrastructure chart on its own:

1. Manage any open sessions in the Identity Service by signing in as an administrator and using the **Manage > Sessions** option.

2. Delete the data/tx-object-store/ directory.

3. Create a back up of any customizations such as themes or configurations.

4. Back up the database used by the Identity Service.

5. Locate the previously deployed infrastructure chart in Kubernetes and set it as a variable:

    ```bash
    export RELEASENAME=knobby-wolf
    ```

6. Use the `helm upgrade` command to upgrade the infrastructure chart to a release that contains version 1.5 of the Identity Service:

    ```bash
    helm upgrade $RELEASENAME alfresco-stable/alfresco-infrastructure --version 5.2.0
    ```

7. Wait for the new pods to start up before accessing the new version of the Identity Service.

8. (*Optional*) Use the following command to rollback to the previous version if required:

    ```bash
    helm rollback --force --recreate-pods --cleanup-on-fail $RELEASENAME 1
    ```

## Upgrade a ZIP distribution installation

Use the following steps to upgrade a manual ZIP installation:

1. Back up the database used by the Identity Service.

    For example, for a PostgreSQL database backup:

    ```bash
    pg_dump --clean --no-owner --no-acl -h ${POSTGRES_HOST} -p ${POSTGRES_PORT}  -U ${POSTGRES_USER} ${POSTGRES_DATABASE} | grep -v -E '(DROP\ SCHEMA\ public|CREATE\ SCHEMA\ public|COMMENT\ ON\ SCHEMA\ public|DROP\ EXTENSION\ plpgsql|CREATE\ EXTENSION\ IF\ NOT\ EXISTS\ plpgsql|COMMENT\ ON\ EXTENSION\ plpgsql)' > /backup/backup.sql
    ```

2. Remove the existing data from the database and stop the database service.

3. Stop the Identity Service service.

4. Open the zip file for version  of the Identity Service and [configure its connection to the database](https://www.keycloak.org/docs/latest/server_installation/#_database){:target="_blank"}.

5. Restart the database service and restore the database backup to it.

    For example, for a PostgreSQL database:

    ```bash
    psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -d ${POSTGRES_DATABASE} -U ${POSTGRES_USER} -f /backup/backup.sql
    ```

6. Run the standalone start script for the new version of the Identity Service:

    > **Note:** To bind to all public interfaces use `0.0.0.0` as the value of `IP_ADDRESS` otherwise use the address of a specific interface.

    For a Linux or Unix environment:

    ```bash
    cd alfresco-identity-service-1.5.0./bin
    /standalone.sh -b <IP_ADDRESS>
    ```

    For a Windows environment using a bat script:

    ```bash
    alfresco-identity-service-1.5.0.\bin\standalone.bat -b <IP_ADDRESS>
    ```

    For a Windows environment using a Powershell script:

    ```bash
    alfresco-identity-service-1.5.0.\bin\standalone.ps1 -b <IP_ADDRESS>
    ```





























**_NOTE:_** The upgrade of the Alfresco Identity Management Service requires downtime.
This means that no user will be able to connect to any of the Digital Business Platform components while the upgrade or rollback is being done.

### Migrating to Identity Service 1.5.0
**Manual migration step needed**

Since Keycloak 13.0.0, the **_SmallRye_** modules have been removed from the underlying WildFly distribution, and the server will not start if the configuration references them. Therefore, to perform server configuration migration, you have to manually remove all the lines that refer to _SmallRye_ modules.

See Keycloak [documentation](https://www.keycloak.org/docs/latest/upgrading/#migrating-to-13-0-0) for what lines to remove from the **_standalone.xml_** file.


### Note: Upgrading from Identity Service 1.2 to a later versions
Prior to upgrading Identity Service 1.2 to a later version, make sure to first modify the **_First Broker Login_** authentication configuration as follows:

1. Logging into the admin console and select **Alfresco** realm

2. From the left menu, click **Authentication** to open the authentication config page

3. Select **First Broker Login** from the dropdown menu

4. Make sure the **Create User If Unique(create unique user config)** flow is set to **ALTERNATIVE**

![First Broker Login page](docs/resource/images/first-broker-login.png)

5. Follow the steps in the [General upgrade procedure](#General-upgrade-procedure) section


### General upgrade procedure

For upgrading Alfresco Identity Management Service, follow Keycloak's [upgrade procedure](https://www.keycloak.org/docs/latest/upgrading/).

However, depending on the environment you are using you should follow these high-level steps:

1. Prior to applying the upgrade, handle any open transactions and delete the data/tx-object-store/ transaction directory.

2. Back up the old installation (configuration, themes, and so on).

3. Back up the database. For detailed information on how to back up the database, see the documentation for the relational database you are using.

4. Upgrade Keycloak [server](https://www.keycloak.org/docs/latest/upgrading/#_install_new_version).

   - Testing the upgrade in a non-production environment first, to prevent any installation issues from being exposed in production, is a best practice.

   - Be aware that after the upgrade the database will no longer be compatible with the old server

   - Ensure the upgraded server is functional before upgrading adapters in production.

5. If you need to revert the upgrade, first restore the old installation, and then restore the database from the backup copy.

### Upgrading Identity Service in Kubernetes with PostgreSQL database

#### Upgrade from chart >=1.1.0 to 2.1.0

The upgrade should be seamless.


#### Upgrade to chart >=3.0.0

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