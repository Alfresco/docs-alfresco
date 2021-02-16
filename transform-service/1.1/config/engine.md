---
title: Create custom T-Engine
---

Alfresco Content Services provides a number of content transforms, but also allows you to add custom transforms. This section describes how to create custom transforms.

The deployment and development of a T-Engine transformer is simpler than in previous versions of Alfresco Content Services.

* Transformers no longer need to be applied as AMPs/JARs on top of the repository.
* New versions may be deployed separately without restarting the repository.
* As a standalone Spring Boot application, development and test cycles are reduced.
* A base Spring Boot application is provided with hook points to extend it with custom transform code.
* The base also includes the creation of a Docker image for your Spring Boot application. Even if you don't intend to deploy with Docker, this may still be of interest, as the configuration of any tools or libraries used in the transform need only be done once rather than for every development or ad-hoc test environment.

## Develop new T-Engine

When developing new Local Transformers, it's a good idea to increase the polling frequency of the various locations that contain custom Pipeline, Rendition, Mimetype Definitions, and also of the Transform Service:

```bash
mimetype.config.cronExpression=0 0/1 * * * ?
rendition.config.cronExpression=2 0/1 * * * ?
local.transform.service.cronExpression=4 0/1 * * * ?
transform.service.cronExpression=6 0/1 * * * ?
```

Use this information to create a simple Hello World transformer and test it.

In this example, you'll develop, configure and run custom transformers running within a T-Engine.

