---
title: Configure Transform Service
---

The Transform Router (T-Router) configures Transform Engines (T-Engine) transformers automatically by retrieving the 
engine transform configurations from each configured T-Engine. The engine transform configurations provide the
transformer configuration, including the supported transformers, and their transform options.

For more information on the format of the transform configuration and instructions on how to create a transform
configuration files for a custom engine, see [Creating a T-Engine](https://github.com/Alfresco/acs-packaging/blob/7.1.0.1/docs/creating-a-t-engine.md){:target="_blank"}.

T-Engines are added to the T-Router by adding the engine's URL and JMS queue name used by each and every engine. See
next section for the URL and JMS queue name property format.

The T-Router supports 2 types of transformers:

* **Single-step transformer**: This maps transformation requests to a single T-Engine, which can directly transform the
  `source media type` to the `target media type` with the provided `transform options` and `source file size`.

  For example: `image/png` to `image/png` is handled by the `IMAGEMAGICK` transformer.

* **Pipeline transformer**: This maps transformation requests to a sequence of intermediate transformation requests steps,
  which are handled by multiple T-Engines. These transformers handle situations where there is no single engine that can
  directly transform one media type to another, but that can be achieved through intermediate media types and transformations.

  For example: `application/msword` to `image/png` can't be directly performed by one single engine, but it can be
  handled by `LIBREOFFICE` (which would generate `application/pdf`) and then `PDF_RENDERER`.

Single-step transformers map to a transformer, which in turn maps to a T-Engine. Each T-Engine can have multiple
transformers defined in its configuration. The single-step transformers are configured automatically from T-Engine
transform configuration files.

Pipeline transforms map to a pipeline transformer, which in turn maps to a series of single-step transformers. These are
defined through configuration files in the T-Router. This is described in the later section about pipelines.

A T-Engine is intended to be run as a Docker image, but may also be run as a standalone process.

For an overview of the Transform Service, including the T-Router, T-Engines, Local transforms, Legacy transforms etc see [overview]({% link transform-service/latest/index.md %}).

## Repository specific configuration
This section covers transform configuration on the Alfresco Content Services Repository side. As it is possible to 
configure transformations on both the Repository side, and the T-Router side, we will cover both. Repository configuration
is also used when the Alfresco Content Services Community Edition is used.

### Configure a T-Engine as a Local Transform
For the Repository to talk to a T-Engine directly, it must know the engine's URL. The URL can be added as an Alfresco 
global property (i.e. in `alfresco-global.properties`), or more simply as a Java system property. `JAVA_OPTS` may be 
used to set this if starting the repository with Docker:

```text
localTransform.<engineName>.url=
```

The `<engineName>` is a unique name of the T-Engine. For example, `localTransform.helloworld.url`. Typically, a T-Engine
contains a single transform or an associated group of transforms. Having set the URL to a T-Engine, the Repository will
update its configuration by requesting the [T-Engine configuration](https://github.com/Alfresco/acs-packaging/blob/master/docs/creating-a-t-engine.md#t-engine-configuration){:target="_blank"}
on a periodical basis. It is requested more frequently on start up or if a communication or configuration problem has
occurred, and less frequently otherwise:

```text
local.transform.service.cronExpression=4 30 0/1 * * ?
local.transform.service.initialAndOnError.cronExpression=0/10 * * * * ?
```
### Configure the Repository to use the Transform Service
The Transform service, including the T-Router, is disabled by default, but Docker Compose and Kubernetes Helm Charts
enable it again by setting `transform.service.enabled=true`. The Transform Service handles communication with all its
own T-Engines via the T-Router and builds up its own combined configuration JSON which is requested by the
Repository periodically.

```text
transform.service.enabled=true
transform.service.cronExpression=4 30 0/1 * * ?
transform.service.initialAndOnError.cronExpression=0/10 * * * * ?
```

### Enabling and disabling transforms
Local transforms or Transform Service transforms can be enabled or disabled independently of each other. The Repository 
will try to transform content using the Transform Service via the T-Router if possible and fall back to direct Local 
Transforms. If you are using Share, Local Transforms are required, as they support both synchronous and asynchronous 
requests. Share makes use of both, so functionality such as preview will be unavailable if Local transforms are disabled. 
The Transform service only supports asynchronous requests.

The following sections will show how to create a direct Local transform pipeline, a Local transform failover or a Local
transform override, but remember that they will not be used if the Transform Service (ATS) with the T-Router is able to 
do the transform and is enabled (i.e. in `alfresco-global.properties`):

```text
transform.service.enabled=true
local.transform.service.enabled=true
```

Setting the enabled state to `false` will disable all the transforms performed by that particular service. It is
possible to disable individual Local Transforms by setting the corresponding T-Engine URL property
`localTransform.<engineName>.url` value to an empty string:

```text
localTransform.helloworld.url=
```

### Deploying configurations
This section walks through where to deploy configurations for transform pipelines, renditions, and mimetypes.

#### Transform definition deployments
To deploy a configuration on the Repository side copy the JSON file, for example `custom_pipelines.json` into the 
`tomcat/shared/classes/alfresco/extension/transform/pipelines` directory. Then make sure `alfresco-global.properties` is 
configured with the default location for transform pipelines: 

```text
local.transform.pipeline.config.dir=shared/classes/alfresco/extension/transform/pipelines
```

On startup this location is checked every 10 seconds, but then switches to once an hour if successful. After a problem,
it tries every 10 seconds again. These are the same properties used to decide when to read T-Engine configurations,
because pipelines combine transformers in the T-Engines.

```text
local.transform.service.cronExpression=4 30 0/1 * * ?
local.transform.service.initialAndOnError.cronExpression=0/10 * * * * ?
```

If you are using Docker Compose in development, you will need to copy your pipeline definition into your running
Repository container. One way is to use the following command, and it will be picked up the next time the location is
read, which is dependent on the cron values.

```bash
docker cp custom_pipelines.json <alfresco container>:/usr/local/tomcat/shared/classes/alfresco/extension/transform/pipelines/
```

In a Kubernetes environment, [ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/){:target="_blank"}
can be used to add pipeline definitions. You will need to create a `ConfigMap` from the JSON file and mount the ConfigMap
through a volume to the Repository pods.

```bash
kubectl create configmap custom-pipeline-config --from-file=custom_pipelines.json
```

The necessary volumes are already provided out of the box and the files in ConfigMap `custom-pipeline-config` will be mounted to
`/usr/local/tomcat/shared/classes/alfresco/extension/transform/pipelines/`. Again, the files will be picked up the next
time the location is read, or when the repository pods are restarted.

>**Note**: From Kubernetes documentation: Caution: If there are some files in the `mountPath` location, they will be deleted.

#### Rendition definition deployments
Just like Pipeline Definitions, custom Rendition Definitions need to be placed in a directory of the Repository. There are
similar properties that control where and when these definitions are read, and the same approach may be taken to get them
into Docker Compose and Kubernetes environments.

```text
rendition.config.dir=shared/classes/alfresco/extension/transform/renditions/
```

```text
rendition.config.cronExpression=2 30 0/1 * * ?
rendition.config.initialAndOnError.cronExpression=0/10 * * * * ?
```

In a Kubernetes environment:

```bash
kubectl create configmap custom-rendition-config --from-file=custom-renditions.json
```

#### Mimetype definition deployments
Just like Pipeline and Rendition Definitions, custom Mimetype Definitions need to be placed in a directory of the 
Repository. There are similar properties that control where and when these definitions are read, and the same approach 
may be taken to get them into Docker Compose and Kubernetes environments.

```text
mimetype.config.dir=shared/classes/alfresco/extension/mimetypes
```
```text
mimetype.config.cronExpression=0 30 0/1 * * ?
mimetype.config.initialAndOnError.cronExpression=0/10 * * * * ?
```

In a Kubernetes environment:

```bash
kubectl create configmap custom-mimetype-config --from-file=custom-mimetypes.json
```

The necessary volumes are already provided out of the box and the files in ConfigMap `custom-mimetype-config` will be
mounted to `/usr/local/tomcat/shared/classes/alfresco/extension/mimetypes`. Again, the files will be picked up the next
time the location is read, or when the repository pods are restarted.

## Deploying configurations to a T-Engine
To deploy configurations on the T-Engine side copy the JSON file, for example `custom_pipelines.json` into the T-Router 
container. This is usually done by creating a custom image via a `Dockerfile`. Then Export an environment variable 
pointing to the file location inside the container. 

The variable name should have this pattern: 

```text
TRANSFORMER_ROUTES_ADDITIONAL_<name>
```

The variable can be defined inside the container: 

```text
export TRANSFORMER_ROUTES_ADDITIONAL_HTML_VIA_TXT="/custom_pipelines.json"
```

Or by changing the Docker Compose file as shown below:

```text
transform-router:
  mem_limit: 512m
  image: quay.io/alfresco/alfresco-transform-router:4.0.0
  environment:
    JAVA_OPTS: " -XX:MinRAMPercentage=50 -XX:MaxRAMPercentage=80"
    ACTIVEMQ_URL: "nio://activemq:61616"
    TRANSFORMER_ROUTES_ADDITIONAL_HTML_VIA_TXT: "/custom_pipelines.json"
    CORE_AIO_URL : "http://transform-core-aio:8090"
    FILE_STORE_URL: "http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file"
  ports:
    - 8095:8095
  links:
    - activemq
```

## Transformer selection strategy
The Repository and the Transform Service T-Router uses the [T-Engine configuration](https://github.com/Alfresco/acs-packaging/blob/master/docs/creating-a-t-engine.md#t-engine-configuration){:target="_blank"}
in combination with their own pipeline files to choose which T-Engine will perform a transform. A transformer definition
contains a supported list of source and target Media Types. This is used for the most basic selection. This is further
refined by checking that the definition also supports transform options (parameters) that have been supplied in a
transform request, or a Rendition Definition used in a rendition request. See [Configure a Custom Rendition](#configure-a-custom-rendition).

```text
Transformer 1 defines options: Op1, Op2
Transformer 2 defines options: Op1, Op2, Op3, Op4
```

```text
Rendition provides values for options: Op2, Op3
```

If we assume that both transformers support the required source and target Media Types, Transformer 2 will be selected because
it knows about all the supplied options. The definition may also specify that some options are required or grouped.

The configuration may impose a source file size limit resulting in the selection of a different transformer. Size limits
are normally added to avoid the transforms consuming too many resources. The configuration may also specify a priority
which will be used in Transformer selection if there are a number of options. The highest priority is the one with the
lowest number.

## Configuring T-Engines
This section covers general JSON format for transform, rendition, and mimetype configurations applicable to the Repository 
and the T-Engines.

### Transform pipelines
Transformations may be combined in a pipeline to form a new transform, where the output from one becomes the
input to the next and so on. A pipeline definition (JSON) defines the sequence of transform steps and intermediate Media Types.
Like any other transformer, it specifies a list of supported source and target Media Types. If you don't supply any,
all possible combinations are assumed to be available. The definition may reuse the `transformOptions` of transformers in the
pipeline, but typically will define its own subset of these.

The following example begins with the `helloWorld` Transformer described in [Creating a T-Engine](https://github.com/Alfresco/acs-packaging/blob/7.1.0.1/docs/creating-a-t-engine.md){:target="_blank"},
which takes a text file containing a name and produces an HTML file with a `*`Hello <name>` message in the body. This is
then transformed back into a text file.

This example contains just one pipeline transformer, but many may be defined in the same file, such as 
`custom_pipelines.json`:

```json
{
  "transformers": [
    {
      "transformerName": "helloWorldText",
      "transformerPipeline" : [
        {"transformerName": "helloWorld", "targetMediaType": "text/html"},
        {"transformerName": "html"}
      ],
      "supportedSourceAndTargetList": [
        {"sourceMediaType": "text/plain", "priority": 45,  "targetMediaType": "text/plain" }
      ],
      "transformOptions": [
        "helloWorldOptions"
      ]
    }
  ]
}
```

* `transformerName` - Unique name for the transform.
* `transformerPipeline` - A list of transformers in the pipeline. The `targetMediaType` specifies the intermediate
  Media Types between transformers. There is no final `targetMediaType` as this comes from the `supportedSourceAndTargetList`.
* `supportedSourceAndTargetList` - The supported source and target Media Types, which refer to the Media Types this
  pipeline transformer can transform from and to, additionally you can set the priority and the
  `maxSourceSizeBytes` see [Supported Source and Target List](https://github.com/Alfresco/alfresco-transform-core/blob/master/docs/engine_config.md#supported-source-and-target-list){:target="_blank"}.
  If blank, this indicates that all possible combinations are supported. This is the cartesian product of all source types to the first
  intermediate type and all target types from the last intermediate type. Any combinations supported by the first transformer are excluded. They
  will also have the priority from the first transform.
* `transformOptions` - A list of references to options required by the pipeline transformer.

### Failover transform pipelines
A failover transform simply provides a list of transforms to be attempted one after another until one succeeds. For
example, you may have a fast transform that is able to handle a limited set of transforms and another that is slower
but handles all cases.

```json
{
  "transformers": [
    {
      "transformerName": "imgExtractOrImgCreate",
      "transformerFailover" : [ "imgExtract", "imgCreate" ],
      "supportedSourceAndTargetList": [
        {"sourceMediaType": "application/vnd.oasis.opendocument.graphics", "priority": 150, "targetMediaType": "image/png" },
        ...
        {"sourceMediaType": "application/vnd.sun.xml.calc.template",       "priority": 150, "targetMediaType": "image/png" }
      ]
    }
  ]
}
```

* `transformerName` - Unique name for the transform.
* `transformerFaillover` - A list of transformers to try.
* `supportedSourceAndTargetList` - The supported source and target Media Types, which refer to the Media Types this 
  failover transformer can transform from and to, additionally you can set the priority and the `maxSourceSizeBytes` 
  see [Supported Source and Target List](https://github.com/Alfresco/alfresco-transform-core/blob/master/docs/engine_config.md#supported-source-and-target-list){:target="_blank"}.
  Unlike pipelines, it must not be blank.
* `transformOptions` - A list of references to options required by the pipeline transformer.

### Adding pipelines and failover transforms to a T-Engine
So far we have talked about defining pipelines and failover transforms in the Repository or the Transfrom Service T-Router 
pipeline files. It is also possible to add them to a T-Engine's configuration, even when they reference a transformer 
provided by another T-Engine. It is only when all transform steps exist that the pipeline or failover transform becomes 
available. Warning messages will be issued if step transforms do not exist.

Generally it is better to add them to T-Engines to avoid having to add an identical entry to both the Repository and 
Transfrom Service T-Router pipeline files.

### Modifying existing pipeline configurations
The Repository and the Transfrom Service T-Router reads the configuration from T-Engines and then their own pipeline
files. The T-Engine order is based on the `<engineName>` and the pipeline file order is based on the filenames. As 
sorting is alphanumeric, you may wish to consider using a fixed length numeric prefix.

For example:

```text
localTransform.imagemagick.url=http://localhost:8091/
localTransform.libreoffice.url=http://localhost:8092/
localTransform.misc.url=http://localhost:8094/
localTransform.pdfrenderer.url=http://localhost:8090/
localTransform.tika.url=http://localhost:8093/

shared/classes/alfresco/extension/transform/pipelines/0100-basePipelines.json
shared/classes/alfresco/extension/transform/pipelines/0200-a-cutdown-libreoffice.json
```

The following sections describe ways to modify the configuration that has already been read. This may be added to
T-Engine or pipeline files.

#### Overriding transform pipelines
It is possible to override a previously defined transform definition. The following example
removes most of the supported source to target media types from the standard `libreoffice`
transform. It also changes the max size and priority of others. This is not something you would normally want to do.

```json
{
  "transformers": [
    {
      "transformerName": "libreoffice",
      "supportedSourceAndTargetList": [
        {"sourceMediaType": "text/csv", "maxSourceSizeBytes": 1000, "targetMediaType": "text/html" },
        {"sourceMediaType": "text/csv", "targetMediaType": "application/vnd.oasis.opendocument.spreadsheet" },
        {"sourceMediaType": "text/csv", "targetMediaType": "application/vnd.oasis.opendocument.spreadsheet-template" },
        {"sourceMediaType": "text/csv", "targetMediaType": "text/tab-separated-values" },
        {"sourceMediaType": "text/csv", "priority": 45, "targetMediaType": "application/vnd.ms-excel" },
        {"sourceMediaType": "text/csv", "priority": 155, "targetMediaType": "application/pdf" }
      ]
    }
  ]
}
```

#### Removing a transformer
To discard a previous transformer definition include its name in the optional `"removeTransformers"` list. You might 
want to do this if you have a replacement and wish to keep the overall configuration simple (so it contains no alternatives), 
or you wish to temporarily remove it. The following example removes two transformers before processing any other 
configuration in the same T-Engine or pipeline file.

```json
{
  "removeTransformers" : [
    "libreoffice",
    "Archive"
   ]
  ...
}
```

#### Overriding the supportedSourceAndTargetList
Rather than totally override an existing transform definition from another T-Engine or pipeline file, it is generally 
simpler to modify the `"supportedSourceAndTargetList"` by adding elements to the optional `"addSupported"`, 
`"removeSupported"` and `"overrideSupported"` lists. You will need to specify the `"transformerName"` but you will not 
need to repeat all the other `"supportedSourceAndTargetList"` values, which means if there are changes in the original, 
the same change is not needed in a second place.

The following example adds one transform, removes two others and changes the `"priority"` and `"maxSourceSizeBytes"` of
another. This is done before processing any other configuration in the same T-Engine or pipeline file:

```json
{
  "addSupported": [
    {
      "transformerName": "Archive",
      "sourceMediaType": "application/zip",
      "targetMediaType": "text/csv",
      "priority": 60,
      "maxSourceSizeBytes": 18874368
    }
  ],
  "removeSupported": [
    {
      "transformerName": "Archive",
      "sourceMediaType": "application/zip",
      "targetMediaType": "text/xml"
    },
    {
      "transformerName": "Archive",
      "sourceMediaType": "application/zip",
      "targetMediaType": "text/plain"
    }
  ],
  "overrideSupported": [
    {
      "transformerName": "Archive",
      "sourceMediaType": "application/zip",
      "targetMediaType": "text/html",
      "priority": 60,
      "maxSourceSizeBytes": 18874368
    }
  ]
  ...
}
```

#### Default maxSourceSizeBytes and priority values
When defining `"supportedSourceAndTargetList"` elements the `"priority"` and `"maxSourceSizeBytes"` are optional
and normally have the default values of `50` and `-1` (no limit). It is possible to change those defaults. In precedence 
order from most specific to most general these are defined by combinations of `"transformerName"` and `"sourceMediaType"`.

* `transformer and source media type default` - both specified
* `transformer default` - only the transformer name is specified
* `source media type default` - only the source media type is specified
* `system wide default` - neither are specified.

Both `"priority"` and `"maxSourceSizeBytes"` may be specified in an element, but if only one is specified it is only that 
value that is being defaulted.

Being able to change the defaults is particularly useful once a T-Engine has been developed as it allows a system 
administrator to handle limitations that are only found later. The `system wide defaults` are generally not used but are 
included for completeness.

The following example says that the `"Office"` transformer by default should only handle zip files up to 18 Mb and by
default the maximum size of a `.doc` file to be transformed is 4 Mb. The third example defaults the priority,
possibly allowing another transformer that has specified a priority of say `50` to be used in
preference.

Defaults values are only applied after T-Engine and pipeline files have been read.

```json
{
  "supportedDefaults": [
    {
      "transformerName": "Office",             // default for a source type within a transformer
      "sourceMediaType": "application/zip",
      "maxSourceSizeBytes": 18874368
    },
    {
      "sourceMediaType": "application/msword", // defaults for a source type
      "maxSourceSizeBytes": 4194304,
      "priority": 45
    },
    {
      "priority": 60                           // system wide default
    },
    {
      "maxSourceSizeBytes": -1                 // system wide default
    }
  ]
  ...
}
```
### Configure a custom rendition {#configure-a-custom-rendition}
Renditions are a representation of source content in another form. A Rendition Definition (JSON) defines the transform 
option (parameter) values that will be passed to a transformer and the target Media Type:

```json
{
  "renditions": [
    {
      "renditionName": "helloWorld",
      "targetMediaType": "text/html",
      "options": [
        {"name": "language", "value": "German"}
      ]
    }
  ]
}
```

* `renditionName` - A unique rendition name.
* `targetMediaType` - The target Media Type for the rendition.
* `options` - The list of transform option names and values corresponding to the transform options defined in
  [T-Engine configuration](https://github.com/Alfresco/acs-packaging/blob/master/docs/creating-a-t-engine.md#t-engine-configuration){:target="_blank"}.
  If you specify `sourceNodeRef` without a value, the system will automatically add the values at run time.
  
#### Disabling an existing rendition
Just like transforms, it is possible to override renditions. The following example effectively disables the `doclib` 
rendition, used to create the thumbnail images in Share's Document Library page and other client applications. A good 
name for this file might be `0200-disableDoclib.json`.

```json
{
  "renditions": [
    {
      "renditionName": "doclib",
      "targetMediaType": "image/png",
      "options": [
        {"name": "unsupported", "value": 123}
      ]
    }
  ]
}
```

Because there is not a transformer with a transform option called `unsupported`, the rendition can never be performed. 
Having turned on `TransformerDebug` logging you normally would see a transform taking place for `-- doclib --` when 
you upload a file in Share. With this override the doclib transform does not appear.

#### Overriding an existing rendition
It is possible to change a rendition by overriding it. The following `0300-biggerThumbnails.json` file changes the size 
of the `doclib` image from `100x100` to be `123x123` and introduces another rendition called `biggerThumbnail` that is 
`200x200`:

```json
{
  "renditions": [
    {
      "renditionName": "doclib",
      "targetMediaType": "image/png",
      "options": [
        {"name": "resizeWidth", "value": 123},
        {"name": "resizeHeight", "value": 123},
        {"name": "allowEnlargement", "value": false},
        {"name": "maintainAspectRatio", "value": true},
        {"name": "autoOrient", "value": true},
        {"name": "thumbnail", "value": true}
      ]
    },
    {
      "renditionName": "biggerThumbnail",
      "targetMediaType": "image/png",
      "options": [
        {"name": "resizeWidth", "value": 200},
        {"name": "resizeHeight", "value": 200},
        {"name": "allowEnlargement", "value": false},
        {"name": "maintainAspectRatio", "value": true},
        {"name": "autoOrient", "value": true},
        {"name": "thumbnail", "value": true}
      ]
    }
  ]
}
```

### Configure a custom MIME type
Quite often the reason a custom transform is created is to convert to or from a MIME type (or Media type) that is not 
known to Alfresco Content Services by default. Another reason is to introduce an application specific MIME type that
indicates a specific use of a more general format such as XML or JSON.

From Alfresco Content Services 6.2, it is possible add custom MIME types in a similar way to custom Pipelines and 
Renditions. The JSON format and properties are as follows:

```json
{
  "mediaTypes": [
    {
      "name": "MPEG4 Audio",
      "mediaType": "audio/mp4",
      "extensions": [
        {"extension": "m4a"}
      ]
    },
    {
      "name": "Plain Text",
      "mediaType": "text/plain",
      "text": true,
      "extensions": [
        {"extension": "txt", "default": true},
        {"extension": "sql", "name": "SQL"},
        {"extension": "properties", "name": "Java Properties"},
        {"extension": "log", "name": "Log File"}
      ]
    }
  ]
}
```

* `name` Display name of the mimetype or file extension. Optional for extensions.
* `mediaType` used to identify the content.
* `text` optional value indicating if the mimetype is text based.
* `extensions` a list of possible extensions.
* `extension` the file extension.
* `default` indicates the extension is the default one if there is more than one.


