---
title: Deployment and Containerization Support Policy
---

![Containerized deployment]({% link support/images/deployment-support.png %})

The above illustration shows four deployment options. Alfresco creates and supports only the software represented as App1, App2, and App3. Alfresco doesn't create or support anything else in the diagram - that's considered to be "infrastructure".

There are many different ways to deploy Alfresco software into an infrastructure before it can run. A few options include using custom shell scripts, installers, Ansible, Terraform, Docker Compose, Kubernetes, Docker Enterprise, OpenShift, Heroku, Chef, Puppet, Rancher, AWS CloudFormation, Azure Resource Manager, Google Cloud Deployment Manager, AWS ECS, AWS EKS, and so on. Within this policy these are all considered to be "deployment tools".

Alfresco doesn't create or support any deployment tool, and customers may choose the deployment tool with which they feel most comfortable. Often this will be based on a company standard, and Alfresco expects that each customer will have its own unique standard. Each customer is responsible for having the skills and knowledge needed to use their chosen deployment tool effectively. Given the number of deployment tools available, it is not feasible for Alfresco to provide any assistance on the chosen deployment tool.

From time to time Alfresco may create and make available reference deployment scripts to help people be successful with a couple of the more-popular deployment tools. These reference scripts are supported by Alfresco, and if a defect is found in them or an enhancement is wanted then a ticket can be raised through Alfresco Support. The customer is responsible for knowing how to use the deployment technology associated with these scripts, and they shouldn't use them if they don't. Alfresco is unable to offer training in the use of deployment tools.

As no two infrastructures are alike and everyone has their own set of deployment guidelines and best practice, when Alfresco does offer deployment scripts they're only references. Each customer is expected to adjust them to suit their own needs. Alfresco makes no representation that these reference scripts will meet any particular customer's specific standards.

When Alfresco provides reference images (either virtual machine images or container images) it will aim to update those images as the underlying operating system and libraries are released. However, as those images are built upon the work of others, Alfresco cannot give guarantees and assurances on the timeliness of upgrades and patches for security issues in those underlying components. As with any reference deployment scripts, any virtual machine or container images provided by Alfresco are considered references from which customers may derive their own, incorporating their own specific guidelines and best practices as needed.

Alfresco will support its software irrespective of how it's deployed, provided that it's using stack components listed on our product supported stack configurations. The supported stacks can be found at: [Supported Platforms and Languages](https://www.alfresco.com/services/subscription/supported-platforms){:target="_blank"}.
