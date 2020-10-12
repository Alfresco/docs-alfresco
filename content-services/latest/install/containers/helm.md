---
title: Install using Helm
---

Alfresco Content Services (ACS) is an Enterprise Content Management (ECM) system that's used for document and case management, project collaboration, web content publishing, and compliant records management.  The flexible compute, storage, and database services that Kubernetes offers make it an ideal platform for Alfresco Content Services. This helm chart presents an enterprise-grade Alfresco Content Services configuration that you can adapt to virtually any scenario with the ability to scale up, down or out, depending on your use case.

The Helm chart in this repository supports deploying the Enterprise or Community Edition of Alfresco Content Services.

The Enterprise configuration will deploy the following system:

![Helm Deployment Enterprise]({% link content-services/images/helm-enterprise.png %}){:width="460" height="440px"}

<!--The Community configuration will deploy the following system:

![Helm Deployment Community](./diagrams/helm-community.png)-->

## Considerations

Alfresco provides tested Helm charts as a "deployment template" for customers who want to take advantage of the container orchestration benefits of Kubernetes. These Helm charts are undergoing continual development and improvement, and shouldn't be used "as is" for your production environments, but should help you save time and effort deploying Alfresco Content Services for your organization.

The Helm charts in this repository provide a PostgreSQL database in a Docker container and don't configure any logging. This design was chosen so that you can install them in a Kubernetes cluster without changes, and they're flexible enough for adopting to your actual environment.

You should use these charts in your environment only as a starting point, and modify them so that Alfresco Content Services integrates into your infrastructure. You typically want to remove the PostgreSQL container, and connect the `cs-repository` directly to your database (this might require custom images to get the required JDBC driver in the container).

Another typical change is the integration of your company-wide monitoring and logging tools.

## Deploy

