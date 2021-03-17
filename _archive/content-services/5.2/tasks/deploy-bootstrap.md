---
author: Alfresco Documentation
---

# Deploying a content model: bootstrap approach

The bootstrap approach to deploying a content model involves modifying repository XML configuration files to register the content model.

The content model is read, validated, and registered on start-up of the repository. A repository component called the Dictionary Bootstrap loads a specified list of content models and registers them with the repository. To register new content models, you must either modify the content model list of an existing Dictionary Bootstrap component or define a new Dictionary Bootstrap component.

1.  To define a Dictionary Bootstrap component, use the following Spring framework XML:

    ```
    <bean id="org.alfresco.tutorial.customcontentmodelrepo.dictionaryBootstrap"
          parent="dictionaryModelBootstrap"
          depends-on="dictionaryBootstrap">
        <property name="models">
            <list>
                <value>alfresco/module/${project.artifactId}/model/content-model.xml</value>
            </list>
        </property>
        <property name="labels">
            <list>
                <!-- Bootstrap Resource Bundles for the content model types, aspects, properties etc -->
                <value>alfresco/module/${project.artifactId}/messages/content-model</value>
            </list>
        </property>
    </bean>
    ```

    **Note:** The labels property can be left out if localization is not needed and only one language is supported.

2.  Add the XML snippet to an extension context XML file in the classpath, following the usual Alfresco Content Services customization conventions.

    **Note:** For a default installation, extension context XML files are placed into <installLocation\>/tomcat/shared/classes/alfresco/extension.

    The content models that Alfresco Content Services provides out of the box are all registered this way.

    Using the bootstrap approach, changes to model definitions through the content-model XML file are only registered after restarting the repository. As this can lead to long development and test cycles, use the bootstrap approach only once the model is baked. For this reason, there is an alternate dynamic approach to deploying a content model, allowing the registration and updates to content models without the need to restart the repository to pick up the changes.


**Parent topic:**[Deploying a content model](../concepts/content-model-deploy.md)

