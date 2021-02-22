---
author: Alfresco Documentation
---

# Advanced Topics

This information provides more advanced topics that you might come in contact with when you have been working with an SDK project for a while. We will have a look at how you can add more custom modules to an All-in-One project, how to bring in standard Alfresco modules such as Records Management \(RM\) and SharePoint Protocol \(SPP\) support, configuring SSL, and more.

-   **[Configure SSL between Repository and Solr in an AIO project](../tasks/alfresco-sdk-advanced-configure-ssl-repo-solr.md)**  
The SDK ships with SSL turned off between the Alfresco Repository and the Solr 4 search server. This article explains how to set that up when running an All-in-One \(AIO\) project.
-   **[Adding internal and external JARs to a Repository AMP project](../tasks/alfresco-sdk-advanced-adding-internal-external-jars-to-repo-amp.md)**  
This article explains how to add an *external* JAR to a Repository AMP project via a dependency. It also looks at how to extract some AMP code into its own JAR project, what we call an *internal* JAR, and then have the AMP project include it.
-   **[Linking Standard Alfresco AMPs to an AIO project](../tasks/alfresco-sdk-advanced-link-alf-amps-aio.md)**  
Some functionality of the Alfresco content management system is delivered as extra modules, such as Records Management \(RM\), Google Docs Integration, and Alfresco Office Services, which provides SharePoint Protocol support. You can link such modules to an All-in-One \(AIO\) project.
-   **[Adding more custom AMPs to an AIO project](../concepts/alfresco-sdk-advanced-add-custom-amps.md)**  
 When you generate an All-in-One project you get one Repository extension AMP \(repo-amp\) and one Share extension AMP \(share-amp\). These AMPs are just starting point AMPs, showing you how to create extension AMPs for the Alfresco WAR and Share WAR applications. When the project grows you are likely to want to add more extension modules for different types of functionality.
-   **[Deploying All-in-One \(AIO\) WARs to external environments](../tasks/alfresco-sdk-advanced-deploying-to-external-environments.md)**  
Use this information to deploy the WARs that are produced by the All-In-One \(AIO\) project to an external environment, such as QA, UAT, and PRODUCTION.

**Parent topic:**[Alfresco SDK 2.2.0](../concepts/alfresco-sdk-intro.md)