For the best results, we recommend [deploying Alfresco Content Services to AWS EKS](#LINK-eks-deployment.md).

<!--If you have a machine with at least 16GB of memory, you can also [deploy using Docker for Desktop](./docker-desktop-deployment.md)(#LINK).-->

There are also several [examples]({% link content-services/latest/install/containers/helm-examples.md %}) showing how to deploy with various configurations:

* [Deploy with AWS Services (S3, RDS and MQ)]({% link content-services/latest/install/containers/helm-examples.md %}#with-aws-services)
* [Deploy with Intelligence Services]({% link content-services/latest/install/containers/helm-examples.md %}#with-ai)
* [Enable access to Search Services]({% link content-services/latest/install/containers/helm-examples.md %}#search-external-access)
* [Enable Email Services]({% link content-services/latest/install/containers/helm-examples.md %}#email-enabled)
* [Use a custom metadata keystore]({% link content-services/latest/install/containers/helm-examples.md %}#custom-metadata-keystore)

## Configure

The following table lists the configurable parameters of the Alfresco Content Services chart and their default values.

| Parameter | Description |
| --------- | ----------- |
| repository.adminPassword | Administrator password for Alfresco Content Services in md5 hash format. The default value is md5: `209c6174da490caeb422f3fa5a7ae634` (of string `admin`) |
| postgresql.enabled | Enable the use of the postgres chart in the deployment. The default value is `true` |
| postgresql.postgresUser | Postgresql database user. The default value is `alfresco` |
| postgresql.postgresPassword | Postgresql database password. The default value is `alfresco` |
| postgresql.postgresDatabase | Postgresql database name. The default value is `alfresco` |
| database.external | Enable the use of an externally provisioned database. The default value is `false` |
| database.driver | External database driver. The default value is '' |
| database.user | External database user. The default value is '' |
| database.password | External database password . The default value is '' |
| database.url | External database JDBC URL. The default value is '' |
| alfresco-search.resources.requests.memory | Alfresco Search Services requests memory. The default value is `250Mi` |
| alfresco-search.ingress.enabled | Enable external access for Alfresco Search Services. The default value is `false` |
| alfresco-search.ingress.basicAuth | If `alfresco-search.ingress.enabled` is `true`, you need to provide a `base64` encoded `htpasswd` format user name & password (example: `echo -n "$(htpasswd -nbm solradmin somepassword)"` where `solradmin` is username and `somepassword` is the password). The default value is None |
| alfresco-search.ingress.whitelist_ips | If `alfresco-search.ingress.enabled` is `true`, you can restrict `/solr` to a list of IP addresses of CIDR notation. The default value is `0.0.0.0/0` |
| persistence.repository.enabled | Enable Volume Persistence on repository. The default value is `true` |
| s3connector.enabled | Switch this to `true` if you have access to the S3 Connector AMP. The default value is `false` |
| s3connector.config | S3 configuration - see [S3 Connector properties reference](https://docs.alfresco.com/s3connector/references/s3-contentstore-ref-config-props.html)(#LINK). Example: `s3connector.config.bucketName: myS3Bucket`. The default value is `{}` |
| s3connector.secrets | S3 secrets configuration - see [S3 Connector properties reference](https://docs.alfresco.com/s3connector/references/s3-contentstore-ref-config-props.html)(#LINK). Example: `s3connector.secrets.accessKey: AJJJJJJJJ`. The default value is `{}` |
| email.server.enabled | Enables the email server - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK). The default value is `false` |
| email.server.port | Specifies the port number for the email server - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK). The default value is `1125` |
| email.server.domain | Specifies the name or the IP address of the network to bind the email server to - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK) |
| email.server.enableTLS  | STARTTLS  is an extension to plain text communication protocols - see [Inbound SMTP Email Server Configuration](https://hub.alfresco.com/t5/alfresco-content-services-hub/inbound-smtp-email-server-configuration/ba-p/289370){:target="_blank"}. The default value is `true` |
| email.server.hideTLS | STARTTLS  is an extension to plain text communication protocols - see [Inbound SMTP Email Server Configuration](https://hub.alfresco.com/t5/alfresco-content-services-hub/inbound-smtp-email-server-configuration/ba-p/289370){:target="_blank"}. The default value is `false` |
| email.server.requireTLS | STARTTLS  is an extension to plain text communication protocols - see [Inbound SMTP Email Server Configuration](https://hub.alfresco.com/t5/alfresco-content-services-hub/inbound-smtp-email-server-configuration/ba-p/289370){:target="_blank"}. The default value is `false` |
| email.server.auth.enabled | Authentication is turned on by setting the following property - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK). The default value is `true` |
| email.server.connections.max  | The maximum number of connections allowed.  Increase this number to favour the email subsystem at the expense of the rest of alfresco - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK). The default value is `3` |
| email.server.allowed.senders  | Provides a comma-separated list of email REGEX patterns of allowed senders - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK) |
| email.server.blocked.senders  | Provides a comma-separated list of email REGEX patterns of blocked senders - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK) |
| email.inbound.enabled | Enable/Disable the inbound email service - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK). The default value is `false` |
| email.inbound.unknownUser | The username to authenticate with when the sender address is not recognized in alfresco - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK). The default value is `anonymous` |
| email.inbound.emailContributorsAuthority  | Allow the email contributors to belong to an authority  - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK) |
| email.handler.folder.overwriteDuplicates  | Should duplicate messages to a folder overwrite each other or be named with a (number) - see [Inbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-inboundsmtp-props.html)(#LINK). The default value is `true` |
| mail.encoding | Specifies UTF-8 encoding for email - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK). The default value is `UTF-8` |
| mail.host | Specifies the host name of the SMTP host, that is, the host name or IP address of the server to which email should be sent - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK) |
| mail.port | Specifies the port number on which the SMTP service runs (the default is 25) - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK). The default value is `25` |
| mail.protocol | Specifies which protocol to use for sending email - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK). The default value is `smtps` |
| mail.username | Specifies the user name of the account that connects to the smtp server - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK) |
| mail.password | Specifies the password for the user name used in mail.username - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK) |
| mail.from.default | Specifies the email address from which email notifications are sent - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK) |
| mail.from.enabled | If this property is set to false, then the value set in mail.from.default is always used - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK) |
| mail.smtp.auth | Specifies if authentication is required or not - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK). The default value is `true` |
| mail.smtp.debug | Specifies if debugging SMTP is required or not - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK). The default value is `false` |
| mail.smtp.starttls.enable | Specifies if the transport layer security needs to be enabled or not - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK). The default value is `true` |
| mail.smtp.timeout | Specifies the timeout in milliseconds for SMTP - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK). The default value is `20000` |
| mail.smtps.auth | Specifies if authentication for smtps is required or not - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK). The default value is `true` |
| mail.smtps.starttls.enable  | Specifies if the transport layer security for smtps needs to be enabled or not - see [Outbound SMTP configuration properties](https://docs.alfresco.com/6.2/concepts/email-outboundsmtp-props.html)(#LINK). The default value is `true` |
| imap.server.enabled | Enables or disables the IMAP subsystem - see [Configuring the email client with IMAP](https://docs.alfresco.com/6.2/tasks/imap-enable.html)(#LINK). The default value is `false` |
| imap.server.port | IMAP has a reserved port number of 143 - see [Configuring the email client with IMAP](https://docs.alfresco.com/6.2/tasks/imap-enable.html)(#LINK). The default value is `1143` |
| imap.server.host | Replace this value with the IP address (or corresponding DNS name) of your external IP interface - see [Configuring the email client with IMAP](https://docs.alfresco.com/6.2/tasks/imap-enable.html)(#LINK). The default value is `0.0.0.0` |
| imap.server.imap.enabled | Enables or disables the IMAP subsystem - see [Configuring the email client with IMAP](https://docs.alfresco.com/6.2/tasks/imap-enable.html)(#LINK). The default value is `true` |
| imap.server.imaps.enabled | Enables or disables the IMAP subsystem - see [Configuring the email client with IMAP](https://docs.alfresco.com/6.2/tasks/imap-enable.html)(#LINK). The default value is `true` |
| imap.server.imaps.port | IMAP has a reserved port number of 143 - see [Configuring the email client with IMAP](https://docs.alfresco.com/6.2/tasks/imap-enable.html)(#LINK). The default value is `1144` |
| imap.mail.from.default | Configuring the email client with IMAP - see [Configuring the email client with IMAP](https://docs.alfresco.com/6.2/tasks/imap-enable.html)(#LINK) |
| imap.mail.to.default | Configuring the email client with IMAP - see [Configuring the email client with IMAP](https://docs.alfresco.com/6.2/tasks/imap-enable.html)(#LINK) |

## Customize

To customize the Helm deployment, for example applying AMPs, we recommend following the best practice of creating your own custom Docker image(s).<!--The [Customization Guide](./examples/customisation-guidelines.md) walks you through this process.-->

<!--Customization Guidelines-->
Any customizations (including major configuration changes) should be done inside the Docker image, resulting in the creation of a new image with a new tag. This approach allows changes to be tracked in the source code (Dockerfile) and rolling updates to the deployment in the K8s cluster.

The helm chart configuration customization should only include environment-specific changes (for example DB server connection properties) or altered Docker image names and tags. The configuration changes applied via `--set` will only be reflected in the configuration stored in k8s cluster, a better approach would be to have those in source control i.e. maintain your own values files.

### Creating custom Docker images

The [Docker Compose Customization Guidelines](#customization.md) provides a detailed example of how to apply an AMP in a custom image. There's also a more advanced example of [building a custom image with configuration](https://github.com/Alfresco/acs-packaging/blob/master/docs/create-custom-image-using-existing-docker-image.md#applying-amps-that-require-additional-configuration-advanced){:target="_blank"}.

### Using custom Docker images

Once you've created your custom image, you can either change the default values in the appropriate values file in the [helm/alfresco-content-services folder](https://github.com/Alfresco/acs-deployment/tree/master/helm/alfresco-content-services){:target="_blank"}, or you can override the values via the `--set` command-line option during install:

```bash
helm install alfresco-incubator/alfresco-content-services --set repository.image.repository="yourRegistry" --set repository.image.tag="yourTag" --set share.image.repository="yourRegistry" --set share.image.tag="yourTag"
```

## Troubleshooting

Here's some help for diagnosing and resolving any issues you may encounter.

### Kubernetes dashboard

The easiest way to troubleshoot issues on a Kubernetes deployment is to use the dashboard. Assuming you've deployed the dashboard in the cluster, you can use the following steps to explore your deployment:

1. Retrieve the service account token with the following command:

    ```bash
    kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep eks-admin | awk '{print $1}')
    ```

2. Run the kubectl proxy:

    ```bash
    kubectl proxy &
    ```

3. Open a browser and navigate to: `http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login`

4. Select **Token**, enter the token retrieved in step 1, and click **Sign in**.

5. Select `alfresco` from the **Namespace** menu, click **Pods**, and then the pod name.

    To view the logs, press the **Menu** icon in the toolbar as highlighted below:

    ![Kubernetes Dashboard]({% link content-services/images/k8s-dashboard.png %})

### Port-forwarding to a pod

This approach allows you to connect to a specific application in the cluster.
See the [Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/){:target="_blank"} for details.

You can access any component of the deployment that's not exposed via ingress rules in this way, for example Alfresco Search, DB or individual transformers.

### Viewing log files via command-line

You can view log files for individual pods from the command-line using the kubectl utility.

Retrieve the list of pods in the alfresco namespace by using the following command:

```bash
kubectl get pods -n alfresco
```

Then to retrieve the logs for a pod using the following command (replacing the pod name appropriately):

```bash
kubectl logs acs-alfresco-cs-repository-69545958df-6wzl6 -n alfresco
```

To continually follow the log file for a pod, use the `-f` options:

```bash
kubectl logs -f acs-alfresco-cs-repository-69545958df-6wzl6 -n alfresco
```

### Changing log levels

You can change the log levels for the specific Java packages in the content-repository via the Admin Console. Use the following URL to access it: `https://<host>/alfresco/service/enterprise/admin/admin-log-settings`

> **Note:** Changes are applied only to one content-repository node, the one from which the Admin Console is launched.

* You can change the log levels by modifying `log4j.properties` in the content-repository image and doing a rolling update to the deployment. In this case the settings will be applied system-wide. See the [customization guidelines](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/examples/customisation-guidelines.md){:target="_blank"} for more.
* The Alfresco Content Services deployment doesn't include any log aggregation tools. The logs generated by pods will be lost once the pods are terminated.

### JMX dump

This tool allows you to download a ZIP file containing information useful for troubleshooting and supporting your system. Issue a GET request (Admin only) to: `https://<host>/alfresco/service/api/admin/jmxdump`


<!--ADD ./docs/helm/eks-deployment.md -->
