---
title: Integrations and Addons
---


# Integration with Docusign

Please note that as of May 2015, the Send to DocuSign action should work for any ECM back end.  However, we have only built an **Alfresco** job to retrieve completed documents from DocuSign and ingest them back in to the repository.

## Setup a DocuSign Account
1. If needed, create a DEV sandbox with DocuSign here: https://www.docusign.com/developer-center
  * We will want to have a separate sandbox for each of our environments.  This way, documents sent from edge2 aren't consumed by release2 (or any other environment)
1. Once you are in, setup your DocuSign account and go to Admin -> Account -> API and Keys
1. Click Add Integrator Key button to add an integrator key

## Setup OpenContent 
1. Override the applicable applicable docusign properties (see below) in a `project-placeholders.properties`, `override-placeholders.properties` or `opencontent-override-placeholders.properties` properties file as appropriate in OC for your project.  See the `hpi-edge-alf` project for an example.  Note that in most circumstances, the external overrides properties file is the correct spot.
1. Alfresco Only - Setup module-context.xml to configure the job (See below)

## Setup the Repository

### Alfresco
1. Add a folder to the repository to store DocuSign data
  * Defaults to `/hpi/docuSignData`
  * Alfresco Permissions - HPI Administrators - Coordinator, EVERYONE - Contributor
  * Eventual Dctm ACL should give HPI Administrators and admingroup DELETE access and dm_world WRITE access.

## Docusign Properties

