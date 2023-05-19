---
title: Content Accelerator for Policy and Procedure Management
---

## Typical PnP Backend Configuration Points

While the Content Accelerator administration console provides powerful UI-based configurations, sometimes back end configurations are desired.  Typical configuration points include:

### Update the Change Request Form and Workflow

Form and workflow updates are made in the WizardAdmin application.  See the [Admin Guide]({% link content-accelerator/3.5/configure/admin-guide.md %}#activewizard) for more information.

### Extend Quality Document Type

#### Extend Quality Document Type (Before ACA version 3.5)

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

In addition to the above steps in your custom AMP, you'll need to configure the `opencontent-override-module-context.xml` to recognize your new custom type.

1. Define the `tsgQualityDocBehaviours`, `tsgControlledDocVersionPolicies`, and `permissionsModel` beans in the `opencontent-override-module-context.xml`.

1. Add the `acme:document` object type to the `validDoctypesForTSGVersionControl` property lists for the first three beans.

1. Add the `acme:document` object type to the `permissionsModel` bean.

1. Add the `acme:document` object type to the `WizardQualityDocLifecycleApplicableTypes` bean in the `opencontent-override-config.xml`.

For the three steps above, see the below for example configuration:

```xml
<!-- Behaviour to applied to Quality Documents in order to update aspects, tsg:status, and remove minor versions upon promotion. -->
<bean id="tsgQualityDocBehaviours" class="com.tsgrp.alfresco.behaviour.TSGQualityDocumentBehaviors" init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap,pnp-sample-extension-project.dictionaryBootstrap">
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
<bean id="tsgControlledDocVersionPolicies" class="com.tsgrp.alfresco.behaviour.ControlledDocumentVersionPolicy" init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap,pnp-sample-extension-project.dictionaryBootstrap">
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
    <entry key="aw:qualityDocument"                             value-ref="permissions_aw_quality_document"/>
    <entry key="aw:controlledDocument"                          value-ref="permissions_aw_controlled_document"/>
    <entry key="aw:psi"                                         value-ref="permissions_aw_psi"/>
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

#### Extend Quality Document Type  (ACA version 3.5 and above)

The default Quality Document object type is the out-of-the-box available controlled document type. If you wish to add additional properties or aspects to your Policy and Procedure solution, you can extend the quality document type using the following steps.

In a [custom Alfresco AMP]({% link content-accelerator/3.5/develop/extension-content-accelerator.md %}) (see what is expected of a custom ACA amp and how to set it up properly), define your custom Alfresco object model, then do the following:

1. Extend the `aw:qualityDocument` type in your object model.

```xml
<type name="acme:document">
  <title>Sample Document Type</title>
  <parent>aw:qualityDocument</parent>
</type>
```

You can define whatever additional properties, aspects, associations etc that you wish on your custom object type.

1. You'll need to import the `aw` namespace - `<import uri="http://www.activewizard.com/model/content/1.0" prefix="aw" />`

1. In the custom Amps module-context, override the `com.tsgrp.openContent.dictionaryBootstrap` bean and add your custom model [here]({% link content-accelerator/3.5/develop/extension-content-accelerator.md %})

Next in your custom amps opencontent-extension-override-module-ctx.xml file

1. Define the `tsgQualityDocBehaviours`, `tsgControlledDocVersionPolicies`, and `permissionsModel` beans.

1. Add the `acme:document` object type to the `validDoctypesForTSGVersionControl` property lists for the first three beans.

1. Add the `acme:document` object type to the `permissionsModel` bean.

1. Add the `acme:document` object type to the `WizardQualityDocLifecycleApplicableTypes` bean in the `opencontent-extension-override-config.xml`.

For the three steps above, see the below for example configuration:

```xml
<!-- Behaviour to applied to Quality Documents in order to update aspects, tsg:status, and remove minor versions upon promotion. -->
<bean id="tsgQualityDocBehaviours" class="com.tsgrp.alfresco.behaviour.TSGQualityDocumentBehaviors" init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap">
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
<bean id="tsgControlledDocVersionPolicies" class="com.tsgrp.alfresco.behaviour.ControlledDocumentVersionPolicy" init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap">
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
    <entry key="aw:qualityDocument"                         value-ref="permissions_aw_quality_document"/>
    <entry key="aw:controlledDocument"                      value-ref="permissions_aw_controlled_document"/>
    <entry key="aw:psi"                                     value-ref="permissions_aw_psi"/>
    <entry key="acme:document"                              value-ref="permissions_aw_quality_document"/>
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

### Extend AW PSI Type

The default Page Set Instance object type is the out-of-the-box available type for documents created via wizard form. If you wish to add additional properties or aspects to the ootb PSI for the Policy and Procedure solution, you can extend the aw:psi type using the following steps.

In a custom Alfresco AMP ( [See]({% link content-accelerator/3.5/develop/extension-content-accelerator.md %}) on what is expected of a custom ACA amp and how to set it up properly), setup a custom Alfresco object model, then do the following:

1. Extend the `aw:psi` type in your object model. Example:

    ```xml
    <type name="hy:psi">
    <title>Sample Page Set Instance Type</title>
    <parent>aw:psi</parent>
    </type>
    ```

    You can define whatever additional properties, aspects, associations etc that you wish on your custom object type.

    You'll need to import the `aw` namespace - `<import uri="http://www.activewizard.com/model/content/1.0" prefix="aw" />`

2. In your custom amps `opencontent-extension-override-module-ctx.xml`, define the `tsgQualityDocBehaviours` and `tsgControlledDocVersionPolicies` beans and add your custom object type to the `validDoctypesForTSGVersionControl` property list for each bean. Example:

    ```xml
    <!-- Behaviour to applied to Quality Documents in order to update aspects, tsg:status, and remove minor versions upon promotion. -->
    <bean id="tsgQualityDocBehaviours" class="com.tsgrp.alfresco.behaviour.TSGQualityDocumentBehaviors" init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap">
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
                <value>hy:psi</value>
            </list>
        </property>
    </bean>

    <!-- Contains the version policy and related necessary behaviors to control document versioning schema -->
    <bean id="tsgControlledDocVersionPolicies" class="com.tsgrp.alfresco.behaviour.ControlledDocumentVersionPolicy" init-method="init" depends-on="com.tsgrp.openContent.dictionaryBootstrap">
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
                <value>hy:psi</value>
            </list>
        </property>
    </bean>
    
    ```

3. In your custom amps `opencontent-extension-override-module-ctx.xml`, define the `permissionsModel` bean and add your custom type to the bean. Example:

    ```xml
    <util:map id="permissionsModel">
        <entry key="aw:qualityDocument"                         value-ref="permissions_aw_quality_document"/>
        <entry key="aw:controlledDocument"                      value-ref="permissions_aw_controlled_document"/>
        <entry key="aw:psi"                                     value-ref="permissions_aw_psi"/>
        <entry key="hy:psi"                              value-ref="permissions_aw_quality_document"/>
    </util:map>

    ```

4. In the `opencontent-extension-override-config.xml` add your custom type to the `WizardFormLifecycleApplicableTypes` list bean. Example:

    ```xml
    <!-- Override this bean to enable different types to be subject to the WizardFormLifecycle. -->
    <bean id="WizardFormLifecycleApplicableTypes" class="java.util.ArrayList" >
        <constructor-arg index="0">
            <list>
            <value>Page Set Instance</value>
            <value>simple_cr</value>
            <value>hy_psi</value>
            </list>
        </constructor-arg>
    </bean>

    ```

5. Once the updates to the custom amp have been deployed, you can now add your custom type to the Object Type Config in the ACA admin. Locate the Object Type Config in the ACA Admin interface, click **Add Type**, and select your new object type from the list (ex: `hy_psi`). Once selected, change the `container` to `Wizard`. Save the config.

6. You can now use this type as the Instance type for a wizard form. Login to the Wizard Admin interface. Create a new form. You will be prompted for an Instance Type. Select your new type.

You can find additional information on [configuring Active Wizard forms]({% link content-accelerator/3.5/configure/activewizard.md %})

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

A full reference of the permission sets granted is listed here:

`ocPermissionDefinitions.xml`

```xml
<permissions>

    <!-- Namespaces used in type references -->

    <namespaces>
        <namespace uri="http://www.alfresco.org/model/system/1.0" prefix="sys"/>
        <namespace uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
        <namespace uri="http://www.alfresco.org/model/wcmmodel/1.0" prefix="wcm"/>
        <namespace uri="http://www.alfresco.org/model/wcmappmodel/1.0" prefix="wca"/>
        <namespace uri="http://www.activewizard.com/model/content/1.0" prefix="aw" />
        <namespace uri="http://www.tsgrp.com/model/openannotate/1.0" prefix="oa" />

    </namespaces>

    <!-- aw:doc permissions for forms and other aw docs -->
    <permissionSet type="aw:doc" expose="selected">

        <permissionGroup name="wizard_form_draft" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
        <permissionGroup name="wizard_form_in_review" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
        <permissionGroup name="wizard_form_in_review_edit" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>

        <permissionGroup name="wizard_form_pending_approval" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
        </permissionGroup>
        
        <permissionGroup name="wizard_form_pending_approval_edit" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
        <permissionGroup name="wizard_form_approved" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
        </permissionGroup>
        
        <permissionGroup name="wizard_form_closed" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
        </permissionGroup>
        
        <permissionGroup name="wizard_form_cancelled" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
        </permissionGroup>
        
        <permissionGroup name="wizard_form_cancelled_relate" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
        </permissionGroup>
    </permissionSet>

    <!-- permissions for controlled docs in the system -->
    <permissionSet type="cm:content" expose="selected">
        <permissionGroup name="controlled_doc_draft" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_draft_readonly" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
        </permissionGroup>

        <permissionGroup name="controlled_doc_draft_delete" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="sys:base" permissionGroup="Delete" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_in_review" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_in_review_edit" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_pending_approval" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_pending_approval_edit" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_approved" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_approved_edit" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_effective" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_effective_edit" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
        <permissionGroup name="controlled_doc_superseded" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
        </permissionGroup>

        <!-- For clients who want to expose superseded documents for property edit.  
                Note that actually versioning a superseded document _will fail_.  Care must be made
                in the calling application to only allow property edit, not document editing.  -->
        <permissionGroup name="controlled_doc_superseded_edit" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
        </permissionGroup>

        <permissionGroup name="controlled_doc_obsolete" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
        </permissionGroup>

    </permissionSet>

    <!-- oa:unredacted permissions for the original versions of redacted content -->
    <permissionSet type="oa:unredacted" expose="selected">

        <permissionGroup name="redaction_admin" expose="false">
            <includePermissionGroup type="sys:base" permissionGroup="Read"/>
            <includePermissionGroup type="sys:base" permissionGroup="Write"/>
            <includePermissionGroup type="sys:base" permissionGroup="AddChildren" />
            <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CheckIn" />
            <includePermissionGroup type="cm:workingcopy" permissionGroup="CancelCheckOut" />
        </permissionGroup>
        
    </permissionSet>

</permissions>
```

```xml
<util:map id="permissionsModel">
    <entry key="aw:qualityDocument"     value-ref="permissions_aw_quality_document"/>
    <entry key="aw:controlledDocument"  value-ref="permissions_aw_controlled_document"/>
    <entry key="aw:psi"                 value-ref="permissions_aw_psi"/>
</util:map>

<util:map id="permissions_aw_quality_document">
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

<util:map id="permissions_aw_controlled_document">
    <!-- controlled doc security -->
    <entry key="${wizard.lifecycle.repoNames.draftControlledDocState}"           value-ref="controlledDocDraftPermissions" />
    <entry key="${wizard.lifecycle.repoNames.inReviewControlledDocState}"        value-ref="controlledDocInReviewPermissions" />
    <entry key="${wizard.lifecycle.repoNames.pendingApprovalControlledDocState}" value-ref="controlledDocPendingApprovalPermissions" />
    <entry key="${wizard.lifecycle.repoNames.approvedControlledDocState}"        value-ref="controlledDocApprovedPermissions" />
    <entry key="${wizard.lifecycle.repoNames.effectiveControlledDocState}"       value-ref="controlledDocEffectivePermissions" />
    <entry key="${wizard.lifecycle.repoNames.supersededControlledDocState}"      value-ref="controlledDocSupersededPermissions" />
    <entry key="${wizard.lifecycle.repoNames.obsoleteControlledDocState}"        value-ref="controlledDocObsoletePermissions" />
    <!-- redaction security -->
    <entry key="{http://www.tsgrp.com/model/openannotate/1.0}unredacted"         value-ref="unredactedPermissions" />
</util:map>

<util:map id="permissions_aw_psi">
    <!-- form security -->
    <entry key="${wizard.lifecycle.repoNames.draftFormState}"               value-ref="wizardFormDraftPermissions" />
    <entry key="${wizard.lifecycle.repoNames.inReviewFormState}"            value-ref="wizardFormInReviewPermissions" />
    <entry key="${wizard.lifecycle.repoNames.pendingApprovalFormState}"     value-ref="wizardFormPendingApprovalPermissions" />
    <entry key="${wizard.lifecycle.repoNames.approvedFormState}"            value-ref="wizardFormApprovedPermissions" />
    <entry key="${wizard.lifecycle.repoNames.closedFormState}"              value-ref="wizardFormClosedPermissions" />
    <entry key="${wizard.lifecycle.repoNames.cancelledFormState}"           value-ref="wizardFormCancelledPermissions" />
    <!-- redaction security -->
    <entry key="{http://www.tsgrp.com/model/openannotate/1.0}unredacted"    value-ref="unredactedPermissions" />
</util:map>

<!-- individual FORM draft, inReview, pendingApproval, approved, and closed permissions maps keyed by the group name -->
<util:map id="wizardFormDraftPermissions">
    <entry key="GROUP_wizard_contributors" value="wizard_form_draft" />
</util:map>
<util:map id="wizardFormInReviewPermissions">
    <entry key="GROUP_wizard_contributors" value="wizard_form_in_review" />
</util:map>
<util:map id="wizardFormPendingApprovalPermissions">
    <entry key="GROUP_wizard_contributors" value="wizard_form_pending_approval" />
</util:map>
<util:map id="wizardFormApprovedPermissions">
    <entry key="GROUP_wizard_contributors" value="wizard_form_approved" />
    <!--  All users should be able to view approved forms. -->
    <entry key="GROUP_EVERYONE" value="wizard_form_approved" />
</util:map>
<util:map id="wizardFormClosedPermissions">
    <entry key="GROUP_EVERYONE" value="wizard_form_closed" />
</util:map>
<util:map id="wizardFormCancelledPermissions">
    <entry key="GROUP_EVERYONE" value="wizard_form_cancelled" />
    <entry key="GROUP_wizard_contributors" value="wizard_form_cancelled_relate" />
</util:map>

<!-- individual CONTROLLED DOC draft, inReview, pendingApproval, approved, and effective, superseded permissions maps keyed by the group name -->
<util:map id="controlledDocDraftPermissions">
    <entry key="GROUP_wizard_contributors" value="controlled_doc_draft" />
    <entry key="GROUP_wizard_doc_editors" value="controlled_doc_draft" />
</util:map>
<util:map id="controlledDocInReviewPermissions">
    <entry key="GROUP_wizard_contributors" value="controlled_doc_in_review" />
    <entry key="GROUP_wizard_doc_editors" value="controlled_doc_in_review" />
</util:map>
<util:map id="controlledDocPendingApprovalPermissions">
    <entry key="GROUP_wizard_contributors" value="controlled_doc_pending_approval" />
    <entry key="GROUP_wizard_doc_editors" value="controlled_doc_pending_approval" />
</util:map>
<util:map id="controlledDocApprovedPermissions">
    <!-- core gives ONLY wizard_administrators and wizard_doc_editors the ability to version approved documents -->
    <entry key="GROUP_wizard_contributors" value="controlled_doc_approved" />
    <entry key="GROUP_wizard_administrators" value="controlled_doc_approved_edit" /><!-- to be able to set effective date -->
    <entry key="GROUP_wizard_doc_editors" value="controlled_doc_approved_edit" /><!-- to be able to set effective date -->
    <entry key="GROUP_EVERYONE" value="controlled_doc_approved" />
</util:map>
<!-- core gives ONLY wizard_administrators and wizard_doc_editors the ability to version effective documents -->
<util:map id="controlledDocEffectivePermissions">
    <entry key="GROUP_wizard_contributors" value="controlled_doc_effective" />
    <entry key="GROUP_wizard_administrators" value="controlled_doc_effective_edit" />
    <entry key="GROUP_wizard_doc_editors" value="controlled_doc_effective_edit" /><!-- to be able to set effective date -->
    <entry key="GROUP_EVERYONE" value="controlled_doc_effective" />
</util:map>
<util:map id="controlledDocSupersededPermissions">
    <entry key="GROUP_wizard_administrators" value="controlled_doc_superseded" />
    <!-- does NOT give wizard_contributors any access -->
</util:map>
<util:map id="controlledDocObsoletePermissions">
    <entry key="GROUP_wizard_administrators" value="controlled_doc_obsolete" />
    <!-- does NOT give wizard_contributors any access -->
</util:map>

```

If you wish to define your own custom permissionSets and permissionGroups, see [Permissions and roles Extension Point]({% link content-services/latest/develop/repo-ext-points/permissions.md %}) for more information.

Once a custom permissionSet is defined and enabled via your custom AMP, it can be referenced in the customized ACA permission configuration.

### Modify Only Properties

In some cases, you may only want to override some of the default properties of the pnp accelerator. You do not need an entire custom amp to do this. Instead you can create the file `opencontent-override-placeholders.properties` on the /alfresco classpath, for example, `tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent` and put the overridden properties in this file.

Two things to note with this:

1. This file will win out on any other property files, even ones in the custom amp. For this reason, if you are using a custom amp, it is better to override the properties in the amp than this file

2. You will likely need to create the `module/com.tsgrp.opencontent/` folders
