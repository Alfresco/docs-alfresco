---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Outlook search settings

Use this guidance to configure simple and advanced search criteria in Outlook.

You can configure the search criteria presented when a user starts a search in Outlook. This configuration supports the content models, including data types, constraints, lists, regular expressions and other attributes.

You can configure navigation-sensitive simple and advanced searches based on the search location. Use the Custom simple search to configure a simple search, where Alfresco Outlook Integration includes the metadata fields in the search dynamically for the search term provided. Use the Custom advanced search to configure an advanced search, where the search form adapts dynamically so different fields are shown, depending on the navigation context of the user.

When a user starts a search, Alfresco Outlook Integration finds the best match for the metadata dialog. The `<match>` element uses the first rule that matches the attributes in the tag. If you are using multiple rules, you should always start with the most specific rule first.

In the `<match>` element:

1.  Define the match type. This can be a folder, type or aspect.
2.  Define the match pattern. This can be the location of the folder \(defined in xpath format\), or it can be based on a defined model, type, or aspect.

See examples of how to use these search settings below.

1.  Open Alfresco Share, and click **Admin Tools** on the toolbar.

2.  Click Email Search Settings then **Edit**.

    You can configure XML settings for Custom simple search, and Custom advanced search.

3.  You can load and edit the default configuration template for each section by clicking **Load default configuration template**.

    Here is the full list of metadata settings that you can configure:

    |Section name|Key name|Description|Values|
    |------------|--------|-----------|------|
    |`match`|`type`|Mandatory. Defines type of the attribute|`folder`, `type`, `aspect`|
    | |`pattern`|Mandatory. Path to the site or folder where custom metadata is applied|Example: Site: `pattern="/app: company_home/st:sites/cm:qaext- standard-metadata"`

Folder: `pattern="/app: company_home/st:sites/cm:qaext- custom-metadata/cm: documentLibrary/cm:numeric-metadata"`

|
    |`target`|`useTags`|Controls use of tags|`true`: tags are permitted

 `false`: tags are not permitted

|
    | |`useText`|Controls use of full-text search|`true`: full text search permitted

 `false`: full text search not permitted

|
    |`property`|`name`|Name of the custom property|Text format|
    | |`allowedValues`|List of permitted values.|Text format|
    | |`allowedCategoryValues`|Path to the list of permitted values|Text format|
    |`ui`|`multiline`|Controls use of multiple lines in a box|`true`: multiple lines are permitted

 `false`: multiple lines are not permitted

|

4.  To apply default search criteria for the whole repository, use this example:

    ```
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

    -   The Tags search field is enabled \(`useTags="true"`\)
    -   The Text search field is enabled \(`useTags="true"`\)
    The user sees a search dialog with several fields including `cm:title` and `cm:description`. This allows the user to search for documents and folders by title and description, as well as by tags, and through the full text of documents.

    The `cm:description` field can contain multiple lines by setting `<ui multiline="true"/>`.

    The `<hr/>` element adds a horizontal line to the search dialog.

    If no type information is present, the default `cm:content` type is used for all nodes stored in Share. The `<target>` element can contain 0 or more child elements called `<property>`.

    In the `<property>` tag:

    -   Use the `name` attribute to set a valid model property like `cm:title`
    -   Use the `<ui>` child element to control how the fields are displayed in the search dialog
5.  To add numeric fields to the search dialog, use this example:

    ```
    <match type="folder" pattern="/app:company_home/st:sites/cm:myexample-2-site-custom-metadata/cm:documentLibrary/cm:numeric-metadata" >
        <target>
            <property name="wpsmail-qa-ext:number-metadata-float" />
            <property name="wpsmail-qa-ext:number-metadata-double" />
            <property name="wpsmail-qa-ext:number-metadata-int" />
            <property name="wpsmail-qa-ext:number-metadata-long" />
        </target>
    </match>
    ```

    In this example, the user sees a different search dialog in the numeric-metadata folder \(or its sub folders\) on the myexample-2-site site. The dialog will contain four fields with custom numeric data in float, double, int and long format.

    If the above example is applied to the Custom advanced search configuration, the user sees the default search fields for any site or folder in the repository except in myexample-2-site/custom-metadata/numeric-metadata.

    If the above example is applied to the Custom simple search configuration, Alfresco Outlook Integration uses the search criteria mentioned in the `<target>` element only to find search results.

6.  Click Apply to save your changes and restart Microsoft Outlook.

    The template changes are applied.

    If your XML isn't valid, you won't be allowed to save your settings, and you'll see an error message.

    You can download the custom simple search and custom advanced search settings locally by clicking Download configuration.


**Parent topic:**[Configuring Outlook search settings in Alfresco](../tasks/Outlook-admin-search-settings.md)

