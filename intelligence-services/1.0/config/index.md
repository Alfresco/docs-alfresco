---
title: Configure Intelligence Services
---

There are four steps to configuring Intelligence Services: export your environment variables, add the AI Transform Engine to your deployment, override the Transform Router configuration, and override the Digital Workspace configuration.

> **Note:** Ensure that you've completed the [AWS setup]({% link intelligence-services/1.0/install/index.md %}#set-up-services-in-aws) before continuing.

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
        image: quay.io/alfresco/alfresco-ai-docker-engine:1.0.0
        environment:
            JAVA_OPTS: " -Xms256m -Xmx512m"
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
        image: quay.io/alfresco/alfresco-transform-router:1.0.1
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
            TRANSFORMER_ROUTES_FILE_LOCATION: "/transformer-routes-with-ai.properties"
            # Enforce spring properties for T-Router 1.0.1
            SPRING_APPLICATION_JSON: "{"transformer":{"queue":{"AWS_AI":"org.alfresco.transform.engine.ai-aws.acs"},"url":{"AWS_AI":"http://aws-ai:8090"}}}"
        links:
            - activemq
        volumes:
        - ./transformer-routes-with-ai.properties:/transformer-routes-with-ai.properties
    ```

    > **Note:** The transform routes listed in `transformer-routes-with-ai.properties` define the supported transformations for all Transform Engines. This file is included in the Intelligence Services distribution zip.

    **Override the Digital Workspace configuration**

4. Add the following configuration to override the settings for Digital Workspace in your deployment.

    ```yaml
    digital-workspace:
        image: quay.io/alfresco/alfresco-digital-workspace:1.1.0
        volumes:
            - ./app.extensions.json:/usr/share/nginx/html/assets/app.extensions.json
    ```

    > **Note:** The Digital Workspace configuration file, `app.extensions.json`, is also included in the Intelligence Services distribution zip.

    For more details on extending the features of Digital Workspace, see the Alfresco Content Application documentation: [Extending](https://alfresco-content-app.netlify.com/#/extending/){:target="_blank"}.

You're now ready to start Alfresco Content Services.
