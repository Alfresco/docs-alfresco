---
title: Configure Intelligence Services
---

Starting from version 1.1, Intelligence Services allows you to configure custom machine-learning (custom ML) models to enrich the content stored in Content Services. A custom ML model maps each model to metadata in your business documents. This provides a number of benefits:

* Content has metadata automatically applied, and can be categorized or classified based on its business context.
* Unstructured content can be searched and indexed by business context and easily discovered.
* Business rules and processes can automatically be triggered.

Using the Textract OCR solution from Amazon, you can extract plain text from images and PDF files, and then analyze the text. For example, for a given PDF or image, you'll get the raw text from the whole file, tables, forms (using key-value pairs), and check boxes. The extracted data is mapped to properties which are searchable.

## Configuration options

There are several options to configuring Intelligence Services.

* **Default configuration**

    This option allows you to customize the **Request AI renditions** action, so that it only calls the renditions that you wish to use. Use these steps if you don't plan to create a custom ML model.

* **Custom configuration**

Choose one or more of the following options to create custom ML models:

1. Custom entity recognition - configure and deploy a custom AI recognizer. This allows you to identify new entity types that aren't supported by one of the preset entity types.
2. Custom document classification - configure and deploy a custom AI classifier. This allows you to classify documents, for example as either an invoice, purchase order, contract, or whatever fits your business model.
3. Custom metadata extraction - configure and deploy a custom AI model. This allows you to map basic OCR detected text lines into multi-valued text fields, so they can viewed and searched.

You can still customize the **Request AI renditions** action, as in the default configuration.

> **Note:** It's recommended that you start developing one custom model at a time (i.e. either a recognizer or classifier), and test it thoroughly before adding another.

> **Note:** Metadata extraction from tables isn't supported.

## Default configuration

There are four steps to configuring the default (i.e. out-of-the-box) deployment of Intelligence Services: export your environment variables, add the AI Transform Engine to your deployment, override the Transform Router configuration, and override the Digital Workspace configuration.

> **Note:** Ensure that you've completed the [AWS setup]({% link intelligence-services/1.4/install/index.md %}#set-up-services-in-aws) before continuing.

A number of environment variables allow you to specify the configuration options and credentials that are required to run the AI Transform Engine.

1. To configure these variables, you need to export your AWS credentials and other settings.

    For example:

    ```bash
    export AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXXXXXXXXXX
    export AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXX
    export AWS_REGION="<region-name>"
    export AWS_S3_BUCKET="<s3-bucket-name>"
    export AWS_COMPREHEND_ROLE_ARN="arn:aws:iam::XXXXXXXXXXXX:role/ComprehendAsyncJobs"
    ```

    **Add the AI Transform Engine to an existing deployment**

2. To include the AI Transform Engine in your existing deployment, add the following configuration.

    Here's an example snippet from a Docker Compose file:

    ```yaml
    aws-ai:
        image: quay.io/alfresco/alfresco-ai-docker-engine:1.4.x
        environment:
            JAVA_OPTS: " -Xms256m -Xmx768m"
            # JAVA_OPTS: " -Xms256m -Xmx512m -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 "
            FILE_STORE_URL: "http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file"
            AWS_ACCESS_KEY: "${AWS_ACCESS_KEY_ID}"
            AWS_SECRET_ACCESS_KEY: "${AWS_SECRET_ACCESS_KEY}"
            AWS_REGION: "${AWS_REGION}"
            AWS_S3_BUCKET: "${AWS_S3_BUCKET}"
            AWS_COMPREHEND_ROLE_ARN: "${AWS_COMPREHEND_ROLE_ARN}"
            ACTIVEMQ_URL: "nio://activemq:61616"
        ports:
            - 5005:5005
            - 8094:8090
    ```

    **Override the Transform Router**

3. Add the following configuration to override the Transform Router in your deployment.

    This adds extra environment variables in the router configuration so it's aware of the new AI Transform Engine.

    Here's an example snippet from a Docker Compose file:

    ```yaml
    transform-router:
        image: quay.io/alfresco/alfresco-transform-router:1.5.x
        environment:
            JAVA_OPTS: " -Xms256m -Xmx512m"
            FILE_STORE_URL: "http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file"
            ACTIVEMQ_URL: "nio://activemq:61616"
            IMAGEMAGICK_URL: "http://imagemagick:8090"
            PDF_RENDERER_URL: "http://alfresco-pdf-renderer:8090"
            LIBREOFFICE_URL: "http://libreoffice:8090"
            TIKA_URL: "http://tika:8090"
            TRANSFORMER_URL_AWS_AI: "http://aws-ai:8090"
            TRANSFORMER_QUEUE_AWS_AI: "org.alfresco.transform.engine.ai-aws.acs"
            TRANSFORMER_ROUTES_ADDITIONAL_AI: "/ai-pipeline-routes.json"
        links:
            - activemq
        volumes:
        - ./ai-pipeline-routes.json:/ai-pipeline-routes.json
    ```

    > **Note:** The transform routes listed in `ai-pipeline-routes.json` define the supported transformations for all Transform Engines. This file is included in the Intelligence Services distribution zip.

    **Override the Digital Workspace configuration**

4. Add the following configuration to override the settings for Digital Workspace in your deployment.

    ```yaml
    digital-workspace:
        image: quay.io/alfresco/alfresco-digital-workspace:2.8
        environment:
        BASE_PATH: ./
        APP_CONFIG_PLUGIN_AI_SERVICE: "true"
        volumes:
        - ./ai-view-extension.json:/usr/share/nginx/html/assets/plugins/ai-view-extension.json
    ```

    > **Note:** The Digital Workspace configuration file, `ai-view-extension.json`, is also included in the Intelligence Services distribution zip.

    For more details on extending the features of Digital Workspace, see the Alfresco Content Application documentation: [Extending](https://alfresco-content-app.netlify.com/#/extending/){:target="_blank"}.

You're now ready to start Content Services.
