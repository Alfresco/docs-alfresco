---
title: Configuring Process Services
---
You must configure Alfresco Digital Workspace to work with Alfresco Process Services. You cannot use Alfresco Digital Workspace with Alfresco Process Services if you do not have Single Sign-On (SSO) configured between Alfresco Process Services and Alfresco Content Services.

**Note:** For information on how to configure Alfresco Process Services and Alfresco Content Services to use SSO see [Configure an Alfresco Content Services connection using Single Sign On (SSO)](https://docs.alfresco.com/process-services1.11/concepts/acs-sso.html).

1. Ensure you have installed Alfresco Digital Workspace, see [Deploying Digital Workspace](deploying.md).

2. Access the ../digital-workspace/app.config.json file and set the following properties:

* Set the `processService` property to `"true"` (you must include the quotation marks)
* Set the `bpmHost` property, for example <https://processservices.domain.com:port>
* (Optional) Set the `adf-start-process` property, by default it is set to `%{processDefinition} - %{datetime}`
* Change the `providers` property to `all`
   > **Note:** You can configure Alfresco Process Services in greater detail by changing the ../digital-workspace/app.config.json file further. See [Configuring Digital Workspace](../concepts/configuration.md) for a definition of all these properties. For more information on the other properties available using the Alfresco Development Framework see [Process Services API](https://www.alfresco.com/abn/adf/docs/process-services/).
