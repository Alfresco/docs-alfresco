---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# Handling messages by target node type

Default behaviors for incoming email to different types of referenced nodes.

You can modify or extend the default behaviors by adding in custom handlers.

-   **Folder\(Space\)**

    Content added with emailed aspect.

-   **Forum\(Discussion\)**

    Content specialized to Post with emailed aspect; if email subject matches a topic, then add to topic, otherwise create new topic based on subject.

-   **Topic\(Post\)**

    Content specialized to Post with emailed aspect; if referenced node is a Post, add to Post’s parent Topic.

-   **Document\(Content\)**

    If discussion exists, same as for forums, otherwise add discussion with email as initial topic and post.


**Parent topic:**[Configuring inbound and outbound email](../concepts/email-intro.md)

