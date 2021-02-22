---
author: Alfresco Documentation
---

# Content Model - Configuring the User Interface

To make custom content models available in the Share User Interface some configuration is needed in XML. Localization of metadata and search forms can also be part of this configuration.

|Information|Content Model - Configuring the User Interface|
|-----------|----------------------------------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Now when we have read the [Content Model Introduction](dev-extension-points-content-model.md) and have defined and deployed a content model, it is time to configure the Share UI for it. For more information about how to define and deploy a content model, have a look at this [section](dev-extension-points-content-model-define-and-deploy.md).

 Here we assume that we are working with the ACME content model that was defined and deployed in this [section](dev-extension-points-content-model-define-and-deploy.md). What was left out then was configuration of the Share UI so it can display information related to the custom ACME content model. The Contract document that was created with a piece of Java code would for example not be displayed in the Share UI as anything else then a standard generic document. We would not be able to see that it is actually an ACME Contract document. Also, there would not be any way of searching specifically for ACME Contract documents from the UI, such as from the Advanced Search page.

 To make the new custom content model known to the Share UI we have to do some additional configuration in share-config-custom.xml. If we want to see Contract document information as follows:

 ![](../images/dev-extensions-repo-content-model-contract-displayform.png)

 Then we would have to configure a view form as follows:

 ```
<config evaluator="node-type" condition="acme:contract">
  <forms>
      <!-- Default form configuration -->
      <form>
          <field-visibility>
              <show id="cm:name" />
              <show id="cm:title" force="true" />
              <show id="cm:description" force="true" />
              <show id="mimetype" />
              <show id="cm:author" force="true" />
              <show id="size" for-mode="view" />
              <show id="cm:creator" for-mode="view" />
              <show id="cm:created" for-mode="view" />
              <show id="cm:modifier" for-mode="view" />
              <show id="cm:modified" for-mode="view" />

              <!-- tags and categories -->
              <show id="cm:taggable" for-mode="edit" force="true" />
              <show id="cm:categories" />

              <!-- cm:dublincore aspect -->
              <show id="cm:publisher"/>
              <show id="cm:contributor"/>
              <show id="cm:type"/>
              <show id="cm:identifier"/>
              <show id="cm:dcsource"/>
              <show id="cm:coverage"/>
              <show id="cm:rights"/>
              <show id="cm:subject"/>

              <!-- cm:complianceable aspect -->
              <show id="cm:removeAfter" />

              <!-- cm:effectivity aspect -->
              <show id="cm:from"/>
              <show id="cm:to"/>

              <!--  cm:summarizable aspect -->
              <show id="cm:summary" />

              <!-- cm:translatable aspect -->
              <show id="cm:translations" />

              <!-- cm:localizable aspect -->
              <show id="cm:locale" />

              <!-- cm:ownable aspect -->
              <show id="cm:owner" />

              <!-- cm:attachable aspect -->
              <show id="cm:attachments" />

              <!-- cm:emailed aspect -->
              <show id="cm:originator" />
              <show id="cm:addressee" />
              <show id="cm:addressees" />
              <show id="cm:sentdate" />
              <show id="cm:subjectline" />

              <!-- exif:exif aspect -->
              <show id="exif:dateTimeOriginal" />
              <show id="exif:pixelXDimension" />
              <show id="exif:pixelYDimension" />
              <show id="exif:exposureTime" />
              <show id="exif:fNumber" />
              <show id="exif:flash" />
              <show id="exif:focalLength" />
              <show id="exif:isoSpeedRatings" />
              <show id="exif:manufacturer" />
              <show id="exif:model" />
              <show id="exif:software" />
              <show id="exif:orientation" />
              <show id="exif:xResolution" />
              <show id="exif:yResolution" />
              <show id="exif:resolutionUnit" />

              <!-- audio:audio aspect -->
              <show id="audio:album" />
              <show id="audio:artist" />
              <show id="audio:composer" />
              <show id="audio:engineer" />
              <show id="audio:genre" />
              <show id="audio:trackNumber" />
              <show id="audio:releaseDate" />
              <show id="audio:sampleRate" />
              <show id="audio:sampleType" />
              <show id="audio:channelType" />
              <show id="audio:compressor" />

              <!-- cm:indexControl aspect -->
              <show id="cm:isIndexed" />
              <show id="cm:isContentIndexed" />

              <!-- cm:geographic aspect -->
              <show id="cm:latitude" />
              <show id="cm:longitude" />

              <!-- surf:widget aspect -->
              <show id="surf:widgetType"/>
              <show id="surf:mid"/>
              <show id="surf:label"/>

**             <show id="acme:documentId" force="true"/\>
              <show id="acme:securityClassification" /\>
              <show id="acme:contractName" /\>
              <show id="acme:contractId" /\>**
          </field-visibility>
          <appearance>
              <field id="cm:name">
                  <control>
                      <control-param name="maxLength">255</control-param>
                  </control>
              </field>
              <field id="cm:title">
                  <control template="/org/alfresco/components/form/controls/textfield.ftl" />
              </field>
              <field id="cm:description">
                  <control>
                      <control-param name="activateLinks">true</control-param>
                  </control>
              </field>
              <field id="mimetype">
                  <control template="/org/alfresco/components/form/controls/mimetype.ftl" />
              </field>
              <field id="size">
                  <control template="/org/alfresco/components/form/controls/size.ftl" />
              </field>
              <field id="cm:taggable">
                  <control>
                      <control-param name="compactMode">true</control-param>
                      <control-param name="params">aspect=cm:taggable</control-param>
                      <control-param name="createNewItemUri">/api/tag/workspace/SpacesStore</control-param>
                      <control-param name="createNewItemIcon">tag</control-param>
                  </control>
              </field>
              <field id="cm:categories">
                  <control>
                      <control-param name="compactMode">true</control-param>
                  </control>
              </field>
              <field id="cm:originator" read-only="true" />
              <field id="cm:addressee" read-only="true" />
              <field id="cm:addressees" read-only="true" />
              <field id="cm:sentdate" read-only="true" />
              <field id="cm:subjectline" read-only="true" />

             **<set id="acmeDocSet" appearance="bordered-panel" label-id="form.set.label.acme.document"/\>
              <field id="acme:documentId"  label-id="form.field.label.acme.documentId" set="acmeDocSet"\>
                  <control template="/org/alfresco/components/form/controls/textfield.ftl"/\>
              </field\>
              <field id="acme:securityClassification" label-id="form.field.label.acme.securityClassification" set="acmeDocSet"/\>

              <set id="contractDocSet" appearance="bordered-panel" label-id="form.set.label.acme.contract"/\>
              <field id="acme:contractName"  label-id="form.field.label.acme.contractName" set="contractDocSet"/\>
              <field id="acme:contractId" label-id="form.field.label.acme.contractId" set="contractDocSet"/\>**
          </appearance>
      </form>
  </forms>
</config>
```

 This is a copy of the view and edit form for the standard generic `cm:content` file type, with the additional ACME content model properties organized into two groups at the end. Note though that configuring this form does not actually help out in being able to change the type for a file in the Repository to one of the custom ACME types.

 To change the type of a file from the Share UI you need to do some more configuration to make the custom ACME types and aspects known:

 ```
<config evaluator="string-compare" condition="DocumentLibrary">
  <aspects>
      <visible>
          <aspect name="acme:webPublished"/>
          <aspect name="acme:securityClassified"/>
          <aspect name="acme:projectIdentifier"/>
      </visible>
      <addable> <!-- defaults to visible config -->
      </addable>
      <removeable> <!-- defaults to visible config -->
      </removeable>
  </aspects>
  <types>
      <type name="cm:folder">
          <subtype name="acme:project"/>
      </type>
      <!-- First define the ACME base doc type as decedent from cm:content -->
      <type name="cm:content">
          <subtype name="acme:document"/>
      </type>
      <!-- Then the ACME sub-types -->
      <type name="acme:document">
          <subtype name="acme:contract"/>
          <subtype name="acme:policy"/>
          <subtype name="acme:whitePaper"/>
      </type>
  </types>
</config>
```

 This configuration makes the custom ACME types and aspects visible in the "Change Type" and "Manage Aspects" user interface actions. Note that when you change type for a content file you will have to do it in steps, you can not change a file with type `cm:content` directly to `acme:contract`, you have to first change type to `acme:document`, and then to `acme:contract`.

 Now, if you wanted to be able to search for files with the ACME Contract type applied and do this directly from the Advanced Search form, such as in the following picture:

 ![](../images/dev-extensions-repo-content-model-contract-searchform.png)

 Then you would have to add additional configuration as follows:

 ```
<config evaluator="string-compare" condition="AdvancedSearch" replace="true">
     <advanced-search>
         <forms>
            ** <form labelId="form.label.advancedsearch.acmeContract"
                   descriptionId="form.description.advancedsearch.acmeContract"\>acme:contract
             </form\>**
         </forms>
     </advanced-search>
 </config>

 <config evaluator="model-type" condition="acme:contract">
        <forms>
            <form id="search">
                <field-visibility>
                    <show id="cm:name" />
                    <show id="cm:title" force="true" />
                    <show id="cm:description" force="true" />
                    <show id="mimetype" />
                    <show id="cm:modified" />
                    <show id="cm:modifier" />

                   ** <show id="acme:documentId" force="true"/\>
                    <show id="acme:securityClassification" /\>
                    <show id="acme:contractName" /\>
                    <show id="acme:contractId" /\>**
                </field-visibility>
                <appearance>
                    <field id="mimetype">
                        <control template="/org/alfresco/components/form/controls/mimetype.ftl" />
                    </field>
                    <field id="cm:modifier">
                        <control>
                            <control-param name="forceEditable">true</control-param>
                        </control>
                    </field>
                    <field id="cm:modified">
                        <control template="/org/alfresco/components/form/controls/daterange.ftl" />
                    </field>

                **    <set id="acmeDocSet" appearance="bordered-panel" label-id="form.set.label.acme.document"/\>
                    <field id="acme:documentId"  label-id="form.field.label.acme.documentId" set="acmeDocSet"\>
                        <control template="/org/alfresco/components/form/controls/textfield.ftl"/\>
                    </field\>
                    <field id="acme:securityClassification" label-id="form.field.label.acme.securityClassification" set="acmeDocSet"/\>

                    <set id="contractDocSet" appearance="bordered-panel" label-id="form.set.label.acme.contract"/\>
                    <field id="acme:contractName"  label-id="form.field.label.acme.contractName" set="contractDocSet"/\>
                    <field id="acme:contractId" label-id="form.field.label.acme.contractId" set="contractDocSet"/\>
                </appearance\>**
            </form>
        </forms>
    </config>
```

 Here you are configuring the `acme:contract` type to be available in the Advanced Search page and you also configure the search form that should be used.

 All the UI labels in the forms and search view have labels defined in localization property files. The above sample form labels are defined as follows:

 ```
# Labels for custom types and aspects
# Used in "Manage Aspects" and "Change Type" dialogs
#
type.acme_document=ACME Document
type.acme_contract=ACME Contract
type.acme_policy=ACME Policy
type.acme_whitePaper=ACME White Paper
type.acme_project=ACME Project
aspect.acme_webPublished=Web Published
aspect.acme_securityClassified=Security Classified
aspect.acme_projectIdentifier=Project Identification

# View,Edit,Search,Create Form labels for types and aspects
#
form.set.label.acme.document= ACME Document Information
form.field.label.acme.documentId=ACME Document Id
form.field.label.acme.securityClassification=Security Classification
form.set.label.acme.contract=Contract Information
form.field.label.acme.contractName=Contract Name
form.field.label.acme.contractId=Contract Id
form.set.label.acme.project=ACME Project
form.field.label.acme.projectName=Project Name
form.field.label.acme.projectNumber=Project Number
form.field.label.acme.projectDescription=Project Description
form.field.label.acme.projectStartDate=Project Start Date
form.field.label.acme.projectMembers=Project Members
form.set.label.acme.webPublished=Web Publishing Info
form.field.label.acme.publishedDate=Published Date
form.set.label.acme.projectIdentifier=Project Identifier

# Advanced Search Form labels (only for types)
#
form.label.advancedsearch.acmeContract=ACME Contracts
form.description.advancedsearch.acmeContract=Search for any ACME Documents

```

