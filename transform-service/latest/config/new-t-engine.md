---
title: Developing a new T-Engine
---
Use this information to create a simple Hello World transformer and test it.

## Overview

Here, you'll develop, configure and run custom transformers running within a T-Engine.

The code for this example is in the [alfresco-helloworld-transformer](https://github.com/Alfresco/alfresco-helloworld-transformer/tree/master/alfresco-helloworld-transformer-engine){:target="_blank"} project in GitHub. This T-Engine contains a single transformer. However, T-Engines may contain many transformers in a single T-Engine. The transformer takes a source text file containing a name and produces an HTML file with the message:

```html
Hello `<name>`
```

To demonstrate how to use Renditions, it also takes a transform option that specifies which language to use.

> **Note:** It is assumed that you're familiar with Spring Boot, Maven, and Docker technologies.

## Developing and debugging T-Engines

T-Engines are Dockerized Spring Boot applications. They are set up as Maven projects built on top of [alfresco-transformer-base](https://github.com/Alfresco/alfresco-transform-core/tree/master/alfresco-transformer-base){:target="_blank"}, which is a sub-project of Alfresco Transform Core. The Alfresco Transformer Base brings in Spring Boot capabilities, as well as base classes, which assist in the creation of new T-Engines. 

### Project setup

In order to configure a custom T-Engine as a Spring Boot application in a Docker image, we need to add some configuration. The quickest way to get started is to base your project on [alfresco-helloworld-transformer](https://github.com/Alfresco/alfresco-helloworld-transformer/tree/master/alfresco-helloworld-transformer-engine){:target="_blank"}, as it is fully configured, ready to be built and run, and contains relatively little extra code. It is also possible to start from a blank Maven project with the same folder structure. The key files in this project are:

* **pom.xml**

    The POM file defines Alfresco Transform Core as the parent and adds required dependencies. It also configures plugins for building the Spring Boot application and generating the Docker image. It is likely you will need to change the artifact name and add extra dependencies.

* **Application.java**

    The Application class defines an entry point for the Spring Boot application.

* **Dockerfile**

    The Dockerfile is needed by the `docker-maven-plugin` configured in the `pom.xml` to generate a Docker image. It defines a simple Docker image with our Spring Boot application fat jar copied in, specifies default user information, and exposes port 8090.

## T-Engine configuration

For the repository configuration, see how to [Configure a T-Engine as a Local Transform](https://github.com/Alfresco/acs-packaging/blob/support/SP/6.2.N/docs/custom-transforms-and-renditions.md#configure-a-t-engine-as-a-local-transform){:target="_blank"}.

T-Engines must provide a `/transform/config` end point for clients to determine what is supported. This is simply achieved by editing a JSON file.

The following [engine\_config.json](https://github.com/Alfresco/alfresco-helloworld-transformer/blob/master/alfresco-helloworld-transformer-engine/src/main/resources/engine_config.json){:target="_blank"} is taken from the Hello World example, but there are other examples such as the one used by the [Tika T-Engine](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-docker-tika/src/main/resources/engine_config.json){:target="_blank"}.

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

* **transformOptions** provides a list of transform options that may be referenced for use in different transformers. This way, common options don't need to be repeated for each transformer. They can even be shared between T-Engines. In this example, there is only one group of options called `helloWorldOptions`, which has just one option - the `language`. Unless an option has a `"required": true` field, it's considered to be optional. If you look at the [Tika T-Engine](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-docker-tika/src/main/resources/engine_config.json) file, you can see that options may also be grouped. You don't need to specify `sourceMimetype`, `targetMimetype`, `sourceExtension` or `targetExtension` as options, since these are automatically added.

* **transformers** - A list of transformer definitions. Each transformer definition should have a unique `transformerName`, specify a `supportedSourceAndTargetList` and indicate which options it supports. In this example configuration, there is only one transformer called `Hello World` and it accepts `helloWorldOptions`. A transformer may specify references to 0 or more `transformOptions`.

* **supportedSourceAndTargetList** is simply a list of source and target Media Types that may be transformed, with an optional `maxSourceSizeBytes` value. In this example configuration, there is only one from text to HTML and we have limited the source file size, to avoid transforming files that clearly don't contain names.

* **The Controller Class**

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

The `transform` method's signature will vary depending on the T-Engine's configuration. The example T-Engine is configured to take a single `language` transform option, but the number of the `transform` method's parameters will have to match the transform options defined in [engine\_config.json](https://github.com/Alfresco/alfresco-helloworld-transformer/blob/master/alfresco-helloworld-transformer-engine/src/main/resources/engine_config.json){:target="_blank"}.

### rocessTransform

```java
public void processTransform(File sourceFile, File targetFile, Map<String, String> transformOptions, Long timeout)
```

This method handles requests from the Transform Service via a message queue. As it performs the same transform as the `transform` method, they tend to both call a common method to perform the actual transform.

### getProbeTestTransform

```java
public ProbeTestTransform getProbeTestTransform()
```

This method provides a way to define a test transform for [T-Engine Probes](https://github.com/Alfresco/alfresco-transform-core/blob/master/docs/Probes.md){:target="_blank"}. For example, a test transform of a small file included in the Docker image.
