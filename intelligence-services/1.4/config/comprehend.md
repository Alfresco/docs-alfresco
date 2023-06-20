---
title: Custom configuration - Comprehend
---

Use this information to configure and deploy a custom AI recognizer and a custom AI classifier using Amazon Comprehend.

This guide takes you through the journey of configuring your Content Services instance to enrich the content with custom metadata detected with powerful state of the art AI algorithms.

Multiple custom entity recognizers and classifiers can be configured and used in Content Services simultaneously, on either the same or different folders, using a flexible configuration.

## Configuration flow

The following diagram shows a high-level representation of the configuration flow:

![Custom AI configuration flow]({% link intelligence-services/images/ai-config-flow.png %})

Follow the remaining sections in this guide to start setting up your custom models.

## Step 1: Train custom models

Use this information to train custom models to use with Intelligence Services.

### Train a Custom Entity Recognition model

In order to have a trained Custom Entity Recognition model, two major steps that must be done:

1. Gathering and preparing training data
2. Training the Amazon Comprehend Custom Entity Recognizer

These steps are described and maintained in the AWS site: [Training Custom Entity Recognizers](https://docs.aws.amazon.com/comprehend/latest/dg/training-recognizers.html){:target="_blank"}.

> **Note:** The **Recognizer ARN** will be available once the model is trained. This is needed later when configuring the repository.

### Train a Custom Classification model

In order to have a trained Custom Classification model, two major steps that must be done:

1. Gathering and preparing training data
2. Training the Amazon Comprehend Custom Classifier

These steps are described and maintained in the AWS site: [Training a Custom Classifier](https://docs.aws.amazon.com/comprehend/latest/dg/how-document-classification-training.html){:target="_blank"}.

> **Note:** The **Classifier ARN** will be available once the model is trained. This is needed later when configuring the repository.

## Step 2: Deploy and configure a custom model

<!-- This section is included in comprehend.md and textract.md -->
Use this information to deploy and configure a custom model for Intelligence Services.

Note that the implementation follows the same process for custom recognition or classification model types, but differs slightly for custom metadata extraction.

Before you can use a custom model with Intelligence Services, you'll need to define a new rendition in configuration files for the repository, Alfresco Share, and Alfresco Digital Workspace.

The process requires the configuration of a number of files that must be mounted in the Docker containers:

|    | Configuration file | Used by custom model / AWS service |
| -- | ------------------ | ---------------------------------- |
| Repository | custom-ai-content-model-context.xml | Comprehend, Textract |
| | customAIContentModel.xml | Comprehend, Textract |
| | custom-ai-renditions-definitions.json | Comprehend
| | customAIPropertyMapping.json | Comprehend, Textract
| | | |
| Share | share-config-custom.xml | Comprehend, Textract
| | bootstrap-custom-labels.properties | Comprehend
| | share-custom-slingshot-application-context.xml | Comprehend, Textract |
| | | |
| Digital Workspace | ai-view.extension.json| Comprehend, Textract, Transcribe |

These files are described in more detail in the remainder of this page.

## Step 3. Configure the repository to use a custom model

Use this information to configure the repository files needed for a custom model. The following files must be mounted in the Alfresco repository Docker container.

### Custom AI content model context

File name: `custom-ai-content-model-context.xml`

Mount location and example:

```bash
./custom-ai-content-model-context.xml:/usr/local/tomcat/shared/classes/alfresco/extension/custom-ai-content-model-context.xml
```

Content:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <!-- Registration of new models -->
    <bean id="org.alfresco.acme.dictionaryBootstrap" parent="dictionaryModelBootstrap" depends-on="org.alfresco.ai.dictionaryBootstrap">
        <property name="models">
            <list>
                <value>alfresco/extension/customAIContentModel.xml</value>
            </list>
        </property>
    </bean>
</beans>
```

### Custom AI content model

File name: `customAIContentModel.xml`

Mount location and example:

```bash
./customAIContentModel.xml:/usr/local/tomcat/shared/classes/alfresco/extension/customAIContentModel.xml
```

Content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<model name="acme:contentModel" xmlns="http://www.alfresco.org/model/dictionary/1.0">

    <description>Custom Content Model for Artificial Intelligence extension</description>
    <version>1.0</version>

    <imports>
        <import uri="http://www.alfresco.org/model/content/1.0" prefix="cm" />
        <import uri="http://www.alfresco.org/model/dictionary/1.0" prefix="d" />
        <import uri="http://www.alfresco.org/model/site/1.0" prefix="st" />
        <import uri="http://www.alfresco.org/model/system/1.0" prefix="sys" />
        <import uri="http://www.alfresco.org/model/ai/1.0" prefix="ai"/>
    </imports>

    <namespaces>
        <namespace uri="http://acme.org" prefix="acme" />
    </namespaces>

    <aspects>
        <aspect name="acme:businesses">
            <title>AI Businesses</title>
            <parent>ai:features</parent>
            <properties>
                <property name="acme:business">
                    <title>Businesses</title>
                    <type>d:text</type>
                    <multiple>true</multiple>
                    <index enabled="true">
                        <tokenised>both</tokenised>
                        <facetable>true</facetable>
                    </index>
                </property>
            </properties>
        </aspect>

        <aspect name="acme:sports">
            <title>AI Sports</title>
            <parent>ai:features</parent>
            <properties>
                <property name="acme:sport">
                    <title>Sports</title>
                    <type>d:text</type>
                    <multiple>true</multiple>
                    <index enabled="true">
                        <tokenised>both</tokenised>
                        <facetable>true</facetable>
                    </index>
                </property>
            </properties>
        </aspect>

        <aspect name="acme:categories">
            <title>AI Categories</title>
            <parent>ai:classifier</parent>
            <properties>
                <property name="acme:category">
                    <title>AI Category</title>
                    <type>d:text</type>
                    <multiple>true</multiple>
                    <index enabled="true">
                        <tokenised>both</tokenised>
                        <facetable>true</facetable>
                    </index>
                </property>
            </properties>
        </aspect>
    </aspects>
</model>
```

### Custom AI rendition definitions

File name: `custom-ai-renditions-definitions.json`

Mount location and example:

```bash
./custom-ai-renditions-definitions.json:/usr/local/tomcat/shared/classes/alfresco/extension/transform/renditions/custom-ai-renditions-definitions.json
```

Content:

The following JSON snippet shows the configuration for three renditions for two custom entity recognizers and one custom classifier.

```json
{
  "renditions": [
    {
      "renditionName": "aiBusinessCustom",
      "targetMediaType": "application/vnd.alfresco.ai.features.v1+json",
      "options": [
        {"name": "endpointAwsComprehendEntityRecognizer", "value": "arn:aws:comprehend:<region-name>:<account-id>:entity-recognizer/<recognizer-name>"},
        {"name": "maxResults", "value": 1000},
        {"name": "minConfidence", "value": 0.8}
      ]
    },
    {
      "renditionName": "aiSportCustom",
      "targetMediaType": "application/vnd.alfresco.ai.features.v1+json",
      "options": [
        {"name": "endpointAwsComprehendEntityRecognizer", "value": "arn:aws:comprehend:<region-name>:<account-id>:entity-recognizer/<recognizer-name>"},
        {"name": "maxResults", "value": 1000},
        {"name": "minConfidence", "value": 0.8}
      ]
    },
    {
      "renditionName": "aiClassification",
      "targetMediaType": "application/vnd.alfresco.ai.classifiers.v1+json",
      "options": [
        {"name": "endpointAwsComprehendClassifier", "value": "arn:aws:comprehend:<region-name>:<account-id>:document-classifier/<classifier-name>"},
        {"name": "maxResults", "value": 1},
        {"name": "minConfidence", "value": 0.2}
      ]
    }
  ]
}
```

The rendition configuration for entity recognition and classification is slightly different:

* `renditionName` - the key/label for the rendition. This must be unique, as it must match the rendition names in the `customAIPropertyMapping.json` file. It's best to choose a name that's indicative of the recognizer/classifier used.
* `targetMediaType` - can be one of two options:
  * `application/vnd.alfresco.ai.features.v1+json` for entity recognizers
  * `application/vnd.alfresco.ai.classifiers.v1+json` for classifiers
* `maxResults` - the maximum number of results (entities/categories) that should be used in Content Services. It makes sense to use a large value when searching for entities in a document, and a very small value when trying to identify a category for an entire document
* `minConfidence` - the minimum confidence for a result (between 0 and 1). A lower value can be used when the maximum number of values is small (i.e. for classification).

### Custom AI property mapping

File name: `customAIPropertyMapping.json`

Mount location and example:

```bash
./customAIPropertyMapping.json:/usr/local/tomcat/customAIPropertyMapping.json
```

Content:

```json
{
  "featureToPropertyMapping": [
    {
      "aiBusinessCustom": [
        {
          "type": "BUSINESS",
          "aspect": "acme:businesses",
          "property": "acme:business"
        }
      ]
    },
    {
      "aiSportCustom": [
        {
          "type": "SPORT",
          "aspect": "acme:sports",
          "property": "acme:sport"
        }
      ]
    }
  ],
  "categoryToPropertyMapping": [
    {
      "aiClassification": {
        "aspect": "acme:categories",
        "property": "acme:category"
      }
    }
  ]
}
```

In the above JSON snippet:

* The rendition name (e.g. `aiBusiness`, `aiSport`, `aiClassification`) is used as a key (for both custom entity recognizers and custom classifiers).
* The aspect/property names must match the Content Services content model.
* For custom entity recognizers, the entity type (e.g. `BUSINESS`, `SPORT`) must match what's returned in the raw results.

### Alfresco Docker service definition (deployment)

```yaml
alfresco:
    image: alfresco/alfresco-content-services-with-amps-applied:x.y
    environment:
      JAVA_OPTS: "
        -Ddb.driver=org.postgresql.Driver
        -Ddb.username=alfresco
        -Ddb.password=alfresco
        -Ddb.url=jdbc:postgresql://postgres:5432/alfresco
        -Dsolr.host=solr6
        -Dsolr.port=8983
        -Dsolr.secureComms=none
        -Dsolr.base.url=/solr
        -Dindex.subsystem.name=solr6
        -Dshare.host=127.0.0.1
        -Dshare.port=8080
        -Dalfresco.host=localhost
        -Dalfresco.port=8080
        -Daos.baseUrlOverwrite=http://localhost:8080/alfresco/aos
        -Dmessaging.broker.url=\"failover:(nio://activemq:61616)?timeout=3000&jms.useCompression=true\"
        -Ddeployment.method=DOCKER_COMPOSE

        -Dtransform.service.enabled=true
        -Dtransform.service.url=http://transform-router:8095
        -Dsfs.url=http://shared-file-store:8099/

        -Dlocal.transform.service.enabled=true
        -DlocalTransform.pdfrenderer.url=http://alfresco-pdf-renderer:8090/
        -DlocalTransform.imagemagick.url=http://imagemagick:8090/
        -DlocalTransform.libreoffice.url=http://libreoffice:8090/
        -DlocalTransform.tika.url=http://tika:8090/
        -DlocalTransform.misc.url=http://misc:8090/

        -Dlegacy.transform.service.enabled=true
        -Dalfresco-pdf-renderer.url=http://alfresco-pdf-renderer:8090/
        -Djodconverter.url=http://libreoffice:8090/
        -Dimg.url=http://imagemagick:8090/
        -Dtika.url=http://tika:8090/
        -Dtransform.misc.url=http://misc:8090/

        -Dcsrf.filter.enabled=false
        -Xms1500m -Xmx1500m

        -Dai.transformation.customAIPropertyMapping.file.location=\"/usr/local/tomcat/customAIPropertyMapping.json\"
        "
    ports:
      - 5006:5006
    volumes:
      - alfresco-volume:/usr/local/tomcat/alf_data
      - ./customAIPropertyMapping.json:/usr/local/tomcat/customAIPropertyMapping.json
      - ./customAIContentModel.xml:/usr/local/tomcat/shared/classes/alfresco/extension/customAIContentModel.xml
      # DOC: file needs to end in -context.xml and to be in this location.
      # Details on (Deployment - App Server) -> https://docs.alfresco.com/content-services/latest/develop/repo-ext-points/content-model/#definedeploy)
      - ./custom-ai-content-model-context.xml:/usr/local/tomcat/shared/classes/alfresco/extension/custom-ai-content-model-context.xml
      - ./custom-ai-renditions-definitions.json:/usr/local/tomcat/shared/classes/alfresco/extension/transform/renditions/custom-ai-renditions-definitions.json
```

In the above `docker-compose` snippet:

* The `transform.service.enabled` property must be set to `true`;
* `ai.transformation.customAIPropertyMapping.file.location` must point to the location where the `customAIPropertyMapping.json` file is mounted;
* The custom AI configuration files must be mounted in the repository container at specific locations.

## Step 4. Configure Share and Digital Workspace to use a custom model

Use this information to configure the files needed by Share and Digital Workspace for a custom model.

### Share

The following files must be mounted in the Share Docker container.

#### 1. Custom AI labels

File name: `share-config-custom.xml`

Mount location and example:

```bash
./share-config-custom.xml:/usr/local/tomcat/shared/classes/alfresco/web-extension/share-config-custom-dev.xml
```

Content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<alfresco-config>
    <config evaluator="string-compare" condition="DocumentLibrary">
        <!-- Aspects that a user can see -->
        <aspects>
            <visible>
                <aspect name="acme:businesses"/>
                <aspect name="acme:sports"/>
                <aspect name="acme:categories"/>
            </visible>
        </aspects>
    </config>
</alfresco-config>
```

#### 2. Custom AI aspect configuration

File name: `bootstrap-custom-labels.properties`

Mount location and example:

```bash
./bootstrap-custom-labels.properties:/usr/local/tomcat/shared/classes/alfresco/web-extension/messages/bootstrap-custom-labels.properties
```

Content:

```bash
aspect.acme_businesses=AI Businesses
aspect.acme_sports=AI Sports
aspect.acme_categories=AI Categories
```

#### 3. Custom AI labels context

File name: `share-custom-slingshot-application-context.xml`

Mount location and example:

```bash
./share-custom-slingshot-application-context.xml:/usr/local/tomcat/shared/classes/alfresco/web-extension/custom-slingshot-application-context.xml
```

Content:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <bean id="org.alfresco.acme.alfresco-ai-share.resources" class="org.springframework.extensions.surf.util.ResourceBundleBootstrapComponent">
        <property name="resourceBundles">
            <list>
                <value>alfresco/web-extension/messages/bootstrap-custom-labels</value>
            </list>
        </property>
    </bean>
</beans>
```

### Share - Docker service definition

In the `docker-compose` snippet, the custom AI configuration files must be mounted in the Share container at specific locations.

```yaml
share:
    image: quay.io/alfresco/alfresco-share-ai-transformers-module:1.4.x
    environment:
      REPO_HOST: "alfresco"
      REPO_PORT: "8080"
      JAVA_OPTS: "
        -Xms500m
        -Xmx500m
        -Dalfresco.host=localhost
        -Dalfresco.port=8080
        -Dalfresco.context=alfresco
        -Dalfresco.protocol=http
        "
    volumes:
      # DOC: configuring Share -> https://docs.alfresco.com/content-services/latest/develop/share-ext-points/share-config/)
      - ./share-config-custom.xml:/usr/local/tomcat/shared/classes/alfresco/web-extension/share-config-custom-dev.xml
      - ./bootstrap-custom-labels.properties:/usr/local/tomcat/shared/classes/alfresco/web-extension/messages/bootstrap-custom-labels.properties
      - ./share-custom-slingshot-application-context.xml:/usr/local/tomcat/shared/classes/alfresco/web-extension/custom-slingshot-application-context.xml
```

### Digital Workspace

The Digital Workspace configuration for custom AI requires modification of an existing configuration file (`ai-view.extension.json`). The JSON file is included in the Intelligence Services distribution zip. This is unlike the repository and Share configuration, where only new files are created and mounted in the containers.

#### App extension

File name: `ai-view.extension.json`

Mount location and example:

```bash
./ai-view.extension.json:/usr/share/nginx/html/assets/plugins/ai-view.extension.json
```

Content:

```json
[...]
"content-metadata-presets": [
  {
    "id": "app.content.metadata.custom",
    "custom": [
      {
        "id": "ai.metadata.features",
        "title": "AI Data",
        "items": [
          {
            "id": "acme:businesses",
            "aspect": "acme:businesses",
            "properties": "*"
          },
          {
            "id": "acme:sports",
            "aspect": "acme:sports",
            "properties": "*"
          },
          {
            "id": "acme:categories",
            "aspect": "acme:categories",
            "properties": "*"
          },
          [...]
        ]
      }
    ],
    [...]
  }
]
```

The above snippet adds the aspects in the earlier [Custom AI content model configuration]({% link intelligence-services/1.4/config/comprehend.md %}#custom-ai-content-model) to the existing `"ai.metadata.features"` list of items in the `ai-view.extension.json` file.

The JSON path for the new items is `$.features.content-metadata-presets[:].custom[:].items`.

For more details on extending the features of Digital Workspace, see the Alfresco Content Application documentation: [Extending](https://alfresco-content-app.netlify.com/#/extending/){:target="_blank"}.

### Digital Workspace - Docker service definition

```yaml
  digital-workspace:
    image: quay.io/alfresco/alfresco-digital-workspace:2.8
    environment:
      BASE_PATH: ./
      APP_CONFIG_PLUGIN_AI_SERVICE: "true"
    volumes:
      - ./ai-view-extension.json:/usr/share/nginx/html/assets/plugins/ai-view-extension.json
```

In the above `docker-compose` snippet, the modified `ai-view-extension.json` configuration file must be mounted in the Digital Workspace container. The environment variable `APP_CONFIG_PLUGIN_AI_SERVICE:` when set to `true` allows the Digital Workspace to index and search by the content of the transcripted files and scanned images.
