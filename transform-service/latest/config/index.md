---
title: Configure Transform Service
nav: false
---

Use this information to configure Transform Service.

## Transform Service vs. Local and Legacy Transforms

Here is a summary of the changes in the transforms introduced in Alfresco Content Services 7.

The Transform Service and Local transformers where introduced in Alfresco Content Services 6 to help offload the 
transformation of content to a separate process. The Legacy transforms were deprecated. In Alfresco Content Services 7, 
the out of the box Legacy transformers and transformation framework have been removed. This helps provide greater clarity 
around installation and administration of transformations and technically a more scalable, reliable and secure environment.

The Transform Service performs transformations for Content Services in Docker containers to provide greater scalability. 
Requests to the Transform Service are placed in a queue and processed asynchronously. Security is also improved by better isolation.

**Local Transforms** run in separate processes to the repository known as Transform Engines (or T-Engines for short).

You can turn on (enable) and off (disable) Local and Transform Service transforms independently of each other 
by setting Alfresco global properties. In the Content Services deployment, the Transform Service is disabled for the 
zip distribution but enabled for Docker Compose and Helm deployments by default. The repository will try to transform 
content using the Transform Service if possible, falling back to a Local Transform. 

```bash
transform.service.enabled=true
local.transform.service.enabled=true
```

Setting the enabled state to `false` will disable all of the transforms performed by that particular service. It's 
possible to disable individual Local Transforms by setting the corresponding T-Engine URL property 
`localTransform.<engineName>.url` value to an empty string.

```bash
localTransform.<engineName>.url=
```
