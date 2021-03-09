---
title: Installing & Upgrading Content Services
---

This section helps you to install Content Services, additional software, and modules. 

## Introduction

Alfresco Content Services consists of a number of modules that need to be deployed and configured together, to form the complete services platform. This provides customers with the flexibility to configure their deployment architecture in the way that is consistent with their IT strategy.

Alfresco deployment requires a number of infrastructure components to be in place, on which the core platform components are installed, and extended by a number of optional components which provide additional services. 

The following diagram illustrates the key components of a typical Content Services installation:

Installation can be done manually, but Alfresco also provides a number of installation and deployment scripts for the most commonly used deployment tools, to help customers accelerate the deployment process. 

## Installation & Deployment Methods

There are four distinct approaches to deploying Alfresco Content Services. Please familiarise yourself with Alfresco’s [Deployment Support Policy](https://docs.alfresco.com/support/latest/policies/containerization/), before selecting one of the options below.

These deployment methods apply to both Enterprise and Community editions.

### Non-Containerised Deployment

#### Manual Installation

This is also referred to as the Zip Distribution deployment, and is the most flexible way of manually deploying all the required components. This method is recommended for customers and partners who require complete control over the installation process. 

For more details, see: [Install with Zip](https://docs.alfresco.com/content-services/latest/install/zip/) 

#### Ansible Playbooks

Ansible playbooks provide an automated way of deploying a complete Alfresco Content Services system on “bare metal” servers, Virtual Machines, or Virtual Private Cloud instances, without the use of containers. The single playbook provided here can be configured to deploy single or multi-machine instances, with a number of supported configuration options. 

For basic instructions on deploying with Ansible, see: [Install using Ansible]() 

To explore more technical information on the ACS Playbook, and to access the playbook source, please visit: https://github.com/Alfresco/alfresco-ansible-deployment 

The ACS Ansible playbook is provided as an Open Source reference script, which customers can modify and enhance to suit their own deployment environments. 

### Containerised Deployment

Containers provide an alternative method for deploying Content Services using pre-configured Docker Images for each of the platform’s components. Containerised deployment is best suited for larger implementations, in organisations who have significant experience in the use of deployment tools such as Docker or Kubernetes.

Alfresco provides reference scripts - in the form of Docker-Compose files and Helm Charts - which customers can use as examples to construct their own individual deployment scripts. These scripts are not designed to be used “as-is” to deploy production environments.

For an introduction on the use of Alfresco containers, see: [Containers Overview](https://docs.alfresco.com/content-services/latest/install/containers/)

#### Docker-Compose

Alfresco provides docker-compose files, which are best suited for the quick deployment of development and test instances of Content Services, using Docker. Customers who would like to deploy their production environments using docker-compose files, can extend and adapt the provided script as necessary.

See: [Install using Docker Compose](https://docs.alfresco.com/content-services/latest/install/containers/docker-compose/) for instructions.

For additional technical information on the docker-compose files, see: https://github.com/Alfresco/acs-deployment/blob/master/docs/docker-compose/README.md 

#### Helm Charts

> **Important:** Kubernetes clusters are powerful but complex to deploy and manage. Alfresco recommends that only customers with significant experience in cloud environments such as Amazon EKS (Elastic Kubernetes Service), and strong competencies in containerized deployments, should use this deployment method. 

Helm Charts are the most common way of deploying Content Services in orchestrated Kubernetes environments. Alfresco’s Helm Charts have been developed and tested using AWS EKS and Docker for Desktop (in Kubernetes mode), but do not use specific Amazon services. As such they can easily be adapted to other Kubernetes environments from different cloud providers. 

See: [Install using Helm](https://docs.alfresco.com/content-services/latest/install/containers/helm/) for instructions.

For additional technical information on Helm Charts, see: https://github.com/Alfresco/acs-deployment/blob/master/docs/helm/README.md 

## Upgrading existing Installations

See [Upgrading Content Services](https://docs.alfresco.com/content-services/latest/upgrade/) for information on how to upgrade existing installations to newer versions of the software. 


