---
title: Overview
---




The two options for developing with Process Automation are:

* Communicating with external systems from an application.
* Develop a custom user interface

## External communication

Communication with an external system should use the [REST connector]({% link process-automation/latest/model/connectors/rest.md %}) or the [Lambda connector]({% link process-automation/latest/model/connectors/aws.md %}#lambda).

> **Important**: The REST service and the AWS Lambda account and function need to be hosted outside of the Alfresco hosted environment.

Both connectors can send and return JSON payloads from a process. The REST connector can also be configured as a [trigger]({% link process-automation/latest/model/triggers.md %}#webhooks) for webhooks.

## User interfaces

There are two options for creating a custom user interface:

* Extend the [Alfresco Digital Workspace]().
* Create a customer interface using the Alfresco [Application Development Framework (ADF)](LINK).

### Extend Digital Workspace

The default user interface provided with Process Automation is the Digital Workspace. To extend the Digital Workspace request the source code from [support](https://myalfresco.force.com/support/){:target="_blank"}.

### Custom user interface

Applications can be developed using the ADF. There are [content components](https://www.alfresco.com/abn/adf/docs/content-services/){:target="_blank"} and [process components](https://www.alfresco.com/abn/adf/docs/process-services-cloud/){:target="_blank"} that can be used depending on the use case of the user interface.

> **Note**: Process Automation uses the Process Services **Cloud** components.



### Form widgets
