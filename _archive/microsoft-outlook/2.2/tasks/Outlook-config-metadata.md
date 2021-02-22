---
author: Alfresco Documentation
---

# Outlook metadata settings

Use this guidance to configure templates for adding metadata to folders, files, emails and attachments in Outlook.

You can configure the fields and validation rules that are used when a user drags and drops an email into the Alfresco sidebar in Outlook. This configuration supports content models, including data types, constraints, lists, regular expressions and other attributes. You can also configure the columns shown in the list view depending on the navigation location of a user. This configuration applies to the current view of the folder's documents, emails, and sub-folders as well as the search results.

When a user stores an email, attachment or file, Alfresco Outlook Integration finds the best match for the metadata dialog. The `<match>` element uses the first rule that matches the attributes in the tag. If you are using multiple rules, you should always start with the most specific rule first.

In the `<match>` element:

1.  Define the match type. This can be a folder, type or aspect.
2.  Define the match pattern. This can be the location of the folder \(defined in xpath format\), or it can be based on a defined model, type, or aspect.

See step [11](Outlook-config-metadata.md#example) for the complete example of metadata settings.

1.  Open Alfresco Share, and click **Admin Tools** on the toolbar.

2.  Click Email Metadata Settings, then **Edit**.

    You can configure XML settings for Custom content metadata, Custom folder metadata and List view.

3.  Check Enable custom metadata support to activate the required **Configuration XML content** field.

    The List view field for **Configuration XML content** is activated and populated with XML content by default.

4.  You can load and edit the default configuration template for each section by clicking **Load default configuration template**.

    Here is the full list of metadata settings that you can configure, with examples shown in the next steps:

    |Section name|Key name|Description|Values|
    |------------|--------|-----------|------|
    |`match`|`type`|Mandatory. Defines type of the attribute|`folder`, `type`, `aspect`|
    | |`pattern`|Mandatory. Path to the site or folder where custom metadata is applied|Example: Site: `pattern="/app: company_home/st:sites/cm:qaext- standard-metadata"`

Folder: `pattern="/app: company_home/st:sites/cm:qaext- custom-metadata/cm: documentLibrary/cm:numericmetadata"`

|
    | |`showEmailDialog`|Controls metadata dialog behavior|`true`: metadata dialog displayed \(default\)

 `false`: metadata dialog not displayed

|
    | |`showDocumentDialog`|Controls metadata dialog behavior|`true`: metadata dialog displayed \(default\)

 `false`: metadata dialog not displayed

|
    |`target`|`useTags`|Controls use of tags|`true`: tags are permitted

 `false`: tags are not permitted

|
    | |`emlType`|Type of .EML files| |
    | |`msgType`|Type of .MSG files| |
    | |`attachmentType`|Type of attachments| |
    | |`docType`|Type of documents| |
    | |`schemaID`|Schema ID|Example: `c9379665`: Cryptic ID specified by server

`TEST-FOLDER-SCHEMA-ID`: Custom schema ID

|
    |`property`|`name`|Name of the custom property|Text format|
    | |`allowedValues`|List of permitted values|Text format|
    | |`allowedCategoryValues`|Path to the list of permitted values|Text format|
    |`ui`|`multiline`|Controls use of multiple lines in a box|`true`: multiple lines are permitted

 `false`: multiple lines are not permitted

|
    | |`validationMsg`|Defines validation message| |
    | |`editable`|Controls if a field is editable|`true`: field is editable

 `false`: field is read-only

|

5.  To turn off the metadata dialog completely, use this example:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-1-site-no-metadata">
    </match>
    ```

    This rule turns off the metadata dialog for all folders under the site my-example-1-site-no-metadata.

6.  To enable a Tags field only in the metadata dialog, use this example:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-2-site-only-tags" >
        <target useTags="true" emlType="wpsmail-qa-ext:custom-eml" msgType="wpsmail-qa-ext:custom-msg" attachmentType="wpsmail-qaext:custom-attachment">
        </target>
    </match>
    ```

    In this example, the only available child element is `<target>`. In `<target>` you can specify `useTags`, `emlType`, `msgType`, and `attachmentType` as attributes. If you set the attributes `emlType`, `msgType`, or `attachmentType`, you can assign your own custom type to the uploaded EML, MSG, or attached object. The server automatically creates the corresponding nodes with the correct type during the upload. In the example shown:

    -   The Tags metadata dialog is enabled \(`useTags="true"`\)
    -   Automatic type conversion takes place during upload:
        -   For EML files, the node type is set to the `wpsmail-qa-ext:custom-eml`
        -   For MSG files, the node type is set to the `wpsmail-qa-ext:custom-msg`
        -   For email attachments, the node type is set to the `wpsmail-qa-ext:custom-attachment`
    If no type information is present, the default `cm:content` type is used for all nodes stored in Share. The `<target>` element can contain 0 or more child elements called `<property>`.

    In the `<property>` tag:

    -   Use the `name` attribute to set a valid model property like `cm:name`
    -   Use the `<ui>` child element to control how the fields are displayed in the metadata dialog
7.  To add standard metadata fields to the metadata dialog, use this example:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-3-site-standard-metadata" >
       <target>
          <property name="cm:title" />
          <property name="cm:description">
            <ui multiline="true"/>
          </property>
       </target>
    </match>
    ```

    In this example, the user sees a metadata dialog with two fields; one for `cm:title` and one for `cm:description` when they upload files to the my-example-3-site-standard-metadata site.

    The `cm:description` field can contain multiple lines by setting `<ui multiline="true"/>`.

8.  To add numeric, date/time and boolean metadata fields to the metadata dialog, use this example:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-4-site/cm:documentLibrary/cm:numeric-metadata-date" >
       <target>
         <property name="wpsmail-qa-ext:number-metadata-float" />
         <property name="wpsmail-qa-ext:number-metadata-double" />
         <property name="wpsmail-qa-ext:number-metadata-int" />
         <property name="wpsmail-qa-ext:number-metadata-long" />
         <hr/>
         <property name="wpsmail-qa-ext:various-metadata-date" />
         <property name="wpsmail-qa-ext:various-metadata-datetime" />
         <property name="wpsmail-qa-ext:various-metadata-boolean" />
       </target>
    </match>
    ```

    In this example, the user sees a metadata dialog for all files uploaded to the numeric-metadata-date folder \(or its sub folders\) on the myexample-4-site site. The dialog will contain four fields with custom numeric data in float, double, int and long format.

    The `<hr/>` element adds a horizontal line to the metadata dialog.

    Three additional fields are available; a date field and a date time field \(both displayed using a calendar widget\), and a boolean field \(displayed using a radio button widget\).

9.  To add list constraint fields to the metadata dialog, use this example:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-5-site/cm:documentLibrary/cm:list-metadata" >
       <target>
         <property name="wpsmail-qa-ext:list-metadata-country-text"allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Regions/cm:EUROPE/cm:Northern_x0020_Europe" />
         <property name="wpsmail-qa-ext:list-metadata-languagetext"allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Languages" />
         <property name="wpsmail-qa-ext:list-metadata-greekalphabet-text" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-greek-alphabet.txt" />
         <property name="wpsmail-qa-ext:list-metadata-arabicnumerals-int" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-arabic-numerals.txt" />
         <property name="wpsmail-qa-ext:list-metadata-romannumerals-text" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-roman-numerals.txt" />
         <property name="wpsmail-qa-ext:list-metadata-vegetabletext" />
       </target>
    </match>
    ```

    There are three ways to define list constraints in the metadata dialog. You can reference:

    -   A category root
    -   A text file with a number of list entries
    -   A property that has a LIST constraint in the model
    In this example, when a file is uploaded to the list-metadata folder on the my-example-5-site site, the metadata dialog shows six different fields. The field with the attribute name `wpsmail-qa-ext:list-metadata-country-text` shows only categories that are located in `cm:categoryRoot/cm:generalclassifiable/cm:Regions/cm:EUROPE/cm:Northern_x0020_Europe`.

    You can also define your own value list and save it as a text file in Share. Reference the location of your list file in the `allowedValues` attribute.

    In the example, the `wpsmail-qa-ext:list-metadata-greek-alphabet-text` attribute references `/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-category-list-greek-alphabet.txt` in the `allowedValues` attribute.

10. To add type mapping fields to the metadata dialog, use this example:

    ```
    <match type="type" pattern="wpsmail-qa-ext:invoice-type-folder" >
       <target>
         <property name="wpsmail-qa-ext:invoice-number" />
         <property name="wpsmail-qa-ext:invoice-amount" />
       </target>
    </match>
    ```

    The match type is defined in the model as `wpsmail-qa-ext:invoice-type-folder`. Every time a file is uploaded to a folder with the type `wpsmail-qa-ext:invoice-type-folder`, the metadata dialog displays two fields with custom metadata. In this example, these fields are `wpsmail-qa-ext:invoice-number` and `wpsmail-qa-ext:invoice-amount`.

11. To add aspect mapping fields to the metadata dialog, use this example:

    ```
    <match type="aspect" pattern="wpsmail-qa-ext:claims-aspect-folder" >
       <target>
         <property name="wpsmail-qa-ext:claims-value" />
       </target>
    </match>
    ```

    The matching aspect is defined in the model as `wpsmail-qa-ext:claims-aspect-folder`. Every time a file is uploaded to a folder with the type `wpsmail-qa-ext:claims-aspect-folder`, the metadata dialog displays one field with custom metadata. In this example, this field is `wpsmail-qa-ext:claims-value`.

    Here is a complete example of metadata settings:

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <metadata>
        <!-- For "No metadata" Site -->
        <match type="folder" pattern="/app:company_home/st:sites/cm:qa-ext-no-metadata" >
          <!-- No configuration -->
        </match>
        <!-- For "Standard metadata" Site -->
        <match type="folder" pattern="/app:company_home/st:sites/cm:qa-ext-standard-metadata" >
           <target useTags="true" emlType="wpsmail-qa-ext:custom-eml"msgType="wpsmail-qa-ext:custom-msg" attachmentType="wpsmail-qaext:custom-attachment">
              <property name="cm:title" />
              <hr/>
              <property name="cm:description">
                  <ui multiline="true"/>
              </property>
           </target>
        </match>
        <!-- For "Numeric Metadata" folder of "Custom metadata" Site -->
        <match type="folder" pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:numeric-metadata" >
           <target>
              <property name="wpsmail-qa-ext:number-metadata-float" />
              <property name="wpsmail-qa-ext:number-metadata-double" />
              <property name="wpsmail-qa-ext:number-metadata-int" />
              <property name="wpsmail-qa-ext:number-metadata-long" />
           </target>
        </match>
        <!-- For "List Metadata " folder of "Custom metadata" Site -->
        <match type="folder" pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:list-metadata" >
           <target>
              <property name="wpsmail-qa-ext:list-metadata-countrytext"allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Regions/cm:EUROPE/cm:Northern_x0020_Europe" />
              <property name="wpsmail-qa-ext:list-metadata-languagetext"allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Languages" />
              <property name="wpsmail-qa-ext:list-metadata-greekalphabet-text" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-greek-alphabet.txt" />
              <property name="wpsmail-qa-ext:list-metadata-arabicnumerals-int" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-arabic-numerals.txt" />
              <property name="wpsmail-qa-ext:list-metadata-romannumerals-text" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-roman-numerals.txt" />
              <property name="wpsmail-qa-ext:list-metadatavegetable-text" />
          </target>
        </match>
        <!-- For "Text Metadata" folder of "Custom metadata" Site -->
        <match type="folder" pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:text-metadata" >
           <target>
              <property name="wpsmail-qa-ext:text-metadata-numbertext" />
              <property name="wpsmail-qa-ext:text-metadata-notnumber-ml-text" />
           </target>
         </match>
         <!-- For "Various Metadata" folder of "Custom metadata" Site -->
        <match type="folder" pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:various-metadata" >
          <target emlType="wpsmail-qa-ext:custom-eml" msgType="wpsmail-qa-ext:custom-msg" attachmentType="wpsmail-qa-ext:customattachment">
             <property name="wpsmail-qa-ext:various-metadata-date" />
             <property name="wpsmail-qa-ext:various-metadatadatetime" />
             <property name="wpsmail-qa-ext:various-metadataboolean" />
          </target>
        </match>
        <!-- For "Standard Metadata" folder of "Custom metadata" Site-->
        <match type="folder" pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:standard-metadata" >
           <target useTags="true" >
              <property name="cm:title" />
              <property name="cm:description" />
           </target>
        </match>
        <!-- For "No Metadata" folder of "Custom metadata" Site -->
        <match type="folder" pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:no-metadata" >
           <!-- No configuration -->
        </match>
        <!-- For "Invoice Type" folder of "Custom metadata" Site -->
        <match type="type" pattern="wpsmail-qa-ext:invoice-typefolder" >
           <target>
              <property name="wpsmail-qa-ext:invoice-number" />
              <property name="wpsmail-qa-ext:vendor-name"allowedValues="/app:company_home/app:dictionary/cm:alfresco_mail_integration_ext_constraints/cm:ext-categorylist-greek-alphabet.txt" />
              <property name="wpsmail-qa-ext:invoice-amount" />
           </target>
        </match>
        <!-- For "Claims Aspect" folder of "Custom metadata" Site -->
        <match type="aspect" pattern="wpsmail-qa-ext:claims-aspectfolder" >
           <target>
              <property name="wpsmail-qa-ext:claims-value" />
              <property name="wpsmail-qa-ext:claims-type"allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Software_x0020_Document_x0020_Classification" />
           </target>
        </match>
    </metadata>
    ```

12. To automatically populate predefined metadata, use this example:

    We are defining two properties for automatic population, called source and source-type:

    ```
    <aspect name="wpsmail-qa-ext:source-aspect">
      <title>WPS Source Aspect</title>
       <properties>
         <property name="wpsmail-qa-ext:source">
            <title>Source</title>
            <type>d:text</type>
         </property>
       </properties>
    </aspect>
    <aspect name="wpsmail-qa-ext:source-type-aspect">
      <title>WPS Source Type Aspect</title>
       <properties>
         <property name="wpsmail-qa-ext:source-type">
           <title>Source Type</title>
           <type>d:int</type>
         </property>
       </properties>
    </aspect>
    ```

    source is set to Outlook, and source-type is set to 123:

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <metadata>
       <extended>
         <autofill>
            <property name="wpsmail-qa-ext:source" value="Outlook" />
            <property name="wpsmail-qa-ext:source-type" value="123" />
         </autofill> 
       </extended>
    </metadata>
    ```

13. To set the type \(`docType`\) for all files that are dragged and dropped into Share, use this example:

    We are setting the type of incoming files to gsliu:uwdoc:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:gsliu-3rd-party" >
      <target useTags="false" attachmentType="gsliu:uwdoc" msgType="gsliu:uwdoc" emlType="gsliu:uwdoc" 
    docType="gsliu:uwdoc">
        <property name="gsliu:category_name" allowedValues="app:company_home/app:dictionary/cm:
    WPS_x0020_Alfresco_x0020_Mail_x0020_Integration_x0020_LM_x0020_Constraints/cm:lm-category-list-constraint-1stparty.txt">
          <ui multiline="false" />
        </property>
      </target>
    </match>
    ```

    The `emlType`, `msgType` and `attachmentType` attributes are relevant when a user moves emails to the content repository:

    -   `emlType` defines the type of the eml object that represents the email in the document library.
    -   `msgType` defines the type of the original MSG file that is stored in a hidden folder and linked to the email \(if the option Store original MSG is enabled\).
    -   `attachmentType` defines the type of the attachments that are extracted from the email. The objects are stored in a hidden folder and linked to the email.
    The `docType` attribute is relevant when a user moves documents to the repository. This happens when a user:

    -   Drags and drops a document from the desktop to the Alfresco sidebar in Outlook
    -   Drags and drops a document that is listed as an email attachment to the Alfresco sidebar in Outlook
    **Note:** Make sure that you set `docType` to ensure that the custom type is inherited.

14. To provide multiple content metadata options in the metadata dialog, use this example:

    ```
    <match pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:various-metadata" 
    type="folder">
        <target name="No Metadata" schemaId="99ef8057" />
        <target attachmentType="wpsmail-qa-ext:custom-attachment" default="true" 
    docType="wpsmail-qa-ext:custom-document" emlType="wpsmail-qa-ext:custom-eml" msgType="wpsmail-qa-ext:custom-msg" 
    name="Various Metadata" schemaId="c9379665">
            <property name="wpsmail-qa-ext:various-metadata-date"/>
            <property name="wpsmail-qa-ext:various-metadata-datetime"/>
            <property name="wpsmail-qa-ext:various-metadata-boolean"/>
        </target>
    </match>
    ```

    This rule allows you to add multiple `target` elements to configure different sets of content metadata fields that are presented to the user when they upload new content. This is useful when users want to upload different types of content in one particular folder, and so you can assign different sets of metedata depending on the type of content.

    For users to be able to distinguish between multiple metadata schemes, assign meaningful names to the `<target>` elements by using the `name` attribute. If there are multiple `<target>` elements defined for one location, you can set a default by defining the attribute `default="true"`. This is shown by default to users in the metadata scheme field.

    The `schemaID` attribute allows multiple `target` elements to be defined in a `<match>` section. In this example, the server adds a cryptic schemaID such as `schemaId="c9379665"`. You can assign a meaningful schemaID, such as `TEST-SCHEMA-ID`, instead of keeping the server generated one.

    **Note:** Once a user has uploaded content into a location where a `schemaID` is configured, this ID shouldn't be changed, otherwise the Alfresco Outlook Client won’t find the metadata assigned to that content.

15. To define a custom validation message in the metadata dialog, use this example:

    ```
    <property name="wpsmail-test:test-aspect-for-metadata-date">
        <ui validationMsg="MM/DD/YYYY"/>
    </property>
    ```

    In this example, the validation message for the date property is shown as `MM/DD/YYYY`. This message is displayed to the user as a guideline of what values a particular field can take.

    This attribute can contain either a direct message, as in the example above, or a reference to message bundle key.

    If the attribute contains a reference to a property key that is available in a properties resource bundle in your system, the scheme name can be localized: `validationMsg="com.company.outlook.validationMsg.1.name"`

16. To define a metadata field as read-only, use this example:

    ```
    <property name="wpsmail-test:test-aspect-for-metadata-boolean">
        <ui editable="false"/>
    </property>
    ```

    In this example, the boolean field is presented as a read-only field.

17. To provide multiple folder metadata options when users create and update folders, use this example:

    ```
    <match pattern="/app:company_home" type="folder">
        <target name="No Metadata" schemaId="99ef8057" />
        <target folderType="cm:folder" name="Payload Target" schemaId="TEST-FOLDER-SCHEMA-ID" useTags="true">
            <property name="wpsmail-test:test-aspect-for-metadata-date">
                <ui validationMsg="MM/DD/YYYY"/>
            </property>
        </target>
    </match>
    ```

    The custom metadata for folders is enabled by selecting the checkbox above the Custom folder metadata configuration field.

    This rule allows you to add multiple `target` elements to configure different sets of folder metadata fields that are presented to the user when they create new folders or edit the metadata. This is useful when users want to upload different types of folders in one particular location, and so you can assign different sets of metedata depending on the type of folder.

    For users to be able to distinguish between multiple metadata schemes, assign meaningful names to the `<target>` elements by using the `name` attribute. If there are multiple `<target>` elements defined for one location, you can set a default by defining the attribute `default="true"`. You can also add a custom validation message to a field, and set a field to read-only, similar to configuring custom content metadata.

18. To customize the behavior of the metadata dialog for all files that are dragged and dropped into Alfresco Outlook Client, use this example:

    ```
    <match pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:various-metadata" type="folder" showEmailDialog="false" showDocumentDialog="true">
        ...
    </match>
    ```

    The `showEmailDialog`, and `showDocumentDialog` attributes allow you to control what happens when a user moves emails or other documents into Alfresco:

    -   `showEmailDialog` defines if the metadata dialog opens when a user drags and drops an email object, with or without attachments, into the Alfresco Outlook Client.
    -   `showDocumentDialog` defines if the metadata dialog opens when a user drags and drops an email attachment document or other document from the desktop into the content repository.
    If both attributes are set to `false`, the metadata dialog is not shown when emails or documents are either dragged and dropped or archived directly.

19. To configure the list view displayed at a specific navigation location, use this example:

    ```
    <match pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/
    cm:documentLibrary/cm:numeric-metadata" name="numericmetadata">
        <declare>
            <special-column name="type" width="40" />
            <special-column name="name" width="160" />
            <property-column name="wpsmail-qa-ext:number-metadata-float" width="80"/>
            <property-column name="wpsmail-qa-ext:number-metadata-double" width="80"/>
            <property-column name="wpsmail-qa-ext:number-metadata-int" width="80"/>
            <property-column name="wpsmail-qa-ext:number-metadata-long" width="80"/>
        </declare>
        <visible>
            <special-column name="type" />
            <special-column name="name" />
            <property-column name="wpsmail-qa-ext:number-metadata-float"/>
            <property-column name="wpsmail-qa-ext:number-metadata-double"/>
            <property-column name="wpsmail-qa-ext:number-metadata-int"/>
            <property-column name="wpsmail-qa-ext:number-metadata-long"/>
        </visible>
    </match>
    ```

    This rule allows you to deviate from the default column settings when the Alfresco Outlook Client presents content in the specified numeric-metadata folder \(and its sub folders\) on the qa-ext-custom-metadata site. The `<match>` rule is added into an `<overrides>` section of the XML configuration. In this example, when a user navigates to this location or starts a search in this location, an alternative list view is presented. The dialog shows four fields with custom numeric data in float, double, int, and long format.

    Note how the rule is similar to the custom content metadata configuration. The `<list-view>` and `<match>` elements can be assigned names, which will be displayed in the list view configuration of the Alfresco Outlook Client. The user can still define which columns of a particular server-side list view configuration are enabled/disabled.

20. Save your changes and restart Microsoft Outlook.

    The template changes are applied.

    You can download the custom content metadata, custom folder metadata, and list view settings locally by clicking Download configuration.


**Parent topic:**[Configuring Outlook metadata and list view settings in Alfresco](../tasks/Outlook-admin-metadata-settings.md)

