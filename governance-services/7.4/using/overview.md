---
title: Introduction to using Governance Services
---

With Governance Services you store and control all your records in a dedicated site. 
A Governance Services site is like other Alfresco sites, but with additional controls placed on its content.

Access a Governance Services site just as you would any other Alfresco site, from the **My Sites** dashlet or the **Sites** menu.

Instead of storing your files in a document library as you do in a "regular" Alfresco site, in a Governance Services 
site you file your records in the *File Plan*. And you can't edit the content of records; once they're in the File Plan 
record content is considered to be final.

You file records by adding them from your computer to the File Plan, or if you're in another Alfresco site you can 
declare a file as a record and it will be added to the Governance Services site. Once files are added to the File Plan 
you can edit their metadata (properties) but you can't edit their actual content.

## Records management roles

Although Governance Services has a huge amount of functionality available, it's actually pretty easy to learn the essentials and get up and running.

What you do in Governance Services will vary hugely depending on your role, and how your company is organized. 

As a *Records Manager* you're responsible for ensuring the Records Management site is properly organized and managed. The background configuration of the site should be managed by your Records Management administrator in the RM Admin Tools. This leaves you to get on with managing the site organization, devising and ensuring the implementation of retention and disposal schedules, and enabling appropriate access to information.

As a *User* of the Records Management site you need to file records and process them as easily as possible. Your Records Manager will have organized the site and set up retention and retention schedules, leaving you to get on with managing and processing the site records.

## Life cycle of a record

You can create a record either by uploading it to the 
Records Management {% include tooltip.html word="fileplan" text="File Plan" %}, or by declaring a file in another Alfresco site as a record.

When you have added all required metadata to a record you can mark the record as {% include tooltip.html word="recordcompleted" text="complete" %}. 
This makes it an active part of the File Plan, and subject to the rules of the {% include tooltip.html word="retentionschedule" text="retention schedule" %} it is 
associated with.

It then goes through various time and {% include tooltip.html word="events" text="event" %} based steps such as {% include tooltip.html word="cutoff" text="cut off" %} and retention, 
until it is eventually transferred elsewhere, or destroyed, according to its retention schedule.

![Record Lifecycle]({% link governance-services/images/record-lifecycle.png %})

## Further information

If you're new to Alfresco then take a look at [Using Alfresco]({% link content-services/latest/using/index.md %}) to help you get started.

For more details on setting up and administering Governance Services see [Administering Records Management]({% link governance-services/7.4/admin/index.md %}).

> **Note:** It's recommended that you use the File Plan for Governance Services actions rather than going through the repository.
