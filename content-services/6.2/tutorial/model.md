---
title: Configure the Model Manager tutorial
---

In this tutorial you will learn how to create custom models and implement content modeling using the Model Manager.

You will perform a step-by-step walk-through of creating and using models, custom types, aspects, and their properties in Alfresco Share.

In this tutorial we assume that Content Services is implemented in a fictitious company called DemoCo as their ECM solution for managing content on their new website. DemoCo wants to add new types of content (for example, white papers) to their website and track metadata for all their files in the repository.

For this purpose, DemoCo needs to create a new model, `Document` with a custom type called `whitePaper`. If a document is a white paper, then DemoCo would want to capture its writer's name and domain area. Also, for each document, DemoCo wants to determine if the content needs to be shown on their website. If yes, there should be a flag to indicates that the content is active and the date when the content was set to active.

So, let's start by creating a new model called `Document`. It has a custom type - `whitePaper` with properties `writer` and `domain`. The model has an aspect - `Webable` with properties `published` and `isActive`.

![Overview of DemCo's content model]({% link content-services/images/cmm_tutorial.png %})

## Step 1: Navigate to Model Manager

Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager**.

## Step 2: Create a new model

1. Click **Create Custom Model**.

2. Set the following properties:

    * Namespace: `http://www.democo.com/model/document/1.0`
    * Prefix: `dc`
    * Name: `Document`

3. Click **Create**.

## Step 3: Create a new type

1. Click the content model, `Document`.

2. Click **Create Custom Type**.

3. Set at least the following properties:

    * Name: `whitePaper`
    * Display label: `White Paper`

4. Click **Create**.

## Step 4: Create new custom type properties

1. Under the **Custom Types** list, click `dc:whitePaper`.

2. Click **Create Property**.

3. Set at least the following properties:

    * Name: `writer`
    * Display label: `Writer`
    * Select `d:text` for the data type
    * Requirement: `Mandatory`

4. Click **Create and Start Another** and set at least the following properties:

    * Name: `domain`
    * Display label: `Domain`
    * Select `d:text` for the data type
    * Select `List of Values` for the constraint and enter `Engineering`, `Marketing`, `HR`, `Sales`, `Finance` and `Operations`.
    * Select `Sort Alphanumerically` for the order of values.

5. Click **Create**.

## Step 5: Add new type properties to the Layout Designer

1. Navigate to the page displaying the custom types list.

2. Click **Layout Designer** from the **Actions** drop-down list for the type, `dc:whitePaper`.

3. Drag the double column panel layout from top onto the layout area.

4. To specify the panel label, click anywhere on the element's top panel displaying the label, **double column panel**.

5. In the **Label** field, enter `Details`.
6. Configure other optional fields, if required.
7. Drag the properties, `writer` and `domain` onto the **Details** element.
8. To configure the properties, click anywhere on the property.
9. On the Layout Designer, click **Save**.

## Step 6: Create new aspect

1. Navigate to the **Model Manager** page.
2. Click the model, `Document`.

3. Click **Create Aspect**.

4. Set at least the following properties:

    * Name: `webable`
    * Display label: `Webable`

5. Click **Create**.

## Step 7: Create new aspect properties

1. Under the **Aspects** list, click `dc:webable`.
2. Click **Create Property**.
3. Set at least the following properties:

    * Name: `published`
    * Display label: `Published`
    * Select `d:datetime` for the data type

4. Click **Create and Start Another**.

5. Set at least the following properties for the new property:

    * Name: `isActive`
    * Display Label: `Is Active`
    * Select `d:boolean` for the data type
    * Default value: `false`

6. Click **Create**.

## Step 8: Add new aspect properties to the Layout Designer

1. Navigate to the page displaying the aspects list.
2. Click **Layout Designer** from the **Actions** drop-down list for the aspect `dc:webable`.

3. Drag the single column panel layout from top onto the layout area.
4. To specify the panel label, click anywhere on the element's top panel displaying the label, **single column panel**.
5. In the **Label** field, enter `Publication details` and configure the optional fields if required.
6. Drag the properties, `published` and `isActive` onto the **Publication details** element.
7. To configure the properties, click anywhere on the property.
8. On the Layout Designer, click **Save**.

## Step 9: Activate the model

1. Navigate to the **Model Manager** page.
2. Click the **Actions** drop-down list for the model, `Document`.
3. Click **Activate**.

Now that we have created a new model with its custom type and aspect, let's see how we can use it to capture a file's metadata in Alfresco Share.

## Step 10: Apply custom type and aspect to a file in Alfresco Share

1. In your site, click **Document Library** to access the library.
2. Click on a file in the library to view it in the file preview screen.
3. To apply the type, perform the following steps:

    1. Under **Document Actions**, click **Change Type**.

    2. In the **Change Type** window, select `whitePaper` (`dc:whitePaper`) from the **New Type** drop-down list.

    3. Click **OK**.

        > **Note:** The type properties are displayed on the file preview page, under **Properties**. You can edit these properties using **Edit Properties** under **Document Actions**.

    4. In the **Writer** field, enter `User1`.
    5. In the **domain** field, select `Sales`.
    6. Click **Save**.

4. To apply the aspect, perform the following steps:

    1. Under **Document Actions**, click **Manage Aspects**.
    2. In the **Available to Add** list, click the **+** next to `Webable`.

        Click the trashcan to remove any existing aspects from the **Currently Selected** list.

    3. Click **Apply changes**.

        > **Note:** The aspect properties are displayed on the file preview page, under **Properties**. You can edit these properties using **Edit Properties** under **Document Actions**.

    4. Select `Is Active`.
    5. In the **Published** field, enter the date and time as `31/07/2020` and `10:00`, respectively.
    6. Click **Save**.

In this tutorial, you learned how to create and apply models, custom types, and aspects using the Model Manager to capture metadata about files.
