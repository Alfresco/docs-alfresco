---
title: Extending Transform Service
---

## Configuring and Extending Transform Service


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


## Configuring transformers

Use this information to configure the transformers in the Transform Service.

**Transformer configuration overview**

The Transform Router (T-Router) configures engine transformers automatically by retrieving the engine transform configurations from each configured Transform Engine (i.e T-Engine). The engine transform configurations provide the transformer configuration, including the supported transformers and their transform options.

For more information on the format of the transform configuration and instructions on how to create a transform configuration files for a custom engine, see [Creating a T-Engine](https://github.com/Alfresco/acs-packaging/blob/support/SP/6.2.N/docs/creating-a-t-engine.md).

T-Engines are added to the T-Router by adding the engine's URL and JMS queue name used by each and every engine. See next section for the URL and JMS queue name property format.

The T-Router supports 2 types of transformers:

*   **Single-step transformer**: This maps T-Requests to a single T-Engine, which can directly transform the `source media type` to the `target media type` with the provided `transform options` and `source file size`.
    *   For example: `image/png` to `image/png` is handled by the `IMAGEMAGICK` transformer.
*   **Pipeline transformer**: This maps T-Requests to a sequence of intermediate T-Request steps, which are handled by multiple `T-Engines`. These transformers handle situations where there is no single engine that can directly transform one media type to another, but that can be achieved through intermediate media types and transformations.
    *   For example: `application/msword` to `image/png` can't be directly performed by one single engine, but it can be handled by `LIBREOFFICE` (which would generate `application/pdf`) and then `PDF_RENDERER`.



Single-step transformers map to a transformer, which in turn maps to an engine. Each engine can have multiple transformers defined in its configuration. The single-step transformers are configured automatically from engine transform configuration files.

Pipeline transforms map to a pipeline transformer, which in turn maps to a series of single-step transformers. These are defined through configuration files in the T-Router. This is described in the later section about pipelines.



**Adding T-Engines to T-Router**

The T-Router uses T-Engine names to register new engines via properties. The names must be unique and consistent for each engine, for both of its properties (url and queue). Examples of such name are: `IMAGEMAGICK`, `LIBREOFFICE`, `PDF_RENDERER`, TIKA, `TRANSFORMER1`, `CUSTOM_ENGINE`, `CUSTOM_RED_ENGINE`., etc. The T-Engine names are case-insensitive.



Engine configuration is part of the T-Router SpringBoot `application.yaml` config:

```
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

```
export TRANSFORMER_URL_IMAGEMAGICK="http://host1" 
export TRANSFORMER_QUEUE_IMAGEMAGICK="queue66" 

export TRANSFORMER_URL_PDF_RENDERER="http://host2:8099" 
export TRANSFORMER_QUEUE_PDF_RENDERER="queue-red-black" 

export TRANSFORMER_ENGINE_PROTOCOL="http" 
```

Additional custom engines can be configured through environment variables as well:

```
export TRANSFORMER_URL_CUSTOM_RED_ENGINE="http://red-engine-host:8090" 
export TRANSFORMER_QUEUE_CUSTOM_RED_ENGINE="red-engine-queue" 
```

The HTTP URL is for retrieving the engine config, and for transform requests in HTTP mode. The queue is used for transform requests in JMS mode, transform config is not retrieved in this way.

All registered engines are queried via their HTTP URL for transform config on T-Router startup. This allows for auto configuration of engine transformers, and generates a transform config for the T-Router. The T-Router transform config consists of aggregated transform configs from all engines plus all available pipeline transformers. It can be checked using the `/transform/config` endpoint. During the registration process, the engine names provided in the properties are mapped to the corresponding transformers supported by the particular engine and to the corresponding JMS queue.






**T-Router pipeline configuration**

This section assumes that you're familiar with transformer concepts used in Alfresco Content Services and now in the Transform Service. A good place to start is the [Alfresco Content Services](https://github.com/Alfresco/acs-packaging/blob/support/SP/6.2.N/docs/custom-transforms-and-renditions.md) GitHub documentation, as the concepts and transformer configuration are identical.

Here's a very brief overview.

Each T-Engine may contain multiple transformers, as exposed via its `/transform/config` endpoint. Each transformer has a list of supported transforms, which consist of:

*   source and target media types (similar to mimetype)
*   maximum supported source file size
*   priority

The priority is used in resolving conflicts or to deliberately override existing transforms, where everything else is equal. Each transformer can also have a set of options, for example, an image processing transformer might have options for the target image parameters (resolution, aspect ratio, etc.). All of this information determines the transformer for each incoming request. Pipeline transformers can be defined in terms of other pipeline transformers. Pipelines examples are provided later.



**Out of the box pipeline transformer definitions**

The T-Router supports pipeline transformers, allowing it to perform transformations in a sequence of requests to various engines. This functionality is identical in definition to Alfresco Content Services pipeline transformers (starting from Alfresco Transform Service 1.3.0). For more information on these pipelines, see the Alfresco Content Services GitHub documentation on [Configuring a custom transform pipeline](https://github.com/Alfresco/acs-packaging/blob/support/SP/6.2.N/docs/custom-transforms-and-renditions.md#configure-a-custom-transform-pipeline) as the T-Router pipeline transformers are defined using the same format. Due to this commonality, pipelines defined in Alfresco Content Services can be moved to Transform Service directly. However, it's worth mentioning that most of the pipeline definitions provided out of the box are identical to the pipeline definitions in Alfresco Content Services.

The pipeline configuration file provided is bundled in the standard T-Router artifact/Docker image (the top resource being `transformer-pipelines.json`).

The default file is specified through the SpringBoot property `transformer-routes-path`, which can be overridden by the `TRANSFORMER_ROUTES_PATH` environment variable.

> **Note:** It is not recommended to override the default routes file, unless none of the pipelines are applicable for the use case. Instead, you can specify additional transforms defined in the provided `transformer-pipelines.json` file.

Here's one of the pipeline transformers that provides additional transforms defined in the provided `transformer-pipelines.json` file:

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



The above definition will introduce a new transformer, specifically a pipeline transformer called `pdfToImageViaPng`. The pipeline transformer is made up of two single-step transformers, `pdfrenderer` and `imagemagick`. If the **supportedSourceAndTargetList** is left blank, then the T-Router will complete the supported list automatically. The supported list can be restricted to specific sources and targets by explicitly defining them, just like a single-step transformer in an engine would. Priorities can be used to override conflicting transforms provided by other transformers.

> **Note:** Pipeline transformers become available only if all of the involved single-step transformers are available. The application logs will report any missing pipeline transformers on startup and config refresh.

**Adding new pipeline transformer definitions**

Additional transformers can be defined in new JSON or YAML files and specified through environment variables with the `TRANSFORMER_ROUTES_ADDITIONAL_` prefix:

```
export TRANSFORMER_ROUTES_ADDITIONAL_<name>="/path/to/the/additional/route/file.yaml"
```

> **Note:** The `<name>` suffix can be a random string. It doesn't need to match any other labels - it just differentiates multiple additional route files.

Here's example content of an additional pipeline in JSON format (same as the `transformer-pipelines.json`) provided. The environment variable `TRANSFORMER_ROUTES_ADDITIONAL_OFFICE_TO_IMAGE="/additional.json"`, and the `additional.json` file could be:

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



Here's example content of an additional pipeline in YAML format. This is the same pipeline as in the JSON example. The environment variable `TRANSFORMER_ROUTES_ADDITIONAL_AI_ROUTES="/additional.json"`, and the `additional.json` content could be:

```
routes:
   - transformerName: pdfToImageViaPng
     transformerPipeline:
     - transformerName: pdfrenderer
       targetMediaType: image/png
     - transformerName: imagemagick
     supportedSourceAndTargetList: []
     transformOptions:
     - pdfRendererOptions
     - imageMagickOptions
```



Regardless of the format used, the custom pipeline definition files must be mounted on the T-Router container file-system.

Multiple additional pipeline files can be specified. Ideally, for each new custom engine a separate custom pipeline file should be added.

In case of clashes between transformers and their supported transforms:

*   If two transformers support the same source and target media type, the transformer with the higher priority is used (i.e. a lower numeric value is considered higher priority).

*   If the same transform is specified in multiple transformers with the same transform options, priority and maxSourceFileSize, then one of the transformers will be chosen at random.





**Transform option filtering**

Each transformer can reference transform option names which it claims to support, but a pipeline transformer might reference options for multiple transformers as inherited from its single-step transformers. In order to send the correct options to the correct transformer, the options are filtered for each transform request to a T-Engine.

If the applicable transformer is a single-step transformer, the request is sent to the relevant T-Engine, with the request transform options filtered based on the transformer's supported transform options list.

If the applicable transformer is a pipeline transformer, then T-Router will filter transform options from the request for each intermediate step with respect to the current step's transformer.






## Creating a custom T-Engine

Alfresco Content Services provides a number of content transforms, but also allows you to add custom transforms. This section describes how to create custom transforms.

The deployment and development of a T-Engine transformer is simpler than in previous versions of Alfresco Content Services.

*   Transformers no longer need to be applied as AMPs/JARs on top of the repository.
*   New versions may be deployed separately without restarting the repository.
*   As a standalone Spring Boot application, development and test cycles are reduced.
*   A base Spring Boot application is provided with hook points to extend it with custom transform code.
*   The base also includes the creation of a Docker image for your Spring Boot application. Even if you don't intend to deploy with Docker, this may still be of interest, as the configuration of any tools or libraries used in the transform need only be done once rather than for every development or ad-hoc test environment.

**Developing a new T-Engine**

When developing new Local Transformers, it's a good idea to increase the polling frequency of the various locations that contain custom Pipeline, Rendition, Mimetype Definitions, and also of the Transform Service:

```
mimetype.config.cronExpression=0 0/1 * * * ?
rendition.config.cronExpression=2 0/1 * * * ?
local.transform.service.cronExpression=4 0/1 * * * ?
transform.service.cronExpression=6 0/1 * * * ?
```

Use this information to create a simple Hello World transformer and test it.

**Overview**

Here, you'll develop, configure and run custom transformers running within a T-Engine.

The code for this example is in the [alfresco-helloworld-transformer](https://github.com/Alfresco/alfresco-helloworld-transformer/tree/master/alfresco-helloworld-transformer-engine) project in GitHub. This T-Engine contains a single transformer. However, T-Engines may contain many transformers in a single T-Engine. The transformer takes a source text file containing a name and produces an HTML file with the message:

```
Hello `<name>`
```

To demonstrate how to use Renditions, it also takes a transform option that specifies which language to use.

> **Note:** It is assumed that you're familiar with Spring Boot, Maven, and Docker technologies.



**Developing and debugging T-Engines**

T-Engines are Dockerized Spring Boot applications. They are set up as Maven projects built on top of [alfresco-transformer-base](https://github.com/Alfresco/alfresco-transform-core/tree/master/alfresco-transformer-base), which is a sub-project of Alfresco Transform Core. The Alfresco Transformer Base brings in Spring Boot capabilities, as well as base classes, which assist in the creation of new T-Engines. 

**Project setup**

In order to configure a custom T-Engine as a Spring Boot application in a Docker image, we need to add some configuration. The quickest way to get started is to base your project on [alfresco-helloworld-transformer](https://github.com/Alfresco/alfresco-helloworld-transformer/tree/master/alfresco-helloworld-transformer-engine), as it is fully configured, ready to be built and run, and contains relatively little extra code. It is also possible to start from a blank Maven project with the same folder structure. The key files in this project are:

*   **pom.xml**

    The POM file defines Alfresco Transform Core as the parent and adds required dependencies. It also configures plugins for building the Spring Boot application and generating the Docker image. It is likely you will need to change the artifact name and add extra dependencies.

*   **Application.java**

    The Application class defines an entry point for the Spring Boot application.

*   **Dockerfile**

    The Dockerfile is needed by the `docker-maven-plugin` configured in the `pom.xml` to generate a Docker image. It defines a simple Docker image with our Spring Boot application fat jar copied in, specifies default user information, and exposes port 8090.


**T-Engine configuration**

For the repository configuration, see how to [Configure a T-Engine as a Local Transform](https://github.com/Alfresco/acs-packaging/blob/support/SP/6.2.N/docs/custom-transforms-and-renditions.md#configure-a-t-engine-as-a-local-transform).

T-Engines must provide a `/transform/config` end point for clients to determine what is supported. This is simply achieved by editing a JSON file.

The following [engine\_config.json](https://github.com/Alfresco/alfresco-helloworld-transformer/blob/master/alfresco-helloworld-transformer-engine/src/main/resources/engine_config.json) is taken from the Hello World example, but there are other examples such as the one used by the [Tika T-Engine](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-docker-tika/src/main/resources/engine_config.json).

```
{
  "transformOptions":
  {
    "helloWorldOptions":
    [
      {"value": {"name": "language"}}
    ]
  },
  "transformers":
  [
    {
      "transformerName": "helloWorld",
      "supportedSourceAndTargetList":
      [
        {"sourceMediaType": "text/plain",  "maxSourceSizeBytes": 50, "targetMediaType": "text/html"  }
      ],
      "transformOptions":
      [
        "helloWorldOptions"
      ]
    }
  ]
}
```

*   **transformOptions** provides a list of transform options that may be referenced for use in different transformers. This way, common options don't need to be repeated for each transformer. They can even be shared between T-Engines. In this example, there is only one group of options called `helloWorldOptions`, which has just one option - the `language`. Unless an option has a `"required": true` field, it's considered to be optional. If you look at the [Tika T-Engine](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-docker-tika/src/main/resources/engine_config.json) file, you can see that options may also be grouped. You don't need to specify `sourceMimetype`, `targetMimetype`, `sourceExtension` or `targetExtension` as options, since these are automatically added.

*   **transformers** - A list of transformer definitions. Each transformer definition should have a unique `transformerName`, specify a `supportedSourceAndTargetList` and indicate which options it supports. In this example configuration, there is only one transformer called `Hello World` and it accepts `helloWorldOptions`. A transformer may specify references to 0 or more `transformOptions`.

*   **supportedSourceAndTargetList** is simply a list of source and target Media Types that may be transformed, with an optional `maxSourceSizeBytes` value. In this example configuration, there is only one from text to HTML and we have limited the source file size, to avoid transforming files that clearly don't contain names.



**The Controller Class**

T-Engines generally extend an `AbstractTransformerController` and provide implementations of the following methods. Take a look at the [HelloWorldController.java](https://github.com/Alfresco/alfresco-helloworld-transformer/blob/master/alfresco-helloworld-transformer-engine/src/main/java/org/alfresco/transformer/HelloWorldController.java){:target="_blank"} example.

**transform**

```
@PostMapping(value="/transform", consumes=MULTIPART_FORM_DATA_VALUE)
publicResponseEntity<Resource> transform(HttpServletRequest request,
@RequestParam("file") MultipartFile sourceMultipartFile,
@RequestParam(value="targetExtension") String targetExtension,
@RequestParam(value="language") String language)
```

The `/transform` endpoint handles the repository requests to Local Transforms over `http`. Generally it will:

*   prepare source and target files on disk using the supplied MultipartFile and targetExtension. The Transformer Base will handle the removal of these files.
*   perform the transform
*   send the result back

Method parameters:

*   **sourceMultipartFile** - The file to be transformed from the transform request. This is always provided.
*   **targetExtension** - The target extension of the transformed file to be returned in the response. This is always provided.
*   **language** - This is the custom transform option defined for the example T-Engine.

The `transform` method's signature will vary depending on the T-Engine's configuration. The example T-Engine is configured to take a single `language` transform option, but the number of the `transform` method's parameters will have to match the transform options defined in [engine\_config.json](https://github.com/Alfresco/alfresco-helloworld-transformer/blob/master/alfresco-helloworld-transformer-engine/src/main/resources/engine_config.json){:target="_blank"}.

**processTransform**

```
public void processTransform(File sourceFile, File targetFile, Map<String, String> transformOptions, Long timeout)
```

This method handles requests from the Transform Service via a message queue. As it performs the same transform as the `transform` method, they tend to both call a common method to perform the actual transform.

**getProbeTestTransform**

```
public ProbeTestTransform getProbeTestTransform()
```

This method provides a way to define a test transform for [T-Engine Probes](https://github.com/Alfresco/alfresco-transform-core/blob/master/docs/Probes.md){:target="_blank"}. For example, a test transform of a small file included in the Docker image.


## Running Hello World T-Engine standalone

Use this information to run the example Hello World transform engine (T-Engine).

1.  Clone the [alfresco-helloworld-transformer](https://github.com/Alfresco/alfresco-helloworld-transformer/tree/master/alfresco-helloworld-transformer-engine){:target="_blank"} project.

2.  Navigate to the `alfresco-helloworld-transformer-engine` folder.

3.  Build the T-Engine:

    ```
    mvn clean install -Plocal
    ```

4.  Start the T-Engine:

    ```
    docker run -d -p 8090:8090 --name alfresco-helloworld-transformer alfresco/alfresco-helloworld-transformer:latest
    ```

5.  Create a test file named `source_file.txt` with the following content:

    ```
    T-Engines
    ```

6.  Open your browser and go to `http://localhost:8090/`.

    For convenience, the Hello World T-Engine provides an HTML form to POST requests to the `/transform` endpoint.

7.  In the HTML Form, choose `source_file.txt`.

8.  Specify a language, where the supported languages are: English, Spanish, German.

9.  Click `Transform` and then view the downloaded file.


T-Engines provide a `/log` endpoint out of the box. This shows information about transformations performed by the T-Engine. In addition, the T-Engine server logs can be accessed using the Docker `logs` command. For example:

```
docker logs alfresco-helloworld-transformer
```

See the [Docker documentation](https://docs.docker.com/engine/reference/commandline/logs/) for more.

## Configuring a custom T-Engine

Use this information to configure a custom transform engine (T-Engine).

1.  Define an HTTP URL and JMS queue name for the T-Engine .

    For example, you can configure custom T-Engines through environment variables:

    ```
    
    export TRANSFORMER_URL_<CUSTOM_ENGINE_NAME>="http://custom-engine-host:8090" 
    export TRANSFORMER_QUEUE_<CUSTOM_ENGINE_NAME>="custom-engine-queue"
                    
    ```

2.  (Optional) Configure multi-step (pipeline) transformers:

    1.  Specify the mounting location of the pipeline definition file, `custom-pipeline-file.json`.

        For example:

        ```
        /local/path/to/custom-pipeline-file.json:/mounting/location/of/custom-pipeline-file.json
        ```

    2.  Specify the location through an environment variable.

        For example:

        ```
        export TRANSFORMER_ROUTES_ADDITIONAL_<name>="/mounting/location/of/custom-pipeline-file.json"
        ```

    > **Note:** The `<name>` suffix doesn't need to match any labels - it just differentiates multiple additional route files. However, the T-Engine name can be used as it may help to make debugging easier.

3.  Create a JSON file that contains additional pipeline transformers.

    For example:

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
