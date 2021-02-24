---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Adding an event

Any site member can schedule an event in the site calendar. The event appears in the calendar and the Site Calendar dashlet.

1.  In the calendar start the event creation in one of the following ways:

    -   Click **Add Event**.
    -   Click on an event date on the explorer panel calendar and then click **Add Event**.
    -   Navigate the calendar on the main view and click an event date.
    **Note:** To create an event in the Agenda view you must use the **Add Event** button in the header.

    Simply clicking **Add Event** causes the start and end dates to default to the current date. Specifying a date first, as in the other two methods, causes the start and end dates to default to the date selected.

    The **Add Event** dialog box opens. Fields marked with an asterisk \(\*\) are required.

2.  Type a name for the event in the **What** box.

3.  Type the event location in the **Where** box.

4.  Enter a **Description** of the event.

    **Note:** The details you enter in these first three fields appear in the Agenda view for all users to see. In the other views only the event name displays.

5.  Select the event start and end dates.

    The start and end dates default to the same day but events can span multiple days. Click the icon to the right of the date field to display a calendar then navigate to the desired month and click a date to select it.

6.  Specify the duration of the event:

    Select **All Day** to schedule a full day event. The start and end times are not applicable when you schedule an all day event. All times are in 24-hour clock.

7.  Add existing or create new tags for the event as necessary.

8.  Optionally, select a folder to indicate to users where material related to the event is located:

    **Note:** The Related Content section is not visible by default. Contact your system administrator to update <configRootShare\>/classes/alfresco/site-webscripts/org/alfresco/modules/create-event.get.properties and <configRootShare\>/classes/alfresco/site-webscripts/org/alfresco/components/calendar/info.get.properties if you cannot see this feature.

    1.  In the Related Content section, click **Browse**.

    2.  On the Browse Folders dialog box navigate the library folder structure and select the appropriate folder.

    3.  Click **OK**.

    The selected path is displayed on the **Add Event** page.

9.  Click **OK**.


The dialog box closes and the calendar displays the new event as scheduled.

**Parent topic:**[The calendar](../concepts/calendar-intro.md)

**Related information**  


[Tagging site content](site-content-tag.md)

