---
title: Support for multiple Salesforce organizations
---

Support for multiple Salesforce organizations (or instances) adds the ability to connect a single Content Services instance to multiple Salesforce organizations. This may be a combination of Production and Sandbox organizations.

The steps we currently have for getting the Connected App Definition Token and Secret remains the same. Where we place them is slightly different. You'll need to get the Salesforce Organization ID to help identify which organization the token and secret are for.

## Find your Salesforce Organization ID

Follow the steps below to find your Organization ID:

1. Navigate to **Salesforce Settings**.
2. Click on **Company Settings**.
3. Select **Company Information**.

The Salesforce.com Organization ID is shown in this window.

## Connect Salesforce in the Admin Console

To add a new connection you'll need to navigate to the Salesforce page of the Repository Admin Console.

1. Launch the Admin Console.

2. In the **Salesforce** section, click **Add Connection** to add a new connection.

   A new window opens that allows you to enter the Salesforce Organization ID, Salesforce Consumer Token, and Salesforce Consumer Secret.

3. Select the appropriate **Salesforce Environment Type**: `Production` or `Sandbox`.

4. Save the changes.

Once a connection is created, you can add additional connections, if needed. You can also remove or update an existing connection. Removing a connection won't remove any content.

> **Important:**
>
> * Upgrading the Salesforce Connector requires you to re-add any previous connections.
> * Re-adding the connection won't affect any content that you've previously added through the Salesforce Connector.

In the Salesforce Record Folder, you'll now see a new metadata field: `Organization ID`. This can help you differentiate Salesforce records added through different Salesforce organizations. A link is also added in the folder description of the Salesforce Record, if no other value is currently present. This link allows you to directly navigate to the Salesforce Record.
