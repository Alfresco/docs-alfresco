A retention schedule is created against and associated with a record {% include tooltip.html word="category" text="category" %}. First you create a summary of the schedule, then the steps in the schedule.

1. Hover over a record category in the {% include tooltip.html word="fileplan" text="File Plan" %} and click **View Details**.

    The category details page displays and if the category already has a retention schedule then you'll see the schedule summary and steps.

2. Click **Create Retention Schedule**.

3. In the **General** section, click **Edit**.

4. Complete all fields:

    |Field|Description|
    |-----|-----------|
    |Retention Authority|The authority that states how the record should be retained and disposed, for example *Sarbanes-Oxley Act (SOX)* or *Corporate procedures*.|
    |Retention Instructions|A summary of the retention schedule.This information is not actively used but this text is displayed in the record category summary in the File Plan, and is important from a legal perspective.|
    |Applied to|**Record Folder**: the retention schedule is applied to folders and all operations occur at the folder level. With this setting, you cannot manage records as individual units. If you {% include tooltip.html word="cutoff" text="cut off" %} the folder, all records will be cut off. <br><br>**Record**: the retention schedule is applied to records and all operations occur at the record level.|

    >**Note:** If you add folders to a category before setting up the retention schedule, then you can only select **Record Folder**.

5. Click **Save**.

    The category details page now displays a summary of the new or updated retention schedule.

Next you need to add steps to the retention schedule.

See also video explaining [creating a retention schedule]({% link governance-services/latest/using/gs/video-tutorials.md %}#create-a-retention-schedule).