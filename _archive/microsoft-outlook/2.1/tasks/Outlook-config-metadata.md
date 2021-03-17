---
author: Alfresco Documentation
---

# Outlook metadata settings

Use this guidance to configure templates for adding metadata to files, emails and attachments in Outlook.

You can configure the fields and validation rules that are used when a user drags and drops an email into the Alfresco sidebar in Outlook. This configuration supports the Alfresco model, including data types, constraints, lists, regular expressions and other attributes.

When a user stores an email, attachment or file, Alfresco Outlook Integration finds the best match for the metadata dialog. The matching tag, `<match></match>` uses the first rule that matches the attributes in the tag. Therefore if you are using multiple rules, the order of the rules is very important; you should always start with the most specific rule first.

In the `<match>` element:

1.  Define the match type. The type can be an Alfresco folder, an Alfresco type or an Alfresco aspect.
2.  Define the match pattern. This can be the location of the folder \(defined in xpath format\), or it can be based on a defined model, type, or aspect.

See step [10](Outlook-config-metadata.md#example) for the complete example of metadata settings.

1.  Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

    In the left Tools panel, scroll down and select Email Metadata Settings, and **Edit**.

    The direct URL is:

    ```
    http://localhost:8080/share/page/console/admin-console/mail-customization-config
    ```

    where `localhost:8080` is your Alfresco server and port number.

    You can configure XML settings for Custom metadata and List view.

2.  Check Enable custom metadata support to activate the **Configuration XML content** field.

    The List view field for **Configuration XML content** is activated and populated with XML content by default.

3.  You can load and edit the default configuration template for each section by clicking **Load default configuration template**.

    Here is the full list of metadata settings that you can configure. See the next steps for examples of how to use the settings:

    |Section name|Key name|Description|Values|
    |------------|--------|-----------|------|
    |`match`|`type`|Mandatory. Defines type of the attribute|`folder``type``aspect`|
    | |`pattern`|Mandatory. Path to the site or folder where custom metadata is applied|Example: Site: `pattern="/app: company_home/st:sites/cm:qaext- standard-metadata"`

Folder: `pattern="/app: company_home/st:sites/cm:qaext- custom-metadata/cm: documentLibrary/cm:numericmetadata"`

|
    |`target`|`useTags`|Controls use of tags|`true`: tags are permitted

 `false`: tags are not permitted

|
    | |`emlType`|Type of .EML files| |
    | |`msgType`|Type of .MSG files| |
    | |`attachmentType`|Type of attachments| |
    |`property`|`name`|Name of the custom property|Text format.|
    | |`allowedValues`|List of permitted values.|Text format.|
    | |`allowedCategoryValues`|Path to the list of permitted values|Text format.|
    |`ui`|`multiline`|Controls use of multiple lines in a box|`true`: multiple lines are permitted

 `false`: multiple lines are not permitted

|

4.  To turn off the metadata dialog completely, use this example:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-1-site-no-metadata">
    </match>
    ```

    This rule turns off the metadata dialog for all folders under the site my-example-1-site-no-metadata.

5.  To enable a Tags field only in the metadata dialog, use this example:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-2-site-only-tags" >
        <target useTags="true" emlType="wpsmail-qa-ext:custom-eml"msgType="wpsmail-qa-ext:custom-msg" attachmentType="wpsmail-qaext:custom-attachment">
        </target>
    </match>
    ```

    In this example, the only available child element is `<target>`. In `<target>` you can specify `useTags`, `emlType`, `msgType`, and `attachmentType` as attributes. If you set the attributes `emlType`, `msgType`, or `attachmentType`, you can assign your own custom type to the uploaded EML, MSG, or attached object. The Alfresco server automatically creates the corresponding Alfresco nodes with the correct type during the upload. In the example shown:

    -   The Tags metadata dialog is enabled \(`useTags="true"`\)
    -   Automatic type conversion takes place during upload:
        -   For EML files, the node type is set to the `wpsmail-qa-ext:custom-eml` type in Alfresco
        -   For MSG files, the node type is set to the `wpsmail-qa-ext:custom-msg` type in Alfresco
        -   For email attachments, the node type is set to the `wpsmail-qa-ext:custom-attachment` type in Alfresco
    If no type information is present, the default `cm:content` type is used for all nodes stored in Alfresco. The `<target>` element can contain 0 or more child elements called `<property>`.

    In the `<property>` tag:

    -   Use the `name` attribute to set a valid Alfresco model property like `cm:name`
    -   Use the `<ui>` child element to control how the fields are displayed in the metadata dialog
6.  To add standard metadata fields to the metadata dialog, use this example:

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

7.  To add numeric, date/time and boolean metadata fields to the metadata dialog, use this example:

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

    The `<hr/>` element adds a horizontal line to the dialog.

    Three additional fields are available; a date field and a date time field \(both displayed using a calendar widget\), and a boolean field \(displayed using a radio button widget\).

8.  To add list constraint fields to the metadata dialog, use this example:

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

    -   An alfresco category root
    -   A text file with a number of list entries
    -   A property that has a LIST constraint in the model
    In this example, when a file is uploaded to the list-metadata folder on the my-example-5-site site, the metadata dialog shows six different fields. The field with the attribute name `wpsmail-qa-ext:list-metadata-country-text` shows only Alfresco categories that are located in `cm:categoryRoot/cm:generalclassifiable/cm:Regions/cm:EUROPE/cm:Northern_x0020_Europe`.

    You can also define your own value list and save it as a text file in Alfresco. Reference the location of your list file in the `allowedValues` attribute.

    In the example, the `wpsmail-qa-ext:list-metadata-greek-alphabet-text` attribute references `/app:company_home/app:dictionary/cm:wps_alfresco_mail_integration_ext_constraints/cm:ext-category-list-greek-alphabet.txt` in the `allowedValues` attribute.

9.  To add type mapping fields to the metadata dialog, use this example:

    ```
    <match type="type" pattern="wpsmail-qa-ext:invoice-type-folder" >
       <target>
         <property name="wpsmail-qa-ext:invoice-number" />
         <property name="wpsmail-qa-ext:invoice-amount" />
       </target>
    </match>
    ```

    The match type is defined in the Alfresco model as `wpsmail-qa-ext:invoice-type-folder`. Every time a file is uploaded to a folder with the Alfresco type `wpsmail-qa-ext:invoice-type-folder`, the metadata dialog displays two fields with custom metadata. In this example, these fields are `wpsmail-qa-ext:invoice-number` and `wpsmail-qa-ext:invoice-amount`.

10. To add aspect mapping fields to the metadata dialog, use this example:

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

11. To automatically populate predefined metadata, use this example:

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

12. To set the type \(`docType`\) for all files that are dragged and dropped into Alfresco, use this example:

    We are setting the type of incoming files to gsliu:uwdoc:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:gsliu-
    3rd-party" >
    <target useTags="false" attachmentType="gsliu:uwdoc" msgType="gsli
    u:uwdoc" emlType="gsliu:uwdoc" docType="gsliu:uwdoc">
    <property name="gsliu:category_name" allowedValues="app:
    company_home/app:dictionary/cm:
    WPS_x0020_Alfresco_x0020_Mail_x0020_Integration_x0020_LM_x0020_Con
    straints/cm:lm-category-list-constraint-1stparty.txt">
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

13. Save your changes and restart Microsoft Outlook.

    The template changes are applied.

    You can download the list view settings locally by clicking Download configuration.


**Parent topic:**[Configuring Outlook metadata and list view settings in Alfresco](../tasks/Outlook-admin-metadata-settings.md)

