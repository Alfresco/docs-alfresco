---
title: HR Tier-2 Configuration
---

Use this information to configure the HR Employee File Management solution (HREFM).

## Prerequisites

Make sure the HR Tier-2 solution is [installed]({% link content-accelerator/3.5/install/install-guide.md %}) before implementing the configuration steps below.

## Configuration

1. Once Alfresco Content Services starts successfully, run the following `curl` command to create a Records Management (RM) site:

    ```bash
    curl -X POST "http://localhost:8080/alfresco/api/-default-/public/gs/versions/1/gs-sites?skipAddToFavorites=false" -H  "accept: application/json" -H  "authorization: Basic YWRtaW46YWRtaW4=" -H  "Content-Type: application/json" -d "{  \"title\": \"HREFM Records Management\",  \"description\": \"HREFM Records Management Description\",  \"compliance\": \"STANDARD\"}"
    ```

2. Navigate to the **HREFM Records Management** site from the **Sites** tab in Alfresco Share:

   * ![Sites tab in Alfresco Share]({% link content-accelerator/images/hrefm-sites-tab.png %})

3. Navigate to the **File Plan** from the site dashboard:

   * ![File Plan in HREFM RM Site Dashboard]({% link content-accelerator/images/hrefm-file-plan.png %})

4. Click on the **Import** action in the File Plan* folder, and select the file `HREFM_FilePlan.acp` to start the import:

   * You'll find `HREFM_FilePlan.acp` in the `Alfresco Artifacts` folder of the `alfresco-content-accelerator-sehr-rm-accelerator` distribution zip.

   ![Import action in File Plan]({% link content-accelerator/images/hrefm-import-action.png %})

5. Upload the following scripts to the path **Repository > Data Dictionary > Records Management > Records Management Scripts**:

   * `HREFM-RM_CutOff_Record.js`
   * `HREFM-RM_Move_Record_to_Employee_Folder.js`

    You'll find the JavaScript (`.js`) files in the `Alfresco Artifacts` folder of the `alfresco-content-accelerator-sehr-rm-accelerator` distribution zip.

6. Navigate to `Unfiled Records` folder in File Plan section of RM Site. Select the `Manage Rules` action:

    ![Unfiled Records - select Manage Rules]({% link content-accelerator/images/hrefm-unfiled-records-manage-rules.png %})

7. Click the `Create Rules` link, and create a rule:

    ![Select Create Rules to configure a new rule]({% link content-accelerator/images/hrefm-create-new-rule.png %})

8. Navigate to `Holds` under `File Plan`, create a `New Hold` (as shown) and save it:

    ![Create a New Hold]({% link content-accelerator/images/hrefm-create-new-hold.png %})

9. Set the `Read and File` permission to `site_hr_SiteManager` and `site_hr_SiteCollaborator` Groups on Above created `HREFM` Hold.

10. Provide the `HR Manager` group the correct permissions to create Legal Holds:

    1. Navigate to `RM Admin Tools` from the top-right of the RM site.
    2. Click **Define Roles** in the **Tools** section, and then click on the `New Role` button to the left of page.
    3. Create a role with name `HREFM Hold Access` with the following capabilities:

      * Add to Hold
      * Remove from Hold

    ![Set up Hold Access role]({% link content-accelerator/images/hrefm-create-new-role.png %})

11. Navigate to the `Users and Groups` section of the **Tools** section.

12. Select the `HREFM Hold Access` role, and then add the `site_hr_SiteManager` and `site_hr_SiteCollaborator` to the **Groups** section:

    ![Add groups to Hold Access role ]({% link content-accelerator/images/hrefm-create-new-group.png %})
