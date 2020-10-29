---
title: Using the Analytics App 
---

Use the Analytics App tile to add standard reports and configure custom reports for performance and throughput 
statistics of your processes. You can view the Analytics App tile only if your account has the Analytics capability. 
Before generating process reports, make sure to run your processes at least a few times.

![Analytics App]({% link process-services/images/32.png %})

When you visit the Analytics app for the first time, you'll see some useful hints on the welcome screen.

![Analytics App Reports]({% link process-services/images/james-reports.png %})

The Analytics app has the following tabs:

* **Reports** - Use this to add standard reports in Process Services and view the existing reports.
* **Configure** - Use this to configure standard reports and custom reports.

## Configuring standard reports

In Process Services, you can add Standard reports at a click of a button. You can choose to add all standard reports 
at once or configure only the reports you’re interested in. For example, you can configure your report panel to isolate 
Task related reports such as Task overview and Task service level agreement reports, or custom reports that are based 
on generated reports (see [Customizing reports](#customizing-reports)).

**To add standard reports:**

* From the **Analytics app** > **Reports** tab, click **Add some standard reports now** link. The following standard reports appear in your Reports panel on the left:
    * Process definition heat map
    * Process definition overview
    * Process instances overview
    * Task overview
    * Task service level agreement

Alternatively, you can also add the same set of standard reports via the Configure tab. To remove your existing reports 
from the Reports panel, click **Reset all my reports**.

Once you have added the standard reports, you can access them from the Reports panel and generate them based on the 
required filter parameters. If the data is available, it will be presented in graph and tabular form, depending on the report selected.

## Filtering reports

You can filter most reports by the following parameters:

* Date range
* Process definition
* Process Status
* Task (Task related report only)
* Task Status (Task related report only)

Some reports such as Task service level agreement and Process instances overview reports have additional parameters.

## Customizing reports

You can customize reports by selecting the Process Status and Date Range parameters. You can also create new reports 
by modifying the filter option of an existing report and saving it with a new name.

**To generate and save a Task overview report:**

1.  Sign in to Process Services as a user with Administrator privileges.

2.  Click **Analytics App** > **Configure** and then Task overview.

3.  Select from the following filter options:

    * **Process Definition** - Process definitions for the selected user.
    * **Date Range** - Tasks from Today, Yesterday, Last 7 days, Previous month, Current year, or Custom Range.
    * **Task Status** - All tasks, Active, or Complete.
    * **Aggregate dates by** - Tasks by hour, day, week, month, or year.
        Relevant data for Task Counts, Task counts by assignee, Number of tasks divided by date interval, Task Duration, and statistics of all tasks are presented in graphical, tabular, and table formats. In addition, there’s an option to view the previous chart data in a table format.

4.  Click **Export Data** to generate the report in csv format.

5.  Optionally, to save the report with the selected filter options, click **Save this report**. You can also choose to save the report by a new name for easy identification. For example, if your report is specific to a task called Patients List, you could save the report as Task overview for Patients' list.

![Task overview]({% link process-services/images/taskoverview.png %})

You can generate all other reports in the same way by using the appropriate filter options. You are now ready to explore the advanced reporting and analytic features in Process Services.
