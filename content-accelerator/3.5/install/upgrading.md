---
title: Upgrade Alfresco Content Accelerator
---

## Recommendations

It is highly recommended to perform and validate upgrade steps in a pre-production environment before executing in Production. Additionally, ensure that backups of the system and backups of the ACA configurations are taken before initiating the upgrade procedures.

## Upgrade Path

The below instructions are validated to work on upgrading a 3.4.x version to 3.5. If upgrading from an older version of ACA, additional changes may be required.

Here is the recommended upgrade path:

1. Backup Alfresco system

2. Upgrade ACS platform to latest released version

   * Verify startup without errors in logs

   > **Note:** If upgrading to the latest released version is not possible, upgrade to the latest patch release. While ACA 3.4.5 will run on Alfresco 7.3, some functionality may be impacted. An upgrade to Alfresco 7.3 requires an upgrade to ACA 3.5 for full support.

3. Upgrade ACA infrastructure components (AMPs, WARs, Tomcat changes, property files)

   * Verify startup without errors in logs

4. Upgrade ACA admin configurations (ACA admin web interface)

   * Verify key functionality
   * See below for details on ACA admin configuration changes required when moving from ACA 3.4.x to 3.5.

## ACA Config Updates

Most ACA 3.5 actions should work with 3.4 configurations.  However, as with all releases, it's recommended that you backup your configs prior to the upgrade and visit all areas in the ACA admin to verify and tweak configurations.  For production environments, it's recommended to perform the upgrade in a Dev/QA environment and then utilize the config archiver to move upgraded configs to higher environments.

### Send Notification Updates

Send Notification were overhauled to provide a more robust experience and will need to be reconfigured to work correctly.

***Ad Hoc Form***

Notifications are now sent with information setup in an Ad Hoc Form. The form can have any type of attributes configured, but there are five named attributes that are associated to the Notification action

Name | Label | Control Type | Notes |
--- | --- | --- | --- |
bpm_assignees | Users | AutoComplete | Repeating dropdown of all users.  Can be set to `allUsers` picklist or another if desired
bpm_groupAssignee | Groups | AutoComplete | Repeating dropdown of all groups.  Optional, can be omitted if desired.
notificationType | Notification Type | AutoComplete | Dropdown notification classification type. <br><br>**Note:** If the configuration contains a Notification Type field with `name = notification_type` (use the More button next to the field name to check) or any other value other than `notificationType`, it is recommended to follow the steps outlined below this table.
bpm_workflowDueDate | Due Date | DateBox | Suggested due date for the notification.  Suggested to configure that the date must be today or in the future.
bpm_comment | Comment | Textarea | Suggested to configure with WYSIWYG option on.

> **Note:** Only `bpm_assignees` and `bpm_groupAssignee` are required for notification to work. However, if not present in the form the ACA notification interface will still show columns for Notification Type, Due Date and Comment.  Any values missing on the form will result in a column that only contains blank values.

**Notification Type** - if the name of the Notification Type field is not properly configured as described above, follow these steps:

1. Click the AutoComplete Options button in the Notification Type field row.  Remember which Picklist is configured and any configured help text.

2. Delete the Notification Type row in the table using the `X` icon in the `Remove` column of the table.

3. Click the `Delete Custom Attributes` button.  Check the box next to `Notification Type` and click `Delete Selected Attributes`.

4. Click `Create Custom Attribute` and fill out the following:

   * Name: `notificationType`
   * Label: `Notification Type`
   * Click `Add Attribute`

5. Click `Add Attributes` and choose the Notification Type attribute.  Set:

   * Control Type: `AutoComplete`
   * Under Options, choose the picklist noted above and add back in any help text if needed

6. Click `Save Config`

***Workflow Config***

In the Workflow Config section of the Admin, select the HPI Notification workflow. Add the Ad Hoc form configured above as both the Start Form and View Notification.

***Action Config***

In the sendNotification Action Config, there will be an option "Select Form to Display". Select the Ad Hoc form created in step one.

### Bulk Upload Updates

Bulk upload contains a number of updates that should be reviewed and potentially enabled when upgrading an existing ACA instance.  These features will *not* be enabled until entering the configs and performing the following steps.

