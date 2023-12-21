---
title: Share Document Library reference
---

This information provides reference material about the Alfresco Share Document Library; for example, `jsNode` methods 
and properties, forms, evaluators, and EXIF renderer source code.

## jsNode reference {#jsnoderef}

`jsNode` is the preferred object to access node properties and aspects by using JavaScript on the browser.

When dealing with DataTable records, `record.jsNode` should be available.

>**Note:** It is the responsibility of any code that updates DataTable records to also ensure the `jsNode` property is updated (usually within the AJAX success callback).

To create a `jsNode` instance, use:

```javascript
jsNode = new Alfresco.util.Node(p_node)
```

where `p_node` can either be a JavaScript object or JSON string. In either case, it should be in the format returned 
by the `doclist-v2` data web scripts.

### Methods

The jsNode methods are:

|Method|Description|
|------|-----------|
|`getNode`|Returns original node object. If a JSON string was passed in, this method returns a JavaScript object|
|`toJSON`|Return the JSON string serialization of the node|
|`setNodeRef`|Sets a new nodeRef - doesn't requery node properties however. Used solely when generating new page urls|
|`hasAspect`|Returns true if this node has the given aspect|
|`hasTag`|Returns true if this node has the given tag applied|

The`slingshot-documentlibrary-context.xml` file contains all bean definitions for web tier evaluators.

### Properties

The `jsNode` properties are:

|Property|Description|
|------|-----------|
|**Core node properties**||
|`nodeRef`|NodeRef|
|`type`|The node’s type in short QName format|
|`isContainer`|Returns true if the node is a container type|
|`isLink`|Returns true if the node is a file or folderlink type|
|`isLocked`|Returns true if the node has been locked by any user|
|`linkedNode`|If this node is a link, returns a jsNode instance of the linked node|
|**Content nodes**||
|`contentURL`|Of the format /api/node/content/{nodeRef}/{filename}|
|`mimetype`|Content mimetype|
|`size`|Content size in bytes|
|**Properties**||
|`properties`|All properties are available either by using:`properties[“my:property”]` or `properties.my_property`. <br><br>Note that `cm:` properties are available without the prefix, i.e. "`properties.description`", "`properties.title`"|
|**Aspects**||
|`aspects`|Array of aspects present on this node. See also `hasAspect()`|
|**Permissions**||
|`permissions`|The permissions the current user has on this node. The list of permissions is defined in the `applicationScriptUtils` bean configuration.|
|**Tags**||
|`tags`|Array of tags. See also `hasTag()`|
|**Categories**||
|`categories`|Returns an array of the format [`categoryName`, `category path`]|

## Predefined evaluators {#predefinedevaluatorsref}

This information provides a list of the evaluators that are defined in the core Alfresco Share code.

They are all defined in `slingshot-documentlibrary-context.xml` and can be reused in customizations as required.

### Evaluators

These evaluators might need extra configuration before they can be used and form the basis of all metadata and action 
evaluators by using the bean configuration `parent` attribute.

|Evaluator|Properties|
|---------|----------|
|`evaluator.doclib.action.hasAspect`|`aspects`: List of aspects the node must have|
|`evaluator.doclib.action.isMimetype`|`mimetypes`: The node must match one of the mimetypes|
|`evaluator.doclib.action.propertyNotNull`|`property`: the node property must not be null for this evaluator to return `true`|
|`evaluator.doclib.action.chainedMatchAll`|`evaluators`: List of evaluators that are run in turn until one returns false or the end is reached|
|`evaluator.doclib.action.chainedMatchOne`|`evaluators`: List of evaluators that are run in turn until one returns true|
|`evaluator.doclib.action.disableAction`|Always returns `false`|
|`evaluator.doclib.action.sitePreset`|`presets`: current site must match one of the listed presets|
|`evaluator.doclib.action.siteBased`|Returns `true` if the current node is located within a Share site and the Site Document Library is being used|
|`evaluator.doclib.action.containerType`|`types`: Current documentLibrary container folder must match one of the listed types|
|`evaluator.doclib.action.nodeType`|`allow Subtypes`: Whether subtypes of the node are also allowed.<br><br>`types`: Node must match one of the listed types|
|`evaluator.doclib.action.value`|This evaluator is described in further detail in the next topic.<br><br> `accessor`: `jsNode` property to be tested<br><br>`comparator`: Bean definition of class implementing the Comparator interface|
|`evaluator.doclib.action.metadataValue`|This evaluator is described in further detail in the next topic.<br><br>`accessor`: metadata property to be tested<br><br>`comparator`: Bean definition of class implementing the Comparator interface|
|`evaluator.doclib.action.isBrowser`|`regex`: Regular expression to match against browser `userAgent` string|
|`evaluator.doclib.action.isPortlet`|Returns `true` if the application is deployed within a portlet environment|
|`evaluator.doclib.action.notPortlet`|Returns the inverse of `isPortlet`|

