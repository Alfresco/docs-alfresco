---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
option: standalone deployment receiver
---

# Configuring the standalone deployment receiver

This section describes how to configure the standalone deployment receiver. The configuration files needed for configuration are the deployment.properties file and the application-context.xml file.

Ensure that you have installed the standalone deployment receiver. See [Installing the standalone deployment receiver](Deployment-install.md).

1.  Locate the deployment installation directory, for example:

    -   \(Windows\) c:/Alfresco/Deployment
    -   \(Linux\) /opt/alfresco/deployment
    This directory contains deployment target definitions and plug in definitions. The spring definitions of the deployment targets are read from this directory. All files matching the pattern deployment/\*-context.xml and deployment/\*-target.xml are loaded by the deployment engine. Targets are loaded after the context files, so each target has all spring beans available when it is defined.

2.  Open the deployment.properties file.

    The deployment.properties file contains a simple configuration for the standalone deployment receiver. The file is created by the deployment project **deployer**.

3.  The file shows the following properties:

    ```
    ; Stand alone deployment receiver properties
    
    ; filesystem receiver configuration
    deployment.filesystem.datadir=/opt/alfresco/deployment/depdata
    deployment.filesystem.logdir=/opt/alfresco/deployment/deplog
    deployment.filesystem.metadatadir=/opt/alfresco/deployment/depmetadata
    deployment.filesystem.autofix=true
    deployment.filesystem.errorOnOverwrite=false
    
    ; default filesystem target configuration
    deployment.filesystem.default.metadatadir=${deployment.filesystem.metadatadir}/default
    deployment.filesystem.default.rootdir=target
    deployment.filesystem.default.name=default
    deployment.filesystem.default.user=admin
    deployment.filesystem.default.password=admin
    
    ; Deployment Engine configuration
    deployment.rmi.port=44100
    deployment.rmi.service.port=44101
    
    ; Stand alone deployment server specific properties
    deployment.user=admin
    deployment.password=admin
    ```

    The default target set in this file is a working example.

4.  Modify the properties to reflect the relevant settings for your system.

    **Note:** For Windows directory locations, the backslashes need to be escaped. For example, use C:\\\\directory1\\\\directory2. Alternatively, you can use the slash character as a separator, for example, C:/directory1/directory2.

    1.  Ensure that the following properties point to the locations for the deployment files and metadata:

        ```
        deployment.filesystem.datadir=/opt/alfresco/deployment/depdata
        deployment.filesystem.metadatadir=/opt/alfresco/deployment/depmetadata 
        ```

    2.  Modify the following properties when using the “default” target.

        ```
        deployment.filesystem.default.rootdir={deployment.filesystem.datadir}/default
        
        deployment.filesystem.default.metadatadir=${deployment.filesystem.metadatadir}/default
        
        deployment.filesystem.default.user=admin
        deployment.filesystem.default.password=admin
        ```

    3.  Add any further targets to the file. For example, for a target called "foo":

        ```
        deployment.filesystem.foo.rootdir= {deployment.filesystem.datadir}/foo
        
        deployment.filesystem.foo.metadatadir=${deployment.filesystem.metadatadir}/foo
        
        deployment.filesystem.foo.user=admin
        deployment.filesystem.foo.password=admin
        ```

    4.  Modify the following properties to specify the user who can shut down the standalone deployment server.

        ```
        deployment.user=admin
        deployment.password=admin
        ```

5.  Save your file.

6.  Restart the deployment engine.


The following is a sample application-context.xml file and it shows how the deployment.properties, context files and the targets are read.

```
<beans>
   <bean id="properties" 
   class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
     <property name="ignoreUnresolvablePlaceholders">
          <value>true</value>
     </property>
        <property name="locations">
           <list>
              <value>classpath:deployment.properties</value>
           </list>
       </property>
   </bean>
    
    <import resource="classpath*:deployment/*-context.xml" />   
    <import resource="classpath*:deployment/*-target.xml" /> 
    
</beans>
```

The standalone deployment engine uses `log4j` for problem determination, and logging for the deployment engine is placed in the `log` directory.

Your spring definitions of the deployment targets are read from this directory. All files matching the pattern deployment/\*-target.xml are loaded by the deployment engine.

Targets are loaded after the context files. So each target has all spring beans available to it when it is defined

**Parent topic:**[Standalone deployment receiver](../concepts/wcm-deployment-standalone.md)

