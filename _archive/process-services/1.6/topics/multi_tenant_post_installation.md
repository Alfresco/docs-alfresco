# Multi-tenant post-installation

If you have purchased a multi-tenant license, you must sign in as the default administrator user and perform the minimum configuration after installation. However, this configuration is not required for the 30-day trial or standard installation as it is not multi-tenant.

To use the full capabilities of Alfresco Process Services, you should create a tenant and add users to that tenant. This allows the use of user groups and enables auto-completion of user names.

1.  In your web browser, go to the Alfresco Process Services application:

    [http://localhost:8089/activiti-app](http://localhost:8089/activiti-app)


The first time you do this, you will see the Login panel.

1.  Log in as the default administrator user, `admin@app.activiti.com` using the password `admin`.
2.  Click the **Identity management** tile.
3.  From the menu, click **Tenants**.
4.  Click **Create tenant**.
5.  Provide a name for the tenant and click **Save**.

When you create users, you can specify your new tenant name.

**Parent topic:**[Installing Alfresco Process Services](../topics/installing_process_services.md)

