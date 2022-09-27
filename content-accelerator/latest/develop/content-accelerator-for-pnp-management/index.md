---
title: Configuring the Content Accelerator for Policy and Procedure Management
---

## Typical Configuration Points
While the Content Accelerator administration console provides powerful UI-based configurations, sometimes back end configurations are desired.  Typical configuration points include:

### Update the Change Request Form and Workflow
Form and workflow updates are made in the WizardAdmin application.  See the ACA Administration guide for more information.

### Extend Quality Document Type (Before ACA version 3.5)

The default Quality Document object type is the out-of-the-box available controlled document type. If you wish to add additional properties or aspects to your Policy and Procedure solution, you can extend the quality document type using the following steps.

In a custom Alfresco AMP, define your custom Alfresco object model, then do the following:

1. Extend the `aw:qualityDocument` type in your object model.

```xml
<type name="acme:document">
  <title>Sample Document Type</title>
  <parent>aw:qualityDocument</parent>
</type>
```

You can define whatever additional properties, aspects, associations etc that you wish on your custom object type.

1. You'll need to import the `aw` namespace - `<import uri="http://www.activewizard.com/model/content/1.0" prefix="aw" />` 

2. Update your dictionary import bean to depend on the `com.tsgrp.openContent.dictionaryBootstrap` bean, eg below:

```xml
<bean id="pnp-sample-extension-project.dictionaryBootstrap" parent="dictionaryModelBootstrap"
 depends-on="dictionaryBootstrap,com.tsgrp.openContent.dictionaryBootstrap">
```

For an example of the above steps fully implemented for the `acme:document` object type, see the following sample project: https://github.com/tsgrp/Alfresco-Utilities/tree/master/sample-projects/acme-pnp-extension-sample

In addition to the above steps in your custom AMP, you'll need to configure the `opencontent-override-module-context.xml` to recognize your new custom type.

3. Define the `tsgQualityDocBehaviours`, `tsgControlledDocVersionPolicies`, and `permissionsModel` beans in the `opencontent-override-module-context.xml`.

4. Add the `acme:document` object type to the `validDoctypesForTSGVersionControl` property lists for the first three beans.

5. Add the `acme:document` object type to the `permissionsModel` bean.

6. Add the `acme:document` object type to the `WizardQualityDocLifecycleApplicableTypes` bean in the `opencontent-override-config.xml`.

For the three steps above, see the below for example configuration:

```xml
<!-- Behaviour to applied to Quality Documents in order to update aspects, tsg:status, and remove minor versions upon promotion. -->
<bean id="tsgQualityDocBehaviours"	class="com.tsgrp.alfresco.behaviour.TSGQualityDocumentBehaviors"	init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap,pnp-sample-extension-project.dictionaryBootstrap">
    <property name="policyComponent" ref="policyComponent" />
    <property name="serviceRegistry" ref="ServiceRegistry" />
    <property name="behaviorFilter" ref="policyBehaviourFilter" />
    <property name="newTSGControlledDocPermissionAspect" value="{http://www.tsgrp.com/model/tsg/1.0}qualityDraft" />
    <property name="controlledDocOwnerName" value="admin" />
    <property name="namespacePrefixResolver">
        <ref bean="namespaceService" />
    </property>
    <property name="validDoctypesForTSGVersionControl">
        <list>
            <value>aw:psi</value>
            <value>aw:controlledDocument</value>
            <value>aw:qualityDocument</value>
            <value>acme:document</value>
        </list>
    </property>
</bean>

<!-- Contains the version policy and related necessary behaviors to control document versioning schema -->
<bean id="tsgControlledDocVersionPolicies"	class="com.tsgrp.alfresco.behaviour.ControlledDocumentVersionPolicy"	init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap,pnp-sample-extension-project.dictionaryBootstrap">
    <property name="policyComponent" ref="policyComponent" />
    <property name="serviceRegistry" ref="ServiceRegistry" />
    <property name="behaviorFilter" ref="policyBehaviourFilter" />
    <property name="namespacePrefixResolver">
        <ref bean="namespaceService" />
    </property>
    <property name="validDoctypesForTSGVersionControl">
        <list>
            <value>aw:psi</value>
            <value>aw:qualityDocument</value>
            <value>aw:controlledDocument</value>
            <value>acme:document</value>
        </list>
    </property>
</bean>

<util:map id="permissionsModel">
    <entry key="aw:qualityDocument" 		                    value-ref="permissions_aw_quality_document"/>
    <entry key="aw:controlledDocument"		                    value-ref="permissions_aw_controlled_document"/>
    <entry key="aw:psi" 					                    value-ref="permissions_aw_psi"/>
    <entry key="acme:document"                                  value-ref="permissions_aw_quality_document"/>
</util:map>

<bean id="WizardQualityDocLifecycleApplicableTypes" class="java.util.ArrayList" >
           <constructor-arg index="0">
               <list>
                     <value>Quality Document</value>
                     <value>aw_legacyQualityDocument</value>
                     <value>acme_document</value>
               </list>
           </constructor-arg>
</bean>
```