The code for this example is in the [alfresco-helloworld-transformer](https://github.com/Alfresco/alfresco-helloworld-transformer/tree/master/alfresco-helloworld-transformer-engine){:target="_blank"} project in GitHub. This T-Engine contains a single transformer. However, T-Engines may contain many transformers in a single T-Engine. The transformer takes a source text file containing a name and produces an HTML file with the message:

```html
Hello `<name>`
```

To demonstrate how to use Renditions, it also takes a transform option that specifies which language to use.

> **Note:** It is assumed that you're familiar with Spring Boot, Maven, and Docker technologies.

## Develop and debug T-Engines

T-Engines are Dockerized Spring Boot applications. They are set up as Maven projects built on top of [alfresco-transformer-base](https://github.com/Alfresco/alfresco-transform-core/tree/master/alfresco-transformer-base){:target="_blank"}, which is a sub-project of Alfresco Transform Core. The Alfresco Transformer Base brings in Spring Boot capabilities, as well as base classes, which assist in the creation of new T-Engines.

### Project setup

In order to configure a custom T-Engine as a Spring Boot application in a Docker image, we need to add some configuration. The quickest way to get started is to base your project on [alfresco-helloworld-transformer](https://github.com/Alfresco/alfresco-helloworld-transformer/tree/master/alfresco-helloworld-transformer-engine){:target="_blank"}, as it is fully configured, ready to be built and run, and contains relatively little extra code. It is also possible to start from a blank Maven project with the same folder structure. The key files in this project are:

* **pom.xml** The POM file defines Alfresco Transform Core as the parent and adds required dependencies. It also configures plugins for building the Spring Boot application and generating the Docker image. It is likely you will need to change the artifact name and add extra dependencies.

* **Application.java** The Application class defines an entry point for the Spring Boot application.

* **Dockerfile** The Dockerfile is needed by the `docker-maven-plugin` configured in the `pom.xml` to generate a Docker image. It defines a simple Docker image with our Spring Boot application fat jar copied in, specifies default user information, and exposes port 8090.

## T-Engine configuration

For the repository configuration, see how to [Configure a T-Engine as a Local Transform](https://github.com/Alfresco/acs-packaging/blob/release/6.2.N/docs/custom-transforms-and-renditions.md#configure-a-t-engine-as-a-local-transform){:target="_blank"}.

T-Engines must provide a `/transform/config` end point for clients to determine what is supported. This is simply achieved by editing a JSON file.

The following [engine_config.json](https://github.com/Alfresco/alfresco-helloworld-transformer/blob/master/alfresco-helloworld-transformer-engine/src/main/resources/engine_config.json){:target="_blank"} is taken from the Hello World example, but there are other examples such as the one used by the [Tika T-Engine](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-docker-tika/src/main/resources/engine_config.json){:target="_blank"}.

```json
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

* **transformOptions** provides a list of transform options that may be referenced for use in different transformers. This way, common options don't need to be repeated for each transformer. They can even be shared between T-Engines. In this example, there is only one group of options called `helloWorldOptions`, which has just one option - the `language`. Unless an option has a `"required": true` field, it's considered to be optional. If you look at the [Tika T-Engine](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-docker-tika/src/main/resources/engine_config.json){:target="_blank"} file, you can see that options may also be grouped. You don't need to specify `sourceMimetype`, `targetMimetype`, `sourceExtension` or `targetExtension` as options, since these are automatically added.

* **transformers** is a list of transformer definitions. Each transformer definition should have a unique `transformerName`, specify a `supportedSourceAndTargetList` and indicate which options it supports. In this example configuration, there is only one transformer called `Hello World` and it accepts `helloWorldOptions`. A transformer may specify references to 0 or more `transformOptions`.

* **supportedSourceAndTargetList** is simply a list of source and target Media Types that may be transformed, with an optional `maxSourceSizeBytes` value. In this example configuration, there is only one from text to HTML and we have limited the source file size, to avoid transforming files that clearly don't contain names.

### The Controller Class

T-Engines generally extend an `AbstractTransformerController` and provide implementations of the following methods. Take a look at the [HelloWorldController.java](https://github.com/Alfresco/alfresco-helloworld-transformer/blob/master/alfresco-helloworld-transformer-engine/src/main/java/org/alfresco/transformer/HelloWorldController.java){:target="_blank"} example.

* **transform**

```java
@PostMapping(value="/transform", consumes=MULTIPART_FORM_DATA_VALUE)
publicResponseEntity<Resource> transform(HttpServletRequest request,
@RequestParam("file") MultipartFile sourceMultipartFile,
@RequestParam(value="targetExtension") String targetExtension,
@RequestParam(value="language") String language)
```

The `/transform` endpoint handles the repository requests to Local Transforms over `http`. Generally it will:

* prepare source and target files on disk using the supplied MultipartFile and targetExtension. The Transformer Base will handle the removal of these files.
* perform the transform
* send the result back

Method parameters:

* **sourceMultipartFile** - The file to be transformed from the transform request. This is always provided.
* **targetExtension** - The target extension of the transformed file to be returned in the response. This is always provided.
* **language** - This is the custom transform option defined for the example T-Engine.

The `transform` method's signature will vary depending on the T-Engine's configuration. The example T-Engine is configured to take a single `language` transform option, but the number of the `transform` method's parameters will have to match the transform options defined in [engine_config.json](https://github.com/Alfresco/alfresco-helloworld-transformer/blob/master/alfresco-helloworld-transformer-engine/src/main/resources/engine_config.json){:target="_blank"}.

* **ProcessTransform**

```java
public void processTransform(File sourceFile, File targetFile, Map<String, String> transformOptions, Long timeout)
```

This method handles requests from the Transform Service via a message queue. As it performs the same transform as the `transform` method, they tend to both call a common method to perform the actual transform.

* **getProbeTestTransform**

```java
public ProbeTestTransform getProbeTestTransform()
```

This method provides a way to define a test transform for [T-Engine Probes](https://github.com/Alfresco/alfresco-transform-core/blob/master/docs/Probes.md){:target="_blank"}. For example, a test transform of a small file included in the Docker image.

## Run hello world T-Engine standalone

Use this information to run the example Hello World transform engine (T-Engine).

1. Clone the [alfresco-helloworld-transformer](https://github.com/Alfresco/alfresco-helloworld-transformer/tree/master/alfresco-helloworld-transformer-engine){:target="_blank"} project.

2. Navigate to the `alfresco-helloworld-transformer-engine` folder.

3. Build the T-Engine:

    ```bash
    mvn clean install -Plocal
    ```

4. Start the T-Engine:

    ```bash
    docker run -d -p 8090:8090 --name alfresco-helloworld-transformer alfresco/alfresco-helloworld-transformer:latest
    ```

5. Create a test file named `source_file.txt` with the following content:

    ```bash
    T-Engines
    ```

6. Open your browser and go to `http://localhost:8090/`.

    For convenience, the Hello World T-Engine provides an HTML form to POST requests to the `/transform` endpoint.

7. In the HTML Form, choose `source_file.txt`.

8. Specify a language, where the supported languages are: English, Spanish, German.

9. Click `Transform` and then view the downloaded file.

T-Engines provide a `/log` endpoint out of the box. This shows information about transformations performed by the T-Engine. In addition, the T-Engine server logs can be accessed using the Docker `logs` command. For example:

```bash
docker logs alfresco-helloworld-transformer
```

See the [Docker documentation](https://docs.docker.com/engine/reference/commandline/logs/){:target="_blank"} for more.

## Configure custom T-Engine

Use this information to configure a custom transform engine (T-Engine).

1. Define a T-Engine URL and queue name.

    For example, you can configure custom T-Engines through environment variables:

    ```bash
    export TRANSFORMER_URL_<CUSTOM_ENGINE_NAME>="http://custom-engine-host:8090"
    export TRANSFORMER_QUEUE_<CUSTOM_ENGINE_NAME>="custom-engine-queue"
    ```

2. Configure the new transform routes:

    1. Specify the mounting location of the custom route file, `custom-route-file.yaml`.

        For example:

        ```bash
        /local/path/to/custom-route-file.yaml:/mounting/location/of/custom-route-file.yaml
        ```

    2. Specify the location through an environment variable.

        For example:

        ```bash
        export TRANSFORMER_ROUTES_ADDITIONAL_<name>="/mounting/location/of/custom-route-file.yaml"
        ```

    > **Note:** The `<name>` suffix doesn't need to match any labels - it just differentiates multiple additional route files. However, the T-Engine name can be used and may help to make debugging easier.

3. Create a YAML file that contains simple (single-step) and multi-step (pipeline) routes.

    For example:

    ```yaml
    routes:
      - sourceMediaType: image/png
        targetMediaType: application/vnd.alfresco.ai.labels.v1+json
        maxSourceSizeBytes: 102400000
        engine: AWS_AI

      - sourceMediaType: image/jpeg
        targetMediaType: application/vnd.alfresco.ai.labels.v1+json
        maxSourceSizeBytes: 102400000
        engine: AWS_AI

      - sourceMediaType: image/gif
        targetMediaType: application/vnd.alfresco.ai.labels.v1+json
        maxSourceSizeBytes: 102400000
        steps:
        - image/jpeg

      - sourceMediaType: image/tiff
        targetMediaType: application/vnd.alfresco.ai.labels.v1+json
        maxSourceSizeBytes: 102400000
        steps:
        - image/gif
        - image/jpeg

      - sourceMediaType: application/pdf
        targetMediaType: application/vnd.alfresco.ai.labels.v1+json
        maxSourceSizeBytes: 102400000
        steps:
        - image/png
    ```
