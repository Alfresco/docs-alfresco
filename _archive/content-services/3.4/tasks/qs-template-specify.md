---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
option: 
---

# Specifying a template

In Share, you configure template mappings at the section level. This enables you to specify one or more templates to use for content contained within each section.

In the sample Share site, this includes the following section folders:

-   root
-   root \> blog
-   root \> contact
-   root \> news
-   root \> news \> companies
-   root \> news \> global
-   root \> news \> markets
-   root \> publications
-   root \> publications \> research-reports
-   root \> publications \> white-papers

You can specify templates for a section’s landing page \(`ws:indexPage=`\) and for the articles \(`ws:article=`\) contained within the section folder. You can also specify the default template for any content within the section \(`cmis:document=`\).

As an example, the **blog** section folder has the template mapping `ws:article=articlepage2`. This indicates that all requests going to that section where the content type is `ws:article` are mapped to the template `articlepage`2.

This configuration is hierarchical, so if a template mapping is not found for the requested section, the parent is then checked. This process repeats up to the **root** section. The **root** section holds the site-wide template configuration settings.

**Note:** You can specify a template mapping on an individual asset to override the mapping specified at the section level. To do this, edit the metadata \(access the full metadata page\) for the asset you want to work with and enter the name of the desired template in the **Template Name**field.

This task assumes you are in the Document Library page component of the Quick Start site and that the **Show Folders** feature is enabled.

1.  Navigate to **Alfresco Quick Start \> Quick Start Editorial**.

2.  Navigate to the section folder for which you want to configure templates.

3.  Click **Edit Metadata** in the associated action list.

    The **Template Mapping** field accepts multiple entries. Each entry is a name/value pair where the name is a type name and the value is a template name. For example:

    `cmis:document=baseTemplate`

4.  Update the **Template Mapping** field as desired to specify the default templates for the current section.

    **Note:** Separate multiple entries with a comma.

5.  Click **Submit**.

    In the Quick Start website, navigate to the Home page to view the changes. Refresh the page if the changes are not immediately visible.


**Parent topic:**[Home page](../concepts/qs-homepage.md)

**Related information**  


[Templates](../references/qs-ref-templates.md)