### Comparators

The `evaluator.doclib.action.value` and `evaluator.doclib.action.metadataValue` evaluators use comparator helper beans 
in order to test a value against certain conditions. The following comparators are available in a standard install.

|Evaluator|Properties|
|---------|----------|
|`org.alfresco.web.evaluator.StringEqualsComparator`|`aspects`: Value to test string against<br><br>`caseInsensitive`: Defaults to `true`|
|`org.alfresco.web.evaluator.NullValueComparator`|`value`: Boolean to indicate if null should be the pass or fail case|

### Evaluator Instances

The following lists describe each of the evaluators defined for the v4.0 release.

**Status indicator evaluators**

|Evaluator|Description|
|---------|----------|
|`evaluator.doclib.indicator.editing`|The current user is editing this node (working copy)|
|`evaluator.doclib.indicator.lockOwner`|The current user is the lock owner (original of a working copy pair)|
|`evaluator.doclib.indicator.locked`|The node is locked by another user|
|`evaluator.doclib.indicator.googleDocsEditing`|The node is being edited using Google Docs|
|`evaluator.doclib.indicator.googleDocsOwner`|The current user is editing the node is Google Docs|
|`evaluator.doclib.indicator.googleDocsLocked`|Another user is editing the node using Google Docs|
|`evaluator.doclib.indicator.activeWorkflows`|The node is involved in one or more active (advanced) workflows|
|`evaluator.doclib.indicator.simpleWorkflow`|The node is part of a simple workflow process|
|`evaluator.doclib.indicator.rules`|The node has rules applied|
|`evaluator.doclib.indicator.exifMetadata`|The node has the EXIF metadata aspect applied|
|`evaluator.doclib.indicator.geographicMetadata`|The node has the Geographic aspect applied|

**Metadata template evaluators**

|Evaluator|Description|
|---------|----------|
|`evaluator.doclib.metadata.hasCategories`|The node has the classifiable aspect applied|
|`evaluator.doclib.metadata.isWorkingCopy`|The node is a working copy|

**Action evaluators**

|Evaluator|Description|
|---------|----------|
|`evaluator.doclib.action.simpleApprove`|Uses `simpleWorkflowAspect` and `simpleApproveProperty` to check for the simple workflow “Approve” action validity|
|`evaluator.doclib.action.simpleReject`|Uses `simpleWorkflowAspect` and `simpleRejectProperty` to check for the simple workflow “Reject” action validity|
|`evaluator.doclib.action.locateAction`|Checks the current filter is “path”|
|`evaluator.doclib.action.inlineEdit`|Uses the `inlineEditAspect` and `inlineEditMimetype` evaluators to determine if a content node can be edited inline|
|`evaluator.doclib.action.onlineEdit`|Uses `onlineEditVtiServer`, `onlineEditBrowser` and `onlineEditMimetype` evaluators to determine if the “Edit in Microsoft Office” action is valid|
|`evaluator.doclib.action.hasLockableAspect`|Used in an inverted state for the “Edit Offline”, “Copy”, “Move” and “Publish” actions|
|`evaluator.doclib.action.siteBased`|Enables the site-based permissions dialog. Used in inverted state for the repository-based permissions page action|
|`evaluator.doclib.action.isWorkingCopy`|Tests whether a node is a working copy|
|`evaluator.doclib.action.viewInExplorer`|Reads the `repository-url` config value to determine the validity of the “View in Explorer” action|
|`evaluator.doclib.action.googleDocsEditable`|Enables “Check out to Google Docs” action|
|`evaluator.doclib.action.googleDocsCheckIn`|Tests for the validity of the “Check in from Google Docs” action|
|`evaluator.doclib.action.googleDocsView`|Tests whether a node has been checked out to Google Docs|
|`evaluator.doclib.action.googleMaps`|Checks for the `cm:geographic` aspect|
|`evaluator.doclib.action.transferred`|Tests for the `trx:transferred` action for the “View in Source Repository” action|

