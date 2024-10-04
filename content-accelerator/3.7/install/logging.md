---
title: Overriding Logging Defaults
---

To override the default log configurations, you can put one of the following files on the configured class path (for example, under `/tomcat/shared/classes`):

* `log4j2-ocms.xml` - overrides logging defaults for ocms.
* `log4j2-WizardAdmin.xml` - overrides logging defaults for WizardAdmin.

To override the default log configurations for Alfresco, you can put the `log4j2.properties` file under one of the following paths:

* `../tomcat/shared/classes/alfresco/module/com.tsgrp.autofile/` - overrides logging related to `autofile`.
* `../tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` - overrides logging related to `opencontent`.
* `../tomcat/shared/classes/alfresco/module/com.tsgrp.alfresco.chained.versionable/` - overrides logging related to `chained.versionable`.