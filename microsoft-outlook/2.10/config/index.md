---
title: Configure Outlook Integration
---

Configure Outlook settings in Alfresco Share using the Share Admin Tools menu, in Microsoft Outlook using the Alfresco Client toolbar, or by editing configuration files directly.

In Alfresco Share, as an administrator, click **Admin Tools** on the Alfresco toolbar. In the left **Tools** panel, scroll down and under **Outlook Integration** there are the following options for configuration:

* *Metadata Settings* - custom metadata and list view settings
* *Search Settings* - custom simple and advanced search settings
* *Integration Settings* - server and client setup, upload restrictions and email settings
* *Access Tokens* - view and remove active users
* *Licenses* - view and register server and client licenses
* *System Info* - view version, license, server and installed module information

The URL is:

```html
http://localhost:8080/share/page/console/admin-console/mail-customization-config
```

where `localhost:8080` is your Alfresco server and port number.

On the Microsoft Outlook toolbar, there is an Alfresco Client tab, with the following entries:

![Alfresco Outlook Client ribbon in Outlook]({% link microsoft-outlook/images/2-8-ribbon-top.png %}){:width="600px"}

* *Configure* - client configuration and license
* *Language* - client display language
* *Show Sidebar* - show the Alfresco repository window
* *Send and Archive* - automatically archive email after sending
* *Message Details* - displays details of a selected archived email
* *Help* - link to Alfresco Outlook Client documentation
* *Info* - version and copyright information

>**Note:** Not all settings can be configured using the Alfresco Client toolbar.

## Alfresco Share configuration

This section contains Alfresco Share configuration instructions for the Outlook Integration.

### Configure metadata and list view settings {#configmetadataandlistview}

You can configure metadata and list view settings for the Outlook Integration using Share **Admin Tools**. These settings define global controls across your enterprise and are applied immediately.

1. Open Alfresco Share, and click **Admin Tools** on the toolbar.

