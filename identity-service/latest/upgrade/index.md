---
title: Upgrade Identity Service
---

Use the following information to upgrade the Identity Service to version 2.0.

> **Important:**
>
> * Upgrading the Identity Service requires downtime and should be performed in a test environment before being attempted in a production environment.
> * After the upgrade the database will no longer be compatible with the old server.

Before performing an upgrade, make sure you review the recommended guidelines in the following sections:

* [Upgrade from version 1.2](#upgrade-v12)
* [Remove SmallRye references](#remove-smallrye-references)
* [Upgrade ZIP installation](#upgrade-zip-installation)
* [Upgrade Kubernetes deployment with PostgreSQL database](#upgrade-kubernetes-deployment-with-postgresql-database)  

For Keycloak's upgrade documentation, see the [Upgrading Guide](https://www.keycloak.org/docs/21.1.2/upgrading/){:target="_blank"}.

## Upgrade from version 1.2 {#upgrade-v12}

If you are currently using the Identity Service 1.2 you must first modify the **_First Broker Login_** authentication before upgrading to version 1.8.

1. Log into the Keycloak administration console and select the **Alfresco** realm.

2. Select **Authentication** from the menu on the left to open the authentication configuration page.

3. Select **First Broker Login** from the dropdown menu.

4. Ensure **Create User If Unique (create unique user config)** flow is set to **ALTERNATIVE**.

**Result:** You can now upgrade directly to version 1.8.

## Remove SmallRye references

You must manually remove all the **_SmallRye_** modules in the `standalone.xml` file before upgrading to version 1.8.

> **Important:** From Keycloak 13.0.0 the modules called **_SmallRye_** have been removed from the [WildFly](https://www.wildfly.org/){:target="_blank"} application. The server will not start if your configuration references them.

See the Keycloak documentation [Migrating to 13.0.0](https://www.keycloak.org/docs/18.0/upgrading/#migrating-to-13-0-0){:target="_blank"} for more information.

## Upgrade from version 1.8

Upgrading from Identity Service 1.8.x to >= 2.0.0 implies migrating from a Wildfly to a Quarkus-based Keycloak distribution. The way Keycloak is structured, configured, and started up changed so it is recommended to go through the [official Keycloak documentation](https://www.keycloak.org/docs/21.1.2/upgrading/){:target="_blank"} to upgrade your current installation without losing critical data.

You can find the full list of potentially relevant migration changes in the Keycloak site, [Migration changes](https://www.keycloak.org/docs/21.1.2/upgrading/index.html#migration-changes){:target="_blank"}, starting with the [Migrating to 19.0.0](https://www.keycloak.org/docs/21.1.2/upgrading/index.html#migrating-to-19-0-0){:target="_blank"} section.

Some of the most noticeable changes are:

| Change | Mitigation |
| ------ | ---------- |
| The `/auth` default HTTP context path has been removed. | The server should be started with `--http-relative-path="/auth"` to restore the context path. |
| The `userinfo` endpoint now requires the provided Access Token to have the `openid` scope. | If you were relying on the `userinfo` endpoint you should make sure that your Access Tokens include the `openid` scope. |
| The `userinfo` endpoint error responses have changed according to [Upgrading Guide](https://www.keycloak.org/docs/21.1.2/upgrading/index.html#userinfo-endpoint-changes){:target="_blank"}. | If you were relying on parsing error responses coming from this endpoint, the relevant code should be reviewed and adapted to the new behavior. |
| `RSA_SHA1` and `DSA_SHA1` algorithms [have been deprecated](https://www.keycloak.org/docs/21.1.2/upgrading/index.html#deprecated-rsa_sha1-and-dsa_sha1-algorithms-for-saml){:target="_blank"} and aren't valid algorithms to sign SAML responses anymore. | Adapt the configuration of your SAML identity provider so that it uses a valid algorithm such as SHA256 instead.<br><br>If the mitigation is not applicable, you can override the `$JAVA_HOME/conf/security/java.security` file and remove the relevant disallowed algorithms within `jdk.xml.dsig.secureValidationPolicy` instead. |
| The embedded H2 database has been upgraded from 1.x to 2.x, making it impossible to simply copy a previous H2 database file and use it in the newer version of Keycloak to retain the data. | If you need to retain the data that was present in an H2 1.x database file, you'll need to migrate it first to an H2 2.x compatible version before copying it into the new installation. |

## Upgrade ZIP installation

Use the following information to upgrade your ZIP installation:

1. Download the `alfresco-identity-service-2.0.0.zip` file from [Hyland Community](https://community.hyland.com/en/products/alfresco/release-notes/release-notes/alfresco-identity-service-version-200){:target="_blank"}.

2. Unzip the ZIP file and configure your installation using the Keycloak documentation: [Upgrading Keycloak](https://www.keycloak.org/docs/21.1.2/upgrading/){:target="_blank"}.

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

### Upgrade to chart `>=8.0.0`

The Helm charts are now based on the newer [keycloakx](https://github.com/codecentric/helm-charts/tree/keycloakx-2.2.1/charts/keycloakx){:target="_blank"} codecentric charts which are significantly different from the previous version and include several breaking changes. Refer to the [Keycloak-X documentation](https://github.com/codecentric/helm-charts/blob/keycloakx-2.2.1/charts/keycloakx/README.md){:target="_blank"} to get a clearer understanding of the structure of the new charts. It's also recommended to go through some of the examples to get familiar with the new way of [enabling persistence](https://github.com/codecentric/helm-charts/tree/keycloakx-2.2.1/charts/keycloakx/examples/postgresql){:target="_blank"}.

You'll find additional documentation specific to this version of Identity Service by following these links: [README](https://github.com/Alfresco/alfresco-identity-service/blob/2.0.0/README.md){:target="_blank"}, [helm README](https://github.com/Alfresco/alfresco-identity-service/blob/2.0.0/helm/alfresco-identity-service/README.md){:target="_blank"}.
