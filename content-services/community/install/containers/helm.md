---
title: Install using Helm
nav: false
---

Use this information to deploy Community Edition using Helm charts by running a Kubernetes cluster on Amazon's EKS (Elastic Container Service for Kubernetes). This is a deployment template which can be used as the basis for your specific deployment needs.

The Helm charts are provided as a reference that can be used to build deployments in Amazon Web Services (AWS). The Helm charts are undergoing continual development and improvement and should not be used "as-is" for a production deployment. If you're a System administrator, ensure that data persistence, backups, log storage, and other system-level functions have been configured to meet your needs.

## Prerequisites

* Read the `Alfresco/acs-deployment` project [README](https://github.com/Alfresco/acs-deployment){:target="_blank"} for the prerequisites.
* Read the main [Helm README](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/README.md){:target="_blank"} page.
* You must be proficient in AWS and Kubernetes.

Here's a summary of the steps required for the EKS deployment:

1. Set up an EKS cluster on AWS.
2. Prepare the cluster for Community Edition, including creating a hosted zone in Route 53, and an Elastic File System (EFS) for storage.
3. Deploy Community Edition on the Kubernetes cluster, including creating a namespace.
4. Check the status of your deployment.

See the detailed project documentation in GitHub: [Deploying Helm charts on AWS EKS](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/eks-deployment.md){:target="_blank"}

In this project, you can use the Helm charts following the documentation for standard installations.

Any customization of your environment, including major configuration changes, should be done inside a Docker image, resulting in the creation of a new image with a new tag. This approach allows changes to be tracked in the source code (i.e. Dockerfile) and rolling updates to the deployment in the Kubernetes cluster. See the [Customization Guidelines](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/examples/customisation-guidelines.md){:target="_blank"} for more.
