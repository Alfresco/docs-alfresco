---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Mounting a subsystem

A subsystem can be mounted, that is, its existence can be declared to the main server. To mount a subsystem, use the `ChildApplicationContextFactory` bean. This is an object that wraps the Spring application context that owns the subsystem and its beans. It initializes its application context as a child of the main Alfresco Content Services context with an appropriate `PropertyPlaceholderConfigurer` that will expand its configuration parameters.

**Note:** Any instances that you define should extend the `abstractPropertyBackedBean` definition. The identifier that you define for the bean automatically becomes the subsystem category and defines where the factory will look for configuration files, in the search paths.

1.  Open the core bootstrap-context.xml file \(the file that controls the startup of beans and their order\).

2.  Locate the following bean definition:

    ```
    <!--  Third party transformer Subsystem -->
     <bean id="thirdparty" class="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory" 
                                                                       parent="abstractPropertyBackedBean">
         <property name="autoStart">
             <value>true</value>
         </property>
     </bean>
    ```

    The `autoStart` property is set to true, meaning that the child application context will be refreshed when the server boots up, activating the beans it contains. For subsystems containing background processes or daemons \(for example, the file server subsystem\), it is very important to set this property, otherwise the subsystem will never activate.

3.  Save your file.


**Parent topic:**[Configuring subsystems](../concepts/subsystem-intro.md)

