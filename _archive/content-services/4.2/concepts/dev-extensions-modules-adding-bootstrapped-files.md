---
author: Alfresco Documentation
---

# Procedure for Adding Bootstrapped Files

Imported data can be located anywhere in the AMP structure. Bootstrap code allows you to refer to an XML file that indicates how nodes are to be added. You can add your information in one of two ways: in an XML file which points to files explicitly, or an ACP file. The ACP packages an XML file that points to the files to be included, and is easier to generate through the space export feature.

The procedure add bootstrap files is as follows:

1.  Put your webscripts into an appropriate directory in the data dictionary.
2.  Export the contents of the directory. This will create an ACP file.
3.  Download the ACP file to your desktop and copy it to one of the module directories, for example, the bootstrap directory.
4.  Create bootstrap-context.xml in context subdirectory of your module, that is config/alfresco/module/module\_id/context/
5.  In the file, add a bean for bootstrapping, and point it to the ACP file:

```

  
    <!-- Bootstrap -->
    <bean id="org_alfresco_module_bootstrapSpaces" class="org.alfresco.repo.module.ImporterModuleComponent" parent="module.baseComponent">
      <property name="moduleId" value="org.alfresco.module.yourmodule.project" />
      <property name="name" value="org.alfresco.module.yourmodule.bootstrapSpaces" />
      <property name="description" value="Initial data requirements" />
      <property name="sinceVersion" value="0.4" />
      <property name="appliesFromVersion" value="0.4" />
      
      <!-- Data properties -->
      <property name="importer" ref="spacesBootstrap"/>
      <property name="bootstrapViews">
        <list>
          <props>
            <prop key="path">/cm:categoryRoot/cm:generalclassifiable</prop>
            <prop key="location">alfresco/module/org.alfresco.module.yourmodule/bootstrap/rm_categories.xml</prop>
          </props>
          <props>
            <props>
              <prop key="path">/${spaces.company_home.childname}/${spaces.dictionary.childname}/cm:webscripts</prop>
              <prop key="location">alfresco/bootstrap/web_scripts.acp</prop>
            </props>
        </list>
      </property>
    </bean>


```

In the snippet above, web\_scripts.acp will be exploded to Web Scripts directory: since Alfresco parses XPath expressions the correct path to the Web Scripts folder is `/cm:webscripts`. It is possible to derive the correct XPath expression for any Alfresco content by using the Node Browser.

After that, you can start testing. The bootstrap happens when you start Alfresco after installing that AMP.

**Parent topic:**[Importing Module Data](../concepts/dev-extensions-modules-importing-module-data.md)

