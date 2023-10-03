---
title: Configure Identity Service
---

There are two things that can be configured in the Identity Service:

## Configure a custom realm

The Identity Service is installed or deployed with a default realm applied called `Alfresco`. The realm can be customized manually or by using a `JSON` file.

> **Important:** The default realm provided is not production ready and should be used as a reference only.

### Customize a realm manually

Customizing a realm manually uses the administrator console of the Identity Service to configure realm settings.

1. Sign into the master realm administrator console using the credentials created on your first sign in.
2. [Add a new realm](https://www.keycloak.org/docs/18.0/server_admin/index.html#proc-creating-a-realm_server_administration_guide){:target="_blank"} or edit the `Alfresco` realm.
3. [Create a new OIDC client](https://www.keycloak.org/docs/18.0/server_admin/index.html#_oidc_clients){:target="_blank"} or edit the existing one.
4. Configure any [groups](https://www.keycloak.org/docs/18.0/server_admin/index.html#proc-managing-groups_server_administration_guide){:target="_blank"} or users.

### Customize a realm using a JSON file

Customizing a realm using a `JSON` file configures a realm outside of the Identity Service and imports it into the configuration using the administrator console or during deployment if [installing to Kubernetes cluster using Helm charts]({% link identity-service/1.8/install/k8s/index.md %}).

To import the configuration in the administrator console:

1. Edit or use the [default realm file](https://github.com/Alfresco/alfresco-identity-service/blob/master/helm/alfresco-identity-service/alfresco-realm.json){:target="_blank"} provided in the Identity Service GitHub project as a reference to create a custom realm file.
2. Sign into the master realm administrator console using the credentials created on your first sign in.
3. Navigate to the **Add Realm** page and use the **Select File** option to import your custom realm file.

To set the realm file during deployment:

1. Create a Kubernetes secret in the cluster called `realm-secret`:

    ```bash
    kubectl create secret generic realm-secret \
        --from-file=./realm.json \
        --namespace=$DESIREDNAMESPACE
    ```

    > **Important:** The name of the realm file must **not** be set as `alfresco-realm.json`

2. Deploy the Helm chart with the additional argument to use the custom realm file:

    ```bash
    helm install alfresco-stable/alfresco-infrastructure \
        --set alfresco-infrastructure.activemq.enabled=false \
        --set alfresco-infrastructure.nginx-ingress.enabled=true \
        --set alfresco-infrastructure.alfresco-identity-service.enabled=true \
        --set alfresco-identity-service.keycloak.keycloak.extraArgs="-Dkeycloak.import=/realm/realm.json" \
        --namespace $DESIREDNAMESPACE
    ```

## Run Identity Service with Process Services

You can run the Identity Service with Process Services. You must configure both applications for the logout functionality in Process Services to function correctly.

> **Note:** If you do not configure the Identity Service and Process Services correctly, you will receive an error when you try and logout using Process Services.

To run the Identity Service with Process Services:

1. In your Identity Service installation navigate to `<alfresco-identity-service>/standalone/configuration` and open `standalone.xml`.

2. Edit the `spi` elements section to include:

    ```xml
    <spi name="login-protocol">
        <provider name="openid-connect" enabled="true">
            <properties>
              <property name="legacy-logout-redirect-uri"   value="true"/>
            </properties>
          </provider>    
    </spi>
    ```

3. Save the file and restart the Identity Service.

4. Ensure you have set `keycloak.token-store=cookie` in the `activiti-identity-service.properties` file in Process Services. For more see `keycloak.token-store` in the [Process Services properties]({% link process-services/latest/config/authenticate.md %}#properties) table.

5. Restart Process Services.

The Process Services logout functionality will now work with the Identity Service.

## Configure a custom theme

Deploying the Identity Service will deploy an Alfresco login theme.

A custom theme can be applied to the following components of the Identity Service:

* Login screens
* Administrator console
* Email
* Account management

The [Alfresco theme](https://github.com/Alfresco/alfresco-keycloak-theme){:target="_blank"} includes a custom login theme only.

### Developing a theme

Themes are created using a combination of CSS, HTML [Freemarker templates](https://freemarker.apache.org/){:target="_blank"}, theme properties and images.

Use the [Alfresco theme](https://github.com/Alfresco/alfresco-keycloak-theme){:target="_blank"} or the default [Keycloak theme](https://www.keycloak.org/docs/18.0/server_development/#creating-a-theme){:target="_blank"} as a base to extend and create custom themes from.

### Importing a theme for a Kubernetes deployment

There are a number of options for importing a theme into a Kubernetes deployment, for example:

* Create a new Docker image that contains a custom theme.
* Use an `emptyDir` that is shared with the Identity Service container and configure an `init container` that runs the new theme image and copies it into the theme directory.

    The following is an example of configuring this in the `values.yaml`:

    ```yaml
    keycloak:
        extraInitContainers: |
            - name: custom-theme
              image: <theme-image-location-and-tag>
              imagePullPolicy: IfNotPresent
              command:
                - sh
              args:
                - -c
                - |
                  echo "copying new theme..."
                  cp -R /<theme-image-name>/* /theme
              volumeMounts:
                - name: theme
                mountPath: /theme
    
        extraVolumeMounts: |
            - name: theme
              mountPath: /opt/jboss/keycloak/themes/<theme-folder-name>
    
        extraVolumes: |
            - name: theme
              emptyDir: {}
    ```

However a new theme is imported, the new theme will need to be applied by signing into the administrator console and selecting the new themes for each component in the **Themes** tab under **Realm Settings**.

### Importing a theme for a standalone installation

1. Navigate to the themes directory of the installation.
2. Create a new directory for the custom theme.
3. Copy the custom files into directories for each custom theme component for example /themes/login/
4. Restart the Identity Service service.
5. In the administrator console select the new themes for each component in the **Themes** tab under **Realm Settings**.
