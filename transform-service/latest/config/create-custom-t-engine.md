---
title: Creating a custom T-Engine
---
Alfresco Content Services provides a number of content transforms, but also allows you to add custom transforms. This section describes how to create custom transforms.

The deployment and development of a T-Engine transformer is simpler than in previous versions of Alfresco Content Services.

* Transformers no longer need to be applied as AMPs/JARs on top of the repository.
* New versions may be deployed separately without restarting the repository.
* As a standalone Spring Boot application, development and test cycles are reduced.
* A base Spring Boot application is provided with hook points to extend it with custom transform code.
* The base also includes the creation of a Docker image for your Spring Boot application. Even if you don't intend to deploy with Docker, this may still be of interest, as the configuration of any tools or libraries used in the transform need only be done once rather than for every development or ad-hoc test environment.

## Developing a new T-Engine

When developing new Local Transformers, it's a good idea to increase the polling frequency of the various locations that contain custom Pipeline, Rendition, Mimetype Definitions, and also of the Transform Service:

```bash
mimetype.config.cronExpression=0 0/1 * * * ?
rendition.config.cronExpression=2 0/1 * * * ?
local.transform.service.cronExpression=4 0/1 * * * ?
transform.service.cronExpression=6 0/1 * * * ?
```