## Forms reference {#formref}

This reference contains detailed information for forms controls and the configuration syntax.

### Form controls

Controls are represented by a FreeMarker template snippet, and each field has a control and an optional set of parameters.

The following controls are available.

* **association.ftl**

    The `association` control is used to allow objects in the repository to be picked and ultimately associated with the node being edited. The control uses the JavaScript `Alfresco.ObjectPicker` component to allow the user to browse the repository and pick objects.

    The following parameters are available:

    * `compactMode`: Determines whether the picker will be shown in compact mode.
    * `showTargetLink`: Determines whether a link to the document details page will be rendered to content items.

* **category.ftl**

    The `category` control is used to allow the user to select categories for the node being edited. The control uses the JavaScript `Alfresco.ObjectPicker` component to allow the user to browse the category hierarchy.

    The following parameters are available:

    * `compactMode`: Determines whether the picker will be shown in compact mode.

* **checkbox.ftl**

    The `checkbox` control renders a standard HTML check box control.

    The following parameters are available:

    * styleClass: Allows a custom CSS class to be applied to the check box.

* **date.ftl**

    The `date` control renders a date field allowing free form entry of dates, as well as a calendar widget allowing dates to be selected visually. If appropriate a time field is also rendered.

    The following parameters are available:

    * `showTime`: Determines whether the time entry field should be displayed.

* **encoding.ftl**

    The `encoding` control renders a selectable list of encodings.

    The following parameters are available:

    * `property`: The name of a content property to retrieve the current encoding from; if omitted the `field.value` value is used.
    * `styleClass`: Allows a custom CSS class to be applied to the select list.

* **invisible.ftl**

    The `invisible` control renders nothing at all; it can be used when a form definition needs to be requested and returned but not displayed. This control has no parameters.

* **mimetype.ftl**

    The `mimetype` control renders a selectable list of mime types.

    The following parameters are available:

    * `property`: The name of a content property to retrieve the current mime type from, if omitted the field.value value is used.
    * `styleClass`: Allows a custom CSS class to be applied to the select list.

* **period.ftl**

    The `period` control renders a selectable list of periods and an expression entry field.

    The following parameters are available:

    * `dataTypeParameters`: A JSON object representing the period definitions to show in the list.

* **selectone.ftl**

    The `selectone` control renders a standard HTML select list.

    The following parameters are available:

    * `options`: A comma separated list of options to display, for example `"First,Second,Third"`. If a value for an option also needs to be specified, use the `"First|1,Second|2,Third|3"` format.
    * `size`: The size of the list, that is, how many options are always visible.
    * `styleClass`: Allows a custom CSS class to be applied to the select list.

* **selectmany.ftl**

    The `selectmany` control renders a standard HTML select list allowing multiple selections.

    The following parameters are available:

    * `options` (mandatory, comma separated string): A comma separated list of options to display, for example "First,Second,Third". If a value for an option also needs to be specified the "First|1,Second|2,Third|3" format can be used.
    * `size` (optional, int): The size of the list i.e. how many options are always visible, the default is 5.
    * `styleClass` (optional, string): Allows a custom CSS class to be applied to the select list.
    * `style` (optional, string): Allows CSS rules to applied directly to the select list.
    * `forceEditable` (optional, boolean): Forces the control to be editable, default is false.

* **size.ftl**

    The `size` control renders a read only human readable representation of the content size.

    The following parameters are available:

    * `property`: The name of a content property to retrieve the current content size from; if omitted the `field.value` value is used.

* **textarea.ftl**

    The `textarea` control renders a standard HTML text area field.

    The following parameters are available:

    * `rows`: The number of rows the text area will have
    * `columns`: The number of columns the text area will have
    * `styleClass`: Allows a custom CSS class to be applied to the text area

* **textfield.ftl**

    The `textfield` control renders a standard HTML text field.

    The following parameters are available:

    * `styleClass`: Allows a custom CSS class to be applied to the text field
    * `maxLength`: Defines the maximum number of characters the user can enter
    * `size`: Defines the size of the text field

### Forms configuration syntax {#formsconfigsyntax}

The share-config-custom.xml file uses an XML configuration syntax.

The XML syntax is described as follows:

