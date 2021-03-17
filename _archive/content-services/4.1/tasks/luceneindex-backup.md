---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: back up Lucene index
---

# Changing the scheduled Lucene back up time

This section describes how to set the time that the scheduled backup of the Lucene indexes occurs.

1.  Copy the following file:

    <configRoot\>/alfresco/scheduled-jobs-context.xml

2.  Locate the `<extension>` directory, and paste the copied file into this location.

3.  Rename the file to custom-scheduled-jobs-context.xml.

    As your override file ends with -context.xml, you do not need to point to your file.

4.  Delete each pair of `<bean> </bean>` tags \(excluding the pair containing the `indexBackupTrigger` bean\).

    This bean contains the following properties:

    ```
    <!-- trigger at 3am each day -->
            <property name="cronExpression">
                <value>0 0 3 * * ?</value>
            </property>
    ```

    The default is to run the job at 3am every day.

5.  Modify the `cronExpression` values, if required

    The value `0 0 3 * * ?` specifies the backup is triggered at 3am every day.

    After each backup scheduled in the `indexBackupTrigger` bean, perform your normal backup of this directory.

    **Note:** Each backup will overwrite the existing backup.


**Parent topic:**[Backing up and restoring Lucene indexes](../concepts/backup-lucene-intro.md)

