---
title: Add T-Engines to T-Router 
---

The Transform Router (T-Router) uses Transform Engine (T-Engine) names to register new engines via properties. The names 
must be unique and consistent for each engine, for both of its properties (url and queue). Examples of such name are: 
`IMAGEMAGICK`, `LIBREOFFICE`, `PDF_RENDERER`, `TIKA`, `TRANSFORMER1`, `CUSTOM_ENGINE`, `CUSTOM_RED_ENGINE`, etc. 

The T-Engine names are case-insensitive.

Engine configuration is part of the T-Router SpringBoot `application.yaml` configuration:

```yaml
transformer:
  url:
    imagemagick: http://imagemagick-host:8091
    pdf_renderer: http://pdf-renderer-host:8090
  queue:
    imagemagick: org.alfresco.transform.engine.imagemagick.acs
    pdf_renderer: org.alfresco.transform.engine.alfresco-pdf-renderer.acs
  engine:
    protocol: ${TRANSFORMER_ENGINE_PROTOCOL:jms}  # this value can be one of the following (http, jms)
```

These properties can be overridden by environment variables on the T-Router container:

```bash
export TRANSFORMER_URL_IMAGEMAGICK="http://host1"
export TRANSFORMER_QUEUE_IMAGEMAGICK="queue66"

export TRANSFORMER_URL_PDF_RENDERER="http://host2:8099"
export TRANSFORMER_QUEUE_PDF_RENDERER="queue-red-black"

export TRANSFORMER_ENGINE_PROTOCOL="http"
```

Additional custom engines can be configured through environment variables as well:

```bash
export TRANSFORMER_URL_CUSTOM_RED_ENGINE="http://red-engine-host:8090"
export TRANSFORMER_QUEUE_CUSTOM_RED_ENGINE="red-engine-queue"
```

The HTTP URL is for retrieving the engine config, and for transform requests in HTTP mode. The queue is used for 
transform requests in JMS mode, transform config is not retrieved in this way.

All registered engines are queried via their HTTP URL for transform config on T-Router startup. This allows for 
auto-configuration of engine transformers, and generates a transform config for the T-Router. The T-Router transform 
config consists of aggregated transform configs from all engines plus all available pipeline transformers. It can be 
checked using the `/transform/config` endpoint. During the registration process, the engine names provided in the 
properties are mapped to the corresponding transformers supported by the particular engine and to the corresponding 
JMS queue.

