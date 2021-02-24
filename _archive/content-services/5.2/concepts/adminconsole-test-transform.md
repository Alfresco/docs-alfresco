---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Test Transform

Use this tool to view and test transformation settings.

You can also change transformation limits and add and configure additional transformations.

**Note:** Some uncommon file types may not be included in the test.

-   **Transformer Properties**

    Select from **All Properties** and **Customer Properties** and click **Get Properties** to view a log of all system transformer properties. You can copy and paste from the log to use in other parts of the Test Transform tool.

-   **Set Transformer Properties**

    You can:

    -   Add a new transformer property by entering the property and clicking **Set Properties**
    -   Edit an existing transformer property by entering the property and new value and clicking **Set Properties**
-   **Remove Transformer Properties**

    Enter a property name and click **Remove Properties** to remove an existing transformer property. Only remove custom properties.

-   **Transformation Log**

    Click **Get Transformation Log** to view the latest transformation log entries.

-   **Transformation Debug Log**

    Click **Get Debug Transformation Log** to view the latest transformation debug log entries - this gives more details of what the transformer is doing than the standard Transformation Log.

-   **Transformer Names**

    Click **Get Transformer Names** to get a list of all the top level transformers in your system.

-   **Transformation Statistics**

    Select a transformer and source and target extensions then click **Get Transformation Statistics** to view details on transformation speed, usage, average transformation time and so on. If you don't make any selections then all transformations statistics will be shown.

-   **Test Transformation**

    Check the transformers are working by running a test transform. Select a transformer or use the \(AUTO\) default to automatically select one. Then select From and To targets and a Context.

    **Note:** Leaving any of these unselected will mean that all options are included.

    Click **Test Transform** to run the test.

-   **Transformations By Extension**

    Check which transformations between file types are permitted on your system. Select options to check, or make no selection to test check all transform options, then click **Get Transformations by Extension**.

-   **Transformation By Transformer**

    Check which transformations available for each transformer. Select options to check, or make no selection to test check all transform options, then click **Get Transformations by Transformer**.


**Parent topic:**[Support Tools](../concepts/monitoring-intro.md)

**Related information**  


[Launching the Admin Console](../tasks/adminconsole-open.md)

