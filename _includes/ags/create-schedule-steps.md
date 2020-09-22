When you've set up a retention schedule, you need to add retention steps. The steps give the retention schedule 
it's control over records and folders.

1. Hover over a record {% include tooltip.html word="category" text="category" %} in the {% include tooltip.html word="fileplan" text="File Plan" %} and click **View Details**.

    The *Category Details* page displays showing the retention schedule summary.

2. In the **Retention Steps** section, click **Edit**.

    The *Edit Retention Schedule* page displays.

3. Click **Add Step** and select a retention action.

    |Option|Description|
    |------|-----------|
    |Cut off|This is the first step in a retention schedule. Once a record is cut off this triggers the records retention period. You can't add records to a folder that's been cut off.|
    |Retain|This is an alternative first step that is a 'placeholder' step which delays the next retention step until after a selected time period or event.|
    |Transfer|Records are transferred from one location to another. This can be applicable to both electronic and non-{% include tooltip.html word="electronicrecord" text="electronic records" %}, and will be used, for example, when transferring records from an organization to an archive.|
    |Accession|An advanced form of {% include tooltip.html word="transfer" text="transfer" %} usually involving the specific legal and physical transfer of records between organizations.|
    |Destroy|Electronic records are removed from the Records Management system and destroyed, and non-electronic records must be destroyed.|

    >**Note:** You can add multiple steps to a retention schedule, but the first step must be either a Cut off or Retain action, and no steps can be added after the Destroy action.

4. Select whether the action will be triggered after a period of time or when a specified {% include tooltip.html word="events" text="event" %} occurs:

    |Option|Description|
    |------|-----------|
    |After a period of|Select the time period after which the step action will take place.<br><br>***Note:*** If you select XML Duration from the Period Type drop down list you can specify a time interval using XML syntax.<br><br>The syntax should take the form of:<br><br>P = Period (required)<br><br>nY = Number of years<br><br>nM = Number of months<br><br>nD = Number of days<br><br>T = Start time of a time section (required if specifying hours, minutes, or seconds)<br><br>nH = Number of hours<br><br>nM = Number of minutes<br><br>nS = Number of seconds<br><br>For example, 'P2M10D' represents two months and ten days.<br><br>Created Date = The date when the file or record is first added to Alfresco.<br><br>Retention Action = The date when the last retention action took place. Don't select this for the first step in the schedule.<br><br>The "Quarter" option splits the year into 4 sets of 3 months, beginning with Jan/Feb/March. "Financial Quarter" is the same but based on the start of your system-configured financial year. See [Customizing the end of the financial year]({% link ags/latest/starting/managers/customize-end-of-year.md %}).|
    |When event happens|Select the event after which the step action will take place.<br><br>Most events must be completed manually in the record details page, or you can use rules to automatically complete these events.<br><br>The Obsolete, Superseded, and Related Record Transferred To Inactive Storage events are automatically completed when [relevant relationships are set up between records]({% link ags/latest/using/gs/manage-fileplan.md %}#creating-relationships-between-records).|

    >**Note:** You can select both options, or multiple events, and have the action triggered by **Whichever event is earlier** or **When all events have happened**.

    The date selected here is displayed as the **Retention as of date** in the details page for records or folders, depending on which the retention applies to. If you select an event then this field will display *None*, and you should complete the event on the details page.

5. If you added a Destroy step then there is an additional **Keep record metadata after record destruction** option. If you select this option then destroyed records are still represented in the File Plan rather than being completely deleted. An audit trail and metadata remain but the records can't be accessed.

    >**Note:** The metadata is maintained indefinitely unless it is manually deleted from the File Plan by someone with the ALFRESCO\_ADMINISTRATOR role, or another role that has been given permissions to delete the metadata.

6. Enter a **Step Description**.

7. Click **Save**.

    >**Tip:** You can click the ![Edit icon]({% link ags/images/ico-configure.png %}){:height="18px" width="18px"} edit icon or ![Delete icon]({% link ags/images/ico-delete.png %}){:height="18px" width="18px"} delete icon next to a step to edit or delete it.

8. When you've entered all the required steps click **Done**.


You return to the category details page, which displays the retention steps. Click **View Description** to the right of a step to display the description.

See also video explaining [creating retention schedule steps]({% link ags/latest/using/gs/video-tutorials.md %}#create-retention-schedule-steps).