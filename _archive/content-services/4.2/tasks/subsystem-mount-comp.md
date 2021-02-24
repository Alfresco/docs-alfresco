---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: subsystem mount composite properties
---

# Mounting a subsystem with composite properties

A subsystem is limited to flat property sets for its configuration, therefore it is difficult to allow structured data in this configuration. A composite property is a special property whose value is a list of beans.

-   For example, the IMAP subsystem is mounted as:

    ```
    <!-- IMAP Subsystem -->
     <bean id="imap" class="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory" 
                                                             parent="abstractPropertyBackedBean">
         <property name="autoStart">
             <value>true</value>
         </property>
         <property name="compositePropertyTypes">
             <map>
                 <entry key="imap.server.mountPoints">
                     <value>org.alfresco.repo.imap.config.ImapConfigMountPointsBean</value>
                 </entry>
             </map>
         </property>
     </bean>
    ```

    The subsystem declares a single composite property called `imap.server.mountPoints` with component type `org.alfresco.repo.imap.config.ImapConfigMountPointsBean`.

-   The configured value of this composite property is materialized in the child application context as a `ListFactoryBean`. The bean's ID should match the name of the composite property. So, for example, in the IMAP subsystem configuration:

    ```
     <!--The configurable list of mount points - actually a post-processed composite property! -->
        <bean id="imap.server.mountPoints" class="org.springframework.beans.factory.config.ListFactoryBean">
            <property name="sourceList">
                <list>
                    <!-- Anything declared in here will actually be ignored and replaced by the configured composite propery value, resolved on initialization -->
                    <bean id="Repository_virtual" class="org.alfresco.repo.imap.config.ImapConfigMountPointsBean">
                        <property name="mode">
                            <value>virtual</value>
                        </property>
                        <property name="store">
                            <value>${spaces.store}</value>
                        </property>
                        <property name="path">
                            <value>/${spaces.company_home.childname}</value>
                        </property>
                    </bean>
                    <bean id="Repository_archive" class="org.alfresco.repo.imap.config.ImapConfigMountPointsBean">
                        <property name="mode">
                            <value>archive</value>
                        </property>
                        <property name="store">
                            <value>${spaces.store}</value>
                        </property>
                        <property name="path">
                            <value>/${spaces.company_home.childname}</value>
                        </property>
                    </bean>
                </list>
            </property>
        </bean>
    ```

    Other beans in the subsystem application context can use `imap.server.mountPoints` as though it were a regular list of `ImapConfigMountPointsBeans`.


**Parent topic:**[Configuring Alfresco subsystems](../concepts/subsystem-intro.md)

