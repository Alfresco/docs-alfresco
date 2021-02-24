---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring storyboard thumbnails for Media Management

Use this information to configure storyboard thumbnails for video.

Storyboard thumbnails are images shown at regular intervals along the timeline of a video, that show the progress of the video as you hover over the timeline. These thumbnails are shown on videos rendered using an HTML5 player. If you do not want to use the default settings, you can configure this thumbnail information.

1.  Stop the Alfresco server.

2.  Edit your alfresco-global.properties file to specify when the thumbnails start, the interval and number of thumbnails shown in a timeline; for example:

    ```
    video.thumbnail.defaultOffset=00:00:00.5
    video.thumbnail.storyboardIntervalSeconds=2
    video.thumbnail.storyboardMaxElements=30
    ```

    A sample alfresco-global.properties file is shipped in the root folder of the Media Management distribution zip, which defines custom properties. See [Configuring Media Management](mm-props-config.md) for the full list.

3.  Start your Alfresco server to apply the changes.


**Parent topic:**[Configuring Media Management](../tasks/mm-props-config.md)