### Extend Quality Document Type  (ACA version 3.5 and above)

The default Quality Document object type is the out-of-the-box available controlled document type. If you wish to add additional properties or aspects to your Policy and Procedure solution, you can extend the quality document type using the following steps.

In a custom Alfresco AMP (See https://github.com/tsgrp/HPI/wiki/Extension-Content-Accelerator-(Custom-Amp) on what is expected of a custom ACA amp and how to set it up properly), define your custom Alfresco object model, then do the following:

1. Extend the `aw:qualityDocument` type in your object model.

```xml
<type name="acme:document">
  <title>Sample Document Type</title>
  <parent>aw:qualityDocument</parent>
</type>
```

You can define whatever additional properties, aspects, associations etc that you wish on your custom object type.

1. You'll need to import the `aw` namespace - `<import uri="http://www.activewizard.com/model/content/1.0" prefix="aw" />` 

2. In the custom Amps module-context, override the `com.tsgrp.openContent.dictionaryBootstrap` bean and add your custom model (https://github.com/tsgrp/HPI/wiki/Extension-Content-Accelerator-(Custom-Amp)#how-to-add-custom-alfresco-models)

Next in your custom amps opencontent-extension-override-module-ctx.xml file

3. Define the `tsgQualityDocBehaviours`, `tsgControlledDocVersionPolicies`, and `permissionsModel` beans.

4. Add the `acme:document` object type to the `validDoctypesForTSGVersionControl` property lists for the first three beans.

5. Add the `acme:document` object type to the `permissionsModel` bean.

6. Add the `acme:document` object type to the `WizardQualityDocLifecycleApplicableTypes` bean in the `opencontent-extension-override-config.xml`.

For the three steps above, see the below for example configuration:

```xml
<!-- Behaviour to applied to Quality Documents in order to update aspects, tsg:status, and remove minor versions upon promotion. -->
<bean id="tsgQualityDocBehaviours"	class="com.tsgrp.alfresco.behaviour.TSGQualityDocumentBehaviors"	init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap">
    <property name="policyComponent" ref="policyComponent" />
    <property name="serviceRegistry" ref="ServiceRegistry" />
    <property name="behaviorFilter" ref="policyBehaviourFilter" />
    <property name="newTSGControlledDocPermissionAspect" value="{http://www.tsgrp.com/model/tsg/1.0}qualityDraft" />
    <property name="controlledDocOwnerName" value="admin" />
    <property name="namespacePrefixResolver">
        <ref bean="namespaceService" />
    </property>
    <property name="validDoctypesForTSGVersionControl">
        <list>
            <value>aw:psi</value>
            <value>aw:controlledDocument</value>
            <value>aw:qualityDocument</value>
            <value>acme:document</value>
        </list>
    </property>
</bean>

<!-- Contains the version policy and related necessary behaviors to control document versioning schema -->
<bean id="tsgControlledDocVersionPolicies"	class="com.tsgrp.alfresco.behaviour.ControlledDocumentVersionPolicy"	init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap">
    <property name="policyComponent" ref="policyComponent" />
    <property name="serviceRegistry" ref="ServiceRegistry" />
    <property name="behaviorFilter" ref="policyBehaviourFilter" />
    <property name="namespacePrefixResolver">
        <ref bean="namespaceService" />
    </property>
    <property name="validDoctypesForTSGVersionControl">
        <list>
            <value>aw:psi</value>
            <value>aw:qualityDocument</value>
            <value>aw:controlledDocument</value>
            <value>acme:document</value>
        </list>
    </property>
</bean>

<util:map id="permissionsModel">
    <entry key="aw:qualityDocument" 		               value-ref="permissions_aw_quality_document"/>
    <entry key="aw:controlledDocument"		                value-ref="permissions_aw_controlled_document"/>
    <entry key="aw:psi" 					value-ref="permissions_aw_psi"/>
    <entry key="acme:document"                                  value-ref="permissions_aw_quality_document"/>
</util:map>

<bean id="WizardQualityDocLifecycleApplicableTypes" class="java.util.ArrayList" >
           <constructor-arg index="0">
               <list>
                     <value>Quality Document</value>
                     <value>aw_legacyQualityDocument</value>
                     <value>acme_document</value>
               </list>
           </constructor-arg>
</bean>
```

### Modify Default Security Settings 

The Policy and Procedure solution includes a dynamic security model that allows documents to be secured independently based on lifecycle state. To override the existing security settings, override the following beans in the `opencontent-override-module-context.xml` (or the `opencontent-extension-override-module-ctx.xml` if using ACA 3.5 and above). This example extends the above `acme:document` example of a custom object type extending the `tsg:qualityDocument` object type, so please follow those steps above first.

1. Update the `permissionsModel` bean with a new value ref for the `acme:document` type (eg `permissions_acme_document` in the below example)

```xml
<util:map id="permissionsModel">
    <entry key="aw:qualityDocument"     value-ref="permissions_aw_quality_document"/>
    <entry key="aw:controlledDocument"  value-ref="permissions_aw_controlled_document"/>
    <entry key="aw:psi"                 value-ref="permissions_aw_psi"/>
    <entry key="acme:document"          value-ref="permissions_acme_document"/>
</util:map>
```

2. Create a `permissions_acme_document` bean and update its value refs to point to new permission sets, as needed.  If we want the subtype to simply follow the exact permissions as the out of the box parent, simply set the permissions model to the existing permissions, likely `permissions_aw_quality_document` for document subtypes and `permissions_aw_psi` for subtypes.  However, if we want to make changes for our subtype, see the below example where the Superseded permissions are changed for a document subtype.

Original permission set:

```xml
<util:map id="permissions_acme_document">
    <!-- quality doc security -->
    <entry key="${wizard.lifecycle.repoNames.qualityDraftDocState}"             value-ref="controlledDocDraftPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityInReviewDocState}"          value-ref="controlledDocInReviewPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityPendingApprovalDocState}"   value-ref="controlledDocPendingApprovalPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityApprovedDocState}"          value-ref="controlledDocApprovedPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityEffectiveDocState}"         value-ref="controlledDocEffectivePermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualitySupersededDocState}"        value-ref="controlledDocSupersededPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityObsoleteDocState}"          value-ref="controlledDocObsoletePermissions" />
    <entry key="{http://www.tsgrp.com/model/openannotate/1.0}unredacted"        value-ref="unredactedPermissions" />
</util:map>
```

Updated permission set

```xml
<util:map id="permissions_acme_document">
    <!-- quality doc security -->
    <entry key="${wizard.lifecycle.repoNames.qualityDraftDocState}"             value-ref="controlledDocDraftPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityInReviewDocState}"          value-ref="controlledDocInReviewPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityPendingApprovalDocState}"   value-ref="controlledDocPendingApprovalPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityApprovedDocState}"          value-ref="controlledDocApprovedPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityEffectiveDocState}"         value-ref="controlledDocEffectivePermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualitySupersededDocState}"        value-ref="acmeCustomSupersededPermissions" />
    <entry key="${wizard.lifecycle.repoNames.qualityObsoleteDocState}"          value-ref="controlledDocObsoletePermissions" />
    <entry key="{http://www.tsgrp.com/model/openannotate/1.0}unredacted"        value-ref="unredactedPermissions" />
</util:map>
```

3. Lastly define the new custom permission. 

Original permission setting

```xml
<util:map id="controlledDocSupersededPermissions">
    <entry key="GROUP_wizard_administrators" value="controlled_doc_superseded" />
    <!-- does NOT give wizard_contributors any access -->
</util:map>
```

Customized permission setting

```xml
<util:map id="acmeCustomSupersededPermissions">
    <entry key="GROUP_wizard_administrators" value="controlled_doc_superseded" />
    <!-- does NOT give wizard_contributors any access -->
    <entry key="GROUP_acme_superseded_viewers" value="controlled_doc_superseded" />
</util:map>
```

A full reference of the permission sets granted can be found at this link: [Permission Reference](https://github.com/tsgrp/HPI/wiki/Content-Accelerator-for-Policy-and-Procedure-Management---Permission-Reference)

If you wish to define your own custom permissionSets and permissionGroups, please see this page for more information: https://docs.alfresco.com/6.2/references/dev-extension-points-permissions.html

Once a custom permissionSet is defined and enabled via your custom AMP, it can be referenced in the customized ACA permission configuration.

### Modify Only Properties
In some cases, you may only want to override some of the default properties of the pnp accelerator. You do not need an entire custom amp to do this though. Instead you can create the file `opencontent-override-placeholders.properties` at the `tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` folder and put the overridden properties in there.
Two things to note with this:
1. This file will win out on any other property files, even ones in the custom amp. For this reason, if you are using a custom amp, it is better to override the properties in the amp than this file
2. You will likely need to create the `module/com.tsgrp.opencontent/` folders in the `tomcat/shared/classes` directory