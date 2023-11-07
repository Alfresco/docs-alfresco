---
title: Install using Helm
---

Alfresco Content Services (ACS) is an Enterprise Content Management (ECM) system that's used for document and case management, project collaboration, web content publishing, and compliant records management.  The flexible compute, storage, and database services that Kubernetes offers make it an ideal platform for Content Services. This Helm chart presents an enterprise-grade Content Services configuration that you can adapt to virtually any scenario with the ability to scale up, down or out, depending on your use case.

>Before starting a production installation make sure you are familiar with
[how to secure your installation]({% link content-services/latest/admin/securing-install.md %}).

The Helm chart in this repository supports deploying the Enterprise or Community Edition of Content Services.

The Enterprise configuration deploys the following system:

![Helm Deployment Enterprise]({% link content-services/images/helm-enterprise.png %})

## Considerations

Alfresco provides tested Helm charts as a "deployment template" for customers who want to take advantage of the container orchestration benefits of Kubernetes. These Helm charts are undergoing continual development and improvement, and shouldn't be used "as is" for your production environments, but should help you save time and effort deploying Content Services for your organization.

The Helm charts in this repository provide a PostgreSQL database in a Docker container and don't configure any logging. This design was chosen so that you can install them in a Kubernetes cluster without changes, and they're flexible enough for adopting to your actual environment.

You should use these charts in your environment only as a starting point, and modify them so that Content Services integrates into your infrastructure. You typically want to remove the PostgreSQL container, and connect the `cs-repository` directly to your database (this might require custom images to get the required JDBC driver in the container).

Another typical change is the integration of your company-wide monitoring and logging tools.

## Deployment options

For the best results, we recommend deploying Content Services to AWS EKS.

There are also several [Helm examples]({% link content-services/latest/install/containers/helm-examples.md %}) that show you how to deploy with various configurations:

