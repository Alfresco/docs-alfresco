---
title: Configure Transform Service
---

Use this information to configure Transform Service.

## Transform Service vs. Local and Legacy Transforms

Here is a summary of the changes in the transforms introduced in Alfresco Content Services 6.2.

The Transform Service performs transformations for Alfresco Content Services in Docker containers to provide greater scalability. Requests to the Transform Service are placed in a queue and processed asynchronously. Security is also improved by better isolation.

* **Legacy Transforms** existed in Alfresco Content Services prior to version 6.0, and ran in the same JVM as the repository. Alfresco Content Services 6.2 still uses them if a rendition can't be created by the Transform Service or Local Transforms. The process of migrating custom legacy transformers is described in the Alfresco Content Services documentation.
* **Local Transforms** run in separate processes to the repository known as Transform Engines (or T-Engines for short).

You can turn on (enable) and off (disable) Local, Legacy and Transform Service transforms independently of each other by setting Alfresco global properties. In the Alfresco Content Services deployment, the Transform Service is disabled for the zip distribution but enabled for Docker Compose and Helm deployments by default. The repository will try to transform content using the Transform Service if possible, falling back to a Local Transform, and failing that, fall back to a Legacy Transform. This makes it possible to gradually migrate away from Legacy Transforms, and to take advantage of the Transform Service if it's available.

```bash
transform.service.enabled=true
local.transform.service.enabled=true
legacy.transform.service.enabled=true
```

Setting the enabled state to `false` will disable all of the transforms performed by that particular service. It's possible to disable individual Local Transforms by setting the corresponding T-Engine URL property `localTransform.<engineName>.url` value to an empty string.

```bash
localTransform.<engineName>.url=
```
