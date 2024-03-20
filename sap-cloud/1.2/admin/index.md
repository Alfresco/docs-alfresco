---
title: Administer SAP Cloud Connector
---

This page shows you how to check the health of the current installation and troubleshooting.

## Test connection use-cases on SAP S/4HANA Cloud Essentials

Follow the guidance to test the newly installed and configured module on SAP S/4HANA Cloud Essentials.

### Product Master Data

In this section we'll show you how to upload an attachment to a Product so it's shown in the **Business Object Types > Product** folder in Content Services.

1. Log in to SAP S/4HANA Cloud Essentials.
2. Open the **Product Master Data** app and select any Material (e.g. `FG111`):

   ![Product Master Data App]({% link sap-cloud/images/sap_cloud_manage_product_master_data.png %})

3. Navigate to section **Attachments - Document Management Service** on the Material.
4. Click **Edit** and upload a document with the **Upload** button.

    Choose **Office Documents** as Document Type for now:

   ![Upload Attachment]({% link sap-cloud/images/sap_cloud_add_attachment_1.png %})

5. Once the document is successfully uploaded, it is set to **Draft** mode.

    > **Note:** **DO NOT CLICK** the **Save** button for now. We just want to verify that **Draft** mode is supported.

   ![Uploaded Attachment]({% link sap-cloud/images/sap_cloud_add_attachment_2_draft.png %})

6. Log in to Content Services and navigate to the **Knowledge Provider > DMS_PCD1**  folder in the repository.

    You'll see the document is available in this folder but it hasn't yet been moved to the final/expected folder (i.e. under **Business Object Types > DocumentInfoRecord**). This is because it's still in **Draft** mode:

    ![Draft Mode Content Services]({% link sap-cloud/images/sap_cloud_add_attachment_2_draft_alfresco.png %})

7. Now, switch back to SAP S/4HANA Cloud Essentials and click **Save** for the recently stored Attachment.

    Note that the Product is not in **Edit** mode anymore, hence the attachment is no longer in **Draft** mode:

    ![Saved Attachment]({% link sap-cloud/images/sap_cloud_add_attachment_2_final.png %})

8. Again, switch back to Content Services and refresh the page.

    The document is removed from the previous location and is no longer in **Knowledge Provider > DMS_PCD1**. It's now been moved to the final folder under **Business Object Types > DocumentInfoRecord**:

    ![Saved Attachment]({% link sap-cloud/images/sap_cloud_add_attachment_2_final_alfresco.png %})

## Test connection use-cases on SAP S/4HANA on-premises

Follow the guidance to test the newly installed and configured module for the selected SAP Business Objects.

### Material Master

In this section we'll show you how to upload an attachment to a Material Master so it's shown in the **Business Object Types > Product** folder in Content Services.

1. Go to transaction `MM03` and choose any material:

   ![SAP transaction MM03]({% link sap-cloud/images/sap_test_mm03_1.png %})

2. In the {% include tooltip.html word="GOS" text="GOS" %} menu click **Create... > Create Attachment** and upload any desired file. This stores it in Content Services via CMIS:

   ![SAP transaction MM03]({% link sap-cloud/images/sap_test_mm03_2.png %})

3. Verify the availability by checking the attachment list. Open the document, so that it's retrieved from Content Services via CMIS:

   ![SAP transaction MM03]({% link sap-cloud/images/sap_test_mm03_3.png %})

#### Verify Material Master in Content Services

In the Content Services repository, navigate to the **Business Object Types > Product** folder to find the recently stored document. There will be some basic CMIS related aspects available:

![View in Content Services]({% link sap-cloud/images/sap_test_mm03_4_acs_view.png %})

### Equipment

To upload attachments to an Equipment:

1. Choose any existing Equipment via transaction `IE03`:

   ![SAP transaction IE03]({% link sap-cloud/images/sap_test_ie03_1.png %})

2. Upload a document via the {% include tooltip.html word="GOS" text="GOS" %} menu **Create... > Create Attachment**.
3. Verify the document has been successfully stored via CMIS in Content Services by opening it again in the Attachment List.

#### Verify Equipment in Content Services

In Content Services, navigate to the **Business Object Types > Equipment** folder to find the recently stored document. There will be some basic CMIS related aspects available:

![View Equipment in Content Services]({% link sap-cloud/images/sap_test_ie03_2_acs_view.png %})

## Supported Business Objects

The following table lists all SAP Business Objects that are currently supported.

| SAP Business Object Name |
| ---------------- |
| Bill Of Material |
| Billing Document |
| Business Partner |
| Condition Contract |
| Customer Return |
| Document Info Record |
| Equipment |
| Inbound Delivery |
| Journal Entry |
| Legal Document |
| Legal Transaction |
| Material Master |
| Outbound Delivery |
| Product |
| Production Order |
| Purchase Order |
| Purchase Requisition |
| Sales Contract |
| Sales Inquiry |
| Sales Order |
| Sales Quotation  |
| Sales Contract  |
| Supplier |
| Supplier Invoice |
| Supplier Quotation |

## Troubleshooting

Sorry you're having trouble with the Content Connector for SAP Cloud. Your problem may be related to any one of the following issues.

### SAP on-premises: RFC destination connection test fails (HTTP response code 400)

The connection test of the created RFC destination (`SM59`) returns with **`400`** response code:

![RFC Connection Test fails]({% link sap-cloud/images/sap_no_license_3_rfc_connection.png %})

This may be due to an incorrect **Path Prefix** specified for the target system. Make sure you use the exact value mentioned in [step 3 of creating the RFC Connection]({% link sap-cloud/l.2/config/index.md %}#new-http-connection).

### SAP on-premises: RFC destination connection test fails (HTTP response code 402)

The connection test of the created RFC destination (`SM59`) returns with **`402`** response code:

![RFC Connection Test fails]({% link sap-cloud/images/sap_no_license_2_rfc_connection.png %})

This may be due to a missing (or expired) license file. Make sure you've [applied a valid license file]({% link sap-cloud/l.2/install/index.md %}#install-license).

### SAP on-premises: Upload of attachments fails

The upload of an attachment fails in any transaction with the following error:

![SAP Application Error]({% link sap-cloud/images/sap_no_license_1.png %})

In most cases, this is due to an expired license file. Make sure you've [applied a valid license file]({% link sap-cloud/l.2/install/index.md %}#install-license) for the SAP Cloud Connector.

If the license exists and is valid, this error may be due to incorrect configuration of the related repository in `OAC0`. In this case, check the repository configuration again.

### SAP Cloud: Upload of attachments fails

The upload of an attachment fails in any Fiori app with the following error:

![SAP Application Error]({% link sap-cloud/images/sap_cloud_troubleshooting_error_upload.png %})

If it's not related to a missing or expired license (see above), make sure you've entered the correct Content Services CMIS endpoint for the [Destination in the SAP Business Technology Platform]({% link sap-cloud/l.2/config/cloud.md %}#create-destination).
