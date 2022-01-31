---
title: Alfresco Transform Service
---

The Alfresco Transform Service provides a secure, scalable, reliable, and extensible mechanism for converting files from 
their current format into other formats.

The Transform Service provides a single all-in-one Transform Core Engine (T-Engine) that performs all the core 
transformations. The Transform Service also provides a Transform Router that sits in front of the T-Engine(s) and allows 
simple (single-step) and pipeline (multi-step) transformations to be passed to the T-Engine(s). 

The Transform Router, and the T-Engine(s), runs as independently scalable Docker containers. The Transform Router is 
connected to the Alfresco Content Services repository via ActiveMQ, a message broker, where the repository and the 
Transform Router send transformation requests and responses. These JSON-based messages are then passed to the Transform Router:

![Transform service components Overview Docker Compose]({% link transform-service/images/ats-1.4-components-docker-compose-deploy.png %})

The request-response mechanism is asynchronous when using the message broker. However, there are situations when the 
request-response mechanism is synchronous, such as when using the Alfresco Share user interface, the message broker and
T-Router are then bypassed. The same is also true when using the Transform Core Engine (T-Engine) with the Alfresco 
Content Services Community Edition, which doesn't have access to the T-Router. This synchronous usage of the T-Engine(s) 
is sometimes referred to as *Local Transforms*. You can also come across something called *Legacy Transformers*, 
which are transformers embedded in the Repository code. In Alfresco Content Services 7, the out-of-the-box Legacy 
transformers and transformation framework have been removed. 

Files that should be transformed, and the result of the transformations, are stored in the Shared File Store.

The all-in-one Core T-Engine replaces the five separate T-Engines for all but the largest deployments, where it's still 
advisable to separate out the different types of transforms into their own images. Note that the all-in-one 
Transform Core T-Engine is the default option for the Docker Compose deployment and installation using the distribution zip.
However, Kubernetes deployments with Helm continue to use the five separate T-Engines in order to provide balanced 
throughput and scalability improvements:

![Transform service components Overview Kubernetes]({% link transform-service/images/ats-1.4-components-helm-deploy.png %})

The extraction of metadata is performed in the T-Engines. Prior to Alfresco Content Services 7, it was performed inside
the content repository.

The key capabilities of the Transform Service include the ability to:

* Scale the transformation capabilities independently of the content repository.
* Make use of the exposed transformation capabilities for all subsystems of the repository.
* Provide a greater level of reliability and fault tolerance by using persistent queues.
* Develop custom (i.e. out of process) transformers to enable the migration of any existing transform customizations.
* Scale the metadata extraction independently of the content repository.

There are two main options for deployment: 

* [Containerized deployment]({% link content-services/latest/install/containers/index.md %}#containerized-deployments)
* [Distribution zip install]({% link content-services/latest/install/containers/index.md %}#prereq-non-containerized-deploy)

>**Important:** The Transform Service is deployed as part of the Alfresco Content Services deployment for containerized 
>deployments only. See [What's deployed in Content Services]({% link content-services/latest/install/containers/index.md %}#whats-deployed-in-content-services) 
>for the list of components.

>**Important:** If you're installing Content Services using the distribution zip, you can install the Transform Service 
>using an additional distribution zip.
