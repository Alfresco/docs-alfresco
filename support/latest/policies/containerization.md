---
title: Containerization Support Policy
---

Since the release of Alfresco Content Services 6.0 and Alfresco Process Services 1.6, Alfresco supports the deployment of our products using both the traditional deployment methods and our new containerized deployment mechanisms.

Alfresco supports deployment using the open industry-standard technology Docker for containerization and Kubernetes for orchestration. We provide reference Docker images and a reference orchestrated deployment using Kubernetes and Helm. These deployment templates are there to enable customers to understand the best practices for deployment of our platform in the cloud.

As with traditional on premise deployment methods, customers may wish to customize or build upon the technology and ideas within our deployment templates. The deployment templates provide a starting point for customers to simplify the creation of deployments unique to their own needs and skill sets.

Where customers make this kind of customization, Alfresco will support the underlying images, providing they are using the supported infrastructure components listed on our product supported stack configurations. The supported stacks can be found at:[https://www.alfresco.com/services/subscription/supported-platforms](https://www.alfresco.com/services/subscription/supported-platforms){:target="_blank"}.

![Containerized deployment]({% link support/images/deployment-support.png %})

The above illustration shows four deployment options. Alfresco creates and supports only the software represented as App1, App2, and App3. Alfresco doesn’t create or support anything else in the diagram - that’s considered to be “infrastructure”.

There are different ways to deploy Alfresco software into an infrastructure before it can run. A few options include using custom shell scripts, installers, Ansible, Terraform, Docker Compose, Kubernetes, Docker Enterprise, OpenShift, Heroku, Chef, Puppet, Rancher, AWS CloudFormation, Azure Resource Manager, Google Cloud Deployment Manager, AWS ECS, AWS EKS, and so on.

Alfresco doesn’t create or support any deployment tool and customers may choose the deployment tool they feel most comfortable with, often this will be based on a company standard. Customers must have the skills and knowledge needed to use their chosen deployment tool effectively. Alfresco cannot provide assistance on the deployment tool/mechanism, our approach is to support industry-leading standards and best practices to give customers the choice of platforms on which to deploy.

Alfresco aims to update the reference Docker images as the underlying operating system and libraries are released, however, as we're building upon the work of others, we cannot give guarantees and assurances on the timeliness of upgrades and patches for security issues as we would for our own software.
