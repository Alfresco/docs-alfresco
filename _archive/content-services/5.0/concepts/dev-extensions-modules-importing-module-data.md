---
author: Alfresco Documentation
---

# Importing Module Data

As part of your content model and module, you can import some data that the module uses. These can be, for example, Categories, FTL scripts in the data dictionary, project template hierarchies, ACP files.

For many content models, it is useful to have some data populated when the model is loaded. This is done by bootstrapping some data. One good example is in the Records Management module.

You can import the data by using an XML file or an ACP file as part of your module's initialization.

First place your ACP or XML file somewhere in your module's classpath. Often this will be within the config folder structure. Next add the following configuration to your module-context.xml file, specifying either the XML or ACP file by its location on the classpath.

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
            <prop key="location">alfresco/module/myModule-123/myACP.acp</prop>
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

-   **[Procedure for adding bootstrapped files](../concepts/dev-extensions-modules-adding-bootstrapped-files.md)**  
Imported data can be located anywhere in the AMP structure. Bootstrap code allows you to refer to an XML file that indicates how nodes are to be added. You can add your information in one of two ways: in an XML file which points to files explicitly, or an ACP file. The ACP packages an XML file that points to the files to be included, and is easier to generate through the space export feature.
-   **[Bootstrapping categories by using XML](../concepts/dev-extensions-modules-bootstrapping-categories-xml.md)**  
Categories can be bootstrapped by using an XML file.
-   **[Bootstrapping Files/Spaces using XML](../concepts/dev-extensions-modules-bootstrapping-files-spaces-xml.md)**  
It is possible to bootstrap files and spaces by using XML files.
-   **[Import strategy](../concepts/dev-extensions-modules-import-strategy.md)**  
There are several import strategies that can be used to import module data.

**Parent topic:**[Modules \(AMPs\)](../concepts/dev-extensions-modules-intro.md)

