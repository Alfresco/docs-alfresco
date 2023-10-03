---
title: Upgrade Identity Service
---

Use the following information to upgrade the Identity Service to version 1.6.

> **Note:** After the upgrade the database will no longer be compatible with the old server.

> **Important:** Upgrading the Identity Service requires downtime and should be performed in a test environment before being attempted in a production environment.

* [Upgrade from version 1.2](#upgrade-v12)
* [Remove SmallRye references](#remove-smallrye-references)
* [Upgrade ZIP installation](#upgrade-zip-installation)
* [Upgrade Kubernetes deployment with PostgreSQL database](#upgrade-kubernetes-deployment-with-postgresql-database)  

> **Note:** For Keycloak's upgrade documentation see [upgrade procedure](https://www.keycloak.org/docs/latest/upgrading/).

## Upgrade from version 1.2 {#upgrade-v12}

If you are currently using the Identity Service 1.2 you must first modify the **_First Broker Login_** authentication before upgrading to version 1.6.

1. Log into the Keycloak administration console and select the **Alfresco** realm.

2. Select **Authentication** from the menu on the left to open the authentication configuration page.

3. Select **First Broker Login** from the dropdown menu.

4. Ensure **Create User If Unique (create unique user config)** flow is set to **ALTERNATIVE**.

**Result:** You can now upgrade directly to version 1.6.

## Remove SmallRye references

> **Important:** You must manually remove all the **_SmallRye_** modules in the `standalone.xml` file before upgrading to version 1.6. From Keycloak 13.0.0 the modules called **_SmallRye_** have been removed from the [WildFly](https://www.wildfly.org/){:target="_blank"} application. The server will not start if your configuration references them. For more information see [Migrating to 13.0.0](https://www.keycloak.org/docs/latest/upgrading/#migrating-to-13-0-0){:target="_blank"}.

## Upgrade ZIP installation

Use the following information to upgrade your ZIP installation:

1. Download the `alfresco-identity-service-1.6.0.zip` file from [Hyland Community](https://community.hyland.com/en/products/alfresco/release-notes/release-notes/alfresco-identity-service-version-160){:target="_blank"}.

2. Unzip the ZIP file and configure your installation using the Keycloak documentation. [Upgrading Keycloak](https://www.keycloak.org/docs/15.0/upgrading/#_upgrading){:target="_blank"}.

## Upgrade Kubernetes deployment with PostgreSQL database

### Upgrade from chart `>=1.1.0` to `2.1.0`

The upgrade should be seamless.

### Upgrade to chart `>=3.0.0`

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