For each instance of the Bulk Upload action (either as a header action or Stage Folder action):

1. In Advanced Properties -> Indexing Mode

     * Validate the list of extensions that should show the document preview window while uploading.  When users upload documents using the Bulk Upload action, the document preview will only display if the document's extension is in the configured list.  Otherwise, for extensions not in the list, the preview pane will not display.

2. Advanced Properties -> Saved Sessions

     * Determine if users would like saved session functionality.  Saved sessions is useful when Bulk Upload actions regularly take users a non-trivial amount of effort.  If users generally fill out Bulk Upload forms in less than 5 minutes, Saved Sessions may not be needed.

3. If you are ever going to enable Saved Sessions, re-run the hpi-setup script.

    * Open a browser window and navigate to the following URL: `{Alfresco Base URL}/alfresco/s/hpi/setup`

4. Whether or not any updates were made, re-save the config. This will activate the new configurations.

### Policy and Procedure Updates

A number of new features were added to the default configurations for the 3.5 release in the Policy and Procedure Accelerator:

* Document Subscriptions
* Document Distribution Lists
* Automated Training Period
* Periodic Review Interval per-document
* Ad-Hoc Form Supporting Documents
* Review Comments Documents

Follow these steps to add the above (optional) features to existing Policy and Procedure Configs.

1. Add the following aspects to the Non-Mandatory Aspect Config.  The Aspect Label can be anything, it is not shown to users. Attribute labels will default to sensible values but can be changed as needed.

    * `tsg_distributionsAttrs`
    * `tsg_subscriptionAttrs`

2. In the Object Type Config, add the aspects added in the last step to the `Quality Document` type.  If the label of this type was changed, look for the type with `ocName` set to `Quality Document`.

3. Add the following attributes to `Quality Document`. Attribute labels will default to sensible values but can be changed as needed.

    * `tsg_trainingPeriod`
    * `periodic_review_interval`

4. Edit the `createObjectControlledDocs` form:

    - Add the Training Period property
      - Control Type: Textbox
      - Suggested Options Settings:
        - Regex: `^[\d]*$`
        - Regex Validation Message: `as a whole number`
        - Help Text: `The number of days between the Approved Date and Effective Date of this document. This date can be modified post-Approval if desired.`
      - Editable, Not Required, Not Repeating
    - Add the Periodic Review Interval property
      - Control Type: Textbox
      - Suggested Options Settings:
        - Default Value: `730`
        - Regex: `^[\d]*$`
        - Regex Validation Message: `as a whole number`
        - Help Text: `The number of days between the Effective Date and the Periodic Review Date. Documents must undergo Periodic Review and be accepted as is, versioned, or obsoleted prior to the Periodic Review Date.`
      - Editable, Not Required, Not Repeating
    - Add the Distributions Group List property
      - Control Type: Autocomplete
      - Suggested Options Settings:
        - Picklist: `allGroups`
          > **Note:** You may want to configure a more restrictive group depending on your repository and use case
        - Help Text: `Groups selected here will receive a notification when this document is Approved, Effective or Obsolete.`
      - Editable, Not Required, Repeating

5. Edit the `viewProperties` form:

    - Add the same properties with the same settings as the `create` form above.  Exceptions:
      - Periodic Review Interval should *not* have a default value in the `viewProperties` form

6. Edit the `controlleddocs` Stage config and navigate to the DocViewer config

    - Add the following Document Actions:
      - subscribe
      - unsubscribe
    - Default settings and action order can be changed as desired

7. Navigate to the Dashboard config and:

    - Add a new "My Subscriptions" dashlet
      - ID: `mySubscriptions`
      - Name: `My Subscriptions`
      - Type: `Saved Search`
    - Edit the new dashlet and update the following:
      - Saved Search Config:
        - Allow User to Control Visibility: checked (suggested, can be unchecked if desired)
        - Select an Object Type for the Dashlet: `Quality Document`
        - Selected Attributes (suggested, can be set as desired):
          - Document Number, Status, Version Label, Modified Date
        - Select the Attribute that will be Clickable: `Document Number` (or whichever selected attribute desired)
        - Default Sort Attribute: `Modified Date`
        - Default Sort Order: `Descending`
      - Search Criteria for Saved Search Results:
        - Add the following criteria:
          - Attribute: `Subscription User List`
          - Operator: `Is Equal To`
          - Value: `$user.loginName`
        - ***Hint**: If the "Subscription User List" attribute is not available, clear your browser cache and try again.*
    - Save the dashlet config
    - In the Dashboard Tabs section, add the `My Subscriptions` dashlet to the `Home` tab.  Order the dashlets as desired and then click `Save Tabs`.