## T-Router pipeline configuration
This section assumes that you're familiar with transformer concepts used in Alfresco Content Services and now in the 
Transform Service. A good place to start is the [Content Services](https://github.com/Alfresco/acs-packaging/blob/master/docs/custom-transforms-and-renditions.md){:target="_blank"} 
GitHub documentation, as the concepts and transformer configuration are identical.

Here's a very brief overview.

Each T-Engine may contain multiple transformers, as exposed via its `/transform/config` endpoint. Each transformer has a 
list of supported transforms, which consist of:

* source and target media types (similar to mimetype)
* maximum supported source file size
* priority

The priority is used in resolving conflicts or to deliberately override existing transforms, where everything else is 
equal. Each transformer can also have a set of options, for example, an image processing transformer might have options 
for the target image parameters (resolution, aspect ratio, etc.). All of this information determines the transformer for 
each incoming request. Pipeline transformers can be defined in terms of other pipeline transformers. Pipelines examples 
are provided later.

## Out of the box pipeline transformer definitions
The T-Router supports pipeline transformers, allowing it to perform transformations in a sequence of requests to various 
engines. This functionality is identical in definition to Content Services pipeline transformers (starting from Alfresco 
Transform Service 1.3.0). For more information on these pipelines, see the Content Services GitHub documentation on 
[Configuring a custom transform pipeline](https://github.com/Alfresco/acs-packaging/blob/master/docs/custom-transforms-and-renditions.md#configure-a-custom-transform-pipeline){:target="_blank"} 
as the T-Router pipeline transformers are defined using the same format. Due to this commonality, pipelines defined in 
Content Services can be moved to Transform Service directly. However, it's worth mentioning that most of the pipeline 
definitions provided out of the box are identical to the pipeline definitions in Content Services.

The pipeline configuration file provided is bundled in the standard T-Router artifact/Docker image (the top resource 
being `transformer-pipelines.json`).

The default file is specified through the SpringBoot property `transformer-routes-path`, which can be overridden by 
the `TRANSFORMER_ROUTES_PATH` environment variable.

>**Note:** It is not recommended to override the default routes file, unless none of the pipelines are applicable for 
>the use case. Instead, you can specify additional transforms defined in the provided `transformer-pipelines.json` file.

Here's one of the pipeline transformers that provides additional transforms defined in the provided 
`transformer-pipelines.json` file:

```json
{
    "transformers": [
        {
            "transformerName": "pdfToImageViaPng",
            "transformerPipeline": [
                {
                    "transformerName": "pdfrenderer",
                    "targetMediaType": "image/png"
                },
                {
                    "transformerName": "imagemagick"
                }
            ],
            "supportedSourceAndTargetList": [],
            "transformOptions": [
                "pdfRendererOptions",
                "imageMagickOptions"
            ]
        }
    ]
}
```

The above definition will introduce a new transformer, specifically a pipeline transformer called `pdfToImageViaPng`. The 
pipeline transformer is made up of two single-step transformers, `pdfrenderer` and `imagemagick`. If the 
`supportedSourceAndTargetList` is left blank, then the T-Router will complete the supported list automatically. The 
supported list can be restricted to specific sources and targets by explicitly defining them, just like a single-step 
transformer in an engine would. Priorities can be used to override conflicting transforms provided by other transformers.

>**Note:** Pipeline transformers become available only if all the involved single-step transformers are available. The 
>application logs will report any missing pipeline transformers on startup and config refresh.

## Add new pipeline transformer definitions
Additional transformers can be defined in new JSON or YAML files and specified through environment variables with the 
`TRANSFORMER_ROUTES_ADDITIONAL_` prefix:

```bash
export TRANSFORMER_ROUTES_ADDITIONAL_<name>="/path/to/the/additional/route/file.json"
```

>**Note:** The `<name>` suffix can be a random string. It doesn't need to match any other labels - it just 
>differentiates multiple additional route files.

Here's example content of an additional pipeline in JSON format (same as the `transformer-pipelines.json`) provided. 
The environment variable `TRANSFORMER_ROUTES_ADDITIONAL_OFFICE_TO_IMAGE="/additional.json"`, and the `additional.json` 
file could be:

```json
{
    "transformers": [
        {
            "transformerName": "pdfToImageViaPng",
            "transformerPipeline": [
                {
                    "transformerName": "pdfrenderer",
                    "targetMediaType": "image/png"
                },
                {
                    "transformerName": "imagemagick"
                }
            ],
            "supportedSourceAndTargetList": [],
            "transformOptions": [
                "pdfRendererOptions",
                "imageMagickOptions"
            ]
        }
    ]
}
```

The custom pipeline definition files must be mounted on the T-Router container file-system.

Multiple additional pipeline files can be specified. Ideally, for each new custom engine a separate custom pipeline file 
should be added.

In case of clashes between transformers and their supported transforms:

* If two transformers support the same source and target media type, the transformer with the higher priority is used 
  (i.e. a lower numeric value is considered higher priority).
* If the same transform is specified in multiple transformers with the same transform options, `priority` and 
  `maxSourceFileSize`, then one of the transformers will be chosen at random.

## Transform option filtering
Each transformer can reference transform option names which it claims to support, but a pipeline transformer might 
reference options for multiple transformers as inherited from its single-step transformers. In order to send the correct 
options to the correct transformer, the options are filtered for each transform request to a T-Engine.

If the applicable transformer is a single-step transformer, the request is sent to the relevant T-Engine, with the 
request transform options filtered based on the transformer's supported transform options list.

If the applicable transformer is a pipeline transformer, then T-Router will filter transform options from the request 
for each intermediate step with respect to the current step's transformer.