* `docusign.username` - DocuSign user name (which should be the same as the user's email address)
* `docusign.password` - DocuSign user password, should be [encrypted with the TSGEncrypter](https://github.com/tsgrp/OpenContent/wiki/Encrypting-a-Password#obtaining-a-tsg-encrypted-password) and enclosed with the encryption indicator like: `@{theEncPassword}`
* `docusign.integratorKey` - see setup step above
* `docusign.login.url` - the login URL is defaulted to the DocuSign dev sandbox URL in `universal-defaults.properties`.  You will want to override this for production environments
* `docusign.hpi.dataPath` - The folder where DocuSign data objects should be stored.  Defaults to `/hpi/docuSignData`
* `docusign.completed.version.policy` - When a document is completed in docusign, it is versioned in the repository.  This property controls whether the version is a major or minor version.  Note that for TSG Controlled Documents, versioning is not possible.  If a controlled document is sent out for DocuSign, the PDF rendition is replaced in the repository when DocuSign completes it's process.  The object is *not* versioned in the repository.

## Module-Context Updates
In order for the Retrieve job to run in Alfresco, make the following updates to your project's `module-context.xml` or the external `opencontent-override-module-context.xml`:

### Ensure that the DocuSign retrieve job is configured
#### Alfresco 5.x ####
```xml
<!-- Retrieve Content from Docusign Job -->
<bean id="hpi-docusign-retrieve-job" class="org.alfresco.util.CronTriggerBean">
	<property name="jobDetail">
		<bean id="com.tsgrp.opencontent.alfresco.job.retrieveDocusignContentJob" class="org.springframework.scheduling.quartz.JobDetailBean">
			<property name="jobClass" value="com.tsgrp.opencontent.alfresco.job.RetrieveDocusignContentJob" />
			<property name="jobDataAsMap">
				<map>
					<entry key="serviceRegistry" value-ref="ServiceRegistry" />
					<entry key="version" value="${docusign.completed.version.policy}" />
					<entry key="docuSignUsername" value="${docusign.username}" />
					<entry key="docuSignPassword" value="${docusign.password}" />
					<entry key="integratorKey" value="${docusign.integratorKey}" />
					<entry key="docuSignLoginURL" value="${docusign.login.url}" />
					<entry key="dataPath" value="${docusign.hpi.dataPath}" />
				</map>
			</property>
		</bean>
	</property>
	<property name="scheduler" ref="schedulerFactory" />
	<!-- Run every hour -->
	<property name="cronExpression" value="0 0 * * * ?"/>
</bean>
```
#### Alfresco 6.x ####
```
<!-- Retrieve Content from Docusign Job -->
	<bean id="hpi-docusign-retrieve-trigger" class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
		<!-- Run every hour -->
		<property name="cronExpression" value="0 0 * * * ?"/>
		<property name="jobDetail">
			<bean id="com.tsgrp.opencontent.alfresco.job.retrieveDocusignContentJob"
				  class="org.springframework.scheduling.quartz.JobDetailFactoryBean">
				<property name="jobClass" value="com.tsgrp.opencontent.alfresco.job.RetrieveDocusignContentJob"/>
				<property name="jobDataAsMap">
					<map>
						<entry key="serviceRegistry" value-ref="ServiceRegistry"/>
						<entry key="version" value="${docusign.completed.version.policy}"/>
						<entry key="docuSignUsername" value="${docusign.username}"/>
						<entry key="docuSignPassword" value="${docusign.password}"/>
						<entry key="integratorKey" value="${docusign.integratorKey}"/>
						<entry key="docuSignLoginURL" value="${docusign.login.url}"/>
						<entry key="dataPath" value="${docusign.hpi.dataPath}"/>
						<entry key="folderNotesEnabled" value="${docusign.folderNotesEnabled}"/>
					</map>
				</property>
			</bean>
		</property>
	</bean>
```
### Ensure that the job is scheduled to run
Ensure that the `tsgSchedulerAccessor` bean has the docusign retrieve job configured in the `triggers` list.  Remember to make sure that the `opencontent-override-module-context` file outside the amp isn't undoing changes you make to the `module-context`

```xml
<bean id="tsgSchedulerAccessor" class="org.springframework.scheduling.quartz.SchedulerAccessorBean">
    <property name="scheduler" ref="schedulerFactory"/>
    <property name="triggers">
        <list>
            <ref bean="hpi-docusign-retrieve-trigger"/>
            <ref bean="index-queue-document-unlock-reset-trigger"/>
            <ref bean="indexer-temp-cleanup-trigger"/>
        </list>
    </property>
</bean>
```

## Run Job Immediately
Since the job is typically configured to run every hour, it's sometimes necessary to force the job to run for testing.  Navigate to the Alfresco Admin Console -> Scheduled Jobs.  Run the `com.tsgrp.opencontent.alfresco.job.retrieveDocusignContentJob`




# Configuring Controlled docs with AGS Solution

## Background: 

### Why this exists: 

* When using Controlled Docs with AGS, as soon as a doc becomes effective it should become a record. 
* If we were just to declare that effective controlled doc a record, it could no longer be able to be checked out and checked back in since records are immutable (the controlled doc version chain would essentially be dead) 
* Therefore, the controlled docs with AGS solution will actually create a copy of the controlled document when it becomes effective so that that copy can be declared an AGS record and the controlled doc itself will still be able to be checked out and checked back in

### Implications: 

* When a controlled doc becomes effective 
    * A record copy is created of that controlled doc (and a rule will run to declare that copy as a record) 
* Disposition
    * When the record copy is dispositioned, a behavior will now run and delete the associated controlled document version as the record copy is dispositioned
* superceded/obsolete
    * When a controlled doc becomes superceded or obsoleted, the record copy status will also be updated to show the change 

## Configuring the solution:

### Prerequisites:

1. You will need AGS installed in alfresco 
2. You will need a working controlled docs solutions such that documents are moved to the effective state
3. You will need 2 separate object types - 1 for your controlled doc (for example acme:controlledDoc) and 1 type that your record should be copied to (for example acme:record)

### The are 2 key pieces to configuring controlled docs with AGS 

### 1. Enable the functionality by overriding the default values for these props

* controlled.docs.with.ags=true
    * Set this to true to signify we are using the controlled docs with AGS solution
* controlled.docs.with.ags.object.type={http://www.acme.com/model/content/1.0 (http://www.evergy.com/model/content/1.0)}record
    * Set the ObjectType for the created record copy of the node
    * this is the object type that we will use when we create the copy of the controlled document 
    * It should be a different object type than the controlled document
* controlled.docs.with.ags.association={http://www.acme.com/model/content/1.0}controlledRecordCopyAssoc
    * Set the Name of the Association to associate the controlled doc to its record copy
    * This is what ties the controlled document to its record copy so we can later look up the associated document to update status or disposition 
* controlled.docs.with.ags.behaviors.to.disable={http://www.alfresco.org/model/content/1.0}content,{http://www.tsgrp.com/model/tsg/1.0}renditioned
    * Set the list of behaviors that should be disabled when running the controlled doc with AGS logic
    * We suggest setting this to at least cm:content and tsg:Rendition since these content props will be automatically copied over and we don’t want them generated from jobs on our record copy
* controlled.docs.with.ags.prefix.for.name.of.copy=REC_
    * Set the prefix we append to the name of the Record Copy of the controlled document to avoid collisions by copying with the exact same name
* controlled.docs.with.ags.associations.to.copy.over=
    * list of associations we want to copy over from the controlled document to the Record copy
* controlled.docs.with.ags.aspects.to.always.add={http://www.tsgrp.com/model/tsg/1.0}doNotAutoRender (http://www.tsgrp.com/model/tsg/1.0%7DdoNotAutoRender)
    * list of aspects to add (doesn’t need to be on controlled doc but can be)
    * Since we will copy over the rendition, add the do not autorender aspect

### 2. Setup a folder rule to declare the created copy as an AGS record 

1. Need to setup the folder Rule to actually declare our record copy as an AGS Record
    1. In the share site -> on the folder where you record copy will get created (or moved to if autofile is configured) -> under folder rules -> add rule 
        1. on create or enter 
        2. RUN WHEN - Content Type = Content (since we dont want this to run when folders are created in here) 
        3. File Record -> to unfiled Records Folder 
        4. Check Box to Run on Subfolders
2. You can also then setup another rule on the unfiled records folder in the RM site to file the record to a more specific location



# Processing Outlook MSG Files

ACA provides some out of the box components to allow the repository to process MSG files when they are added to the system.  The general goals and requirements are to:

1. Parse the MSG file for any attachments and allow the user to specify an object type and individual properties for each attachment.
1. Store any attachments in the repository and relate them back to the original email.  The email is the parent, any attachments are children (if a nested MSG file has an attachment, it is related to the top level email, not the nested MSG file).
1. Generate a PDF rendition for the uploaded MSG file.  The PDF is generated by OpenContent if configured in the bulk import action config. Otherwise, the repository is responsible for adding PDF renditions to the uploaded MSG file.
  1. Alfresco - renditioning MSG to PDF is available OOTB *if your object type has the `tsg:renditioned` aspect applied to it*.  To take advantage of Alfresco's renditioning engine, ensure you have the below settings.
    1. Bulk Upload is configured to let the repository generate the PDF rendition for MSG files.
    1. In `module-context.xml`, the bean in the code snippet below exists.
    1. In `alfresco-defaults.properties`, the below property exists:
      1. `content.transformer.complex.OcMsg2PdfTransformer.pipeline=OutlookMsg|txt|*|pdf|Pdf2swf`

**module-context.xml bean**
``` xml
<bean id="transformer.complex.OcMsg2PdfTransformer" class="org.alfresco.repo.content.transform.ComplexContentTransformer" parent="baseContentTransformer">
	<property name="transformers">
		<list>
			<ref bean="transformer.OutlookMsg"/>
			<ref bean="transformer.PdfBox.TextToPdf"/>
			<ref bean="transformer.Pdf2swf"/>
		</list>
	</property>
	<property name="intermediateMimetypes">
		<list>
			<value>text/plain</value>
			<value>application/pdf</value>
		</list>
	</property>
</bean>
```

### General Usage

When an MSG file is uploaded through Bulk Upload, the MSG file is parsed for any attachments. The attachments are displayed to the user as documents to upload; this means the user can set individual properties for each attachment, including a specific document object type. When the user is done editing properties and chooses to upload the files the attachments are created as individual repository objects with the properties specified by the user. All attachments are placed in the same folder as the email and each attachment is related to the email. A folder tag may additionally be added to each attachment (or the original email) to utilize the folder tags related objects functionality (assuming the content / object model has a folder tag property specified).

The default renditioning behavior is to allow the repository to add a PDF rendition to the uploaded MSG file(s). It's also possible to generate a PDF rendition using iText (**not recommended**).  This is configured in the Bulk Import action config in the ACA admin.

>**Note:** A current limitation of the library used to parse the MSG files is that nested MSG attachments are not available as a byte array, which means the native content is not available.  However, a PDF rendition is generated by OC for any nested MSG attachment.

 