2. Click **Metadata Settings** and **Edit**.

    See [Outlook metadata settings](#detailedconfigmetadatasettings) for more detailed guidance on adding metadata.

3. Check the box to **Enable custom metadata support** in the relevant custom metadata section.

    If you select this option, the **Configuration XML content** field becomes active.

4. Paste the XML code that contains the configuration settings for the Alfresco Outlook Client into the **Configuration XML content** field, or load and edit the default configuration template by clicking **Load default configuration template**.

    You can use the default configuration template for testing purposes, and edit this if you prefer.

5. In the list view section, **Allow overwriting** is enabled by default. Uncheck to set global list view settings for Outlook.

    This means that users are able to change their settings locally.

6. Edit the XML settings in the third **Configuration XML content** field or use your own settings. The default configuration template is preloaded.

7. Click **Apply** to save.

    If your XML isn't valid, you won't be allowed to save your settings, and you'll see an error message.

8. You can download the list view settings locally by clicking **Download configuration**.

#### Detailed config of metadata settings {#detailedconfigmetadatasettings}

Use this guidance to configure templates for adding metadata to folders, files, emails and attachments in Outlook.

You can configure the fields and validation rules that are used when a user drags and drops an email into the
Alfresco sidebar in Outlook. This configuration supports content models, including data types, constraints, lists, regular expressions and other attributes. You can also configure the columns shown in the list view depending on the navigation location of a user. This configuration applies to the current view of the folder's documents, emails, and sub-folders as well as the search results.

When a user stores an email, attachment or file, the Outlook Integration finds the best match for the metadata dialog. The `<match>` element uses the first rule that matches the attributes in the tag. If you are using multiple rules, you should always start with the most specific rule first.

In the `<match>` element:

1. Define the match type. This can be a folder, type or aspect.

2. Define the match pattern. This can be the location of the folder (defined in xpath format), or it can be based on a defined model, type, or aspect. When using a folder location for the metadata, you can use the asterisk wildcard (`*`) - an example is shown in step **21**.

See step **11** for the complete example of metadata settings.

1. Open Alfresco Share, and click **Admin Tools** on the toolbar.

2. Click **Metadata Settings**, then **Edit**.

    You can configure XML settings for **Custom content metadata**, **Custom folder metadata** and **List view**.

3. Check **Enable custom metadata support** to activate the required **Configuration XML content** field.

    The **List view** field for **Configuration XML content** is activated and populated with XML content by default.

4. You can load and edit the default configuration template for each section by clicking **Load default configuration template**.

    Here is the full list of metadata settings that you can configure, with examples shown in the next steps:

    |Section name|Key name|Description|Values|
    |------------|--------|-----------|------|
    |`match`|`type`|Mandatory. Defines type of the attribute|`folder`, `type`, `aspect`|
    | |`pattern`|Mandatory. Path to the site or folder where custom metadata is applied|Example:<br><br>Site: `pattern="/app: company_home/st:sites/cm:qaext- standard-metadata"`<br><br>Folder: `pattern="/app: company_home/st:sites/cm:qaext- custom-metadata/cm: documentLibrary/cm:numericmetadata"`|
    | |`showEmailDialog`|Controls metadata dialog behavior|`true`: metadata dialog displayed (default)<br><br>`false`: metadata dialog not displayed|
    | |`showDocumentDialog`|Controls metadata dialog behavior|`true`: metadata dialog displayed (default)<br><br>`false`: metadata dialog not displayed|
    |`target`|`useTags`|Controls use of tags|`true`: tags are permitted<br><br>`false`: tags are not permitted|
    | |`emlType`|Type of .EML files| |
    | |`msgType`|Type of .MSG files| |
    | |`attachmentType`|Type of attachments| |
    | |`docType`|Type of documents| |
    | |`schemaID`|Schema ID|Example: <br><br>`c9379665`: Cryptic ID specified by server<br><br>`TEST-FOLDER-SCHEMA-ID`: Custom schema ID|
    | |`default`|Default metadata scheme to display|`true`|
    |`property`|`name`|Name of the custom property|Text format|
    | |`allowedValues`|List of permitted values|Text format|
    | |`allowedCategoryValues`|Path to the list of permitted values|Text format|
    | |`defaultValue`|Default value to display|Text format|
    |`ui`|`multiline`|Controls use of multiple lines in a box|`true`: multiple lines are permitted<br><br>`false`: multiple lines are not permitted|
    | |`validationMsg`|Defines validation message| |
    | |`editable`|Controls if a field is editable|`true`: field is editable<br><br>`false`: field is read-only|

5. To turn off the metadata dialog completely, use this example:

    ```xml
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-1-site-no-metadata">
    </match>
    ```

    This rule turns off the metadata dialog for all folders under the site `my-example-1-site-no-metadata`.

6. To enable a Tags field only in the metadata dialog, use this example:

    ```xml
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-2-site-only-tags" >
        <target useTags="true" emlType="wpsmail-qa-ext:custom-eml" msgType="wpsmail-qa-ext:custom-msg" attachmentType="wpsmail-qaext:custom-attachment">
        </target>
    </match>
    ```

    In this example, the only available child element is `<target>`. In `<target>` you can specify `useTags`, `emlType`, `msgType`, and `attachmentType` as attributes. If you set the attributes `emlType`, `msgType`, or `attachmentType`, you can assign your own custom type to the uploaded EML, MSG, or attached object. The server automatically creates the corresponding nodes with the correct type during the upload. In the example shown:

    * The Tags metadata dialog is enabled (`useTags="true"`)
    * Automatic type conversion takes place during upload:
        * For EML files, the node type is set to the `wpsmail-qa-ext:custom-eml`
        * For MSG files, the node type is set to the `wpsmail-qa-ext:custom-msg`
        * For email attachments, the node type is set to the `wpsmail-qa-ext:custom-attachment`

    If no type information is present, the default `cm:content` type is used for all nodes stored in Share. The `<target>` element can contain 0 or more child elements called `<property>`.

    In the `<property>` tag:

    * Use the `name` attribute to set a valid model property like `cm:name`
    * Use the `<ui>` child element to control how the fields are displayed in the metadata dialog

7. To add standard metadata fields to the metadata dialog, use this example:

    ```xml
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-3-site-standard-metadata" >
       <target>
          <property name="cm:title" />
          <property name="cm:description">
            <ui multiline="true"/>
          </property>
       </target>
    </match>
    ```

    In this example, the user sees a metadata dialog with two fields; one for `cm:title` and one for `cm:description` when they upload files to the `my-example-3-site-standard-metadata` site.

    The `cm:description` field can contain multiple lines by setting `<ui multiline="true"/>`.

8. To add numeric, date/time and boolean metadata fields to the metadata dialog, use this example:

    ```xml
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

    In this example, the user sees a metadata dialog for all files uploaded to the `numeric-metadata-date` folder (or its sub folders) on the `myexample-4-site` site. The dialog will contain four fields with custom numeric data in float, double, int and long format.

    The `<hr/>` element adds a horizontal line to the metadata dialog.

    Three additional fields are available; a date field and a date time field (both displayed using a calendar widget), and a boolean field (displayed using a radio button widget).

9. To add list constraint fields to the metadata dialog, use this example:

    ```xml
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-5-site/cm:documentLibrary/cm:list-metadata" >
       <target>
         <property name="wpsmail-qa-ext:list-metadata-country-text" allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Regions/cm:EUROPE/cm:Northern_x0020_Europe" />
         <property name="wpsmail-qa-ext:list-metadata-languagetext" allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Languages" />
         <property name="wpsmail-qa-ext:list-metadata-greekalphabet-text" defaultValue="Iota" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-greek-alphabet.txt" />
         <property name="wpsmail-qa-ext:list-metadata-arabicnumerals-int" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-arabic-numerals.txt" />
         <property name="wpsmail-qa-ext:list-metadata-romannumerals-text" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-roman-numerals.txt" />
         <property name="wpsmail-qa-ext:list-metadata-vegetabletext" />
       </target>
    </match>
    ```

    There are three ways to define list constraints in the metadata dialog. You can reference:

    * A category root
    * A text file with a number of list entries
    * A property that has a LIST constraint in the model

    In this example, when a file is uploaded to the `list-metadata` folder on the `my-example-5-site` site, the metadata dialog shows six different fields. The field with the attribute name `wpsmail-qa-ext:list-metadata-country-text` shows only categories that are located in `cm:categoryRoot/cm:generalclassifiable/cm:Regions/cm:EUROPE/cm:Northern_x0020_Europe`.

    You can also define your own value list and save it as a text file in Share. Reference the location of your list file in the `allowedValues` attribute. Set a default value from your value list in the `defaultValue` attribute.

    >**Note:** You can use `defaultValue` to set the default value of text fields, checkboxes, and other fields. It's not limited to working in combination with lists.

    In the example, the `wpsmail-qa-ext:list-metadata-greek-alphabet-text` attribute references `/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-category-list-greek-alphabet.txt` in the `allowedValues` attribute. The metadata dialog fills in the value `Iota` as a default value.

10. To add type mapping fields to the metadata dialog, use this example:

    ```xml
    <match type="type" pattern="wpsmail-qa-ext:invoice-type-folder" >
       <target>
         <property name="wpsmail-qa-ext:invoice-number" />
         <property name="wpsmail-qa-ext:invoice-amount" />
       </target>
    </match>
    ```

    The match type is defined in the model as `wpsmail-qa-ext:invoice-type-folder`. Every time a file is uploaded to a folder with the type `wpsmail-qa-ext:invoice-type-folder`, the metadata dialog displays two fields with custom metadata. In this example, these fields are `wpsmail-qa-ext:invoice-number` and `wpsmail-qa-ext:invoice-amount`.

11. To add aspect mapping fields to the metadata dialog, use this example:

    ```xml
    <match type="aspect" pattern="wpsmail-qa-ext:claims-aspect-folder" >
       <target>
         <property name="wpsmail-qa-ext:claims-value" />
       </target>
    </match>
    ```

    The matching aspect is defined in the model as `wpsmail-qa-ext:claims-aspect-folder`. Every time a file is uploaded to a folder with the type `wpsmail-qa-ext:claims-aspect-folder`, the metadata dialog displays one field with custom metadata. In this example, this field is `wpsmail-qa-ext:claims-value`.

    Here is a complete example of metadata settings:

    ```xml
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
        <!-- For "List Metadata" folder of "Custom metadata" Site -->
        <match type="folder" pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:list-metadata" >
           <target>
              <property name="wpsmail-qa-ext:list-metadata-countrytext" allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Regions/cm:EUROPE/cm:Northern_x0020_Europe" />
              <property name="wpsmail-qa-ext:list-metadata-languagetext" allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Languages" />
              <property name="wpsmail-qa-ext:list-metadata-greekalphabet-text" defaultValue="Iota" allowedValues="/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-categorylist-greek-alphabet.txt" />
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
              <property name="wpsmail-qa-ext:vendor-name" allowedValues="/app:company_home/app:dictionary/cm:alfresco_mail_integration_ext_constraints/cm:ext-categorylist-greek-alphabet.txt" />
              <property name="wpsmail-qa-ext:invoice-amount" />
           </target>
        </match>
        <!-- For "Claims Aspect" folder of "Custom metadata" Site -->
        <match type="aspect" pattern="wpsmail-qa-ext:claims-aspectfolder" >
           <target>
              <property name="wpsmail-qa-ext:claims-value" />
              <property name="wpsmail-qa-ext:claims-type" allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Software_x0020_Document_x0020_Classification" />
           </target>
        </match>
    </metadata>
    ```

12. To automatically populate predefined metadata, use this example:

    We are defining two properties for automatic population, called `source` and `source-type`:

    ```xml
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

    `source` is set to Outlook, and `source-type` is set to 123:

    ```xml
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

13. To set the type (`docType`) for all files that are dragged and dropped into Share, use this example:

    We are setting the type of incoming files to `gsliu:uwdoc`:

    ```xml
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

    * `emlType` defines the type of the eml object that represents the email in the document library.
    * `msgType` defines the type of the original MSG file that is stored in a hidden folder and linked to the email (if the option **Store original MSG** is enabled).
    * `attachmentType` defines the type of the attachments that are extracted from the email. The objects are stored in a hidden folder and linked to the email.

    The `docType` attribute is relevant when a user moves documents to the repository. This happens when a user:

    * Drags and drops a document from the desktop to the Alfresco sidebar in Outlook
    * Drags and drops a document that is listed as an email attachment to the Alfresco sidebar in Outlook

    >**Note:** Make sure that you set `docType` to ensure that the custom type is inherited.

14. To provide multiple content metadata options in the metadata dialog, use this example:

    ```xml
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

    >**Note:** Once a user has uploaded content into a location where a `schemaID` is configured, this ID shouldn't be changed, otherwise the Alfresco Outlook Client won’t find the metadata assigned to that content.

15. To define a custom validation message in the metadata dialog, use this example:

    ```xml
    <property name="wpsmail-test:test-aspect-for-metadata-date">
        <ui validationMsg="MM/DD/YYYY"/>
    </property>
    ```

    In this example, the validation message for the date property is shown as `MM/DD/YYYY`. This message is displayed to the user as a guideline of what values a particular field can take.

    This attribute can contain either a direct message, as in the example above, or a reference to message bundle key.

    If the attribute contains a reference to a property key that is available in a properties resource bundle in your system, the scheme name can be localized: `validationMsg="com.company.outlook.validationMsg.1.name"`

16. To define a metadata field as read-only, use this example:

    ```xml
    <property name="wpsmail-test:test-aspect-for-metadata-boolean">
        <ui editable="false"/>
    </property>
    ```

    In this example, the boolean field is presented as a read-only field.

17. To provide multiple folder metadata options when users create and update folders, use this example:

    ```xml
    <match pattern="/app:company_home" type="folder">
        <target name="No Metadata" schemaId="99ef8057" />
        <target folderType="cm:folder" name="Payload Target" schemaId="TEST-FOLDER-SCHEMA-ID" useTags="true">
            <property name="wpsmail-test:test-aspect-for-metadata-date">
                <ui validationMsg="MM/DD/YYYY"/>
            </property>
        </target>
    </match>
    ```

    The custom metadata for folders is enabled by selecting the checkbox in the **Custom folder metadata** configuration field.

    This rule allows you to add multiple `target` elements to configure different sets of folder metadata fields that are presented to the user when they create new folders or edit the metadata. This is useful when users want to upload different types of folders in one particular location, and so you can assign different sets of metedata depending on the type of folder.

    For users to be able to distinguish between multiple metadata schemes, assign meaningful names to the `<target>` elements by using the `name` attribute. If there are multiple `<target>` elements defined for one location, you can set a default by defining the attribute `default="true"`. You can also add a custom validation message to a field, and set a field to read-only, similar to configuring custom content metadata.

18. To customize the behavior of the metadata dialog for all files that are dragged and dropped into Alfresco Outlook Client, use this example:

    ```xml
    <match pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:various-metadata" type="folder" showEmailDialog="false" showDocumentDialog="true">
        ...
    </match>
    ```

    The `showEmailDialog`, and `showDocumentDialog` attributes allow you to control what happens when a user moves emails or other documents into Alfresco:

    * `showEmailDialog` defines if the metadata dialog opens when a user drags and drops an email object, with or without attachments, into the Alfresco Outlook Client.
    * `showDocumentDialog` defines if the metadata dialog opens when a user drags and drops an email attachment document or other document from the desktop into the content repository.

    If both attributes are set to `false`, the metadata dialog is not shown when emails or documents are either dragged and dropped or archived directly.

19. To configure the list view displayed at a specific navigation location, use this example:

    ```xml
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

    This rule allows you to deviate from the default column settings when the Alfresco Outlook Client presents content in the specified `numeric-metadata` folder (and its sub folders) on the `qa-ext-custom-metadata` site. The `<match>` rule is added into an `<overrides>` section of the XML configuration. In this example, when a user navigates to this location or starts a search in this location, an alternative list view is presented. The dialog shows four fields with custom numeric data in float, double, int, and long format.

    Instead of using a folder, the `<match>` tag can be used with an aspect, for example:

    ```xml
    <match pattern="cm:aspectName" type="aspect" name="myListSettingsForAnAspect">
    ```

    If no `type` is given, the pattern will be treated as a folder.

    Note how the rule is similar to the custom content metadata configuration. The `<list-view>` and `<match>` elements can be assigned names, which will be displayed in the list view configuration of the Alfresco Outlook Client. The user can still define which columns of a particular server-side list view configuration are enabled/disabled.

20. To provide users with the capability to rename the email subject before uploading it to the repository, use this example:

    ```xml
    <match pattern="/app:company_home" type="folder">
        <target>
            <property name="cm:subjectline" />
        </target>
    </match>
    ```

21. To use wildcards, add the asterisk character in the folder path, for example:

    ```xml
    <match type="folder" pattern="/app:company_home/st:sites/*/cm:standard-metadata-folder" >
        <target>
            <property name="cm:title" />
            <property name="cm:description">
                <ui multiline="true"/>
            </property>
        </target>
    </match>
    ```

    This rule allows you to assign metadata to every `standard-metadata-folder` located under any `st:sites`, and with any number of folders between `st:sites` and `cm:standard-metadata-folder`.

    Here is another example to show how the asterisk can be used in multiple locations:

    ```xml
    <match type="folder" pattern="/app:company_home/st:sites/*/cm:testfolder/*/cm:metadatafolder1">
    ```

    You can also use the asterisk wildcard in this way:

    ```xml
    <match type="folder" pattern="/app:company_home/st:sites/cm:test*/cm:metadatafolder1">
    ```

    > **Note:** An exact match of the folder without a wildcard takes priority over the wildcard pattern.

22. Starting from Outlook Integration 2.9.1, you can configure a dependent picklist that defines a constraint between two lists of values. For example:

    ```xml
    <match pattern="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:list-metadata" type="folder">
        <target default="true" name="List Metadata" schemaId="81143a75">
            <property allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Regionen/cm:EUROPA/cm:Nördliches_x0020_Europa" name="wpsmail-qa-ext:list-metadata-country-text">
                <picklist targetProperty="wpsmail-qa-ext:list-metadata-language-text">
                    <controllingField name="United Kingdom">
                        <value name ="English"/>
                        <value name ="Scottish"/>
                        <value name ="Irish"/>
                        <value name ="Welsh"/>
                    </controllingField>
                    <controllingField name="Germany">
                        <value name ="German"/>
                    </controllingField>
                    <controllingField name="Spain">
                        <value name ="Spanish"/>
                    </controllingField>                    
                </picklist>
            </property>
            <property name="wpsmail-qa-ext:list-metadata-languagetext" allowedCategoryValues="cm:categoryRoot/cm:generalclassifiable/cm:Languages" />
         </target>
    </match>
    ```

    If a property controls more than one dependent drop-down list, you can define `<picklist>` multiple times under the `<property>` tag.

    In this example, the first defined property contains a picklist to control the second property. When selecting a value for the first property, the Outlook plugin will try to find a corresponding entry in the configuration by using the `<controllingField>`.

    * If a match is found, the plugin filters the second property to only show the specified values.
    * If no matching `<controllingField>` is found, the second property shows all available values.

    Here is an example of how the dependency works.

    | Drop-down box 1 values | Drop-down box 2 values |
    | ---------------------- | ---------------------- |
    | {::nomarkdown}<ul><li>United Kingdom </li><li>Germany </li><li>Spain </li><li>France </li></ul>{:/} | {::nomarkdown}<ul><li>English </li><li>German </li><li>Spanish </li></ul>{:/} |

    When you select `Spain` in the first drop-down box, the second drop-down only allows you to select the value `Spanish`. However, when you select `France` in the first drop-down, the second drop-down shows all available languages without filtering, because `France` isn't configured as a `<controllingField>`.

23. Save your changes and restart Microsoft Outlook.

    The template changes are applied.

    You can download the custom content metadata, custom folder metadata, and list view settings locally by clicking **Download configuration**.

### Configure search settings

You can configure search settings for the Outlook Integration using Share Admin Tools. These settings define global controls across your enterprise and are applied immediately.

1. Open Alfresco Share, and click **Admin Tools** on the toolbar.

2. Click **Search Settings** then **Edit**.

    See [Outlook search settings](#detailedconfigsearchsettings) for more detailed guidance on adding search settings.

3. Paste the XML code that contains the configuration settings for the Alfresco Outlook Client into the **Configuration XML content** field, or load and edit the default configuration template by clicking **Load default configuration template**.

    You can use the default configuration template for testing purposes, and edit this if you prefer.

4. Click **Apply** to save.

    If your XML isn't valid, you won't be allowed to save your settings, and you'll see an error message.

#### Detailed config of search settings {#detailedconfigsearchsettings}

Use this guidance to configure simple and advanced search criteria in Outlook.

You can configure the search criteria presented when a user starts a search in Outlook. This configuration supports the content models, including data types, constraints, lists, regular expressions and other attributes.

You can configure navigation-sensitive simple and advanced searches based on the search location. Use the **Custom simple search** to configure a simple search, where the Outlook Integration includes the metadata fields in the search dynamically for the search term provided. Use the **Custom advanced search** to configure an advanced search, where the search form adapts dynamically so different fields are shown, depending on the navigation context of the user.

When a user starts a search, the Outlook Integration finds the best match for the metadata dialog. The `<match>` element uses the first rule that matches the attributes in the tag. If you are using multiple rules,
you should always start with the most specific rule first.

In the `<match>` element:

1. Define the match type. This can be a folder, type or aspect.

2. Define the match pattern. This can be the location of the folder (defined in xpath format), or it can be based on a defined model, type, or aspect.

See examples of how to use these search settings below.

1. Open Alfresco Share, and click **Admin Tools** on the toolbar.

2. Click **Search Settings** then **Edit**.

    You can configure XML settings for **Custom simple search**, and **Custom advanced search**.

3. You can load and edit the default configuration template for each section by clicking **Load default configuration template**.

    Here is the full list of metadata settings that you can configure:

    |Section name|Key name|Description|Values|
    |------------|--------|-----------|------|
    |`match`|`type`|Mandatory. Defines type of the attribute|`folder`, `type`, `aspect`|
    | |`pattern`|Mandatory. Path to the site or folder where custom metadata is applied|Example:<br><br>Site: `pattern="/app: company_home/st:sites/cm:qaext- standard-metadata"`<br><br>Folder: `pattern="/app: company_home/st:sites/cm:qaext- custom-metadata/cm: documentLibrary/cm:numeric-metadata"`|
    |`target`|`useTags`|Controls use of tags|`true`: tags are permitted<br><br>`false`: tags are not permitted|
    | |`useText`|Controls use of full-text search|`true`: full text search permitted<br><br>`false`: full text search not permitted|
    |`property`|`name`|Name of the custom property|Text format|
    | |`allowedValues`|List of permitted values.|Text format|
    | |`allowedCategoryValues`|Path to the list of permitted values|Text format|
    |`ui`|`multiline`|Controls use of multiple lines in a box|`true`: multiple lines are permitted<br><br>`false`: multiple lines are not permitted|

4. To apply default search criteria for the whole repository, use this example:

    ```xml
    <match pattern="/app:company_home/st:sites/cm:myexample-1-site-standard-search" >
        <target useTags="true" useText="true">
            <property name="cm:title"/>
            <hr/>
            <property name="cm:description">
              <ui multiline="true"/>
            </property>
        </target>
    </match>
    ```

    In this example, the only available child element is `<target>`. In `<target>` you can specify `useTags` and `useText` as attributes. In the example shown:

    * The Tags search field is enabled (`useTags="true"`)
    * The Text search field is enabled (`useTags="true"`)

    The user sees a search dialog with several fields including `cm:title` and `cm:description`. This allows the user to search for documents and folders by title and description, as well as by tags, and through the full text of documents.

    The `cm:description` field can contain multiple lines by setting `<ui multiline="true"/>`.

    The `<hr/>` element adds a horizontal line to the search dialog.

    If no type information is present, the default `cm:content` type is used for all nodes stored in Share. The `<target>` element can contain 0 or more child elements called `<property>`.

    In the `<property>` tag:

    * Use the `name` attribute to set a valid model property like `cm:title`
    * Use the `<ui>` child element to control how the fields are displayed in the search dialog

5. To add numeric fields to the search dialog, use this example:

    ```xml
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-2-site-custom-metadata/cm:documentLibrary/cm:numeric-metadata" >
        <target>
            <property name="wpsmail-qa-ext:number-metadata-float" />
            <property name="wpsmail-qa-ext:number-metadata-double" />
            <property name="wpsmail-qa-ext:number-metadata-int" />
            <property name="wpsmail-qa-ext:number-metadata-long" />
        </target>
    </match>
    ```

    In this example, the user sees a different search dialog in the `numeric-metadata` folder (or its sub folders) on the `myexample-2-site` site. The dialog will contain four fields with custom numeric data in float, double, int and long format.

    If the above example is applied to the **Custom advanced search** configuration, the user sees the default search fields for any site or folder in the repository except in `myexample-2-site/custom-metadata/numeric-metadata`.

    If the above example is applied to the **Custom simple search** configuration, the Outlook Integration uses the search criteria mentioned in the `<target>` element only to find search results.

6. To apply search criteria using an aspect, use this example:

    ```xml
    <match type="aspect" pattern="cm:versionable">
        <target useTags="true" useText="true">
            <property name="cm:title"/>
            <hr/>
            <property name="cm:description">
                <ui multiline="true"/>
            </property>
        </target>
    </match>
    ```

7. To use wildcards, add the asterisk character in the folder path, for example:

    ```xml
    <match pattern="/app:company_home/st:sites/*/cm:myexample-1-site-standard-search" >
        <target useTags="true" useText="true">
            <property name="cm:title"/>
            <hr/>
            <property name="cm:description">
                <ui multiline="true"/>
            </property>
        </target>
    </match>
    ```

    Starting from Outlook Integration 2.8.1, this rule allows you to assign the search configuration to every `myexample-1-site-standard-search` located under any `st:sites`, and with any number of folders between `st:sites` and `myexample-1-site-standard-search`.

    Here is another example to show how the asterisk can be used in multiple locations:

    ```xml
    <match pattern="/app:company_home/st:sites/*/cm:testfolder/*/cm:myexample-1-site-standard-search">
    ```

    You can also use the asterisk wildcard in this way:

    ```xml
    <match pattern="/app:company_home/st:sites/cm:test*/cm:myexample-1-site-standard-search">
    ```

    > **Note:** An exact match of the pattern without a wildcard takes priority over the wildcard pattern.

8. Click **Apply** to save your changes and restart Microsoft Outlook.

    The template changes are applied.

    If your XML isn't valid, you won't be allowed to save your settings, and you'll see an error message.

    You can download the custom simple search and custom advanced search settings locally by clicking **Download configuration**.

### Configure email settings {#configoutlookemailsettings}

You can configure email integration settings for the Outlook Integration using Share **Admin Tools**.
These settings define global controls across your enterprise and are applied immediately.

1. Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

    The URL is:

    ```html
    http://localhost:8080/share/page/console/admin-console/mail-customization-config
    ```

    where `localhost:8080` is your Alfresco server and port number.

2. Select **Integration Settings** from the Tools menu and click **Edit**.

3. In **Browse sites** you can specify which sites are displayed when you select an email and use the **Archive Directly** right click option in the Alfresco Outlook Client.

    Options are **All public sites**, **My sites** or **Favorite sites**.

    >**Note:** Outlook users are able to change this and other settings locally for the Alfresco Outlook Client. See [Configure extended settings in Outlook](#configure-extended-settings) for more information.

4. In **Prevent email duplication in**, choose to check the uniqueness of files and at what level.

    When a new email document is uploaded, the server checks if it has already been archived in the repository. As an administrator, you can configure the server to check for existing email documents in the repository or at the site level. Select one of the following values:

    1. **None**: duplication check is not required.

    2. **Repository**: emails with same messageID are not allowed across the whole repository.

    3. **Site**: emails with same messageID are not allowed across a site.

    >**Note:** If an email is dropped into a folder, where the same email document already exists, the version detection feature will recognize it, and the **Versioning** dialog is displayed. See [Managing file versions in Outlook]({% link microsoft-outlook/2.10/using/index.md %}#managing-file-versions-in-outlook) for more details.

5. If you have an Alfresco Application Development Framework (ADF) application installed, such as the Digital Workspace, you can configure your Outlook clients to use links to it instead of Alfresco Share. For example, if you want to view the document details page, this configuration will open the relevant page in Digital Workspace instead of Share.

    In **ADF App Base URL**, set the path to something like:

    ```http
    http://localhost:8081/digital-workspace
    ```

6. Specify a number in **Page size** to limit the number of files and folders visible at a time in the Explore view of the Alfresco sidebar in Outlook.

    >**Note:** Entering a value of 0 removes any limit on the number of files and folders displayed.

7. Specify a number in **Maximum number of search results** to limit the number of results returned in the Alfresco sidebar in Outlook.

    >**Note:** Entering a value of 0 removes any limit.

8. Check **Automatically convert emails (EML, MSG) uploaded using Share, CIFS, WebDAV, FTP, NFS** if you want every email (EML / MSG) which is uploaded from Share, CIFS, WebDAV, FTP or NFS (for example, uploading using an integrated WebDAV folder in the Windows tree structure) to be converted in exactly the same way, as if it were uploaded through Outlook.

    **Module version** displays the version of the Alfresco Outlook Client.

9. Check **Auto configure all clients** if you want every connected client with an installed Alfresco Outlook Client to receive the configuration settings automatically.

    Checking this box activates **Allow overwriting**.

    1. Check **Allow overwriting** to set global general settings for the Outlook Client.

    2. Paste the XML code that contains the configuration settings for the Alfresco Outlook Client into the **Configuration XML content** field, or load and edit the default configuration template by clicking **Load default configuration template**.

10. Check **Enable attachment stripping** to upload attachments to the selected site in the Alfresco repository. In the email they are replaced with a link to the repository file.

    If **Enable attachment stripping** is enabled, the **Target site** field becomes mandatory (in order that the files are stored in the designated repository).

    >**Note:** Automated attachment stripping isn't supported for meetings and appointments.

11. Click **Select** next to the **Target site** field to specify the Alfresco site where you want to store attachments. Click the plus (+) sign next to your chosen site, and **OK** to add it.

    Only one site can be specified in this field.

12. Select one or both of the stripping rules:

    Wildcard characters can't be used in these fields, and if selected, they can't be left blank.

    1. **Strip attachments when all recipients have the following domain**: type the required domain name.

    2. **Strip attachments when recipient list contains the following email address**: type the required email address.

13. Specify a number in **Min size in KB**. This number controls the minimum size of attachment that is stripped; for example, to exclude company logos or very small attachments.

14. Click **Manage** to prevent stripping of media in the email signature.

    Enter a space delimited list of file extensions or files that you don't want stripped from the email, for example;

    ```text
    test.docx *.txt *.xlsx
    ```

15. Click **Enable custom labels for Email as Link action** to define properties that determine what text is shown when you select **Email as link** in Alfresco.

16. Specify the Subject text that you would like to be displayed in the **Email as link in subject prefix** field.

17. Specify the Action text that you would like to identify in the **Email as link action text**; for example, **Click to view file {0}** displays the file name at the end of the label.

18. Click **Enable upload restrictions** and **Manage** to specify content that can't be uploaded from the Outlook Client.

    * Enter a space delimited list of file extensions or files that you don't want to be uploaded to Alfresco, for example;

    ```text
    *.docx *.txt *.xlsx
    ```

    >**Note:** Only content that is uploaded in the Alfresco Outlook Client is restricted. If you upload content directly to Alfresco (through Share), it isn't restricted.

19. Click **Apply** to save your settings.

    * Specify the maximum number of files for the folder upload.

    This limits the number of files that your users can drop at once onto the plugin to reduce server load.

    * Specify the maximum combined file size in MB.

    This sets a limit for the folder size that your users can drop onto the plugin.

20. Click **Apply** to save your settings.

### Configure other settings

You can view and edit other settings for the Outlook Integration using Share **Admin Tools**.
These settings define global controls across your enterprise.

1. Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

2. Select **Access Tokens** from the Tools menu and click **Edit**.

    In the list of access tokens, there is information about logged in users.

3. Select **Remove** or **Remove all** to disconnect individual (or all) users.

4. Select Licenses from the Tools menu and click **Edit** to add new licenses.

    See [Installing server and client licenses in Alfresco Share]({% link microsoft-outlook/2.10/install/index.md %}#installserverclientlicenses) for more information about installing licenses.

5. Select **System Info** from the Tools menu to view system information.

6. Select **Download all settings** to download all your email configuration server settings locally as a zip file.

    This may be useful to share with our Support team, if requested.

## Microsoft Outlook configuration

This section contains Microsoft Outlook configuration instructions for the Outlook Integration.

### Configure connection settings

Configure Microsoft Outlook to find and connect to the correct Alfresco server.

1. Select **Configure > Connection** from the Alfresco Client tab in Microsoft Outlook.

2. In **Server URL**, type the address of the Alfresco server that you want to connect to.

    Type only the information before `/share`. For example, `https://IP address` or `server name`:`port number`.

    >**Note:** For the HTTPS connection to work from the Alfresco Outlook Client to Alfresco, we strongly recommend using an SSL configuration for a production environment, as a self-signed certificate will not work.

3. In **Alfresco Repository path**, type the name of the Alfresco repository.

    >**Tip:** This is often `alfresco`.

4. In **Alfresco Share path**, type the name of the Alfresco Share instance.

    >**Tip:** This is often `share`.

    Alternatively, specify an alternative Share URL in the **Alternative Share URL** field, if Alfresco and Share are running on different servers.

5. Select either **Windows authentication** or **Standard** authentication.

    If you select standard authentication, enter your Alfresco user name and password. If you select Windows authentication, the `passthru` authentication is used. For more information about authentication subsystem types, see [Authentication subsystem types]({% link content-services/latest/admin/auth-sync.md %}#Authentication subsystem types).

6. Click **Check connection** to test the connection to the Alfresco server.

### Configure email archive settings

You can configure Microsoft Outlook to archive email in Alfresco, including archiving emails as links.

You can decide what format you want to use to save your emails, and how to archive your emails. In **Email Archiving**, take one or more of the following actions:

* Save the original Outlook MSG file in Alfresco with the original email
* Save attachments as separate files in Alfresco
* Save email as a link to the content in Alfresco
* Use default settings for archiving (where all emails are saved to the Alfresco server, based on the option selected in **Default archive** settings)
* Show settings when archiving (to select how each email will be archived)
* Compress the email message when uploading the content
* Always use the default folder

You can reduce the size of your Outlook inbox by replacing emails with links to the content in Alfresco:

1. Select **Configure > Email Archiving** from the **Alfresco Client** tab in Microsoft Outlook.

2. Click **Replace content with links** and your preferred option in **Email archive** settings.

    **Replace content with links** saves the email (as an EML file) in Alfresco and a link (without text and attachments) in Microsoft Outlook.

    If you click the **Download original email message** link in an archived email, the original email is loaded from Alfresco and can be opened in Outlook.

Outlook emails are archived to the Alfresco server, and can be accessed using links in Microsoft Outlook.

#### Configure alternative naming of emails {#configalternativenamingemails}

You can configure Microsoft Outlook to archive email in Alfresco using an alternative naming convention. By default, the Alfresco Outlook Client shows the subject line for emails instead of the name. This allows to change the name of an email document that's displayed in the Alfresco Outlook Client, in Alfresco Share or in Webdav.

Previously, changes to the `cm:name` attribute in Share or Webdav did not affect the name that was displayed in the Alfresco Outlook Client. In addition, if you used a naming convention for emails saved in your file system (for example, on a networked drive), when you moved these files into Alfresco via the Alfresco Outlook Client, the file name of the document was not saved as the email name in the Alfresco Outlook Client. Instead, the email was named using the email subject, so you needed to manually rename each email after the upload.

#### Alternate naming settings

You can change the default behavior for archiving email to display the `cm:name` attribute in the **Name** column in the Alfresco Outlook Client. Since the `cm:name` might not look like the subject line, special characters need to be replaced. As an administrator, you can change the display attribute for the email name in the [Alfresco Client Settings file](#advanced-configuration) XML file.

As an administrator, you can decide if email names should be derived from the email document's file name or its subject line when uploaded from the desktop. For example, you can add the following attributes to the XML file to enable each setting:

```xml
<feature useFilenameOnUploadMsg="true" useFilenameOnRenderMsg="true" />
```

>**Note:** These attributes are not exposed in the UI for Alfresco Outlook Client settings.

See [Alfresco Client Settings file](#advanced-configuration) for more details.

### Configure Send and Archive

You can decide whether to use a default folder for every email sent with the **Send and Archive** button or always receive a prompt to choose a folder.

1. Select **Configure > Email Archiving** from the **Alfresco Client** tab in Microsoft Outlook.

2. Select **Always use default folder**, choose a folder in the **Folder selection** window, and click **OK** to save your selection.

3. Select **Open default folder** to open the folder in a new browser window, for example, if you wish to change your selection.

4. Click **OK** to save your **Email Archiving** settings.

See the `<storage>` section in [Alfresco Client Settings file](#advanced-configuration) for more details.

### Configure extended settings

You can configure Outlook extended settings; for example, change the display language, Alfresco settings, or drag and drop priorities.

1. Select **Configure > Extended** from the **Alfresco Client** tab in Microsoft Outlook.

2. **Language**: Choose the display language.

    >**Note:** You can also change the display language by selecting **Language** from the **Alfresco Outlook** toolbar tab.

3. **Theme**: Choose the theme for the Outlook plugin.

    >**Note:** Restart Microsoft Outlook to apply the new theme.

4. **Show Alfresco Outlook Client**: Show or hide the **Alfresco Outlook Client** panel (the Alfresco sidebar).

    >**Note:** This box is checked automatically if you have selected **Show Sidebar** from the **Alfresco Client** tab in Outlook.

5. **Show sidebar for new emails**: Show or hide the Alfresco sidebar in emails that are open in a current window.

6. **Repository root**: Select whether the Alfresco sidebar and **Archive Directly** right click option allow you to see certain sites (**Sites only**) or all of Alfresco (**Full repository**).

7. **Browse Sites**: Specify the default selection for the **Sites** list that is displayed in the **Explore** tab of the Alfresco sidebar.

8. **Drag and drop priority**: Defines the priority for drag and drop from Alfresco:

    * **File**: Use drag and drop to attach a file from Alfresco into an email as a binary attachment. Hold down the Control (Ctrl) key to link files from Alfresco to the email as HTTP links.
    * **Link**: Use drag and drop to add files from Alfresco to the email as HTTP links. Hold down the Control (Ctrl) key to add files from Alfresco to the email as binary attachments.
    * **PDF**: Use drag and drop to convert Office files to PDF format and attach them to email.
    * **Link to PDF**: Use drag and drop to convert Office files to PDF format and add to the email as an HTTP link.

9. **Use web URIs for**: Controls the target application for calling a browser directly from Outlook.

    Options are:

    * Alfresco Share (standard)
    * Alfresco ADF (Application Development Framework)

    The location of the ADF client application must be configured in Share Admin Tools by your IT team.

10. **Show tooltip on email hover**: Select to see a tool tip when you hover over an email.

11. **Use default web browser**: Select whether the default browser should be used to open files.

12. **Enable debug logging**: Check to enable logging for debug purposes. Check the log file by clicking **Open Log**.

13. **Folder sort order**: Select the order you want for your Alfresco folders. Choose from **Name and subject (ascending)**, **Name and subject (descending)**, **Date modified (ascending)**, or **Date modified (descending)**.

14. **Date sort display options**: If you select **Date modified (ascending)** or **Date modified (descending)** you can choose the display format from **Subject or name**, **Date and subject**, or **Date/time and subject**.

### Configure views

You can configure the look and feel of the Alfresco sidebar.

You can configure which fields are visible in the list view of the Alfresco sidebar.

1. Select **Configure > Views** from the **Alfresco Client** tab in Microsoft Outlook.

    If your IT team has configured the list view so that you can't edit your settings locally, the buttons on this tab are grayed out.

2. Check all columns that you want to see in the list view in the sidebar.

    You can also move columns up and down (for example, if you want to see the name of a file or folder before the modified date, you can move that column name higher. **Type** is not editable and is always visible. This column is displayed as an icon representing a site, file, or folder.

    If your IT team has assigned an alternative column configuration for a specific site, folder, or content type, you can define different list views for each location.

3. Click **Reset** to restore the default column views.

    See [Configuring Outlook metadata and list view settings in Alfresco Share](#configmetadataandlistview) for more information.

4. Click OK to save.

### Import the configuration template

Set the configuration template to import when the configuration dialog is called for the first time.

1. Select **Configure > Configuration** from the **Alfresco Client** tab in Microsoft Outlook.

2. Click **Apply central settings** to apply settings that have been defined in Alfresco Share **Admin Tools > Outlook Integration > Integration Settings > Auto configure all clients**.

    For more information, see [Configuring Outlook email settings in Alfresco Share](#configoutlookemailsettings).

### Advanced configuration

Use the Alfresco Client Settings XML file for advanced configuration of Alfresco Microsoft Outlook client.

The `AlfrescoClientSettings-2.10.x.xml` file contains advanced configuration properties.
Use this file to set up attributes and metadata settings.

1. Locate and open `AlfrescoClientSettings-2.10.x.xml` in the `C:\Users\<username>` directory, where `<username>` is your Windows user name.

    The `<outlook>` section contains elements that you can configure to customize the Alfresco Outlook Client, and also additional `<storage>`, `<connection>`, `<logging>`, `<restrictions>`, and `<tabs>` sections:

    Here is a sample configuration file:

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <settings>
      <outlook format="1.0" dragPrio="document" showExplorer="true" showExplorerNew="false" defaultBrowser="true" visibleSites="public" visibleNodes="default" showEmailTooltip="false" hoverPreview="true" isSitesRoot="true" showMySites="false" folderSort="name_asc" dateSortView="subject" sendLinkUrl="details" panelViewMode="tree" searchMode="standard" mailNameDisplayPattern="" culture="en" customAppTitle="" customRibbonTitle="" customMenuTitle="">
        <connection url="http://127.0.0.1:8080/" shareUrl="share" alfrescoUrl="alfresco" login="admin" password="7DkTRpO8sfo=" checkCertificate="true" checkVersion="true" authentication="basic" webApp="2" shareAlterUrl="" settingsCheckInterval="480" />
        <logging minLevel="info" />
        <storage archiveOption="0" storeFiles="true" storeLink="true" storeMsg="false" compress="true" />
        <feature autoPaging="false" tokenAlterMode="false" messageIcon="false" />
        <explorer-search-properties />
        <search-properties />
      </outlook>
    </settings>
    ```

2. Configure the attributes that you need for the base `<outlook>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`dragPrio`|Sets behavior for files that are dragged and dropped into a new email from the Explore tab in the Alfresco sidebar|`document`: attaches to a new email as a file. This is the default setting.<br><br>`link`: a link to a file is created in the email body<br><br>`pdf`: file is converted to PDF format and is attached to a new email<br><br>`pdflink`: a link to the converted PDF file is created in the email body|
    |`showExplorer`|Shows or hides the Explore tab in the Alfresco sidebar|`True`: tab is shown. This is the default setting.<br><br>`False`: tab is not shown.|
    |`showExplorerNew`|Controls the appearance of the Alfresco sidebar in emails that are open in a current window.|`True`: sidebar is shown. This is the default setting.<br><br>`False`: sidebar is not shown.|
    |`defaultBrowser`|Sets the external browser to use to open links to Alfresco|`True`: system default browser is used. This is the default setting.<br><br>`False`: Internet Explorer is used.|
    |`visibleSites`|Sets the sites that are shown in the Explore tab in the Alfresco sidebar|`public`: all sites are visible. This is the default setting.<br><br>`private`: only sites that the current user is a member of are visible<br><br>`favorites`: only sites set by the user as a favorite are visible|
    |`visibleNodes`|Controls content visible in the Explore tab tree view in the Alfresco sidebar|`default`: all files and folders are visible. This is the default setting.<br><br>`favdocument`: only files marked by the user as a favorite are visible<br><br>`favfolder`: only folders marked by the user as a favorite are visible<br><br>`favonly`: only files and folders marked by the user as a favorite are visible|
    |`hoverPreview`|Controls the behavior of the Preview window in the Search tab of the Alfresco sidebar|`true`: preview window is shown when hovering over the found item. This is the default setting.<br><br>`false`: preview window is not shown when hovering over the found item.|
    |`isSitesRoot`|Sets a root folder to show in the Explore tab of the Alfresco sidebar|`true`: root is the Sites folder. This is the default setting.<br><br>`false`: root is the Company Home folder.|
    |`mailNameDisplayPattern=" #subject (#from)"`|Modifies the email appearance in the Explore tab tree view of the Alfresco sidebar|Use these variables to modify the email fields displayed: `#subject`, `#from`, `#to`, `#sent`|
    |`culture`|Sets the language used in Alfresco Outlook Client|Possible settings:`en`: English<br><br>`de`: German<br><br>`es`: Spanish<br><br>`it`: Italian<br><br>`fr`: French<br><br>`ja`: Japanese<br><br>`ru`: Russian<br><br>`zh-cn`: Chinese (Simplified)<br><br>`pt-br`: Brazilian Portuguese<br><br>`nl`: Dutch<br><br>`nb-no`: Norwegian (Bokmal)<br><br>`cs`: Czech<br><br>`da`: Danish<br><br>`sv`: Swedish<br><br>`fi`: Finnish<br><br>`pl`: Polish<br><br>|
    |`customAppTitle`|Renames the Alfresco Outlook Client sidebar|Enter your chosen title as a text string.|
    |`customRibbonTitle`|Renames the Alfresco Client tab|Enter your chosen title as a text string.|
    |`customMenuTitle`|Renames the Alfresco Client option when right clicking a file|Enter your chosen title as a text string.**Note:** If you set this option, the same value is applied to `customRibbonTitle` if `customRibbonTitle` is blank.|
    |`sendLinkUrl`|Controls the behavior of links to files in Alfresco|`details`: link to the Document Details page is created. This is the default setting.<br><br>`download`: link to the Document Download page is created (only applies for Share URLs)|
    |`folderSort`|Sets the sorting options for folders in the Explore tab tree view of the Alfresco sidebar|`name_asc`: folders are sorted in alphabetical order. This is the default setting.<br><br>`name_desc`: folders are sorted in reverse alphabetical order<br><br>`modified_asc`: folders are sorted by date modified ascending<br><br>`modified_desc`: folders are sorted by date modified descending|
    |`dateSortView`|Sets the date sort display options in the Explore tab of the Alfresco sidebar|`subject`: files are sorted by subject or name. This is the default setting.<br><br>`date`: files are sorted by date and subject<br><br>`datetime`: files are sorted by date and time, and subject|
    |`showEmailTooltip`|Controls whether a tool tip is shown when hovering over an email|`true`: tool tip is shown when hovering over the email. This is the default setting.<br><br>`false`: tool tip is not shown when hovering over the email.|
    |`panelViewMode`|Controls the appearance of the Outlook sidebar|`list`: sidebar is shown as a list. This is the default setting.<br><br>`tree`: sidebar is shown as a tree structure.|
    |`searchMode`|Controls the search behavior|`standard`: standard search is used. This is the default setting.<br><br>`advanced`: Advanced search is used.|
    |`showMySites`|Controls the appearance of My Sites site selector|`true`: My Sites site selector is shown. This is the default setting.<br><br>`false`: My Sites site selector is not shown.|
    |`theme`|Sets the theme of the Outlook plugin.<br><br>Added in Outlook Integration 2.9.|`classic`: Classic plugin theme is used. This is the default setting.<br><br>`dark`: Dark theme is used.|
    |`showSpecificLanguages`|Sets the available languages of the Outlook plugin.<br><br>Added in Outlook Integration 2.9.2.|`empty`: All supported languages can be selected. This is the default setting.<br><br>`en,de,fr`(example): Only English, German and French can be selected.|

3. Configure the attributes that you need for the `<storage>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`archiveOption`|Controls email archive settings|`0` or `1`: default archive settings are used. This is the default setting.<br><br>`2`: archiving options are shown before the email is uploaded.|
    |`storeFiles`|Controls the Extract email attachment archive option|`true`: email attachments are extracted on upload to Alfresco. This is the default setting.<br><br>`false`: email attachments are not extracted on upload to Alfresco.|
    |`storeFilesFromDesktop`|Controls the Extract attachments from files archive option.<br><br>Added in Outlook Integration 2.9.|`true`: email attachments from desktop files are extracted on upload to Alfresco.<br><br>`false`: email attachments are not extracted on upload to Alfresco. This is the default setting.|
    |`storeLink`|Controls the Archive as link email option|`true`: email is replaced with a link to email stored in Alfresco<br><br>`false`: email is not replaced with a link to the email stored in Alfresco. This is the default setting.|
    |`storeMsg`|Controls the Store original Outlook .MSG file archive option|`true`: original Outlook . MSG file is stored on upload to Alfresco<br><br>`false`: original Outlook . MSG file is not stored on upload to Alfresco. This is the default setting.|
    |`compress`|Controls the Compress message while uploading setting|`true`: message is compressed while uploading to Alfresco. This is the default setting.<br><br>`false`: message is not compressed while uploading to Alfresco|
    |`alwaysUseDefaultSendAndArchiveFolder`|Controls the Always use default folder archive option|`true`: uses the specified default folder.<br><br>`false`: select folder with every upload. This is the default setting.|

4. Configure the attributes that you need for the `<connection>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`url`|URL to Alfresco server|This is the path to your Alfresco server.|
    |`login`|User name for Alfresco server|This is your Alfresco user name.|
    |`password`|Password for Alfresco server (encrypted)|This is your Alfresco password.|
    |`shareUrl`|Path to Alfresco Share|`share`: this is the default setting. Specify a text string for an alternative path.|
    |`alfrescoUrl`|Path to Alfresco repository|`alfresco`: this is the default setting. Specify a text string for an alternative path.|
    |`authentication`|Authentication type for connection to Alfresco|`basic`: basic authentication is used to connect to Alfresco. This also works out-of-the-box if using the Identity Service.<br><br>`windows`: Kerberos authentication is used to connect to Alfresco.<br><br>`oidc`: OpenId Connect authentication is used to connect to Alfresco.<br><br>**Note:** Contact Alfresco support before using these settings.|
    |`webApp`|Which Alfresco web application is used to display details, links, etc. outside of the Outlook Integration.|`2`: Share. This is the default setting.<br><br>`3`: ADF|
    |`shareAlterUrl=""`|Sets alternative URL for Alfresco Share|Specify your alternative URL.<br><br>|
    |`checkCertificate`|Specifies whether to check for a server certificate|`true`: certificate is checked and if it is not correct then the connection fails. This is the default setting.<br><br>`false`: certificate is not checked|
    |`checkVersion`|Specifies whether to check the Alfresco server version|`true`: version is checked and if it is not correct then the connection fails. This is the default setting.<br><br>`false`: version is not checked|
    |`settingsCheckInterval`|Specifies the interval, in seconds, between checks to determine if the central settings have changed|`480`: 480 seconds is the default setting.|
    |`writeStreamBuffering`|Sets the `AllowWriteStreamBuffering` parameter of the HttpWebRequest.<br><br>**Note:** In a clustered Alfresco environment, you may encounter the error message _“This request requires buffering data to succeed”_ while uploading emails or files. Setting `writeStreamBuffering` to `true` will prevent this error from happening.<br><br>Added in Outlook Integration 2.7.|`true`: `AllowWriteStreamBuffering` is enabled.<br><br>`false`: `AllowWriteStreamBuffering` is disabled. This is the default setting.|

5. Configure the attributes that you need for the `<oidc>` element. The `<oidc>` configuration element is part of the `<connection>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`serverUrl`|URL to the Alfresco Identity Service system that is used for authentication via OpenId Connect.<br><br>**Note:** Only relevant if the authentication type is set to `oidc` in `<connection>` element.<br><br>Added in Outlook Integration 2.10.|URL to Identity Service server|
    |`realm`|Realm of the Alfresco Identity Service system that is used for authentication via OpenId Connect.<br><br>**Note:** Only relevant if the authentication type is set to `oidc` in `<connection>` element.<br><br>Added in Outlook Integration 2.10.|`alfresco` is the default setting.<br><br>You can change the value if a different realm is set in Identity Service.|
    |`clientId`|Identity Service OpenId Connect client that is used for the authentication.<br><br>**Note:** Only relevant if the authentication type is set to `oidc` in `<connection>` element.<br><br>Added in Outlook Integration 2.10.|`alfresco` is the default setting.<br><br>You can change the value if a different OpenId Connect client is set in Identity Service.|
    |`redirectUrl`|Redirect URL that is used by Identity Service to redirect the Outlook Integration to do the token exchange for authentication.<br><br>**Note:** Only relevant if the authentication type is set to `oidc` in `<connection>` element.<br><br>Added in Outlook Integration 2.10.|`"https://127.0.0.1:6543/OutlookIntegrationCallback"` is the default setting.<br><br>You can change the value, but it needs to match the Identity Service setting for allowed redirects for the configured client.|

6. Configure the attributes that you need for the `<feature>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`autoPaging`|Controls auto paging (for the tree view)|`true`: auto paging is enabled. A refreshed list of files and folders is automatically loaded when scrolling to the bottom of the tree.<br><br>`false`: auto paging is not enabled. This is the default setting. A More button is displayed to allow loading of content.|
    |`messageIcon`|Controls the appearance of the Alfresco icon for archived mail|`true`: Alfresco icon appears on archived emails. This is the default setting.<br><br>`false`: Alfresco icon appears on archived emails.<br><br>**Note:** There is no visual icon to indicate that the email is archived.|
    |`useFilenameOnUploadMsg`|Controls if Alfresco should use the file name of email files uploaded from the desktop or the subject line to name the document in the repository. This option applies to email files uploaded from the desktop only.<br><br>Added in Outlook Integration 2.4.7. Supported in versions 2.4.7 onwards and 2.6.|`true`: Alfresco uses the file name to name the document in the repository.<br><br>`false`: Alfresco uses the subject line of the email to name the document in the repository.|
    |`useFilenameOnRenderMsg`|Controls if Alfresco should use the `cm:name` or `subjectline` attribute to display in the list/tree view. This option applies to email documents only.<br><br>Added in Outlook Integration 2.4.7. Supported in versions 2.4.7 onwards and 2.6.|`true`: Alfresco uses the `cm:name` instead of the `subjectline` attribute to show the email document in the list/tree view.<br><br>`false`: Alfresco uses the `subjectline` attribute to show the email document in the list/tree view.|
    |`enableWFTab`|Controls the visibility of the Workflow tab in high resolution mode.<br><br>Added in Outlook Integration 2.6.|`true`: Workflow tab is visible.<br><br>`false`: Workflow tab is collapsed. This is the default setting.|
    |`enableWPF`|Enables/disables the use of a high resolution front-end for the Alfresco Outlook Client.<br><br>Added in Outlook Integration 2.6.|`true`: High resolution front-end is enabled. This is the default setting.<br><br>`false`: High resolution front-end is disabled.|
    |`tokenAlterMode`|Used for QA and testing. Toggles the way a client is uniquely identified.|**Note:** Keep the default value: `false`.|
    |`copyMoveWarningThreshold`|Sets the threshold for when a warning should be displayed, when a large amount of files is being copied/moved inside the repository with the copy/move & paste feature. Warns the user that copying `x` amount of files can take a long time depending on the server.<br><br>Added in Outlook Integration 2.7.|`100` is the default setting.|

7. Configure the attributes that you need for the `<logging>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`minLevel`|Sets logging level|`debug`: activates debug logging<br><br>`info`: activates info logging. This is the default setting.<br><br>`warning`: activates warning logging<br><br>`error`: activates error logging|

8. Configure the attributes that you need for the `<restrictions>` element.

    1. For the high resolution front-end of the Alfresco Outlook Client:

        Restrictions can be set either to apply globally or context-based. The context-based configuration supports a specific location, and the behavior of Microsoft Office and non-Microsoft Office documents.

        Here are some examples:

        |Attribute|Description|
        |---------|-----------|
        |`<action type="browse" enabled="false" enabledForMsOffice="true" />`|Open menu item is hidden for any item in the repository, but is visible for Microsoft Office documents.|
        |`<action type="edit" enabled="false" location="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:_x0031__x0020__x0026__x0020_2_x0026_3" />`|Edit menu item is disabled for any Microsoft Office documents in the specified location.|
        |`<action type="delete" enabled="false" enabledForMsOffice="true" location="/app:company_home/st:sites/cm:qa-ext-custom-metadata/cm:documentLibrary/cm:_x0031__x0020__x0026__x0020_2_x0026_3" />`|Delete is enabled only for Microsoft Office documents in the specified location:|
        |`<action type="delete" enabled="false" />`|Delete is disabled at the repository level for any item. The previous option overrides this one.|
        |`<action type="checkout" enabledForMsOffice="false"/>`|Checkout is disabled at the repository level for any Microsoft Office document.|
        |`<action type="download" enabled="false" />`|Download is disabled at the repository level for any item.|

    2. For all versions of the Alfresco Outlook Client:

        |Attribute|Description|Value|
        |---------|-----------|-----|
        |`<action type="new-folder" enabled="true" />`|Sets action: create a new folder|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="new-document" enabled="true" />`|Sets action: create a new file|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="edit" enabled="true" />`|Sets action: edit online|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="rename-document" enabled="true" />`|Sets action: rename a file|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="rename-folder" enabled="true" />`|Sets action: rename a folder|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="delete" enabled="true" />`|Sets action: delete|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="send-content" enabled="true" />`|Sets action: email as an attachment|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="send-link" enabled="true" />`|Sets action: email as link|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="set-favorite" enabled="true" />`|Sets action: add to favorites|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="workflow" enabled="true" />`|Sets action: start workflow|`true`: action is enabled (only available if `webApp` is set to Share). This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="details-msg" enabled="true" />`|Sets action: Alfresco Details|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="details" enabled="true" />`|Sets action: details|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="download-pdf" enabled="true" />`|Sets action: download as a PDF|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="download" enabled="true" />`|Sets action: download|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="import-msg" enabled="true" />`|Sets action: import message|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="browse" enabled="true" />`|Sets action: open|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="search-full-text" enabled="true" />`|Sets action: Search text and metadata in Search menu|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="search-metadata" enabled="true" />`|Sets action: Search metadata in Search menu|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="search-sites" enabled="true" />`|Sets action: Search sites in Search menu|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="set-metadata" enabled="true" />`|Sets action: edit metadata|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="checkout" enabled="true" />`|Sets action: checkout|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="cancel-checkout" enabled="true" />`|Sets action: cancel checkout|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="version-history" enabled="true" />`|Sets action: version history|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled|
        |`<action type="download-drop" enabled="true"/>`|Sets action: drag & drop<br><br>Drag & drop was formerly linked to the "download" restriction and is now independent.<br><br>Added in Outlook Integration 2.7.|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled.|
        |`<action type="copy-document" enabled="true"/>`|Sets action: copy document<br><br>Added in Outlook Integration 2.7.|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled.|
        |`<action type="move-document" enabled="true"/>`|Sets action: move document<br><br>Added in Outlook Integration 2.7.|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled.|
        |`<action type="copy-folder" enabled="true"/>`|Sets action: copy folder<br><br>Added in Outlook Integration 2.7.|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled.|
        |`<action type="move-folder" enabled="true"/>`|Sets action: move folder<br><br>Added in Outlook Integration 2.7.|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled.|
        |`<action type="upload-drop-folder" enabled="true"/>`|Sets action: upload folder via drag & drop<br><br>Added in Alfresco Outlook Integration 2.8|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled.|
        |`<action type="send-and-archive" enabled="true"/>`|Sets action: send and archive<br><br>Added in Outlook Integration 2.8.|`true`: action is enabled. This is the default setting.<br><br>`false`: action is not enabled.|

9. Configure the attributes that you need for the `<tabs>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`<tab type="workflow" enabled="true" />`|Controls visibility of Workflow tab in Alfresco sidebar in low resolution mode|`true`: Workflow tab is visible.<br><br>`false`: Workflow tab is not visible. This is the default setting.|

10. Configure the attributes that you need for the `<metadata>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`extended`|Controls automatic completion of metadata|Use the `<extended>` element to specify text that you would like auto-completed for metadata. You can define one or more properties in the `<autofill>` element. Use the format shown in the example:|

    ```xml
    <metadata>
      <extended>
        <autofill>  
         <property name="wpsmail-qaext: source" value="Outlook" />
         <property name="wpsmail-qaext: source-type" value="123" />
        </autofill>
      </extended>
    </metadata>
    ```

11. Save your changes and restart Microsoft Outlook.

    The template changes are applied.
