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

## Extending Transform Service

Use this information to extend the functionality of the Transform Service by adding and configuring custom transform engines (T-Engines).

The Transform Service handles communication with all its own T-Engines, and builds up its own combined configuration JSON which is requested by the repository periodically.

```bash
transform.service.cronExpression=4 30 0/1 * * ?
transform.service.initialAndOnError.cronExpression=0/10 * * * * ?
```

Custom transform engines (T-Engines) are added by specifying their HTTP URL and JMS queue name. 

The transform router (T-Router) uses the T-Engine names to register new engines via properties. The names must be unique and consistent for each engine for both of its properties (URL and queue).

Examples of such names are: `IMAGEMAGICK`, `LIBREOFFICE`, `PDF_RENDERER`, `TIKA`, `TRANSFORMER1`, `CUSTOM_ENGINE`, `CUSTOM_RED_ENGINE`.

> **Note:** The T-Engine names are case-insensitive.

To configure a custom T-Engine, you'll have to:

* Provide its URL and queue name:
* Custom T-Engines can be configured through environment variables:

        ```bash
        export TRANSFORMER_URL_<CUSTOM_ENGINE_NAME>="http://custom-engine-host:8090"
        export TRANSFORMER_QUEUE_<CUSTOM_ENGINE_NAME>="custom-engine-queue"
        ```
* (Optional) Define pipeline (multi-step) transformers:
 1. If the mounting location of the pipeline definition file is:

        ```bash
        /local/path/to/custom-pipeline-file.json:/mounting/location/of/custom-pipeline-file.json
        ```
2. Specify the location through an environment variable:

        ```bash
        export TRANSFORMER_ROUTES_ADDITIONAL_<name>="/mounting/location/of/custom-pipeline-file.json"
        ```

        > **Note:** The `<name>` suffix doesn't need to match any labels - it just differentiates multiple additional route files. However, the engine name can be used as it may help to make debugging easier.

 3. Define additional pipeline transformers, for example:

        ```json
        {
          "transformers": [
            {
                "transformerName": "pdfToImageViaPng",
                "transformerPipeline" : [
                  {"transformerName": "pdfrenderer",      "targetMediaType": "image/png"},
                  {"transformerName": "imagemagick"}
                ],
                "supportedSourceAndTargetList": [
                ],
                "transformOptions": [
                  "pdfRendererOptions",
                  "imageMagickOptions"
                ]
            }
          ]
        }
        ```
