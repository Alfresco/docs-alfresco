---
title: Configuring a custom T-Engine
---
Use this information to configure a custom transform engine (T-Engine).

1. Define an HTTP URL and JMS queue name for the T-Engine .

    For example, you can configure custom T-Engines through environment variables:

    ```bash  
    export TRANSFORMER_URL_<CUSTOM_ENGINE_NAME>="http://custom-engine-host:8090"
    export TRANSFORMER_QUEUE_<CUSTOM_ENGINE_NAME>="custom-engine-queue"
    ```

2. (Optional) Configure multi-step (pipeline) transformers:

   1. Specify the mounting location of the pipeline definition file, `custom-pipeline-file.json`.

        For example:

        ```bash
        /local/path/to/custom-pipeline-file.json:/mounting/location/of/custom-pipeline-file.json
        ```

   2. Specify the location through an environment variable.

        For example:

        ```bash
        export TRANSFORMER_ROUTES_ADDITIONAL_<name>="/mounting/location/of/custom-pipeline-file.json"
        ```

    > **Note:** The `<name>` suffix doesn't need to match any labels - it just differentiates multiple additional route files. However, the T-Engine name can be used as it may help to make debugging easier.

3. Create a JSON file that contains additional pipeline transformers.

    For example:

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
