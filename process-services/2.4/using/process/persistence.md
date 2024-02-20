---
title: Configure Data persistence
---

When you build a process you use Form variables and declare Process variables. You can either give values to these variables or you can allow a user to give values to them once the process has started. 
Once the process has completed however, all these values are stored in your database but are no longer needed. You can use the Data persistence functionality to free up space in your database when creating a process, and remove this redundant data.

1. Create a new process.

2. Click Data persistence.

    ![data persistence]({% link process-services/images/data-persistence.png %})

3. Once you have clicked on Data persistence you are presented with several configuration options. Select the one that best suits your requirements. 

    ![change value]({% link process-services/images/change-value.png %})

    * **Save All** Selects all variables that are used in the process and stores them in the database. Select this option if it is important for your organization to be able to revisit the input variables at a later date. Provides the lowest database performance. 
    * **Save specified processes** Allows you to select what input variables to persist in the database. Provides higher database performance.
    * **Don’t Save any** All variables used in the process will be deleted from the database. Select this option if is not important for your organization to be able to revisit the input variables at a later date. Provides maximum database performance. This option leaves an initiator that describes when the process started and ended, for example, `45095`, `45094`, `45094`, NULL, `initiator`, `string`, `0`, NULL, NULL, NULL, `2`, NULL, `2022-01-25 13:37:52.373`, `2022-01-25 13:37:52.373`.

4. If you select the **Form Fields** heading and you can select which processes are to persist in the database. Select the process from the left pane and use the buttons in the middle to configure how they are handled. 

    ![form button]({% link process-services/images/form-button.png %})

5. If you select the **Process Variables** heading you can select which process variables are to persist in the database. Use the radio buttons on the right to configure how they are handled. Click **Save**.

    ![form radio]({% link process-services/images/form-radio.png %})

When you have finished you can see how many properties you have selected not to persist.

![not persisted]({% link process-services/images/not-persisted.png %})












