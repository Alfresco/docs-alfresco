---
title: Configure Federation Services
---

The configuration for Federation Services is managed in the Admin app.

Below is a high-level summary of the configuration process using the menu options in the Admin app. You'll need to follow the links provided in the Simflofy documentation to set up your environment. You can also see the Simflofy [Connectors](https://simflofy.helpdocsonline.com/connectors){:target="_blank"} documentation for a list of supported connectors and configuration details.

Start by accessing the Admin app and then expand the **Connectors** menu option:

1. Open your browser and navigate to: `http://<server>:<port>/simflofy-admin`, where `<server>` is the IP address or DNS address to your Federation Services server and `<port>` is the port to your Federation Services server.

    For example, if installing on your localhost, your URL may be: `http://localhost:6060/simflofy-admin`

2. Enter your user name and password, and then click **Login**.

    The default administrator user name/password is `admin/admin`.

3. Expand the **Connectors** menu

![Screenshot of the connectors menu]({% link federation-services/images/connectors.png %}){:height="220px" width="140px"}

Next, complete the configuration in each of the following areas.

1. Create an Authentication Connection - one entry for each of the systems that you'd like to federate.

    For example, see the Simflofy [Google Drive OAuth Connector](https://simflofy.helpdocsonline.com/google-drive-oauth-connector){:target="_blank"} documentation for creating a Google Drive connector.

2. Create a **Repository Connection** - one entry for each authentication connection. This configuration uses the authentication connection that you created in the previous step.

    > **Note:** If the option is available, validate your connection by clicking **Test**.

    See the Simflofy [Repository connector](https://simflofy.helpdocsonline.com/repository-connector){:target="_blank"} documentation for more information.

3. Create a **Content Services Connection** so that you can use the manage in place functionality.

    See the Simflofy [Content services](https://simflofy.helpdocsonline.com/content-services){:target="_blank"} documentation for more information.

4. Create an **Output Connection** that sets the target folder for the repository / output.

    See the Simflofy [Output connector](https://simflofy.helpdocsonline.com/output-connector){:target=_blank"} documentation for more information.

5. Create a **Discovery connector** that configures the retrieval of content metadata from your source systems. You can run a report to view the discovery results.

    See the Simflofy [Discovery connector](https://simflofy.helpdocsonline.com/discovery-connector){:target="_blank"} documentation for more information.

6. Create a Job for federated search - one entry to synchronize a single source system to a single target system.

    > **Note:** If you're planning to use manage in place federation, expand **Advanced Options** settings, and uncheck the **Include Binary** checkbox.

    See the Simflofy [Jobs](https://simflofy.helpdocsonline.com/jobs){:target="_blank"} documentation for more information.

7. Run the Job after completing the above configuration. Click **Migration** > **Run and Monitor Jobs** to start, stop, and view the status of your jobs.

See the Simflofy documentation on [Setting Up Federated Search](http://simflofy.helpdocsonline.com/setting-up-federated-search-tutorial){:taget="_blank"} for more information.