* **default-controls**

    The type element defines what control to use, by default, for each type defined in the content model. The name attribute contains the prefix form of the data type, for example `d:text`. The template attribute specifies the path to the template snippet to use to represent the field. If the path value should be a relative path, it is relative from the `alfresco` package. If the path value is absolute, it is looked up relative to the `alfresco/web-extension/site-webscripts` package, normally found in the application server shared classes location. The `control-param` element provides a mechanism to pass parameters to control templates, meaning that control templates can be re-used.

* **constraint-handlers**

    The constraint element defines what JavaScript function to use to check that fields with constraints are valid before being submitted. The `id` attribute is the unique identifier given to the model constraint in the content model, for example `LIST`. The `validation-handler` attribute represents the name of a JavaScript function that gets called when the field value needs to be validated. The `event` attribute defines what event will cause the validation handler to get called. This will be a standard DOM event, that is, `keyup`, `blur`, and so on. The validation handler called usually has a default message to display when validation fails, the `message` and `message-id` attributes provide a way to override this message. However, the validation messages are not shown (the **Submit** button is enabled/disabled).

* **dependencies**

    The `dependencies` element defines the list of JavaScript and CSS files required by any custom controls being used in the application. In order for valid XHTML code to be generated, the dependencies need to be known ahead of time so the relevant links can be generated in the HTML head section. The `src` attribute of both the JavaScript and CSS elements contains the path to the resource, the path should be an absolute path from the root of the web application (but not including the web application context).

* **form**

    The `form` element represents a form to display. If the form element exists within a config element that provides an evaluator and condition, the form will only be found if the item being requested matches the condition. If the form element exists within a config element without an evaluator and condition, the form is always found. The optional `id` attribute allows an identifier to be associated with the form, thus allowing multiple forms to be defined for the same item. The `submission-url` allows the action attribute of the generated form to be overridden so that the contents of the form can be submitted to any arbitrary URL.

* **view-form**

    The `view-form` element allows the default template that auto generates the form UI to be overridden. The `template` attribute specifies the path to the template to be used when the form is in view mode. The value is usually an absolute path, which is relative to the `alfresco/web-extension/site-webscripts` package, normally found in the application server shared classes location. If this element is present, the `field-visibility` element is effectively ignored and therefore does not have to be present.

* **edit-form**

    The `edit-form` element allows the default template that auto generates the form UI to be overridden. The `template` attribute specifies the path to the template to be used when the form is in edit mode. The value is usually an absolute path, which is relative to the `alfresco/web-extension/site-webscripts` package, normally found in the application server shared classes location. If this element is present, the `field-visibility` element is effectively ignored and therefore does not have to be present.

* **create-form**

    The `create-form` element allows the default template that auto generates the form UI to be overridden. The `template` attribute specifies the path to the template to be used when the form is in create mode. The value is usually an absolute path, which is relative to the `alfresco/web-extension/site-webscripts` package, normally found in the application server shared classes location. If this element is present, the `field-visibility` element is effectively ignored and therefore does not have to be present.

* **field-visibility**

    The `field-visibility` element defines which fields are going to appear on the form, unless a custom template is used.

* **show**

    The `show` element specifies a field that should appear on the form. The `id` attribute represents the unique identifier for a field, for example, `cm:name`. The optional `for-mode` attribute indicates when the field should appear. Valid values for the attribute are `view`, `edit`, and `create`. If the attribute is not specified, the field will appear in all modes. If present, the field will only appear for the modes listed. For example, to only show a field in view and edit modes, the `for-mode` attribute would contain `view,edit`.

    There are fields that can be optional for an item, and by default they cannot be returned by the server. The `force` attribute can be used to indicate to the form service that it should do everything it can to find and return a definition for the field. An example might be a property defined on an aspect, if the aspect is not applied to the node, a field definition for the property will not be returned If force is `true`, it would indicate that server needs to try and find the property on an aspect in the content model.

* **hide**

    The `hide` element normally comes into play when multiple configuration files are combined as it can be used to hide fields previously configured to be shown. The `id` attribute represents the unique identifier for a field, for example `cm:name` that should not be displayed. The optional `for-mode` attribute indicates in which modes the field should not appear. Valid values for the attribute are view, edit, and `create`. If the attribute is not specified, the field will never appear. If present, the field will be hidden for the modes listed. For example, to hide a field in view and edit modes, the `for-mode` attribute would contain `view,edit`.

    The algorithm for determining whether a particular field will be shown or hidden works, as follows:

    1.  If there is no `field-visibility` configuration (show or hide tags) then all fields are visible in all modes.
    2.  If there are one or more hide tags then the specified field(s) will be hidden in the specified modes. All other fields remain visible as before.
    3.  As soon as a single `show` tag appears in the configuration XML, this is taken as a signal that all field visibility is to be manually configured. At that point, all fields default to hidden and only those explicitly configured to be shown (with a `show` tag) will be shown.
    4.  Show and hide rules will be applied in sequence, with later rules potentially invalidating previous rules.
    5.  Show or hide rules, which only apply for specified modes, have an implicit element. For example, `<show id="name" for-mode="view"/>` would show the name field in view mode and by implication, hide it in other modes.

