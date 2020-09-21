---
title: Customizing the end of the financial year
---

You can set the end date of the financial year and the end of the financial quarter.

>**Important:** If you make adjustments to your financial year as per the instructions below, it is important you carry out the same procedure on your new installation every time you upgrade to a new version of Alfresco Governance Services.

1. Navigate to the `<TOMCAT_HOME>/webapps/alfresco/WEB-INF/lib/alfresco-repository-xxx.jar` file in your installation.

2. Copy the `alfresco-repository-xxx.jar` to `<temp-dir>/alfresco-repository-xxx.zip` and extract the contents

2. From the extracted ZIP file copy `alfresco/period-type-context.xml` to `<TOMCAT_HOME>/shared/classes/alfresco/extension`.

3. Rename the file to `custom-period-type-context.xml`.

4. Change all the `value` properties to suit the dates of your financial year.

    For example, the following would customize your system to start the financial year in October.

    ```xml
    <bean id="period.end.of.financial.month" class="org.alfresco.repo.dictionary.types.period.EndOfFinancialMonth" >
       <property name="startDayOfMonth">
           <value>1</value>
       </property>
       <property name="startMonth">
           <value>10</value>
       </property>
    </bean>
    <bean id="period.end.of.financial.quarter" class="org.alfresco.repo.dictionary.types.period.EndOfFinancialQuarter" >
       <property name="startDayOfMonth">
           <value>1</value>
       </property>
       <property name="startMonth">
           <value>12</value>
       </property>
    </bean>
    <bean id="period.end.of.financial.year" class="org.alfresco.repo.dictionary.types.period.EndOfFinancialYear" >
       <property name="startDayOfMonth">
           <value>1</value>
       </property>
       <property name="startMonth">
           <value>9</value>
       </property>
    </bean>
    ```

5. Restart the server.

6. (Optional) If you change your financial periods this does not update any previously set calculated schedules and you will need to edit all retention schedules to ensure the new period start date is used. See [Editing a retention schedule]({% link ags/latest/using/gs/retentionschedules.md %}#editing-a-retention-schedule).  
