---
title: Administer Federation Services
---

The Admin app allows you to setup and manage your Federation Services environment.

The Admin app is a console for managing the administration of your Federation Services environment. It has separate menus that identify a particular activity or feature, and sub-menus that allow you to configure everything you need to perform migrations or federation.

The Dashboard displays a snapshot of the admin information, including sections for Connectors, Discovery, Migration, Federation, Reports, and Admin. In each of these sections, you can view a list of recently accessed settings.

![Screenshot of the Federation Services menu]({% link federation-services/images/menu.png %}){:height="220px" width="140px"}

|Menu option|Description|
|-----------|-----------|
|Connectors|Allows you to configure Authentication, Repository, and Output connectors.|
|Discovery|Allows you to perform schema discovery and create aggregate reports.|
|Migration|Allows you to create and manage jobs.|
|Groups|Allows you to manage Job, Mapping, and Task groups.|
|Federation|Allows you to manage your federation information. Specifically, this is where you manage Federated Search and related views, as well as configure Content Service and Search connectors.|
|Reports|Provides basic audit reports.|
|Admin|Allows you to manage users, logging, import/export, license keys, etc..|

## Managing Licenses

In the Admin app, the **Licenses** page allows you to manage your license keys.

When you first deploy the Federation Services Admin app, you'll need to apply your license key.

You can add a new license key, or reactivate previously entered keys. The details of each key are listed, including the associated **MAC Address**, **Documents Allowed**, **Documents Used**, **End Date**, and which key is in use.

1. Access the Federation Services Admin app.

2. In the left hand menu, click **Admin > License**.

3. Paste your license key into the **License Key** field, and click **Add License Key**.

    The license information displayed in the table.

    > **Note:** You can only have one active license at a time.

If you need to reactivate a license key or add a new license key, simply repeat the steps above. If the key already exists, then it will be activated and the old key will be set to inactive.
