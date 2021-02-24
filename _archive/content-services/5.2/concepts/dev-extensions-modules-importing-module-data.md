---
author: Alfresco Documentation
---

# Importing Module Data

As part of your content model and module, you can import some data that the module uses. These can be, for example, Categories, FTL scripts in the data dictionary, project template hierarchies, ACP files.

For many content models, it is useful to have some data populated when the model is loaded. This is done by bootstrapping some data. One good example is in the Records Management module.

You can import the data by using an XML file or an ACP file as part of your module's initialization.

First place your ACP or XML file somewhere in your module's classpath. Often this will be within the aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/bootstrap folder structure. Next add the following configuration to your aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/context/bootstrap-context.xml file, specifying either the XML or ACP file by its location on the classpath.

```

  
    <bean id="myModule.bootstrap" 
      class="org.alfresco.repo.module.ImporterModuleComponent" 
      parent="module.baseComponent">
      
      <!-- Module Details -->
      <property name="moduleId" value="myModule" />
      <property name="name" value="myModuleBootstrap" />
      <property name="description" value="My Modules initial data requirements" />
      <property name="sinceVersion" value="1.0" />
      <property name="appliesFromVersion" value="1.0" />
      
      <!-- Data properties -->
      <property name="importer" ref="spacesBootstrap"/>
      <property name="bootstrapViews">
        <list>
          <props>
            <prop key="path">/${spaces.company_home.childname}</prop>
            <prop key="location">alfresco/module/aio-platform-jar/bootstrap/myACP.acp</prop>
          </props>
        </list>
      </property>
      
    </bean>


```

Key property values are shown in the following table:

|Property Name|Description|
|-------------|-----------|
|moduleId|The ID of the module that this import component relates to.|
|name|The name of the import component.|
|description|A description of the import component.|
|sinceVersion|The version of the module this import component was introduced.|
|appliesFromVersion|The version of the module from which this import component applies from.|
|importer|The importer to use when importing the data|
|bootstrapViews|A list of the ACP or XML files to be imported and the location in the destination repository where the data should be imported.|

See also [Module Import strategy](dev-extensions-modules-import-strategy.md).

**Parent topic:**[Bootstrap content](../references/dev-extension-points-bootstrap.md)

