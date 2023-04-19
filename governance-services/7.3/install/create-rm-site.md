---
title: Creating the Records Management site
---

After you've installed the Records Management AMP files, you're ready to go ahead and create a Records Management site.

1. Start Alfresco, and then log in using your administrator credentials.

2. Open the **Sites** menu and click **Create Site**.

    > **Tip:** You can also click **Create Site** on the My Sites dashlet.

3. Select **Records Management Site** as the Type.

    The Name, URL Name and Description will be completed for you automatically. You can edit the Description if needed. The URL name is used as part of the site URL.

    > **Note:** The site visibility can't be changed as only public sites are available for Records Management. You can only create one records management site.

4. Select a Compliance option to define which compliance model to use for your {% include tooltip.html word="fileplan" text="File Plan" %}. This selection defines the metadata available for records in the file plan.

    * **Standard** - The standard set of record metadata is available.
    * **DoD 5015.2-STD** - Record metadata required for {% include tooltip.html word="dod50152std" text="DoD 5015.2-STD" %} is available. Mandatory metadata includes the originator, the originating organization, the File Plan, the destroy action.
    
    > **Note:** If you select **Standard** then users can still customize the metadata available on individual records.

5. Click **Save**.

You'll see the dashboard for the new Records Management site which you can now customize. Sites that you create are automatically added to your **Favorites** list. Now you can:

* [Load Test Data]({% link governance-services/7.3/using/the-fileplan.md %}#loading-test-data) by adding the Import Data Set dashlet for an example of how to structure a File Plan
* Use the **RM Admin Tools** on the Records Management dashboard **More** menu to access the administration features

> **Note:** The user who created the Records Management site is automatically made a member of the Records Management Administrator role. Other users can access different areas of the **RM Admin Tools** depending on the capabilities given to the role that they're in.
