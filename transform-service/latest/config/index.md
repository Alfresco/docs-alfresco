---
title: Extending Transform Service
---
Use this information to extend the functionality of the Transform Service by adding and configuring custom transform engines (T-Engines).

The Transform Service handles communication with all its own T-Engines, and builds up its own combined configuration JSON which is requested by the repository periodically.

```
transform.service.cronExpression=4 30 0/1 * * ?
transform.service.initialAndOnError.cronExpression=0/10 * * * * ?
```

Custom transform engines (T-Engines) are added by specifying their HTTP URL and JMS queue name. 

The transform router (T-Router) uses the T-Engine names to register new engines via properties. The names must be unique and consistent for each engine for both of its properties (URL and queue).

Examples of such names are: `IMAGEMAGICK`, `LIBREOFFICE`, `PDF_RENDERER`, `TIKA`, `TRANSFORMER1`, `CUSTOM_ENGINE`, `CUSTOM_RED_ENGINE`.

> **Note:** The T-Engine names are case-insensitive.

To configure a custom T-Engine, you'll have to:

*   Provide its URL and queue name:
    *   Custom T-Engines can be configured through environment variables:

        ```
        export TRANSFORMER_URL_<CUSTOM_ENGINE_NAME>="http://custom-engine-host:8090"
        export TRANSFORMER_QUEUE_<CUSTOM_ENGINE_NAME>="custom-engine-queue"
        ```

*   (Optional) Define pipeline (multi-step) transformers:
    1.  If the mounting location of the pipeline definition file is:

        ```
        /local/path/to/custom-pipeline-file.json:/mounting/location/of/custom-pipeline-file.json
        ```

    2.  Specify the location through an environment variable:

        ```
        export TRANSFORMER_ROUTES_ADDITIONAL_<name>="/mounting/location/of/custom-pipeline-file.json"
        ```

        > **Note:** The `<name>` suffix doesn't need to match any labels - it just differentiates multiple additional route files. However, the engine name can be used as it may help to make debugging easier.

    3.  Define additional pipeline transformers, for example:

        ```
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




