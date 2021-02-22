---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Web Content Management, Deployment]
option: deployment target filesystem
---

# Filesystem deployment target configuration

The following example shows a target definition for the standalone deployment engine.

```
<!--
		Define and register the deployment target called "sampleTarget which
		is used for unit tests"
	-->
	<bean
		class="org.alfresco.deployment.impl.server.DeploymentTargetRegistrationBean"
		init-method="register">

		<!-- What's the name of your target? -->
		<property name="name">
			<value>sampleTarget</value>
		</property>
		
		<!--  Register with the deploymentReceiverEngine -->
		<property name="registry">
			<ref bean="deploymentReceiverEngine" />
		</property>
		
		<property name="target">
		
			<!-- This is the definition of the target - you could also add a reference to a bean which already exists -->
			<bean
				class="org.alfresco.deployment.impl.fsr.FileSystemDeploymentTarget"
				init-method="init">
				
				<!--  Where to store the deployed content -->
				<property name="rootDirectory">
					<value>sampleTarget</value>
				</property>
				
				<!--  where to store meta data for sampleTarget-->
        		<property name="metaDataDirectory">
            		<value>${deployment.filesystem.metadatadir}/sampleTarget</value>
        		</property>
				<property name="autoFix">
					<value>${deployment.filesystem.autofix}</value>
				</property>
				<property name="postCommit">
					<list>
						<bean class="org.alfresco.deployment.SampleRunnable" />
					</list>
				</property>
				<property name="fileSystemReceiverService">
					<ref bean="fileSystemReceiverService" />
				</property>
				<property name="name"><value>sampleTarget</value></property>
				<property name="authenticator">
					<bean
						class="org.alfresco.deployment.impl.server.DeploymentReceiverAuthenticatorSimple">
						<property name="user">
							<value>Giles</value>
						</property>
						<property name="password">
							<value>Watcher</value>
						</property>
					</bean>
				</property>
			</bean>
		</property>
	</bean>	

```

**Parent topic:**[Filesystem deployment target](../concepts/wcm-targets-filesystem.md)

