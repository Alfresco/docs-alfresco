---
title: Install with Helm Charts on AWS
---

Use this information to deploy Alfresco Content Services (including the Transform Service) using Helm charts by running a Kubernetes cluster on Amazon Web Services (AWS). These charts are a deployment template which can be used as the basis for your specific deployment needs.

The Helm charts are provided as a reference that can be used to build deployments in AWS. If you're a System administrator, ensure that data persistence, backups, log storage, and other system-level functions have been configured to meet your needs.

You'll need your [Quay.io](https://quay.io){:target="_blank"} account credentials to access the Docker images. If you don't already have these credentials, contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.

Here is a summary of the steps required:

1. Set up your Kubernetes cluster on AWS.
2. Install the Kubernetes Dashboard to manage your Kubernetes cluster.
3. Set up Alfresco Content Services on the Kubernetes cluster, including creating file storage.
4. To access the images in [Quay.io](https://quay.io/){:target="_blank"}, you'll need to generate a pull secret and apply it to your cluster.
5. Deploy Alfresco Content Services.

    > **Note:** Remember to pass the name of the secret as an extra `--set` argument in the `helm install` command.

6. Check the status of your deployment.

See the [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment/tree/support/SP/4.N){:target="_blank"} GitHub project documentation for the prerequisites and detailed setup:

* [Deploying with Helm charts on AWS using Kops](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/helm-deployment-aws_kops.md){:target="_blank"}
* [Deploying with Helm charts on AWS using EKS](https://github.com/Alfresco/acs-deployment/blob/support/SP/4.N/docs/helm-deployment-aws_eks.md){:target="_blank"}