|
|Deployment - App Server|-   Content Model Definition: tomcat/shared/classes/alfresco/extension/myContentModel.xml \(File name can be anything you like as long as you refer to it in the Spring context file\)
-   Content Model Bootstrap: tomcat/shared/classes/alfresco/extension/my-content-model-context.xml \(File name has to end in -context.xml to be picked up as Spring Bean context file\)
-   Share UI configuration: tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml

 These file locations are untouched by re-deployments and upgrades.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).

|-   Share UI Configuration: aio/share-jar/src/main/resources/META-INF/share-config-custom.xml
-   Share UI Localization: aio/share-jar/src/main/resources/alfresco/web-extension/messages/share-jar.properties
-   Share UI Localization Deployment \(Bootstrap\) : aio/share-jar/src/main/resources/alfresco/web-extension/share-jar-slingshot-application-context.xml

 **Note**. To define and deploy a content model with full UI support requires both a Repo JAR and a Share JAR project.|
|More Information|-   [Displaying types](../tasks/forms-type-display.md) - more information about how to display type properties
-   [Displaying aspects](../tasks/forms-aspect-display.md) - more information about how to display aspect properties
-   [Grouping fields in forms](../tasks/forms-grouping-fields.md)

|
|Sample Code|-   [A complete ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-repo)
-   [Share UI configuration for the ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-share)
-   [Example of how to test your custom content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/blob/alfresco-51/all-in-one/integration-test-runner/src/test/groovy/org/alfresco/tutorials/testSpecs/context/CustomContentModelTestSpec.groovy)
-   [Data List content model implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-repo)

|
|Tutorials|-   [Jeff Potts Alfresco Developer Series: Working With Custom Content Types in Alfresco](http://ecmarchitect.com/alfresco-developer-series-tutorials/content/tutorial/tutorial.html) - a very thorough walk-through of how to develop custom Content Models, a must read.

|

**Parent topic:**[Content Model](../references/dev-extension-points-content-model.md)

