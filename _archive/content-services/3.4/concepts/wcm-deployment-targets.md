---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Web Content Management]
option: WCM deployment target default filesystem avm alfresco live test server sandbox
---

# Deployment targets

A deployment target is a named destination for a deployment. Alfresco deploys content through a deployment engine to a deployment target.

There are four deployment targets defined.

-   **default**

    The file system deployment target for the Standalone Deployment Engine.

-   **filesystem**

    The file system \(`filesystem`\) deployment target for the Web Delivery Runtime \(WDR\) Deployment Engine.

-   **AVM**

    The AVM \(`avm`\) deployment target for the WDR Deployment Engine.

-   **DM**

    The DM deployment target \(`alfresco`\) for the WDR Deployment Engine.


**Note:** You also can add your own deployment targets.

Deployment servers are considered to be either live servers or test servers. This is used to prevent content being deployed to the wrong server. Deployments from the staging sandbox go to live servers, and from authoring and workflow sandboxes to test servers.

A contributor can deploy the state of their sandbox to a test server and preview their site. Similarly, reviewers in a workflow can deploy and preview the change set they are approving \(or rejecting\).

Once a test server has been deployed to, it is allocated to the user or workflow that performed the deploy. Once the user or workflow has finished with the test server it is released and returned to the pool of test servers. This happens automatically in the case of a workflow sandbox, and manually using a user interface action for user sandboxes.

**Parent topic:**[Deploying from AVM](../concepts/wcm-deployment-intro.md)

