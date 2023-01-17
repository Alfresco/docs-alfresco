---
title: Install overview
---

This section helps you to install Alfresco Content Services (ACS), additional software, and modules.

Content Services consists of a number of modules that need to be deployed and configured together, to form the complete services platform. This provides customers with the flexibility to configure their deployment architecture in the way that is consistent with their IT strategy.

Alfresco deployment requires a number of infrastructure components to be in place, on which the core platform components are installed, and extended by several optional components which provide additional services.

The following diagram shows the key components of a typical Content Services installation:

![Typical Content Services installation]({% link content-services/images/acs-typical-installation.png %}){:width="750px"}

Installation can be done manually, but Alfresco also provides a number of installation and deployment scripts for the most commonly used deployment tools to help customers accelerate the deployment process.

## Install and deploy methods

There are four distinct approaches to deploying Content Services. Familiarize yourself with the [Deployment and Containerization Support Policy]({% link support/latest/policies/deployment.md %}), before selecting one of the options below.

These deployment methods apply to both Enterprise and Community editions.

### Non-containerized deployment

#### Manual installation

This is also referred to as the zip distribution deployment, and is the most flexible way of manually deploying all the required components. This method is recommended for customers and partners who require complete control over the installation process.

See [Install with zip]({% link content-services/7.2/install/zip/index.md %}) for more details.

#### Ansible playbooks

Ansible playbooks provide an automated way of deploying a complete Content Services system on "bare metal" servers, Virtual Machines, or Virtual Private Cloud instances, without the use of containers. The single playbook provided can be configured to deploy single or multi-machine instances, with a number of supported configuration options.

See [Install using Ansible]({% link content-services/7.2/install/ansible.md %}) for basic instructions on deploying with Ansible.

To explore more technical information on the ACS playbook, and to access the playbook source, see [Ansible on GitHub](https://github.com/Alfresco/alfresco-ansible-deployment){:target="_blank"}.

The ACS Ansible playbook is provided as an Open Source reference script, which customers can modify and enhance to suit their own deployment environments.

### Containerized deployment

Containers provide an alternative method for deploying Content Services using pre-configured Docker images for each of the platform's components. Containerized deployment is best suited for larger implementations, in organizations who have significant experience in the use of deployment tools such as Docker or Kubernetes.

Alfresco provides reference scripts, in the form of Docker Compose files and Helm charts, which customers can use as examples to construct their own individual deployment scripts. These scripts are not designed to be used "as-is" to deploy production environments.

See [Containers overview]({% link content-services/7.2/install/containers/index.md %}) for an introduction to using Alfresco containers.

#### Docker Compose

Alfresco provides Docker Compose files, which are best suited for the quick deployment of development and test instances of Content Services using Docker. Customers who would like to deploy their production environments using `docker-compose` files, can extend and adapt the provided script as necessary.

See [Install using Docker Compose]({% link content-services/7.2/install/containers/docker-compose.md %}) for instructions.

See [Docker Compose on GitHub](https://github.com/Alfresco/acs-deployment/blob/master/docs/docker-compose/README.md){:target="_blank"} for additional technical information.

#### Helm charts

> **Important:** Kubernetes clusters are powerful but complex to deploy and manage. Alfresco recommends that only customers with significant experience in cloud environments such as Amazon EKS (Elastic Kubernetes Service), and strong competencies in containerized deployments, should use this deployment method.

Helm charts are the most common way of deploying Content Services in orchestrated Kubernetes environments. The Helm charts from Alfresco have been developed and tested using AWS EKS and Docker for Desktop (in Kubernetes mode), but do not use specific Amazon services. As such they can easily be adapted to other Kubernetes environments from different cloud providers.

See [Install using Helm]({% link content-services/7.2/install/containers/helm.md %}) for instructions.

See [Helm charts on GitHub](https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/README.md){:target="_blank"} for additional technical information.

## Upgrade existing installations

See [Upgrade Content Services]({% link content-services/7.2/upgrade/index.md %}) for information on how to upgrade existing installations to newer versions of the software.

## Security

If you're deploying a production system, ensure that you review the additional information provided in [Securing your installation]({% link content-services/7.2/admin/securing-install.md %}).
