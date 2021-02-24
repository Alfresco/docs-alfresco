---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication]
---

# Deployment Service properties

The WCM deployment service is the client \(sending\) side of WCM deployment.

To change the deployment service, add or edit the properties in the <tomcatHome\>/shared/classes/alfresco-global.properties file.

-   **deployment.service.numberOfSendingThreads**

    Use this property when files are being deployed over a network with high latency. When you set this property, the deployment client becomes multi-threaded and sends the specified number of files at one time. The default value for this property is 5.

    To change the value of this property using spring configuration, change the value of the property in the alfresco-global.properties file. For example:

    ```
    deployment.service.numberOfSendingThreads=4
    ```

-   **deployment.service.targetLockRefreshTime**

    Use this property to specify the time that the system should wait \(in milliseconds\) before refreshing a target lock. This helps in detecting shutdown servers. For example:

    ```
    deployment.service.targetLockRefreshTime=60000
    ```



-   **deployment.service.targetLockTimeout**

    Use this property to specify the time that the system should wait \(in milliseconds\) before moving on to the next step in the deployment process, or deciding that deployment has failed. This helps in detecting unavailable destinations. Set this to a high value to manage large transfers over slow networks. For example:

    ```
    deployment.service.targetLockTimeout=3600000
    ```

-   **deployment.ReceiverTransportAdapters**

    Use this property to specify the adapters you want to use to communicate with remote File System Receivers. The Alfresco deployment service supports the configuration of multiple transport adapters to enable connection to remote deployment engines using different network protocols. An instance of Alfresco server may support many different transports but each deployment engine exposes only a single transport. Only the default transport is defined which communicates over the Java RMI protocol.

    ```
         <!--  Transport adapters to communicate with remote File System Receivers -->     
         <!--  Communicate with an FSR over RMI - Default method for Alfresco-->
         <bean id="rmiFSRAdapter" class="org.alfresco.deployment.impl.client.
                   DeploymentReceiverTransportAdapterRMI">
         </bean>
         
         <!--  communicate with an FSR over RMI with the content encrypted  -->
         <bean id="encryptedRMIFSRAdapter" class="org.alfresco.deployment.impl.client.
                  DeploymentReceiverTransportAdapterRMI">
              <property name="transformers">
                <list>
                	<ref bean="deploymentEncryptor"></ref>
                </list>
            </property>
         </bean>
    
    ```

    The following is an extract from the deployment-service-context.xml showing the configuration of two transformer adapters.

    ```
    <bean id="deploymentService" class="org.alfresco.repo.deploy.DeploymentServiceImpl">
           <property name="avmService">
               <ref bean="indexingAVMService"/>
           </property>
           
           <property name="deploymentReceiverTransportAdapters">
               <map>
                  <entry key="default">
                  		<ref bean="rmiFSRAdapter"></ref>
                  </entry>
          	       <entry key="encrypted RMI">
                  		<ref bean="encryptedRMIFSRAdapter"></ref>
                  </entry>
               </map>
           </property>
        </bean>
    
    ```

    The following is an extract from the deployment-receiver-context.xml showing the configuration of the transport adapter to support the encrypted RMI defined above.

    ```
    <!-- This is the deployment engine  -->
        <bean id="deploymentReceiverEngine" 
        	class="org.alfresco.deployment.impl.server.DeploymentReceiverEngineImpl" 
            init-method="init">
            
            <!-- How long to wait before polling housekeeping -->
            <property name="pollDelay"><value>5000</value></property>
            
            <property name="commandQueue"><ref bean="deploymentReceiverCommandQueue" /></property>
            
            <property name="readerManagement">
            	<ref bean="deploymentReaderManagement" />
            </property>
            
            <!--  The authenticator to access the deployment receiver engine (for shutdown) -->
            <property name="authenticator">
            	<bean class="org.alfresco.deployment.impl.server.
                            DeploymentReceiverAuthenticatorSimple">
            	   	<property name="user"><value>${deployment.user}</value></property>
                  	<property name="password"><value>${deployment.password}</value></property>
            	</bean>
            </property>
            
            <!-- Define your content transformers here -->
            <property name="transformers"> 
              <list>
                <ref bean="deploymentEncryptor"/>
              </list>
            </property>
            
            <!-- Define your housekeepers here -->
            <property name="housekeepers">
            	<set>
            	<ref bean="commandQueueHousekeeper"/>
            	</set>
            </property>
        </bean>
    
    ```

    Once the transport adapters have been defined, you can select the transporter from the **Edit Web Project Settings** section in Alfresco Share.


-   **deployment.service.corePoolSize**

    This property specifies the core pool size and is set to 2 by default. Do not change this property.

-   **deployment.service.maximumPoolSize**

    Use this property to specify the number of deployments you want to run in parallel. For example:

    ```
    deployment.service.maximumPoolSize=3
    ```

-   **deployment.service.threadPriority**

    Use this property to specify the priority of threads within this deployment. For example:

    ```
    deployment.service.threadPriority=5
    ```


**Parent topic:**[Deploying from AVM](../concepts/wcm-deployment-intro.md)