* **appearance**

    The optional `appearance` element controls the look and feel of the controls that make up the form. Unlike the `field-visibility` element, this element will be processed and the information available to custom templates defined with the `view-form`, `edit-form` and `create-form` elements, it is up to those templates whether they use the available data.

    The configuration of what fields are present and how they appear has been separated to provide the maximum flexibility, and although it might be slightly more verbose, the separation allows the appearance to be defined for fields that are not explicitly mentioned within the `field-visibility` element.

* **set**

    The optional `set` element provides the basis of creating groups of fields. The `id` attribute gives the set a unique identifier that other set definitions and fields can refer to. The `parent` attribute allows sets to be nested, and the value should reference a valid set definition, previously defined. The `appearance` attribute specifies how the set will be rendered. The only supported and allowed values are `fieldset` and `panel`. If an `appearance` attribute is not supplied, the set will not be rendered. The `label` and `label-id` attributes provide the title for the set when it is rendered. If neither are supplied, the set identifier is used.

    A default set with an identifier of `""` (empty string) is always present, and any fields without an explicit set membership automatically belong to the default set. The default set will be displayed with a label of `Default`.

* **field**

    The `field` element allows most aspects of a field's appearance to be controlled from the label to the control that should be used. The only mandatory attribute is `id`, which specifies the field to be customized. However, the field identifier does not have to be present within the `field-visibility` element.

    The `label` and `label-id` attributes define the label to be used for the form. If neither attribute is present, the field label returned from the Form Service is used. The `description` and `description-id` attributes are used to display a tool tip for the field. If neither is present, the description returned from the Form Service is used (this could also be empty).

    The `read-only` attribute indicates to the form UI generation template that the field should never be shown in an editable form. Finally, the optional `set` attribute contains the identifier of a previously defined set. If the attribute is omitted, the field belongs to the default set.

* **control**

    The `control` element allows the control being used for the field to be configured or customized. If present, the `template` attribute specifies the path to the template snippet to use to represent the field overriding the `default-control` template. If the path value is relative, it is relative from the `alfresco` package. If the path value is absolute, it is looked up relative to the `<web-extension>/site-webscripts` package, normally found in the application server shared classes location.

    The `control-param` sub-elements provide a mechanism to pass parameters to control templates. This template could either be the one defined locally or the template defined in the `default-control` element for the data type of the field.

* **constraint-handlers**

    The `constraint` sub-elements define the JavaScript function to use for checking that fields with constraints are valid before being submitted. The main purpose of this element is to allow aspects of the constraint to be overridden for a particular field. Each attribute effectively overrides the equivalent attribute.

## EXIF renderer source code {#exifrendref}

The EXIF renderer source code is as follows.  

```javascript
/*************************************************************************************
                                              EXIF
                                           EXTENSION
*************************************************************************************/
(function()
{
  /**
   * Alfresco Slingshot aliases
   */
   var $html = Alfresco.util.encodeHTML,
   $isValueSet = Alfresco.util.isValueSet;

   if (Alfresco.DocumentList)
   {
        YAHOO.Bubbling.fire("registerRenderer",
        {
           propertyName: "exposure",
           renderer: function exif_renderer(record, label)
           {
                 var jsNode = record.jsNode,
                 properties = jsNode.properties,
                 html = "";
                 
              var expTime = properties["exif:exposureTime"] || 0,
                 exifObj =
                {
                     exposureFraction: expTime > 0 ? "1/" + Math.ceil(1/expTime) : expTime,
                     fNumber: properties["exif:fNumber"] || 0,
                     isoSpeedRatings: properties["exif:isoSpeedRatings"] || 0
                 };
                 
              html = '<span class="item">' + label + '<b>' +
YAHOO.lang.substitute(this.msg("exif.metadata.exposure"), exifObj) + '</b></span>';
              return html;
           }
        });
   }
})();
```
