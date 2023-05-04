---
title: Active Wizard
---

Active Wizard is ACA's tool for configuring workflows and is included in the Policy and Procedure solution.

## Active Wizard ACA Queries

It's possible to write Java code in Alfresco Content Accelerator to execute a query.  Alfresco Content Accelerator queries all have a Parameters textbox that allows the administrator to pass information to the ACA query code.  This parameter value can either be simple text typed into the admin or a query variable that is resolved at runtime before the query is executed.

> **Note:** As of ACA 2.5, ACA queries can either generate answers, or execute special functionality to return data to the front end form.

All parameters are formatted as: `${paramName}`.

### Provided ACA Queries

A number of queries are available out of the box:

Query Name | Query Type | Description | Parameter Values
--- | --- | --- | ---
Users In Groups | Generate Answers | Retrieves the list of users in one or more groups | The group or group names (comma separated)
Users In Groups minus Current User | Generate Answers | Same as Users in Groups, but removes the currently logged in user from the results | Same as Users In Groups
Current User | Generate Answers | Retrieves the Currently logged in User | N/A
User Details from User ID | Generate Answers | Retrieves a user based on the given user ID | The user ID
User Display Name from User ID | Generate Answers | Retrieves a user display name based on the given user ID | The user ID
User Email from User ID | Generate Answers | Retrieves a user's email based on the given user ID | The user ID
Get PDF Page Count | Return Data | Return the number of pages for the given object ID.  | The Object ID.  This object must have a PDF rendition
External Link | Return Data | Return a URL that can be used on the front end to display a link or button to the user | The URL with tokens to format.  Beyond query variables, the bean also supports special tokens that are resolved server side.  See below
ACA Picklist | Generate Answers | Generates answers by referencing the specified ACA picklist | The ACA application ID and the picklist ID formatted as: `${appId}\|${picklistId}`.  More information below.

### External Link Tokens

Some query beans support special tokens that work like query variables, but are provided by the bean implementation rather than form data. Examples:

* `#{ticket}` - Resolves to the logged in user's ACA ticket
* `#{userId}` - Resolves to the logged in user's ID

### ACA Picklists

It is possible to set up an Active Wizard query to use an ACA picklist.  When choosing the ACA Picklist web service type, it is recommended to set up the URL like this:

`${picklistName}`

> **Note:** It is not recommended to hardcode the picklist name.  It's more flexible to let the question configuration specify the picklist ID.

### Creating a new ACA Query

If you would like to create a new ACA query, write a java class that implements `com.tsgrp.Alfresco Content Accelerator.wizard.core.query.IWizardQuery`.  Then, register the bean in `wizard-bean-config.xml`, assuming this is a core ACA query. For example:

```xml
<bean id="currentUser" class="com.tsgrp.Alfresco Content Accelerator.wizard.core.query.CurrentUser">
    <property name="displayName" value="Current User" />
</bean>
```

Now, include the bean in the following list:

```xml
<bean id="WizardQueryContainer" class="com.tsgrp.Alfresco Content Accelerator.wizard.core.query.WizardQueryContainer">
  <property name="wizardQueryImpls">
    <list>
      <ref bean="usersInGroups" />
      <ref bean="usersInGroupsMinusCurrentUser" />
      <ref bean="currentUser" />
      <ref bean="userDetailsFromUserID" />
      <ref bean="getPageCount" />
      <ref bean="externalLink" />
    </list>
  </property>
</bean>
```

The AW admin gets the list of available queries from the `WizardQueryContainer`.  After restarting ACA, the new query will be available in the list.

### Testing Queries

Use the [Test Query] button in the AW Query admin to test your query.  When testing queries, the application will ask for any query variable values before running the query.

### Using a query in a Form Template

Since queries are configured separately from the form template, they can be used multiple times in one template, or even across multiple form templates.  Queries that generate answers must be configured as a query action on a placeholder answer.  For example:

1. Create the question.  Ex: Select Users (multi-select)
1. Create an answer.
1. The answer value and display text can be anything you wish.  The values are not used by the ACA query code (but the front end admin requires something).
1. Attach an Answer Impact to the question.  Choose `Run a Query` as the type.  Select your query from the query dropdown.
1. Query variables will be presented below (if applicable).  See below for how to resolve variables.

If your query generates data, it may be configured at the question level rather than the answer level.  

#### Resolving Query Variables

Query variables can be resolved in one of two ways:

##### Choose a question

Questions on the form are listed in the dropdown.  Choose one and the selected value(s) will be replaced before the query is executed.  Care *must* be taken to ensure that the value will always be filled out.  Therefore, you should not select a question that is either optional or later in the page flow.

##### Type a value

The admin can type in any value to replace a variable.  Using our "users in groups" example from above, this option allows us to reuse the query multiple times.  For example, one question could use `group_one` as the group name, whereas another question could use `group_two` as the group name.

## Launch Forms in Streamline Mode

In some scenarios it may be beneficial to launch directly into the form and show a confirmation page upon form completion. Follow along below in order to configure this option.

### ACA Admin Config

First, go into the ACAadmin in the `Workflow -> Active Wizard Forms` section.  Follow these steps:

* Add your form template to the list of forms configured
* Set an action to perform upon completion if desired.  Setting this to start the approval route is common.
* Change the slider to enable streamline mode for the form.

### Launching the form

Forms can be launched in streamline mode by formatting the URL as:

`<server>/ocms/activeform/<form-name>/streamline/new`

For example:
`http://{server}/ocms/activeform/Simple Workflow CR/streamline/new`

You can also include pre-populated data in the form when using streamline mode. To launch a form in streamline mode with pre-populated data format the URL as:

`<server>/ocms/activeform/<form-name>/new/0?populate=true&{question_label}={value}&{question_label}={value}`

For example:
`http://{server}/ocms/activeform/Simple CR/new/0?populate=true&Type of Change=Document&Priority of Change=High`

## Leading Actions

The ActiveForm module processes leading actions using a consistent algorithm for determining where to place pages in the flow.  The diagram below describes the process.

![AW Leading Actions]({% link content-accelerator/images/aw-leading-actions.jpg %})
