---
title: The calendar
---

The site calendar lets you schedule and track events related to the current site.

Site members can create events that appear on the calendar for all site users to see. These events also display in the 
Site Calendar dashlet. You can view the calendar by day, week, or month. The Agenda view displays upcoming events.

> **Note:** See [Customizing a site](link ../tasks/site-customize.md) for how to switch the calendar on and off for a site.

## Accessing the calendar

Access the calendar to view upcoming events for the current site.

Within the calendar you can create events, as well as edit and delete any events that you created.

1. In a site click **More** then **Calendar**.

    > **Note:** In each site the feature names can be customized. If the site manager has done this, the link might have a name other than **Calendar**.

    This opens the calendar which defaults to the Month view. Any events scheduled in the current month are displayed on the calendar.

## Browsing the calendar

The main view defaults to a calendar displaying the current month. The explorer panel to the left provides another 
calendar for navigating the months without affecting the main view.

1. In the calendar use the navigation buttons to change the main calendar view:

    1. Use the **Day**, **Week**, and **Month** buttons to change the main display to a daily, weekly, or monthly view.

    2. Use the Previous ![Previous]({% link content-services/images/ico-cal-left.png %}) and Next ![Next]({% link content-services/images/ico-cal-right.png %}) buttons to move forward and backward through the calendar, either a day, week, or month at a time, depending on the current view.

    3. Click **Agenda** to view a list of the upcoming events scheduled for this site.

    4. Click **Today** to display the current date.

        By default the Day and Week views display only the working hours. Click the ![Show working hours]({% link content-services/images/ico-cal-showall.png %}) Show all hours icon to display the full day.

2. Use the calendar in the browsing pane to navigate through the months without affecting the main view.

    1. Click ![Previous]({% link content-services/images/ico-cal-arrowleft.png %}) to display the previous month.

    2. Click ![Next]({% link content-services/images/ico-cal-arrowright.png %}) to display the next month.

    3. Click **This Month** beneath the calendar to reset it to the current month. The current day and any dates with scheduled events are highlighted.

3. Click a date on the browsing pane calendar to load the selected date on the calendar in the main view.

4. Click a tag in the **Tags** list to display only the events associated with that tag.

    Click **Show All Items** to display all events.

5. Click an event in the calendar to view its full details.

6. Click **iCal Feed** in the header to use the calendar data exchange.

## Viewing an event

The calendar displays only the event name and time, so to view full details you must open the event. Once open you can 
edit or delete the event.

1. In the calendar find the event you want to view in one of the following ways:

    * Navigate the calendar on the main view.
    * Navigate the calendar in the explorer panel and select a date to update the main view calendar.
    * Click **Agenda** to display upcoming events.
    
2. On the main view click the event you are interested in. You can do this in any view: Day, Week, Month, or Agenda.

    The Event Information dialog box displays the full details of the selected event. The Related Content section shows where you can find material associated with the event if a location has been provided. Click the link to jump to that folder in the library.

    If you have the correct permissions you can edit and delete the event from here.

3. Click **Close** to return to the calendar.

## Adding an event

Any site member can schedule an event in the site calendar. The event appears in the calendar and the Site Calendar dashlet.

1. In the calendar start the event creation in one of the following ways:

    * Click **Add Event**.
    * Click on an event date on the explorer panel calendar and then click **Add Event**.
    * Navigate the calendar on the main view and click an event date.
    
    > **Note:** To create an event in the Agenda view you must use the **Add Event** button in the header.

    Simply clicking **Add Event** causes the start and end dates to default to the current date. Specifying a date first, as in the other two methods, causes the start and end dates to default to the date selected.

    The **Add Event** dialog box opens. Fields marked with an asterisk (\*) are required.

2. Type a name for the event in the **What** box.

3. Type the event location in the **Where** box.

4. Enter a **Description** of the event.

    > **Note:** The details you enter in these first three fields appear in the Agenda view for all users to see. In the other views only the event name displays.

5. Select the event start and end dates.

    The start and end dates default to the same day but events can span multiple days. Click the icon to the right of the date field to display a calendar then navigate to the required month and click a date to select it.

6. Specify the duration of the event:

    Select **All Day** to schedule a full day event. The start and end times are not applicable when you schedule an all day event. All times are in 24-hour clock.

7. Add existing or create new tags for the event as necessary.

8. Optionally, select a folder to indicate to users where material related to the event is located:

    > **Note:** The Related Content section is not visible by default. Contact your system administrator to update `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/modules/create-event.get.properties` and `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/components/calendar/info.get.properties` if you cannot see this feature.

    1. In the Related Content section, click **Browse**.

    2. On the Browse Folders dialog box navigate the library folder structure and select the appropriate folder.

    3. Click **OK**.

    The selected path is displayed on the **Add Event** page.

9. Click **Save**.

The dialog box closes and the calendar displays the new event as scheduled.

## Editing event details

Edit a scheduled event to change any of the details, including the location, date, and time. You can also add and 
remove tags, and change the library folder associated with the event.

1. In the calendar find and click on the event you want to edit.

2. Click **Edit** on the **Event Information** dialog box.

    The Edit Event dialog box displays the details for the selected event.

3. Make the required changes to the event and edit any tags as necessary.

    You can add and remove existing tags, or create new tags.

4. Add or change the library folder in the Related Content section to indicate where related event material is located.

    > **Note:** The Related Content section is not visible by default. Contact your system administrator to update `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/modules/create-event.get.properties` and `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/components/calendar/info.get.properties` if you cannot see this feature.

5. Click **Save**.

    The dialog box closes and the calendar displays the updated event. No changes will be evident on the calendar unless you changed the event name or time.

## Changing event date and time

You can easily change the day, time, and duration of an event.

1. In the calendar find the event you want to edit.

2. Select the **Day** or **Week** view.

3. Edit the event:

    1. Position the cursor on the resizing bar at the bottom of the event. Click and drag the bar to adjust the duration of the event.

    2. Position the cursor anywhere in the event span. Click and drag the entire event to a different time slot.

    3. (Week view only) Position the cursor anywhere in the event span. Click and drag the event to a different day and time.

## Deleting an event

When a scheduled event is cancelled you can easily delete it to remove it from the calendar. This also removes it from the Site Calendar dashlet.

1. In the calendar find and click on the event you want to delete.

    The Event Information dialog box displays the full details of the selected event.

2. Click **Delete**.

    A message prompts you to confirm the deletion.

3. Click **Delete**.

The dialog box closes and the calendar the event is removed from the calendar.