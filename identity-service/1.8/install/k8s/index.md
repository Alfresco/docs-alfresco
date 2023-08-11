---
title: Install Identity Service into Kubernetes Cluster
---

The Identity Service can be deployed into a new or existing Kubernetes cluster.

## Prerequisites

* A Kubernetes cluster
* Helm configured in the cluster

## Installation steps

1. Create a new namespace or use an existing empty namespace to avoid any conflicts:

    ```bash
    export DESIREDNAMESPACE=new-namespace
    kubectl create namespace $DESIREDNAMESPACE             
    ```

2. Add the Alfresco Kubernetes chart repository and the Keycloak repository to Helm:

    ```bash
    helm repo add alfresco-stable https://kubernetes-charts.alfresco.com/stable
    helm repo add codecentric https://codecentric.github.io/helm-charts
    ```

3. Deploy the Helm chart with a command similar to the following:

    The Identity Service is deployed as part of the Alfresco infrastructure chart. Normally the infrastructure chart will be deployed as part of another product chart, such as Alfresco Content Services or Alfresco Process Services.

    As an example, the following command references the infrastructure chart on its own to deploy the Identity Service and the [ngnix-ingress](https://github.com/helm/charts/tree/master/stable/nginx-ingress){:target="_blank"}.

    ```bash
    helm install alfresco-stable/alfresco-infrastructure \
        --set alfresco-infrastructure.activemq.enabled=false \
        --set alfresco-infrastructure.nginx-ingress.enabled=true \
        --set alfresco-infrastructure.alfresco-identity-service.enabled=true \
        --namespace $DESIREDNAMESPACE
    ```

4. (*Optional*) To set the `redirectUri` property during deployment add the following line to the deployment command setting the `{DNSNAME}`:

    ```bash
    --set alfresco-identity-service.realm.alfresco.client.redirectUris="{$DNSNAME}" \
    ```

    > **Note:** To include multiple `redirectUri` use comma separated values without any whitespace between the DNS names.

5. (*Optional*) To set the `webOrigins` property during deployment add the following line to the deployment command setting the `{DNSNAME}`:

    ```bash
    --set alfresco-identity-service.realm.alfresco.client.webOrigins="{$DNSNAME1,$DNSNAME2,$DNSNAME3}" \
    ```

6. (*Optional*) To set the number of replicas during deployment add the following line to the deployment command using the required number of replicas:

    ```bash
    --set alfresco-identity-service.keycloak.keycloak.replicas=3
    ```

7. Navigate to `http://localhost:8080/auth` once all pods have started.

8. Enter a username and password to create an administrator user for the master realm.

The administrator console for the `Alfresco` realm can be accessed at `http://localhost:8080/auth/admin/alfresco/console/`. The administrator user for this realm has the following credentials:

|Property|Value|
|--------|-----|
|Administrator username|`admin`|
|Administrator password|`admin`|
|Administrator email address|`admin@app.activiti.com`|
|Alfresco client redirect URIs|`http://localhost*`|

> **Important:** Reset the administrator password for the `Alfresco` realm when first signing into its administrator console.

The Identity Service can be [configured]({% link identity-service/1.8/config/index.md %}) further.
