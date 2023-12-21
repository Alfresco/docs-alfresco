---
title: Securing HTML transformations
---

Uploading an HTML file to the repository triggers a transformation in the background. If the HTML file contains an `<img>` 
tag, then the server-side job would try to render the HTML and send an HTTP request to the URL specified in the `<img>` tag.
These transformations that follow image links are vulnerable to [Blind Server-Side Request Forgery (BSSRF)](https://en.wikipedia.org/wiki/Server-side_request_forgery){:target="_blank"} attacks.

In order to stop this from happening HTML pipelines that use LibreOffice needs to be changed to convert from HTML to PDF/IMAGE via TXT instead. With this approach the LibreOffice pipelines will not be used, but you'll still be able to see the thumbnails and document previews (although the HTML is not rendered).

## Configure HTML pipelines via txt to secure HTML transforms {#configuresecurehtmltransforms}

The following pipelines will have to be configured:

* `htmlToPdfViaTXT` – pipeline that will deal with HTML to PDF transformation through plain text. It still uses LibreOffice but for TEXT to PDF transformation, not for HTML to PDF.
* `htmlToImageViaTXT` - pipeline to transform HTML to image that will use the out-of-the-box `textToImageViaPdf` pipeline

```json
{
  "transformers": [
    {
      "transformerName": "htmlToPdfViaTXT",
      "transformerPipeline": [
        {
          "transformerName": "string",
          "targetMediaType": "text/plain"
        },
        {
          "transformerName": "libreoffice"
        }
      ],
      "supportedSourceAndTargetList": [
        {
          "sourceMediaType": "text/html",
          "priority": 10,
          "targetMediaType": "application/pdf"
        }
      ],
      "transformOptions": [
      ]
    },
    {
      "transformerName": "htmlToImageViaTXT",
      "transformerPipeline": [
        {
          "transformerName": "string",
          "targetMediaType": "text/plain"
        },
        {
          "transformerName": "textToImageViaPdf"
        }
      ],
      "supportedSourceAndTargetList": [
        {
          "sourceMediaType": "text/html",
          "priority": 10,
          "targetMediaType": "image/png"
        }
      ],
      "transformOptions": [
        "pdfRendererOptions",
        "imageMagickOptions"
      ]
    }
  ]
}
```

Store this transform configuration in a file called `0200-html-via-txt.json`.

### Deploying configuration

You have two options for this, either deploy directly to the Alfresco Repository or deploy configuration to the Transform Router.

#### Deploy new configuration to Alfresco Repository

* Copy the `0200-html-via-txt.json` file into the `tomcat/shared/classes/alfresco/extension/transform/pipelines` directory
* Make sure `alfresco-global.properties` is still configured with the default location for transform pipelines: `local.transform.pipeline.config.dir=shared/classes/alfresco/extension/transform/pipelines`

#### Deploy new configuration to Transform Router

* Copy the `0200-html-via-txt.json` file into the Transform Router container - this is usually done by creating a custom image via a `Dockerfile`
* Export an environment variable pointing to the file location inside the container.
  * The variable name should have this pattern: `TRANSFORMER_ROUTES_ADDITIONAL_<name>`
  * The variable can be defined inside the container: `export TRANSFORMER_ROUTES_ADDITIONAL_HTML_VIA_TXT="/0200-html-via-txt.json"`
  * Or by changing the Docker Compose file as shown below:

    ```txt
    transform-router:
      mem_limit: 512m
      image: quay.io/alfresco/alfresco-transform-router:1.4.0
      environment:
        JAVA_OPTS: " -XX:MinRAMPercentage=50 -XX:MaxRAMPercentage=80"
        ACTIVEMQ_URL: "nio://activemq:61616"
        TRANSFORMER_ROUTES_ADDITIONAL_HTML_VIA_TXT: "/0200-html-via-txt.json"
        CORE_AIO_URL : "http://transform-core-aio:8090"
        FILE_STORE_URL: "http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file"
      ports:
        - 8095:8095
      links:
        - activemq
    ```

For more information see this [page]({% link transform-service/latest/config/index.md %})

## Restore HTML pipelines that use LibreOffice

To re-enable the HTML pipelines that use LibreOffice, you can restore them at your own risk and get the original behavior again.

If you disabled the HTML transforms that use LibreOffice using the instructions [above](#configuresecurehtmltransforms), then enable the original behavior by reverting those changes.

If you're using a version of Content Services that already comes with these transformations disabled, then create a configuration file containing the original pipelines as below:

```json
{
  "transformers": [
    {
      "transformerName": "htmlToPdfViaOdt",
      "transformerPipeline": [
        {
          "transformerName": "libreoffice",
          "targetMediaType": "application/vnd.oasis.opendocument.text"
        },
        {
          "transformerName": "libreoffice"
        }
      ],
      "supportedSourceAndTargetList": [
        {
          "sourceMediaType": "text/html",
          "priority": 10,
          "targetMediaType": "application/pdf"
        }
      ],
      "transformOptions": [
      ]
    },
    {
      "transformerName": "htmlToImageViaPdf",
      "transformerPipeline": [
        {
          "transformerName": "htmlToPdfViaOdt",
          "targetMediaType": "application/pdf"
        },
        {
          "transformerName": "pdfToImageViaPng"
        }
      ],
      "supportedSourceAndTargetList": [
      ],
      "transformOptions": [
        "pdfRendererOptions",
        "imageMagickOptions"
      ]
    },
    {
      "transformerName": "libreofficeHtmlToPdfViaOdt",
      "transformerPipeline": [
        {
          "transformerName": "libreoffice",
          "targetMediaType": "application/vnd.oasis.opendocument.text"
        },
        {
          "transformerName": "libreoffice"
        }
      ],
      "supportedSourceAndTargetList": [
        {
          "sourceMediaType": "text/html",
          "priority": 10,
          "targetMediaType": "application/pdf"
        }
      ],
      "transformOptions": [
      ]
    }
  ]
}
```

Store this transform configuration in a file called `restore-html-libreoffice.json`.

### Deploying configuration

You have two options for this, either deploy directly to the Alfresco Repository or deploy the configuration to the Transform Router.

#### Deploy new configuration to Alfresco Repository

* Copy the `restore-html-libreoffice.json` file into the `tomcat/shared/classes/alfresco/extension/transform/pipelines` directory
* Make sure `alfresco-global.properties` is still configured with the default location for transform pipelines: `local.transform.pipeline.config.dir=shared/classes/alfresco/extension/transform/pipelines`

#### Deploy new configuration to Transform Router

* Copy the `restore-html-libreoffice.json` file into the Transform Router container, this is usually done by creating a custom image via a `Dockerfile`
* Export an environment variable pointing to the file location inside the container.
  * The variable name should have this pattern: `TRANSFORMER_ROUTES_ADDITIONAL_<name>`
  * The variable can be defined inside the container: `export TRANSFORMER_ROUTES_ADDITIONAL_RESTORE_HTML_LIBREOFFICE="/restore-html-libreoffice.json"`
  * Or by changing the Docker Compose file as shown below:

    ```txt
    transform-router:
      mem_limit: 512m
      image: quay.io/alfresco/alfresco-transform-router:1.4.0
      environment:
        JAVA_OPTS: " -XX:MinRAMPercentage=50 -XX:MaxRAMPercentage=80"
        ACTIVEMQ_URL: "nio://activemq:61616"
        TRANSFORMER_ROUTES_ADDITIONAL_RESTORE_HTML_LIBREOFFICE: "/restore-html-libreoffice.json"
        CORE_AIO_URL : "http://transform-core-aio:8090"
        FILE_STORE_URL: "http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file"
      ports:
        - 8095:8095
      links:
        - activemq
    ```

For more information see the [Transform Service documentation]({% link transform-service/latest/config/index.md %})
