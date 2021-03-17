---
author: Alfresco Documentation
---

# `log4j.properties` file

Each module can have its own Apache Log4j properties file.

Each module can have its own `log4j.properties` file, which is placed in the same directory as the `module.properties` file. The collection of log4j.properties files within all modules installed into the alfresco.war act collectively to augment/override the global WEB-INF/classes/log4j.properties file.

You can control the logging levels of classes within your module without having to modify the main log4j.properties file; this also allows the logging configuration of a module to be handled cleanly by the Module Management Tool.

Given that `{module.id}` denotes the value of `module.id` set in `module.properties`, your `log4j.properties` file should be put in the following position within the source code directory structure of your module:

```
config/alfresco/module/{module.id}/log4j.properties
```

At deployment time, this file will be copied to:

```
WEB-INF/classes/alfresco/module/{module.id}/log4j.properties
```

For example, if `module.id=sample`, then in the module's source tree you'll have:

```
config/alfresco/module/sample/log4j.properties
```

On the servlet container, your module's `log4j.properties` file will be deployed to:

```
WEB-INF/classes/alfresco/module/sample/log4j.properties
```

If you wish to configure Log4j properties in the extensions that aren't packaged as AMP modules, you can create log4j.properties file of the form: \{name\}-log4j.properties and place it within the alfresco/extension directory on the server's classpath. These properties override the module log4.properties files. For example:

```

      WEB-INF/classes/alfresco/extension/SIMPLE_EXAMPLE-log4j.properties

```

Finally, developers might also wish to maintain a `dev-log4j.properties` file outside of the webapp. This allows for changing Log4j settings without touching the "shipping product", or any of a customer's local settings. Your optional `dev-log4j.properties` file should be in the alfresco/extension directory within the server's classpath, and outside the webapp itself \(so you don't accidentally delete it\). The `dev-log4j.properties` file augments/overrides all others. For example:

```

      $TOMCAT_HOME/shared/classes/alfresco/extension/dev-log4j.properties

```

**Best Log4j Configuration Practices**

Local customizations/licenses are kept outside of the webapp. For example:

```

      $TOMCAT_HOME/shared/classes/alfresco/extension/...-log4j.properties

```

Shipping config files should be located within the webapp. For example:

```
      
      WEB-INF/classes/alfresco/extension/...-log4j.properties

```

A `dev-log4j.properties` file should never be used in an ongoing during production, nor packaged as a part of any product.

**Advanced log4j.properties Configuration**

In the unlikely event that you need to configure the set directories Alfresco Content Services uses to find module-specific log4j.properties files, look at WEB-INF/classes/alfresco/core-services-context.xml and find a bean definition fragment that looks something like:

```

  
      <property name="overriding_log4j_properties">
        <list>
          <!-- NOTE: value entries are listed from lowest precedence to highest.  -->
          
          <!--  Installed  AMP modules  -->
          <value>classpath*:alfresco/module/*/log4j.properties</value>
          
          <!--  Other installed extensions  -->
          <value>classpath*:alfresco/extension/*-log4j.properties</value>
          
          <!--  private developer overrides -->
          <value>classpath*:alfresco/extension/dev-log4j.properties</value>
        </list>
      </property>


```

You can add additional path expressions here; for more information on the `classpath*:` notation used here, see Spring's `PathMatchingResourcePatternResolver` documentation. Generally this file will not need to be changed.

**Parent topic:**[Alfresco Module Package \(AMP\)](../concepts/dev-extensions-packaging-techniques-amps.md)

