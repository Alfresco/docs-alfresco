---
title: Alfresco Audit Configuration
---

Alfresco Content Services has three built-in audit data producers:

* `alfresco-api` - Low-level summary of services and methods. Used for auditing workflows, CRUD operations on users, listing search parameters, etc..
* `alfresco-node` - Used only to track data from the `beforeDeleteNode` policy.
* `alfresco-access` - High-level auditing that encompasses a wide array of events including:
  * Logins (success and failures)
  * CRUD on nodes
  * Property updates
  * Aspect addition/removal
  * Content reads/updates
  * Check in/out and cancel
  * Versioning

This page will walk through how to configure the `alfresco-access` audits and send them to the `ocAudit` application so they will be accessible by ACA and the Alfresco Share dashlet.

In order for these configurations to take effect you must ensure that audits are enabled in Alfresco. You can enable audit by adding `audit.enabled = true` to the `alfresco-global.properties` file.

## Configuring Alfresco-Access Audits

### Configuring the oc-audit.xml

The first step is to configure the `ocAudit` application to accept `alfresco-access` audits. If you have installed the OpenContent AMP, the `oc-audit.xml` should already be configured and installed. It can be found at `${alfrescoHome}/tomcat/webapps/alfresco/WEB-INF/classes/alfresco/extension/audit`. The `oc-audit.xml` is configured with all possible `alfresco-access` audit pathmappings, so all data for an enabled event will be stored in the audit.

If you would like to enable Login/Logout audits, copy the `oc-audit.xml` into your overlay and uncomment the `login`, `loginFailure` and `logout` AuditPath configurations.  

### Enabling Audits Using Filters

Once the `oc-audit.xml` has been configured to accept all `alfresco-access` audits, we can apply a filter to Alfresco to only capture what we are interested in. Properties in your `alfresco-global.properties` determine audit behavior.

For example:

```text
### Audit Filter Settings ###
audit.ocaudit.enabled=true
audit.filter.alfresco-access.default.enabled=true

#Do not audit System user actions
audit.filter.alfresco-access.transaction.user=~System;.*

#Only audit nodes under company home
audit.filter.alfresco-access.default.path=/app:company_home/.*

#Only audit certain types
audit.filter.alfresco-access.transaction.type=aw:controlledDocument;aw:qualityDocument;aw:contractDocument;insuranceDemo:underwritingDocument;insuranceDemo:claimsDocument

#Events to audit * whitelist approach (preferred)
audit.filter.alfresco-access.transaction.action=CREATE;CREATE VERSION;CHECK IN;CHECK OUT;CANCEL CHECK OUT;updateNodeProperties
```

Adding a `~` before a value filters out all audits containing that value.

Adding `.*` at the end of a filter will include all values that have not been specifically excluded

`~` and `.*` are applicable for all filter transaction types (user, type, path, and action).

Filters include:

| Filter | Description |
| ------ | ----------- |
| default.enabled | Specifies whether or not auditing events will be audited.  <br><br>In Content Services 4.2 and earlier versions, this feature was already enabled, using the filtering settings in `repository.properties`. |
| transaction.user | Specifies what user actions will or will not be audited. <br><br>Example: Actions from all users except for 'System' will be audited. |
| transaction.type | Actions that are performed against the specified document type will be audited. <br><br>Example: Actions occurring on all document types will be audited. |
| default.path | Actions that occur on documents within the specified path will be audited. <br><br>Example: Actions that occur on documents anywhere beneath `/app:company_home/cm:Insurance/` will be audited. |
| transaction.action | Specifies what actions will and won't be audited. <br><br>Example: All actions except for READ events will be audited. |

List of Audit Events:

Below is a list of some (not all) audit events that are eligible to be enabled/disabled on the `transaction.action` property of the `alfresco-global.properties` file:

* CREATE
* READ
* MOVE
* COPY
* CHECK IN
* CHECK OUT
  > **Note:** The `CHECK OUT` audit event is placed on the *working copy* node. The primary node simply has an `addNodeAspect` event for the `checkedOut` aspect.
* CANCEL CHECK OUT
* CREATE VERSION
* readContent
* addNodeAspect
* deleteNodeAspect
* updateNodeProperties

For example:

In the example above all document types are set to be audited, which would normally be considered bad practice; however, because the configured path has been narrowed down to a relatively small subset of paths in the repository, we know that the types being audited will be limited by what we are managing within that path.
In this case, inside the insurance folder and sub-folders will be the insurance document type.
This can be handy when dealing with multiple types within your configured path, you can utilize the `.*` for document type when you know that everything inside the path is of the type you want to audit, saving on complexity of your filtering expression.

## Accessing the ocAudit Application

Alfresco contains REST endpoints that allow administrators to access the contents of audit applications, including the `ocAudit`. The list of REST endpoints can be found at `<HOSTNAME>:<PORT>/alfresco/s/index/package/org/alfresco/repository/audit`.

Some common endpoints are (using `ocAudit` application in examples below, but could be any audit application):

* List of audit applications `/alfresco/s/api/audit/control`
* Get audit events (only returns 100 by default) `/alfresco/s/api/audit/query/ocAudit` - parameters are below:
  * verbose=true
  * user={userId}
  * limit=1000 (defaults to 100)
  * Date based queries work with Epoch timestamps:
    * fromTime=timestamp
    * toTime=timestamp

      Use sites like [https://www.epochconverter.com/](https://www.epochconverter.com/){:target="_blank"}. Many online converters use epoch time in **seconds**, whereas Alfresco expects **milliseconds**.

  * forward={forward}
  * fromId={fromId}
  * toId={toId}
  * value={value}
    * Search on any values in the `values` object
  * valueType={valueType}
    * Defines the Java type of the value you are searching on, and must be the fully qualified class name (for example, when searching on NodeRef, `valueType` must be `org.alfresco.service.cmr.repository.NodeRef`).

For more information regarding Alfresco Audits, see the [Alfresco Auditing documentation]({% link content-services/latest/admin/audit.md %}).

## Configuring Action Audits in ACA

### Enable/Disable Action Audit

For certain ACA actions, audits can be enabled/disabled on an individual action basis. To toggle the configuration, open your config (stage or search), open your module, and edit your action. If an audit event is configurable for the action, a toggle will appear in the **Advanced Properties** section of the action. Enabling the action audit will tell OC to generate audits when this action is executed. Disabling the action audit will tell OC not to generate audits when the action is executed (i.e. the action executor itself will still be run, but the audit generation code will not be executed).

### Configure Audit Event Name and Event Description

The audit event name and description for each action audit is configurable via OC properties.

Example:

```plaintext
oc.audit.annotateObject.eventName=Annotate Object
oc.audit.annotateObject.eventDescription=Annotating object in Alfresco Enterprise Viewer via ACA
```
