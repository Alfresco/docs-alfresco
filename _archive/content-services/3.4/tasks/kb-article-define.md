---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Developer]
option: knowledge base
---

# Defining Knowledge Base articles

A Knowledge Base article is a document, such as a Word document, PDF, or text file submitted by a knowledge expert. You can define metadata to wrap this Knowledge Base article for storing things on the document that are not part of the document’s internal representation, such as an internal representation of the lifecycle state \(draft, pending approval, and so on\), or a field that indicates the type of document.

This example demonstrates two methods. The second method is recommended as it is less constraining.

1.  This method creates a content type called `kb:article` and adds metadata to the `kb:article` content type.

    ```
    <types>
       <type name="kb:article">
         <title>Knowledge Base Article</title>
         <parent>cm:content</parent>
        <properties>
         <property name="kb:status">
          <title>Status</title>
          <type>d:text</type>
          <default>Draft</default>
         </property>
        <property name="kb:articletype">
          <title>Article Type</title>
          <type>d:text</type>
          <default>Article</default>
        </property>
       </properties>
      </type>
    </types>
    ```

    This code declares the `kb:article` content type and gives it two `d:text` properties: `kb:status` and `kb:articletype`. The `kb:status` property tracks the lifecycle status of the Knowledge Base article. The `kb:articletype` property describes the type of article.

    This approach may eventually prove constraining because requiring Knowledge Base articles to be typed as `kb:article` means that anyone who uses the Knowledge Base must type their content as `kb:article`. Since documents can only have one base content type, it is quite restrictive. This approach requires that any Knowledge Base articles be of either type `kb:article` or another type that extends from `kb:article`, forcing third-party applications to consider your Knowledge Base schema ahead of time.

2.  This method defines articles using content aspects.

    ```
    <aspects>
    
       <aspect name="kb:status">
          <title>Status</title>
          <properties>
             <property name="kb:status">
                <title>Status</title>
                <type>d:text</type>
                <default>Draft</default>
             </property>
          </properties>
       </aspect>
    
       <aspect name="kb:article">
          <title>Article</title>
          <properties>
             <property name="kb:articletype">
                <title>Article Type</title>
                <type>d:text</type>
                <default>Article</default>
             </property>
          </properties>
          <mandatory-aspects>
             <aspect>kb:status</aspect>
          </mandatory-aspects>
       </aspect>
    
    </aspects>
    ```

    This approach does not require rebasing the content instances onto a base type from your schema, letting you take an arbitrary content item or document and mark it as a Knowledge Base article. By doing this, the content item takes on the additional metadata \(`kb:status` and `kb:articletype`\). You could mark any number of content items this way, no matter their type. Instead of defining a Knowledge Base article content type, you can define content aspects and then mark up your content using these aspects as you see fit.

    The `kb:article` aspect has the `kb:articletype` text property on it. It also has a mandatory inclusion of the `kb:status` aspect. The `kb:status` aspect is defined as a separate aspect and defines the `kb:status` text property. You can now mark content in the Alfresco repository with the `kb:article` aspect. This means the content item will have two aspects applied: `kb:article` and, by implication, `kb:status`, and will, therefore, have two properties on it: `kb:articletype` and `kb:status`.

    Creating two aspects offers a more flexible approach as it lets you add support for other types of content. For example, you could add Knowledge Base videos by creating a Knowledge Base video aspect called `kb:video`. This aspect would have unique video-related properties on it but would reuse the same `kb:status` fields the rest of the Knowledge Base application uses. All you have to do is specify `kb:status` as a mandatory aspect for the new `kb:video` aspect.


**Parent topic:**[Defining a content model for metadata](../tasks/kb-model-define.md)

