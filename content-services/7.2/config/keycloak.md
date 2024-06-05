---
title: Configure Keycloak
---

Use this information to install and configure [Keycloak](https://www.keycloak.org/){:target="_blank"} as an alternative to using the [Identity Service]({% link identity-service/latest/index.md %}). Keycloak is responsible for supporting user authentication of other Alfresco software.

The key capabilities of Keycloak include the ability to:

* Enable Single Sign On (SSO) capabilities for Alfresco Content Services and Alfresco Process Services
* Configure user authentication between Keycloak and a Lightweight Directory Access Protocol (LDAP) provider
* Configure a supported SAML provider to enable Single Sign On (SSO) with an existing identity provider

More information is available about Keycloak covering:

* An overview of Keycloak architecture is provided in the [Alfresco/alfresco-identity-service](https://github.com/Alfresco/alfresco-identity-service/tree/keycloak-21.1.2_theme-0.3.5){:target="_blank"} GitHub project documentation.
* How to [install Keycloak](#install-keycloak).
* How to [configure](#configure-keycloak) realm and theme customizations.

> **Note:** See the [supported platforms]({% link content-services/7.2/support/index.md %}) page for compatibility between Alfresco Content Services or Alfresco Process Services and Keycloak.

## Install Keycloak

You can deploy Keycloak into a new or existing Kubernetes cluster or installed manually using a standalone ZIP distribution.

There are two options for installing Keycloak:

* [Install using a ZIP distribution](#keycloak-zip)
* [Install using Helm charts](#keycloak-helm)

> **Note:** It is recommended that you familiarize yourself with the [concepts of containerized deployment]({% link content-services/7.2/install/containers/index.md %}) before working with Docker, Kubernetes, and Helm.

### Install using distribution ZIP {#keycloak-zip}

You can install Keycloak on bare metal by using the zip distribution.

1. Download the required zip version from the [Keycloak Downloads Archive](https://www.keycloak.org/downloads-archive.html){:target="_blank"}.

   Make sure you fetch the correct Keycloak Server version from the Downloads Archive based on the compatible version listed in the [Supported platforms]({% link content-services/7.2/support/index.md %}) page.

2. Unzip the contents of the archive file.

   A single folder called `keycloak-<version>` is extracted.

3. Follow the instructions provided in the [Keycloak - Getting started](https://www.keycloak.org/getting-started/getting-started-zip){:target="_blank"} page to continue.

### Install Keycloak using Helm charts {#keycloak-helm}

To install Keycloak using Helm charts, follow the instructions provided in the [codecentric README](https://github.com/codecentric/helm-charts/blob/keycloakx-2.2.1/charts/keycloak/README.md){:target="_blank"}.

### Install Alfresco Keycloak Theme

The [Alfresco Keycloak Theme](https://github.com/Alfresco/alfresco-keycloak-theme){:target="_blank"} can replace the default Keycloak login theme to provide an experience that is consistent with Alfresco.

#### Install the theme manually

To install the Alfresco Keycloak Theme manually:

1. Download the required zip version from [https://github.com/Alfresco/alfresco-keycloak-theme/releases](https://github.com/Alfresco/alfresco-keycloak-theme/releases){:target="_blank"} based on the compatible version listed in the Supported platforms page.

2. Unzip the contents of the archive file.

   A single folder called `alfresco` is extracted.

3. Move the `alfresco` folder inside the `themes` folder that's located at the root of the Keycloak distribution.

#### Install the theme via Helm

Installing the Alfresco theme via Helm requires different steps. The following instructions assume that the codecentric keycloakx Helm charts are used.

Edit your `values.yaml` file to include a section similar to the following, making sure that the correct `THEME_VERSION` is set:

```yml
keycloakx:
  # [...]
  extraVolumes: |
    - name: theme
      emptyDir: {}
  extraVolumeMounts: |
    - name: theme
      mountPath: "/opt/keycloak/themes/alfresco"
      readOnly: true
  extraInitContainers: |
    - name: theme-provider
      image: busybox:1.36
      imagePullPolicy: IfNotPresent
      command:
        - sh
      args:
        - -c
        - |
          THEME_VERSION=0.3.5
          wget https://github.com/Alfresco/alfresco-keycloak-theme/releases/download/${THEME_VERSION}/alfresco-keycloak-theme-${THEME_VERSION}.zip -O /alfresco.zip
          unzip alfresco.zip
          mv alfresco/* /theme/
      volumeMounts:
        - name: theme
          mountPath: /theme
```

For further instructions on how to provide additional custom themes, see the [official keycloakx Helm charts documentation](https://github.com/codecentric/helm-charts/blob/keycloakx-2.2.1/charts/keycloakx/README.md#providing-a-custom-theme){:target="_blank"}.

### Install the Alfresco Realm

The Alfresco Realm is a reference realm that you can customize and extend according to the given requirements.

> **Important:** The Alfresco realm is not production ready and should be used as a reference only.

#### Install the realm manually

Prerequisites: Git and Helm are installed.

To install the Alfresco Realm manually:

1. Clone the `https://github.com/Alfresco/alfresco-identity-service` GitHub repository:

   ```bash
   git clone https://github.com/Alfresco/alfresco-identity-service.git
   ```

2. Checkout the required tag based on the Keycloak and Alfresco Keycloak Theme versions specified in the Supported platforms page.

   For example:

   ```bash
   git checkout keycloak-21.1.2_theme-0.3.5
   ```

3. (Optional) Customize the realm section of the sample `values.yaml` file by editing it locally, if needed - for example to define additional users, roles, groups, and override the allowed `redirectUris`.

4. Move to the root of the cloned repository and run the following command.

   Make sure that `KC_DISTRIBUTION` is set to the root of your Keycloak installation.

   You can use either [Git Bash](https://gitforwindows.org/){:target="_blank"} or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install){:target="_blank"} if using Windows:

   ```bash
   helm template helm/alfresco-keycloak \
     -f helm/alfresco-keycloak/values.yaml \
     --show-only templates/realm-secret.yaml |
     grep '\"alfresco-realm.json\"' | awk '{ print $2}' |
     sed -e 's/\"$//' -e 's/^\"//' | base64 --decode | jq '.' >$KC_DISTRIBUTION/data/import/alfresco-realm.json
   ```

#### Install the realm via Helm

Prerequisites:

* Git, Helm, and Kubectl are installed.
* A valid `alfresco-realm.json` file is produced from the previous instructions.

Installing the Alfresco Realm via Helm requires additional steps.

1. Create a secret using the `alfresco-realm.json` file:

   ```bash
   kubectl create secret generic realm-secret \
     --from-file=./alfresco-realm.json \
     --namespace=$DESIREDNAMESPACE
   ```

2. Edit your `values.yaml` file to include a section similar to the following, making sure to merge each section appropriately with pre-existing configuration:

    ```bash
    keycloakx:
      # [...]
      # customize this property as needed
      # but retain the --import-realm part
      command:
        - "/opt/keycloak/bin/kc.sh"
        - "start"
        - "--import-realm"
        - "--http-relative-path=/auth"
      extraVolumes: |
        - name: realm-secret
          secret:
            secretName: realm-secret
      extraVolumeMounts: |
        - name: realm-secret
          mountPath: "/opt/keycloak/data/import/"
          readOnly: true
    ```

## Upgrade Keycloak

Use the following information to upgrade your Keycloak version.

> **Important:**
>
> * Upgrading Keycloak requires downtime and should be performed in a test environment before being attempted in a production environment.
> * After the upgrade the database will no longer be compatible with the old server.

You can upgrade from an older Keycloak version to a more recent one by using the official Keycloak documentation, [Upgrading Guide](https://www.keycloak.org/docs/latest/upgrading/index.html){:target="_blank"}. Make sure you follow the instructions in each paragraph of the [Migration Changes](https://www.keycloak.org/docs/latest/upgrading/index.html#migration-changes){:target="_blank"} section sequentially, starting from the Keycloak version you’re currently using until you reach the target Keycloak version for the upgrade.

If you need to identify which Keycloak version is used in your installation, sign in to the Keycloak Admin Console and verify the **Server Info** for the master realm as shown below:

![Keycloak version shown in Admin Console]({% link content-services/images/keycloak-master-realm.png %}){:width="500px"}

## Configure Keycloak

There are two things that you can configure in Keycloak:

* Configure a custom realm
* Configure a custom theme

### Configure a custom realm

After you've followed the steps in the [Install](#install-keycloak) section to install the default Alfresco realm and Alfresco Keycloak Theme, Keycloak is installed or deployed with a default realm applied called `Alfresco`. You can customize the realm manually or by using a `JSON` file.

> **Important:** The default realm provided is not production ready and should be used as a reference only.

#### Customize a realm manually

Customizing a realm manually uses the Keycloak Administration Console to configure realm settings.

1. Sign into the master realm Keycloak Administration Console (Keycloak Admin Console) using the credentials created on your first sign in.

2. [Add a new realm](https://www.keycloak.org/docs/21.1.2/server_admin/index.html#proc-creating-a-realm_server_administration_guide){:target="_blank"} or edit the `Alfresco` realm.

3. [Create a new OIDC client](https://www.keycloak.org/docs/21.1.2/server_admin/index.html#_oidc_clients){:target="_blank"} or edit the existing one.

4. Configure any [groups](https://www.keycloak.org/docs/21.1.2/server_admin/index.html#proc-managing-groups_server_administration_guide){:target="_blank"} or users.

#### Customize a realm using a JSON file

Customizing a realm using a `JSON` file configures a realm outside of Keycloak and imports it into the configuration using the Keycloak Admin Console or during deployment if installing to Kubernetes cluster using Helm charts.

To import the configuration in the Admin Console:

1. Edit or use the [default realm file](https://github.com/Alfresco/alfresco-identity-service/blob/master/helm/alfresco-identity-service/alfresco-realm.json){:target="_blank"} provided in the Identity Service GitHub project as a reference to create a custom realm file.

2. Sign into the master realm for the Admin Console using the credentials created on your first sign in.

3. Navigate to the **Create Realm** page and use the **Browse...** option to import your custom realm file.

### Configure a custom theme

You can apply a custom theme to the following Keycloak components:

* Login screens
* Admin Console
* Email
* Account management

The [Alfresco theme](https://github.com/Alfresco/alfresco-keycloak-theme){:target="_blank"} includes a custom login theme only.

#### Developing a theme

Themes are created using a combination of CSS, HTML [FreeMarker templates](https://freemarker.apache.org/){:target="_blank"}, theme properties and images.

Use the [Alfresco theme](https://github.com/Alfresco/alfresco-keycloak-theme){:target="_blank"} or the default [Keycloak theme](https://www.keycloak.org/docs/21.1.2/server_development/index.html#creating-a-theme){:target="_blank"} as a base to extend and create custom themes from.

#### Importing a theme for a Kubernetes deployment

There are a number of options for importing a theme into a Kubernetes deployment, for example:

* Create a new Docker image that contains a custom theme.

* Use an `emptyDir` that is shared with the Keycloak container and configure an `init container` that runs the new theme image and copies it into the theme directory.

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
              mountPath: /opt/keycloak/themes/<theme-folder-name>
    
        extraVolumes: |
            - name: theme
              emptyDir: {}
    ```

However a new theme is imported, the new theme will need to be applied by signing into the Keycloak Admin Console and selecting the new themes for each component in the **Themes** tab under **Realm Settings**.

#### Importing a theme for a standalone installation

1. Navigate to the themes directory of the installation.

2. Create a new directory for the custom theme.

3. Copy the custom files into directories for each custom theme component, for example `/themes/login/`.

4. Restart the Keycloak service.

5. In the Keycloak Admin Console select the new themes for each component in the **Themes** tab under **Realm Settings**.

## Run Keycloak with Process Services

You can run Keycloak with Process Services. You must configure both applications for the logout functionality in Process Services to function correctly.

> **Note:** If you do not configure Keycloak and Process Services correctly, you will receive an error when you try and logout using Process Services.

To run Keycloak with Process Services:

1. Deploy your Keycloak installation by adding the following command-line parameter:

    ```xml
    --spi-login-protocol-openid-connect-legacy-logout-redirect-uri=true
    ```

2. Ensure you've set `keycloak.token-store=cookie` in the `activiti-identity-service.properties` file in Process Services.

    See `keycloak.token-store` in the [Process Services properties]({% link process-services/2.4/config/authenticate.md %}#properties) table for more details.

3. Restart Process Services.

The Process Services logout functionality will now work with Keycloak.
