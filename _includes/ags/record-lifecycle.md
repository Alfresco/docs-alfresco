You can create a record either by uploading it to the 
Records Management {% include tooltip.html word="fileplan" text="File Plan" %}, or by declaring a file in another Alfresco site as a record.

When you have added all required metadata to a record you can mark the record as {% include tooltip.html word="recordcompleted" text="complete" %}. 
This makes it an active part of the File Plan, and subject to the rules of the {% include tooltip.html word="retentionschedule" text="retention schedule" %} it is 
associated with.

It then goes through various time and {% include tooltip.html word="events" text="event" %} based steps such as {% include tooltip.html word="cutoff" text="cut off" %} and retention, 
until it is eventually transferred elsewhere, or destroyed, according to its retention schedule.

![Record Lifecycle]({% link ags/images/record-lifecycle.png %})