---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring multiple tickets for authentication

For each authentication attempt, Alfresco Content Services returns a different session ID, but the same ticket for each user. You can configure multiple tickets using the `authentication.ticket.useSingleTicketPerUser` option.

The `TicketComponent` configuration setting, in alfresco-global.properties, has an option called `authentication.ticket.useSingleTicketPerUser`. This option has a default setting of `true`, which means that only one ticket is created for each user, and this ticket is returned for every authentication attempt by that user. If the ticket is invalidated, the user is required to re-authenticate before using the repository.

To set multiple tickets for each user, set `authentication.ticket.useSingleTicketPerUser=false`.

**Parent topic:**[Authentication service](../concepts/implserv-authentication.md)

