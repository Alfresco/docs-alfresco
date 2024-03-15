---
title: Alfresco Transform Service
---

The Alfresco Transform Service provides a secure, scalable, reliable, and extensible mechanism for converting files from 
their current format into other formats.

The Transform Service provides a number of Transform Engines (T-Engines) that perform single-step transformations. The
Transform Service also provides a Transform Router that sits in front of the T-Engine(s) to provide move complex
multi-step transformations that combine the single steps into pipelines and a failover mechanism where alternatives are
tried until one of them succeeds.

The Transform Router, and the T-Engine(s), runs as independently scalable Docker containers. The Transform Router is 
connected to the Alfresco Content Services repository and T-Engines via ActiveMQ, a message broker, which is used to
send transformation requests and responses:

![Transform service components Overview Docker Compose]({% link transform-service/images/ats-1.4-components-docker-compose-deploy.png %})

The message broker by its nature is asynchronous, making these request-responses asynchronous. However, there are
currently some situations in the Alfresco Share user interface and for text extraction to Solr where a synchronous
request-response is required. In these cases, the Alfresco Content Services repository will communicate directly with
the T-Engines via HTTP. It also provides the same pipeline or failover transforms as the T-Router. This synchronous
usage of the T-Engine(s) is referred to as *Local Transforms*. You might also come across something called *Legacy 
Transformers*, which were transformers embedded in the Repository code. In Alfresco Content Services 7, the
out-of-the-box Legacy transformers and framework have been removed. The Community Edition only has access
to the *Local Transforms* framework which is used both for synchronous and asynchronous requests.

Files that to be transformed or returned to the Alfresco Content Services repository or Elastic Search are generally
stored in the Shared File Store. If configured, direct access URLs may also be used to avoid some file transfer steps.

Multiple T-Engines may be deployed, but for simplicity there is an all-in-one T-Engine that provides the same
Core transformations as five separate T-Engines for use in all but the largest deployments, where it's still  
advisable to separate out the different types of transforms into their own images. Note that the all-in-one 
Transform Core T-Engine is the default option for the Docker Compose deployment and installation using the distribution zip.
However, Kubernetes deployments with Helm continue to use the five separate T-Engines in order to provide balanced 
throughput and scalability improvements. Additional T-Engines may be added to the mix:

![Transform service components Overview Kubernetes]({% link transform-service/images/ats-1.4-components-helm-deploy.png %})

The extraction of metadata is performed in the T-Engines. Prior to Alfresco Content Services 7, it was performed inside
the content repository.

The key capabilities of the Transform Service include the ability to:

* Scale the transformation capabilities independently of the content repository.
* Exposed the transformation capabilities to other components.
* Provide a greater level of reliability and fault tolerance by using persistent queues.
* Develop custom (i.e. out of process) transformers to enable the migration of any existing transform customizations.
* Scale the metadata extraction independently of the content repository.

There are two main options for deployment: 

* [Containerized deployment]({% link transform-service/4.0/install/index.md %}#containerized-deployments)
* [Distribution zip install]({% link transform-service/4.0/install/index.md %}#prereq-non-containerized-deploy)

>**Important:** The Transform Service is deployed as part of the Alfresco Content Services deployment for containerized 
>deployments only. See [What's deployed in Content Services]({% link content-services/latest/install/containers/index.md %}#whats-deployed-in-content-services) 
>for the list of components.

>**Important:** If you're installing Content Services using the distribution zip, you can install the Transform Service 
>using an additional distribution zip.
