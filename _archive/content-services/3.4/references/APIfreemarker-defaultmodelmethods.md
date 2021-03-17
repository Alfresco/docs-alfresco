---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Default Model Methods

Custom template methods can be added to the FreeMarker language for use on template pages. The default model provides the following methods:

## `hasAspect(TemplateNode, String)`

Returns the integer value 1 if the TemplateNode supplied has the aspect with the supplied QName String; else the integer value 0 will be returned.

## `dateCompare(DateA, DateB)`

Compares two dates to see if they differ.

This comparison returns 1 if DateA if greater than DateB; else, returns 0.

## `dateCompare(DateA, DateB, millis)`

Compares two dates to see if they differ by the specified number of milliseconds.

This comparison returns 1 if DateA is greater than DateB by at least the millis value in milliseconds; else, returns 0.

## `dateCompare(dateA, dateB, millis, test)`

Same as dateCompare\(DateA, DateB, Number\) but with the 'test' variable being one of the strings "\>", "<", or "==" \(greater than, less than, or equal to\) as the test to perform.

## `incrementDate(date, millis)`

Increments a date by the specified number of milliseconds and returns the new date.

## `message(String)`

Returns the I18N message string \(resolved for current user Locale setting\) for the specified String message ID.

## `cropContent(TemplateNode, length)`

Returns the first N characters from the content stream for the specified node.

## `shortQName(String)`

Returns the short, or prefix, version of a long QName.

**Note:** The return values for all custom methods are rather limited. It is only possible to return String, number, or date object. This is why the custom method described does not return a boolean value, as you might expect.

**Parent topic:**[Alfresco Repository FreeMarker Template reference](../references/APIfreemarker-intro.md)

