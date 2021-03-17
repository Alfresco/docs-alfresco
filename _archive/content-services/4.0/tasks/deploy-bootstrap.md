---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: [deploy content model, deploy dictionary bootstrap]
---

# Deploying a content model - bootstrap approach

The bootstrap approach to deploying a content model involves modifying Alfresco content repository XML configuration files to register the content model.

The content model is read, validated, and registered on startup of the content repository. A repository component called the Dictionary Bootstrap loads a specified list of content models and registers them with the content repository. To register new content models, you must either modify the content model list of an existing Dictionary Bootstrap component or define a new Dictionary Bootstrap component.

1.  To define a Dictionary Bootstrap component, use the following Spring framework XML:

    ```
    <bean id="kbmodel.extension.dictionaryBootstrap" parent="dictionaryModelBootstrap"
      depends-on="dictionaryBoot strap">
      <property name="models">
        <list>
          <value>alfresco/extension/kbModel.xml</value>
        </list>
      </property>
    </bean>
    ```

2.  Add the XML snippet to an Alfresco extension context XML file in the classpath, following the usual Alfresco customization conventions.

    **Note:** For a default installation of Alfresco, extension context XML files are placed into <installLocation\>/tomcat/shared/classes/alfresco/extension.

    The content models that Alfresco provides out of the box are all registered this way.

    Using the bootstrap approach, changes to model definitions through the content-model XML file are only registered after restarting the content repository. As this can lead to long development and test cycles, use the bootstrap approach only once the model is baked. For this reason, there is an alternate dynamic approach to deploying a content model, allowing the registration and updates to content models without the need to restart the content repository to pick up the changes.


**Parent topic:**[Deploying a content model](../concepts/content-model-deploy.md)

