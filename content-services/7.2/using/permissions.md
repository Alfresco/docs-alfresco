---
title: User roles and permissions
---

A user's role determines what they can and cannot do in a site. Each role has a default set of permissions.

The following sections describe these permissions. In general:

* **Managers** have full rights to all site content - what they have created themselves and what other site members have created.
* **Collaborators** have full rights to the site content that they own; they have rights to edit but not delete content created by other site members.
* **Contributors** have full rights to the site content that they own; they cannot edit or delete content created by other site members.
* **Consumers** have view-only rights in a site: they cannot create their own content.

> **Note:** As well as these four default roles you might also see additional roles in different places in Alfresco Share.

* **Coordinator** - has full rights to all content - what they have created themselves and what others have created.
* **Editor** - has rights to edit file properties and check files in and out; they cannot create their own content.

Your Alfresco Administrator can also add additional roles.

Site managers can [change a site role]({% link content-services/7.2/using/sites/index.md %}#changesiterole) for the site users.

If you're a member of two user groups which have different permissions then you will get the sum total of all the permissions. For example, if Group 1 has permission to view a file and Group 2 has permission to view and edit a file, then you would have view and edit permission for the file.

> **Note:** Site content can be defined as any content created or added to a site. This includes, but is not limited to, wiki pages, blog postings, library folders and items, calendar events, discussion topics, and comments on any content.

## Dashboards permissions

The following sections detail the user permissions for dashboards (personal and site) and dashlets.

Each user has full access to the toolbar and dashlet functionality available on the personal dashboard.

### Site dashboard

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Invite users to site | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Customize site dashboard| | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit site details | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Customize site (select components) | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Leave site | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Site dashlets

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| RSS Feed - Configure RSS Feed URL | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Site Data Lists - Create data list | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Site Links - Create site links | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| WebView - Configure Web View | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Wiki - Configure Wiki dashlet | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Site file type breakdown dashlet - View details | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Site contributor breakdown dashlet - View details and change date range | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

## Content permissions

The following sections detail the user permissions for content.

### Document Library

#### Folders and files

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| View folder / item details page | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Like / unlike | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Favorite / unfavorite | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Rename folder / item - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Rename folder / item - created by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit basic details - created by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit basic details - created by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit custom properties - created by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit custom properties - created by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Copy | ![tick image]({% link assets/img/done_24px.svg %}) * | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Move - content created by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Move - content created by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete - content created by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete - content created by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Manage permissions - content created by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Manage permissions - content created by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Manage aspects - content created by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Manage aspects - content created by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Change type - content created by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Change type - content created by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Copy page URL | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Add comment | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit comment - content created by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit comment - content created by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete comment - content created by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete comment - content created by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

(*) A user with the role Consumer can copy a folder or file to another site if the user performing the action has the role of Manager, Collaborator, or Contributor in the target site.

> **Tip:** Consumers who previously held a site role where they were able to add content retain their previously held permissions for any content they have added.

#### Folders only

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Create folder | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Locate folder | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Manage rules in self-created folder | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Manage rules in folder created by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

#### Files only

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Create content | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Upload content | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Download content | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| View in browser | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Upload new version - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Upload new version - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Upload new version - locked by other user | | | | |
| Edit online - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit online - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit inline - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit inline - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit offline - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit offline - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Publish | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Unpublish | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Check out to Google Docs - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Check out to Google Docs - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Check in from Google Docs - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Check in from Google Docs - created / added by other user | | | | |
| Cancel editing - locked by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Cancel editing - locked by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| View original version | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| View working copy | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| View in Google Docs | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Start workflow | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Locate file | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Download previous version | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Revert to previous version | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Calendar

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| View event | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Create new event | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit event - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit event - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete event - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete event - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

### Wiki

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Create new page | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit page - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit page - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Rename page - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Rename page - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete page - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete page - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit main page | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Rename main page | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete main page | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| View page details | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| View previous version of page | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Discussions

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Create new topic | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit topic - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit topic - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete topic - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete topic - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| View discussions | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Add reply | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit reply - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit reply - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Blog

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Create new post | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit post - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit post - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| View blog post | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Publish post externally - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Publish post externally - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Update external post - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Update external post - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Remove external post - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Remove external post - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Create comment | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit comment - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Links

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Create new link | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit link - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit link - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete link - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete link - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| View link details | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Create comment | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit comment - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit comment - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete comment - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete comment - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

### Data Lists

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Create list | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit list - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit list - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete list - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete list - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Add list item - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Add list item - created / added by other user | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit list item - created / added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Edit list item - created / added by other user | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Duplicate list item - created / added by other self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Duplicate list item -created / added by other user | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete list item - created /added by self | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Delete list item - created / added by other user | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

## Member permissions

The following section details the member permissions.

| Permission | Consumer | Contributor | Collaborator | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Change a user role | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Remove user from site | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Cancel an invitation | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

## Power users

Alfresco Share power users have additional options that aren't available to standard users.

These options are made available when your Alfresco administrator gives you advanced permissions by signing you up to a power user group.

The current additional options available are:

* Sites Manager
* Search Manager

If you have the following permissions you can access the Site Manager through an additional link on the toolbar, and the Search Manager from the Search Results screen.

* Sites Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `SITES_ADMINISTRATORS` permissions groups.
* Search Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `ALFRESCO_SEARCH_ADMINISTRATORS` permissions groups.

### Sites Manager

The Sites Manager is used for maintaining sites. You have control over the visibility of all sites as well as deleting sites or making yourself a site manager.

> **Note:** Sites Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `SITES_ADMINISTRATORS` permissions groups. If you are in the `ALFRESCO_ADMINISTRATORS` group, you can access the Site Manager through the **Admin Tools** on the toolbar. If you are a member of `SITE_ADMINISTRATORS` group, you'll have an additional **Sites Manager** option on the toolbar.

The Sites Manager displays the names and status of created sites, regardless of their visibility setting. You can use the **Visibility** menu to change the visibility of any site, for example, change the site visibility to either **Public**, **Moderated**, or **Private**. Any visibility change you make to a site is made immediately.

With the **Actions** menu, there are two options:

* **Delete Site**: You can delete any of the sites in the **Site Manager** list by selecting **Delete Site** from the **Actions** menu. This action deletes all site details and content.
* **Become Site Manager**: The I'm a Site Manager column shows the sites where you have the Site Manager permission. If you aren't already a manager of a site, then select **Become Site Manager** from the **Actions** menu.

### Search Manager {#searchmanager}

With the Search Manager you can see details of existing search filters and create new filters.

> **Note:** Search Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `ALFRESCO_SEARCH_ADMINISTRATORS` permissions groups.

The Search Manager is accessed from the search results screen. Just type a search in the search box and press Enter, then on the search results screen click **Search Manager**.

**Note:** Filtered search results can be bookmarked for quick and easy access.

All existing filters (including default filters) are shown along with their details, in the order that they are shown on the search results screen. You can change the order by using the ![arrows]({% link content-services/images/arrows.png %}) buttons to move filters up or down the order.

Click **Create New Filter** to [create new search filters](#createnewsearchfilter).

Most of the filter details are can be edited by hovering over them and clicking the ![Configure icon]({% link content-services/images/ico-configure.png %}) icon that displays:

* **Filter ID**: The unique filter ID. Click on this to edit any details.
* **Filter Name**: The name of the filter shown in the search results screen. Default filters display the internationalized message key rather than the filter name that's shown on the search results screen.
* **Filter Property**: The property or field that the filter is based on.
* **Filter Type**: How the filter is displayed on the search results screen. The default option is **Simple Filter**.
* **Show with Search Results**: Specifies if the filter is shown in the search results screen. Filters with this switched off aren't displayed. Default filters can't be deleted and must be switched off to hide them.
* **Default Filter**: Specifies if the filter is a default or custom filter. Default filters are predefined and can't be deleted. You can hide them by switching off **Show with Search Results**.
* **Filter Availability**: The site(s) where the filter is available.

#### Creating new search filters {#createnewsearchfilter}

In the Search Manager you can quickly create your own custom filters with a wide range of options available.

1. In the **Search Manager**, accessed from the search results screen, click **Create New Filter**.

    > **Tip:** You can also click on an existing Filter ID to edit it.

2. Enter a **Filter ID** unique identifier for the new search filter.

3. Enter a **Filter Name**. This is the name of the filter shown in the search results screen. For default filters what is shown here doesn't represent what's shown on the search results screen.

    > **Note:** You can't select a custom filter to be a **Default Filter.**

4. The **Show with Search Results** option is selected by default. Deselect it if you don't want the filter to be shown on the search results screen.

5. Select a property to filter by from the **Filter Property** drop-down list.

6. Select a **Filter Type**. This is how the filter is displayed on the search results screen. The default option is **Simple Filter** which is a check box.

7. Select the **Sort By** order in which the filter results are displayed on the search results page.

8. Select the **Number of Filters** that are shown by default on the search results screen.

9. Select the **Minimum Filter Length**. This helps you exclude short words such as "and" and "to" from filter results.

10. Select the **Minimum Required Results** which is the minimum number of matches a filter result must have to be shown on the search results screen.

11. Select the Filter Availability:

    * **Everywhere** - shown on all sites
    * **Selected sited** - only shown on selected sites. Click ![add]({% link content-services/images/ico-add.png %}) to add a site then select it from the list and click ![tick]({% link content-services/images/ico-tick.png %}) to confirm. Click ![add]({% link content-services/images/ico-add.png %}) to add more sites if required.

12. Click **Save**
