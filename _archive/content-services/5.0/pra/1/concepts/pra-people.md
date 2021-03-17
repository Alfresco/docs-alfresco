---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# People

People are the users of Alfresco. A person entity describes the user as they are known to Alfresco. There are API methods to get the sites a person is a member of, to get the the details of a person, their favorite sites, preferences, and networks they are a member of. Methods are also available to process activities related to a person.

## Person object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|enabled|boolean|boolean|Is this person currently enabled?|
|lastName|string|string|the person's last name|
|location|string|string|The person's location or address|
|avatarId|id|string|The id of the person's avatar|
|instantMessageId|string|string|The person's instant message Id|
|googleId|string|string|The person's Google Id|
|id|email id|string|The person's personId - the email address with which the person registered|
|skypeId|string|string|The person's Skype Id|
|description|string|string|The person's description|
|company|company|object|An embedded company object describing the person's company|
|firstName|string|string|The person's first name|
|telephone|string|string|The person's telephone number|
|jobTitle|string|string|The person's job title|
|mobile|string|string|The person's mobile number|

## Example of a person object

```

{
  "entry" : {
    "enabled" : true,
    "lastName" : "Bloggs",
    "location" : "Somewhere",
    "avatarId" : "85d45e64-eb02-44e1-b989-dbf571ab0704",
    "instantMessageId" : "fredb",
    "googleId" : "fredb@gmail.com",
    "id" : "fred.bloggs@yourcompany.com",
    "skypeId" : "fredb",
    "email" : "fred.bloggs@yourcompany.com",
    "description" : "Been with company for n years",
    "company" : {
      "organization" : "Your Company",
      "address1" : "Some place",
      "address2" : "Somewhere",
      "postcode" : "Z99 9Z9",
      "telephone" : "01234 123456",
      "fax" : "01234 123457",
      "email" : "info@yourcompany.com"
    },
    "firstName" : "Fred",
    "telephone" : "01234 567890",
    "jobTitle" : "VP of something",
    "mobile" : "07777 567890"
  }
}
```

-   **[Methods](../../../pra/1/concepts/pra-people-methods.md)**  
Methods for person objects.
-   **[Sites](../../../pra/1/concepts/pra-people-sites.md)**  
An Alfresco site is a project area where you can share content and collaborate with other site members. There are API calls for getting a list of sites that a person is a member of, and for getting information about a person's membership of a single site.
-   **[Favorite sites](../../../pra/1/concepts/pra-people-favourite-sites.md)**  
The sites that a person has marked as favorite in Alfresco \(Deprecated\). Use the favorites entity and methods.
-   **[Preferences](../../../pra/1/concepts/pra-people-preferences.md)**  
A person's preferences in Alfresco.
-   **[Networks](../../../pra/1/concepts/pra-people-networks.md)**  
A network is the group of users and sites that belong to an organization. You can find out specific network information or how it relates to a person.
-   **[Activities](../../../pra/1/concepts/pra-people-activities.md)**  
Activities describe any past activity in a site, for example creating an item of content, commenting on a node, liking an item of content.

**Parent topic:**[API reference](../../../pra/1/concepts/pra-resources.md)