* [Deploy with AWS Services (S3, RDS and MQ)]({% link content-services/latest/install/containers/helm-examples.md %}#with-aws-services)
* [Deploy with Alfresco Intelligence Services]({% link content-services/latest/install/containers/helm-examples.md %}#with-ai)
* [Enable access to Alfresco Search Services]({% link content-services/latest/install/containers/helm-examples.md %}#search-external-access)
* [Enable Email Services]({% link content-services/latest/install/containers/helm-examples.md %}#email-enabled)
* [Use a custom metadata keystore]({% link content-services/latest/install/containers/helm-examples.md %}#custom-metadata-keystore)

## Customize

To customize the Helm deployment, for example applying AMPs, we recommend following the best practice of creating your own custom Docker image(s). The following customization guidelines walk you through this process.

Any customizations (including major configuration changes) should be done inside the Docker image, resulting in the creation of a new image with a new tag. This approach allows changes to be tracked in the source code (Dockerfile) and rolling updates to the deployment in the Kubernetes cluster.

The Helm chart configuration customization should only include environment-specific changes (for example DB server connection properties) or altered Docker image names and tags. The configuration changes applied via `--set` will only be reflected in the configuration stored in Kubernetes cluster, a better approach would be to have those in source control i.e. maintain your own values files.

### Creating custom Docker images

The [Docker Compose customization guidelines]({% link content-services/latest/install/containers/customize.md %}) provides a detailed example of how to apply an AMP in a custom image. There's also a more advanced example of [building a custom image with configuration](https://github.com/Alfresco/acs-packaging/blob/master/docs/create-custom-image-using-existing-docker-image.md#applying-amps-that-require-additional-configuration-advanced){:target="_blank"}.

### Using custom Docker images

Once you've created your custom image, you can either change the default values in the appropriate values file in the [helm/alfresco-content-services folder](https://github.com/Alfresco/acs-deployment/tree/master/helm/alfresco-content-services){:target="_blank"}, or you can override the values via the `--set` command-line option during the install:

```bash
helm install alfresco/alfresco-content-services --set repository.image.repository="yourRegistry" --set repository.image.tag="yourTag" --set share.image.repository="yourRegistry" --set share.image.tag="yourTag"
```

## Helm deployment with AWS EKS

This section describes how to deploy Content Services (ACS) Enterprise or Community using [Helm](https://helm.sh){:target="_blank"} onto [EKS](https://aws.amazon.com/eks/){:target="_blank"}.

Amazon's EKS (Elastic Container Service for Kubernetes) makes it easy to deploy, manage, and scale containerized applications using Kubernetes on AWS. EKS runs the Kubernetes management infrastructure for you across multiple AWS availability zones to eliminate a single point of failure.

The Enterprise configuration will deploy the following system:

![ACS Enterprise on EKS]({% link content-services/images/helm-eks-enterprise.png %})

### Prerequisites

* You've read the main `acs-deployment` [project README](https://github.com/Alfresco/acs-deployment/blob/master/README.md#prerequisites){:target="_blank"}  prerequisites section
* You've read the [main Helm README](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/README.md){:target="_blank"} page
* You are proficient in AWS and Kubernetes

### Set up an EKS cluster

Follow the [AWS EKS Getting Started Guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html){:target="_blank"} to create a cluster and prepare your local machine to connect to the cluster. Use the **Managed nodes - Linux** option and specify a `--node-type` of at least `m5.xlarge`.

As we'll be using Helm to deploy the Content Services chart, follow the [Using Helm with EKS](https://docs.aws.amazon.com/eks/latest/userguide/helm.html){:target="_blank"} instructions to set up Helm on your local machine.

Optionally, to help troubleshoot issues with your cluster either follow the tutorial to [deploy the Kubernetes Dashboard](https://docs.aws.amazon.com/eks/latest/userguide/dashboard-tutorial.html){:target="_blank"} to your cluster or download and use the [Lens application](https://k8slens.dev){:target="_blank"} from your local machine.

### Prepare the cluster for Content Services

Now we have an EKS cluster up and running, there are a few one time steps we need to perform to prepare the cluster for Content Services to be installed.

#### DNS

1. Create a hosted zone in Route53 using [these steps](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/CreatingHostedZone.html){:target="_blank"} if you don't already have one available.

2. Create a public certificate for the hosted zone (created in step 1) in Certificate Manager using [these steps](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html){:target="_blank"} if you don't have one already available. Make a note of the certificate ARN for use later.

3. Create a file called `external-dns.yaml` with the text below (replace `YOUR-DOMAIN-NAME` with the domain name you created in step 1). This manifest defines a service account and a cluster role for managing DNS:

    ```yaml
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: external-dns
    ---
    apiVersion: rbac.authorization.k8s.io/v1beta1
    kind: ClusterRole
    metadata:
      name: external-dns
    rules:
    - apiGroups: [""]
      resources: ["services","endpoints","pods"]
      verbs: ["get","watch","list"]
    - apiGroups: ["extensions"]
      resources: ["ingresses"]
      verbs: ["get","watch","list"]
    - apiGroups: [""]
      resources: ["nodes"]
      verbs: ["list","watch"]
    ---
    apiVersion: rbac.authorization.k8s.io/v1beta1
    kind: ClusterRoleBinding
    metadata:
      name: external-dns-viewer
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: external-dns
    subjects:
    - kind: ServiceAccount
      name: external-dns
      namespace: kube-system
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: external-dns
    spec:
      strategy:
        type: Recreate
      selector:
        matchLabels:
          app: external-dns
      template:
        metadata:
          labels:
            app: external-dns
        spec:
          serviceAccountName: external-dns
          containers:
          - name: external-dns
            image: registry.opensource.zalan.do/teapot/external-dns:latest
            args:
            - --source=service
            - --domain-filter=YOUR-DOMAIN-NAME
            - --provider=aws
            - --policy=sync
            - --aws-zone-type=public
            - --registry=txt
            - --txt-owner-id=acs-deployment
            - --log-level=debug
    ```

4. Use the `kubectl` command to deploy the external-dns service.

   ```bash
   kubectl apply -f external-dns.yaml -n kube-system
   ```

5. List node groups for your cluster and make note of nodegroup name `YOUR-NODEGROUP` (replace `YOUR-CLUSTER-NAME` with
   the name you gave your cluster).

   ```bash
   bash aws eks list-nodegroups --cluster-name YOUR-CLUSTER-NAME
   ```

6. Find the name of the role used by the nodes by running the following command (replace `YOUR-CLUSTER-NAME` with the
   name you gave your cluster and `YOUR-NODEGROUP` with your nodegroup name):

    ```bash
    aws eks describe-nodegroup --cluster-name YOUR-CLUSTER-NAME --nodegroup-name YOUR-NODEGROUP --query "nodegroup.nodeRole" --output text
    ```

7. In the [IAM console](https://console.aws.amazon.com/iam/home){:target="_blank"} find the role discovered in the
   previous step and attach the **AmazonRoute53FullAccess** managed policy as shown in the screenshot below:

   ![Attach Policy]({% link content-services/images/eks-attach-policy.png %})

#### File system

1. Create an Elastic File System in the VPC created by EKS using [these steps](https://docs.aws.amazon.com/efs/latest/ug/creating-using-create-fs.html){:target="_blank"} ensuring a mount target is created in each subnet. Make a note of the File System ID (circled in the screenshot below):

   ![EFS]({% link content-services/images/eks-efs.png %})

2. Find the ID of the VPC created when your cluster was built (replace `YOUR-CLUSTER-NAME` with the name you gave your cluster):

    ```bash
    aws eks describe-cluster --name YOUR-CLUSTER-NAME --query "cluster.resourcesVpcConfig.vpcId" --output text
    ```

3. Find the CIDR range of the VPC (replace `VPC-ID` with the ID retrieved in the previous step):

    ```bash
    aws ec2 describe-vpcs --vpc-ids VPC-ID --query "Vpcs[].CidrBlock" --output text
    ```

4. Go to the [Security Groups section of the VPC Console](https://console.aws.amazon.com/vpc/home#SecurityGroups){:target="_blank"} and search for the VPC using the ID retrieved in step 2, as shown in the screenshot below:

   ![VPC Default Security Group]({% link content-services/images/eks-vpc-security-group.png %})

5. Click on the default security group for the VPC (highlighted in the screenshot above) and add an inbound rule for NFS traffic from the VPC CIDR range as shown in the screenshot below:

   ![NFS Inbound Rules]({% link content-services/images/eks-nfs-inbound-rules.png %})

6. Deploy an NFS Client Provisioner with Helm using the following commands (replace `EFS-DNS-NAME` with the string
   `FILE-SYSTEM-ID.efs.AWS-REGION.amazonaws.com` where the `FILE-SYSTEM-ID` is the ID retrieved in step 1 and
   `AWS-REGION` is the region you're using, e.g. `fs-72f5e4f1.efs.us-east-1.amazonaws.com`):

    ```bash
    helm repo add stable https://kubernetes-charts.storage.googleapis.com
    helm install alfresco-nfs-provisioner stable/nfs-client-provisioner --set nfs.server="EFS-DNS-NAME" --set nfs.path="/" --set storageClass.name="nfs-client" --set storageClass.archiveOnDelete=false -n kube-system
    ```

### Deploy Content Services

Now the EKS cluster is setup we can deploy Content Services.

#### Namespace

Namespaces in Kubernetes isolate workloads from each other. Create a namespace to host Content Services inside the cluster using the following command. We'll then use the `alfresco` namespace throughout the rest of the tutorial:

```bash
kubectl create namespace alfresco
```

#### Ingress

1. Create a file called `ingress-rbac.yaml` with the text below:

    ```yaml
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      name: acs:psp
      namespace: alfresco
    rules:
    - apiGroups:
      - policy
      resourceNames:
      - kube-system
      resources:
      - podsecuritypolicies
      verbs:
      - use
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      name: acs:psp:default
      namespace: alfresco
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: Role
      name: acs:psp
    subjects:
    - kind: ServiceAccount
      name: default
      namespace: alfresco
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      name: acs:psp:acs-ingress
      namespace: alfresco
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: Role
      name: acs:psp
    subjects:
    - kind: ServiceAccount
      name: acs-ingress
      namespace: alfresco
    ```

2. Use the `kubectl` command to create the cluster roles required by the ingress service:

    ```bash
    kubectl apply -f ingress-rbac.yaml -n alfresco
    ```

3. Deploy the ingress (replace `ACM_CERTIFICATE_ARN` and `YOUR-DOMAIN-NAME` with the ARN of the certificate and hosted zone created earlier in the DNS section):

    ```bash
    helm install acs-ingress ingress-nginx/ingress-nginx --version=3.7.1\
    --set controller.scope.enabled=true \
    --set controller.scope.namespace=alfresco \
    --set rbac.create=true \
    --set controller.config."proxy-body-size"="100m" \
    --set controller.service.targetPorts.https=80 \
    --set controller.service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-backend-protocol"="http" \
    --set controller.service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-ssl-ports"="https" \
    --set controller.service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-ssl-cert"="ACM_CERTIFICATE_ARN" \
    --set controller.service.annotations."external-dns\.alpha\.kubernetes\.io/hostname"="acs.YOUR-DOMAIN-NAME" \
    --set controller.service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-ssl-negotiation-policy"="ELBSecurityPolicy-TLS-1-2-2017-01" \
    --set controller.publishService.enabled=true \
    --atomic \
    --namespace alfresco
    ```

   > **Note:** The command will wait until the deployment is ready.

#### Docker registry secret

Create a docker registry secret to allow the protected images to be pulled from Quay.io by running the following command (replace `YOUR-USERNAME` and `YOUR-PASSWORD` with your credentials):

```bash
kubectl create secret docker-registry quay-registry-secret --docker-server=quay.io --docker-username=YOUR-USERNAME --docker-password=YOUR-PASSWORD -n alfresco
```

#### Choose Content Services version

This repository allows you to either deploy a system using released stable artefacts or the latest in-progress development artefacts.

To use a released version of the Helm chart add the stable repository using the following command:

```bash
helm repo add alfresco https://kubernetes-charts.alfresco.com/stable
```

Alternatively, to use the latest in-progress development version of the Helm chart add the incubator repository using the following command:

```bash
helm repo add alfresco https://kubernetes-charts.alfresco.com/incubator
```

Now decide whether you want to install the latest version of Content Services (Enterprise or Community) or a previous version, and follow the steps in the relevant section below.

##### Latest Enterprise version

Deploy the latest version of Content Services by running the following command (replace `YOUR-DOMAIN-NAME` with the hosted zone you created earlier):

```bash
helm install acs alfresco/alfresco-content-services \
--set externalPort="443" \
--set externalProtocol="https" \
--set externalHost="acs.YOUR-DOMAIN-NAME" \
--set persistence.enabled=true \
--set persistence.storageClass.enabled=true \
--set persistence.storageClass.name="nfs-client" \
--set global.alfrescoRegistryPullSecrets=quay-registry-secret \
--atomic \
--timeout 10m0s \
--namespace=alfresco
```

> **Note:** The command will wait until the deployment is ready.

##### Previous Enterprise version

1. Download the version specific values file you require from the [helm/alfresco-content-services](https://github.com/Alfresco/acs-deployment/tree/master/helm/alfresco-content-services/){:target="_blank"} folder.

2. Deploy the specific version of Content Services by running the following command (replace `YOUR-DOMAIN-NAME` with the hosted zone you created earlier, and `MAJOR` & `MINOR` with the appropriate values):

    ```bash
    helm install acs alfresco/alfresco-content-services \
    --values=MAJOR.MINOR.N_values.yaml \
    --set externalPort="443" \
    --set externalProtocol="https" \
    --set externalHost="acs.YOUR-DOMAIN-NAME" \
    --set persistence.enabled=true \
    --set persistence.storageClass.enabled=true \
    --set persistence.storageClass.name="nfs-client" \
    --set global.alfrescoRegistryPullSecrets=quay-registry-secret \
    --atomic \
    --timeout 10m0s \
    --namespace=alfresco
    ```

   > **Note:** The command will wait until the deployment is ready.

### Access

When the deployment is complete, you can access the following URLs. Replace `YOUR-DOMAIN-NAME` with the hosted zone you created earlier:

* Repository: `https://acs.YOUR-DOMAIN-NAME/alfresco`
* Alfresco Share: `https://acs.YOUR-DOMAIN-NAME/share`
* API Explorer: `https://acs.YOUR-DOMAIN-NAME/api-explorer`

Since you deployed Enterprise, you'll also have access to:

* Alfresco Digital Workspace: `https://acs.YOUR-DOMAIN-NAME/workspace/`
* Alfresco Sync Service: `https://acs.YOUR-DOMAIN-NAME/syncservice/healthcheck`

If you're running Content Services 23.1 (i.e. the latest version) and already have a valid license file for this version, you can apply it directly to the running system. Navigate to the Admin Console and apply your license:

* [https://acs.YOUR-DOMAIN-NAME/alfresco/service/enterprise/admin/admin-license](http://localhost:8080/alfresco/service/enterprise/admin/admin-license){:target="_blank"} (this only applies for the Enterprise Download Trial)
* Default username and password is `admin`
* See [Uploading a new license]({% link content-services/latest/admin/license.md %}) for more details

### Configuration options

By default, this tutorial installs an out-of-the-box setup, however there are many configuration options shown in the table below. There are also several [examples]({% link content-services/latest/install/containers/helm-examples.md %}) covering various use cases.

The following table lists the configurable parameters of the Content Services chart and their default values.

| Parameter | Description |
| --------- | ----------- |
| repository.adminPassword | Administrator password for Content Services in md5 hash format. The default value is md5: `209c6174da490caeb422f3fa5a7ae634` (of string `admin`) |
| postgresql.enabled | Enable the use of the postgres chart in the deployment. The default value is `true` |
| postgresql.postgresUser | Postgresql database user. The default value is `alfresco` |
| postgresql.postgresPassword | Postgresql database password. The default value is `alfresco` |
| postgresql.postgresDatabase | Postgresql database name. The default value is `alfresco` |
| database.external | Enable the use of an externally provisioned database. The default value is `false` |
| database.driver | External database driver (blank by default) |
| database.user | External database user (blank by default) |
| database.password | External database password  (blank by default) |
| database.url | External database JDBC URL (blank by default) |
| alfresco-search.resources.requests.memory | Alfresco Search Services requests memory. The default value is `250Mi` |
| alfresco-search.ingress.enabled | Enable external access for Alfresco Search Services. The default value is `false` |
| alfresco-search.ingress.basicAuth | If `alfresco-search.ingress.enabled` is `true`, you need to provide a `base64` encoded `htpasswd` format user name & password (example: `echo -n "$(htpasswd -nbm solradmin somepassword)"` where `solradmin` is username and `somepassword` is the password). The default value is `None` |
| alfresco-search.ingress.whitelist_ips | If `alfresco-search.ingress.enabled` is `true`, you can restrict `/solr` to a list of IP addresses of CIDR notation. The default value is `0.0.0.0/0` |
| persistence.repository.enabled | Enable Volume Persistence on repository. The default value is `true` |
| s3connector.enabled | Switch this to `true` if you have access to the S3 Connector AMP. The default value is `false` |
| s3connector.config | S3 configuration. Example: `s3connector.config.bucketName: myS3Bucket`. The default value is `{}` |
| s3connector.secrets | S3 secrets configuration. Example: `s3connector.secrets.accessKey: AJJJJJJJJ`. The default value is `{}` |
| email.server.enabled | Enables the email server. The default value is `false` |
| email.server.port | Specifies the port number for the email server. The default value is `1125` |
| email.server.domain | Specifies the name or the IP address of the network to bind the email server to. |
| email.server.enableTLS  | STARTTLS  is an extension to plain text communication protocols. The default value is `true` |
| email.server.hideTLS | STARTTLS  is an extension to plain text communication protocols. The default value is `false` |
| email.server.requireTLS | STARTTLS  is an extension to plain text communication protocols. The default value is `false` |
| email.server.auth.enabled | Authentication is turned on by setting the following property. The default value is `true` |
| email.server.connections.max  | The maximum number of connections allowed.  Increase this number to favour the email subsystem at the expense of the rest of alfresco. The default value is `3` |
| email.server.allowed.senders  | Provides a comma-separated list of email REGEX patterns of allowed senders. |
| email.server.blocked.senders  | Provides a comma-separated list of email REGEX patterns of blocked senders. |
| email.inbound.enabled | Enable/Disable the inbound email service. The default value is `false` |
| email.inbound.unknownUser | The username to authenticate with when the sender address is not recognized in alfresco. The default value is `anonymous` |
| email.inbound.emailContributorsAuthority  | Allow the email contributors to belong to an authority. |
| email.handler.folder.overwriteDuplicates  | Should duplicate messages to a folder overwrite each other or be named with a (number). The default value is `true` |
| mail.encoding | Specifies UTF-8 encoding for email. The default value is `UTF-8` |
| mail.host | Specifies the host name of the SMTP host, that is, the host name or IP address of the server to which email should be sent. |
| mail.port | Specifies the port number on which the SMTP service runs (the default is 25). The default value is `25` |
| mail.protocol | Specifies which protocol to use for sending email. The default value is `smtps` |
| mail.username | Specifies the user name of the account that connects to the smtp server. |
| mail.password | Specifies the password for the user name used in mail.username. |
| mail.from.default | Specifies the email address from which email notifications are sent. |
| mail.from.enabled | If this property is set to false, then the value set in mail.from.default is always used. |
| mail.smtp.auth | Specifies if authentication is required or not. The default value is `true` |
| mail.smtp.debug | Specifies if debugging SMTP is required or not. The default value is `false` |
| mail.smtp.starttls.enable | Specifies if the transport layer security (TLS) needs to be enabled or not. The default value is `true` |
| mail.smtp.timeout | Specifies the timeout in milliseconds for SMTP. The default value is `20000` |
| mail.smtps.auth | Specifies if authentication for SMTPS is required or not. The default value is `true` |
| mail.smtps.starttls.enable  | Specifies if the transport layer security for smtps needs to be enabled or not. The default value is `true` |
| imap.server.enabled | Enables or disables the IMAP subsystem. The default value is `false` |
| imap.server.port | IMAP has a reserved port number of 143. The default value is `1143` |
| imap.server.host | Replace this value with the IP address (or corresponding DNS name) of your external IP interface. The default value is `0.0.0.0` |
| imap.server.imap.enabled | Enables or disables the IMAP subsystem. The default value is `true` |
| imap.server.imaps.enabled | Enables or disables the IMAP subsystem. The default value is `true` |
| imap.server.imaps.port | IMAP has a reserved port number of 143. The default value is `1144` |
| imap.mail.from.default | Configuring the email from field default for the client with IMAP. |
| imap.mail.to.default | Configuring the email to field default for the client with IMAP. |

This deployment is also not fully secured by default. To learn about and apply further restrictions including pod security, network policies etc., see the [EKS Best Practices for Security](https://aws.github.io/aws-eks-best-practices/){:target="_blank"}.

## Troubleshooting

Here's some help for diagnosing and resolving any issues you may encounter.

### Kubernetes dashboard

The easiest way to troubleshoot issues on a Kubernetes deployment is to use the dashboard. Assuming you've deployed the dashboard in the cluster, you can use the following steps to explore your deployment:

1. Retrieve the service account token with the following command:

    ```bash
    kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep eks-admin | awk '{print $1}')
    ```

2. Run the `kubectl` proxy:

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

You can access any component of the deployment that's not exposed via ingress rules in this way, for example Alfresco Search Services, DB or individual transformers.

### View log files via command-line

You can view log files for individual pods from the command-line using the `kubectl` utility.

Retrieve the list of pods in the `alfresco` namespace:

```bash
kubectl get pods -n alfresco
```

Retrieve the logs for a pod using the following command (replace the pod name accordingly):

```bash
kubectl logs acs-alfresco-cs-repository-69545958df-6wzl6 -n alfresco
```

To continually follow the log file for a pod, use the `-f` option:

```bash
kubectl logs -f acs-alfresco-cs-repository-69545958df-6wzl6 -n alfresco
```

### Change log levels

You can change the log levels for the specific Java packages in the content-repository via the Admin Console. Use the following URL to access it: `https://<host>/alfresco/service/enterprise/admin/admin-log-settings`

> **Note:** Changes are only applied to the `content-repository` node from which the Admin Console is launched.

* You can change the log levels by modifying `log4j2.properties` in the content-repository image and doing a rolling update to the deployment. In this case the settings will be applied system-wide. See the [customization guidelines]({% link content-services/latest/install/containers/customize.md %}) for more.
* The Content Services deployment doesn't include any log aggregation tools. The logs generated by pods will be lost once the pods are terminated.

### JMX dump

This tool allows you to download a ZIP file containing information useful for troubleshooting and supporting your system. Issue a GET request (Admin only) to: `https://<host>/alfresco/service/api/admin/jmxdump`.

### Cleanup

1. Remove the `acs` and `acs-ingress` deployments:

     ```bash
     helm uninstall -n alfresco acs acs-ingress
     ```

2. Delete the Kubernetes namespace:

    ```bash
    kubectl delete namespace alfresco
    ```

3. Go to the [EFS Console](https://console.aws.amazon.com/efs){:target="_blank"}, select the file system we created earlier, and press the "Delete" button to remove the mount targets and file system.

4. Go to the [IAM console](https://console.aws.amazon.com/iam/home){:target="_blank"} and remove the AmazonRoute53FullAccess managed policy we added to the NodeInstanceRole in the File System section otherwise the cluster will fail to delete in the next step.

5. Finally, delete the EKS cluster (replace `YOUR-CLUSTER-NAME` with the name you gave your cluster):

    ```bash
    eksctl delete cluster --name YOUR-CLUSTER-NAME
    ```