7. Edit the `wizard` Stage config and navigate to the Folder Actions config.  Edit the `Wizard Actions` section.

    - Add the `manageAdHocDocuments` action to the list of selected actions.
      - Action order in the list can be set as desired, but it's recommended to place this action above or below the `manageWorkflowDocuments` action.
    - Edit the `manageAdHocDocuments` action:
      - Under Advanced Properties, Common Configuration:
        - In the Set Default Values dropdown, choose `Alfresco` and click the `Set Defaults` button.  This should set the Relation Name to `aw:supportingDocument` and the Relation Type to `Two Way Relation`
      - The above `Set Defaults` will also update the Search Result Configuration section.  Inspect the Selected Attributes and update if desired.
    - Edit the `completeWizardReviewRoute` action:
      - Under the Comments Section, enable the `Allow Uploading Comment Documents` slider.  Suggested settings:
        - Allow Upload of Multiple Documents: selected
        - Allowed Filetypes: `pdf,docx,doc,xls,xlsx`
        - Comment Document Relationship: `aw:relCommentsDocument (alfresco)`
        - Make File Title Unique: selected
        - Dynamic Filenames for Comment Docs: selected
          - Update pattern so the value is: `Review Comment - $displayName$ - $currentDate$ $currentTime$`

8. In the `wizard` stage config, navigate to Related Objects and:

    - Add a New Relation Configuration:
      - Label: `Related Review Comments`
      - Relationship Type: `Relation Based`
      - Expected Results: `Attached Document`
    - Order the new section as desired.  Suggested to be immediately above or below `Supporting Documents`
    - Edit the new Related Review Comments relation:
      - Relation Configuration:
        - Show `aw:relCommentsDocument` relation
        - For the `Children`
        - of the current `Folder` in the stage
      - Results Display and Sort Options:
        - Number of Results Displayed: 25
        - Display the attribute: `Title`
        - Sort Order: `Ascending`
        - Sort the results by: `Title`
      - Link Resolver Options:
        - Resolver: `Stage`
        - Resolver Trac: `Do not Switch Tracs`
      - Info Block Options:
        - Enable Info Block: `No`
      - Additional Options:
        - Defaults acceptable.  Update as desired

## Upgrading to 3.5.1 and above

If you previously had the Power Promote action configured, navigate to the ACA admin and locate the action configuration for periodic review. Set the sliders for **Require Authentication** and **Add ESignature Page** appropriately for the results you desire.

Refer to the image below of the UI:

![Power Promote]({% link content-accelerator/images/power-promote-options.png %})

If you previously had the Periodic Review action configured, navigate to the ACA admin and locate the action configuration for periodic review. Set the sliders for **Require Authentication** and **Add ESignature Page** appropriately for the results you desire.

> **Note:** If the ACA configurations for your environment were created prior to ACA 3.5.1, the Download Document action must be reconfigured and re-saved in all ACA admin locations where it is referenced.

This is because new functionality was added to the Download Document action and re-saving loads the correct configuration for the action. If this step is not taken, the Download Document action will cause an error for the user, and fail to download the document.

### New Identity Service SSO implementation for ACA 3.5.1

There is an additional option for configuring Single Sign On (SSO) beyond the ACA standard SSO configuration offered in previous releases. This new SSO implementation:

* Is standardized on Identity Service as authentication/authorization provider
* Supports Logout functionality
* Is more configurable
* Only supports implicit flow

If you want to switch your current SSO implementation to the new 3.5.1 SSO implementation, see the additional documentation for this feature in [Single Sign On Support for Content Accelerator]({% link content-accelerator/3.5/install/sso.md %}).

Note that this newer SSO implementation is not a replacement for the current SSO offering. The current SSO offering can continue to be used with ACA 3.5.1.
