---
title: Administer SAP Cloud Connector
---

This page shows you how to check the health of the current installation and troubleshooting.

## Test connection use-cases

Follow the guidance to test the newly installed and configured module for the selected SAP Business Objects.

### Material Master

Upload an attachment to a Material Master so it's shown in the **Business Object Types > Product** folder in Content Services.

1. Go to transaction `MM03` and choose any material:

   ![SAP transaction MM03]({% link sap-cloud/images/sap_test_mm03_1.png %})

2. In the {% include tooltip.html word="GOS" text="GOS" %} menu click on **Create Attachment** and upload any desired file. This stores it in Content Services via CMIS:

   ![SAP transaction MM03]({% link sap-cloud/images/sap_test_mm03_2.png %})

3. Verify the availability by checking the attachment list. Open the document, so that it's retrieved from Content Services via CMIS:

   ![SAP transaction MM03]({% link sap-cloud/images/sap_test_mm03_3.png %})

#### Verify Material Master in Content Services

In the Content Services repository, navigate to the **Business Object Types > Product** folder to find the recently stored document. There will be some basic CMIS related aspects available.

![View in Content Services]({% link sap-cloud/images/sap_test_mm03_4_acs_view.png %})

### Equipment

To upload attachments to an Equipment:

1. Choose any existing Equipment via transaction `IE03`.

   ![SAP transaction IE03]({% link sap-cloud/images/sap_test_ie03_1.png %})

2. Upload a document via the GOS menu **Create > Create Attachment**.
3. Verify the document has been successfully stored via CMIS in Content Services by opening it again in the Attachment List.

#### Verify Equipment in Content Services

In Content Services navigate to the **Business Object Types > Equipment** folder to find the recently stored document. There will be some basic CMIS related aspects available.

![View Equipment in Content Services]({% link sap-cloud/images/sap_test_ie03_2_acs_view.png %})

## Supported SAP Business Objects

The following table lists all SAP Business Objects that are tested and supported in the current version of the Content Connector for SAP Cloud against S/4HANA 2020 on-premises:

| SAP Business Object Name | SAP Business Object Type | Transaction Code | Supported |
| ---------------- | --------- | ---- | --- |
| Business Partner | `BUS1006` | `BP` | Yes |
| Condition Contract | `BUS2235` | `WCOCO` | Yes |
| Equipment | `EQUI` | `IE03` | Yes |
| Inbound Delivery | `BUS2015` | `VL33N` | Yes |
| Material Master | `BUS1001006` | `MM03` | Yes |
| Outbound Delivery | `LIKP` | `VL03` | Yes |
| Product | `MARA`, `BUS1001001`, `BUS1001006` | `MM03` | Yes |
| Production Order  | `PORDER` | `CO03` | Yes |

## Troubleshooting

Sorry you're having trouble with the Content Connector for SAP Cloud. Your problem may be related to any one of the following issues.

### RFC destination connection test fails (HTTP response code 400)

The connection test of the created RFC destination (`SM59`) returns with **`400`** response code:

![RFC Connection Test fails]({% link sap-cloud/images/sap_no_license_3_rfc_connection.png %})

This may be due to an incorrect **Path Prefix** specified for the target system. Make sure you use the exact value mentioned in [step 3 of creating the RFC Connection]({% link sap-cloud/latest/config/index.md %}#new-http-connection).

### RFC destination connection test fails (HTTP response code 402)

The connection test of the created RFC destination (`SM59`) returns with **`402`** response code:

![RFC Connection Test fails]({% link sap-cloud/images/sap_no_license_2_rfc_connection.png %})

This may be due to a missing (or expired) license file. Make sure you've [applied a valid license file]({% link sap-cloud/latest/install/index.md %}#install-license).

### Upload of attachments fails

The upload of an attachment fails in any transaction with the following error:

![SAP Application Error]({% link sap-cloud/images/sap_no_license_1.png %})

In most cases, this is due to an expired license file. Make sure you've applied a valid license file for the SAP Cloud Connector.

If the license exists and is valid, this error may be due to incorrect configuration of the related repository in `OAC0`. In this case, check the repository configuration again.
