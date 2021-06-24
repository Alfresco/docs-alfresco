---
title: Upgrade Identity Service
---

Use the following information to upgrade the Identity Service from version 1.3 to version 1.4.

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

6. Use the `helm upgrade` command to upgrade the infrastructure chart to a release that contains version 1.4 of the Identity Service:

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

4. Open the zip file for version 1.4 of the Identity Service and [configure its connection to the database](https://www.keycloak.org/docs/latest/server_installation/#_database){:target="_blank"}.

5. Restart the database service and restore the database backup to it.

    For example, for a PostgreSQL database:

    ```bash
    psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -d ${POSTGRES_DATABASE} -U ${POSTGRES_USER} -f /backup/backup.sql
    ```

6. Run the standalone start script for the new version of the Identity Service:

    > **Note:** To bind to all public interfaces use `0.0.0.0` as the value of `IP_ADDRESS` otherwise use the address of a specific interface.

    For a Linux or Unix environment:

    ```bash
    cd alfresco-identity-service-1.4.0/bin
    /standalone.sh -b <IP_ADDRESS>
    ```

    For a Windows environment using a bat script:

    ```bash
    alfresco-identity-service-1.4.0\bin\standalone.bat -b <IP_ADDRESS>
    ```

    For a Windows environment using a Powershell script:

    ```bash
    alfresco-identity-service-1.4.0\bin\standalone.ps1 -b <IP_ADDRESS>
    ```
