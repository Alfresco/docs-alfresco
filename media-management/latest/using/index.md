---
title: Using Media Management
---

Alfresco Media Management allows you to view and manipulate your digital assets in Alfresco Content Services.

Features provided with Media Management include video support and enhanced image manipulation; for example, video thumbnails and proxies, video trim, time-coded comments for video, and image crop and rotate capabilities. A dark site theme is also available.

You can embed metadata into a file using rules, with the Embed properties as metadata in content action, and view metadata in Alfresco and in an image editor. See [Working with metadata](LINK) for more information about extracting and embedding metadata.

> **Note:** Video transformations are very resource intensive and can take a long time to complete. Make sure that any rules that you create that use video transcoding run in the background, to prevent the rule from failing due to an Alfresco timeout. For more information about creating rules, see [Creating a rule](LINK).

Media Management is integrated with AWS CloudFront publishing channel for publishing your content.

## Uploading media

Media Management provides information and features about media files that you upload in Alfresco Content Services.

1. Select the folder in the Document Library where you want to add your content.

2. You can drag and drop images or videos, or select Upload from the toolbar, as you would normally do in Alfresco.

    You will see the image or video in File Preview. If you upload a video, the duration of the video is shown in the information below the name of the video; for example, this is the icon that you would see if the video is three minutes and seven seconds long.

    A rendition or proxy is a version of the original video or image; for example, a copy of an image that is optimized for web viewing. By default, not all renditions (including video) are created after uploading. It is only when a user first views the image or video that a rendition is created.

   >**CAUTION:** Creating video proxies (when viewing videos for the first time) is very resource intensive. You might experience very slow performance while this is occurring unless your Alfresco administrator has configured additional resources to process this workload.

## Viewing media

Alfresco Media Management provides additional information and features in Alfresco when you view image or video files.

1. Select an image or video in the Document Library, as you would normally in Alfresco, by clicking the thumbnail or name, to view it in the file preview screen.

2. You will see additional preview options relating to the image or video:

    * **Renditions** panel, which shows the different options that are available for this image or video. These might include a low resolution thumbnail, a medium size JPEG file for an image, or H.264 proxy for video.
    * PBCore additions to the **Properties** panel, including the duration of a video, data rate, frame rate, and sampling rate.
    * IPTC additions in the **Properties** panel, including informational metadata like IPTC contact information, IPTC scene codes, headline and description.

        > **Note:** IPTC metadata is mapped to existing tags. For example, the IPTC Caption/Description is also displayed on the Document Library view of an image or video, if this field is present.

3. If you are the first user to open a video file, you will see a progress bar indicating the time estimated for the video to load.

    For example: ![Progress bar]({% link media-management/images/generating_video.png %})

    **Note:** This progress bar is not visible if AWS Elastic Transcoder is set up in your organization to process your video content.

    The progress bar is visible only on the first upload of a video. After it has been loaded once, this video is available to all users to view, without delay.

    >**Note:** Creating video proxies (when viewing videos for the first time) is very resource intensive. You might experience very slow performance while this is occurring unless your Alfresco administrator has configured additional resources to process this workload.

## Manipulating video

Alfresco Media Management provides features to allow you to edit video files in Alfresco Content Services.

1. Select a video file from the Document Library, as you would normally in Alfresco, by clicking the thumbnail or name, to view it in the file preview screen.

2. Click the arrow to play the video, and then click the ![pencil icon]({% link media-management/images/pencil.png %}) edit icon.

    * ![trim video icon]({% link media-management/images/trim.png %}): Trim the video length. Before clicking this icon you need to move the yellow sliders shown above the video timeline to your preferred start and end times.
    * Create Copy: click the checkbox before selecting the trim icon to save a copy of the image. The trimmed image is created in the same folder with the name Copy of original, where original is the name of your original image. If more than one copy is taken, the name is Copy x of originalimage, where x relates to the number of copies taken.
    Each time that the video is edited, it is stored as a new version of the original video (as long as the video is versionable), unless the Create Copy checkbox is selected.

3. You can add a comment in the usual way by clicking Add Comment, however with Media Management you can add this to the timeline of the video:

    1. Click Add Comment while the video is playing.

    2. Click the From box and click the ![current playback position icon]({% link media-management/images/playback.png %}) current playback position icon, at the point where you want to make a comment.

        You can optionally add an end time, in the format HH:MM:SS:MS.

    3. When you (or another user) next view the video, yellow markers (timecode markers) indicate where the timeline comments have been placed.

        When you hover on the yellow marker, the comment is displayed. A new icon, ![closed caption icon]({% link media-management/images/cc.png %}), is now available on the video control bar, which allows you to toggle the comments as subtitles on the video.

## Manipulating images

Alfresco Media Management provides features to allow you to edit image files in Alfresco.

1. Select an image from the Document Library, as you would normally in Alfresco, by clicking the thumbnail or name, to view it in the file preview screen.

2. Click the ![pencil icon]({% link media-management/images/pencil.png %}) edit icon, and perform these actions to edit the image directly in Alfresco:

    * ![crop icon]({% link media-management/images/crop.png %}): hold down your left mouse button to select an area of the image, and click the icon to crop the image
    * ![Rotate clockwise icon]({% link media-management/images/clock.png %}): click the icon to rotate the image clockwise
    * ![Rotate counterclockwise icon]({% link media-management/images/anticlock.png %}): click the icon to rotate the image counterclockwise
    * Create Copy: click the checkbox before selecting either of the rotate icons to take a copy of the image. The rotated image is saved in the same folder with the name Copy of original, where original is the name of your original image. If more than one copy is taken, the name is Copy x of originalimage, where x relates to the number of copies taken.
    Each time the image is edited, it is stored as a new version of the original image (as long as it is versionable), unless the Create Copy checkbox is selected.

    You can also use the scroll wheel to navigate large images.

## Transforming rich media

Alfresco Media Management allows you to request transformations of media from one format to another.

There are several methods used to request rich media transformations, and the method depends on the type of relationship that exists between the original source and the transformation result.

Renditions; for example, lower resolution JPEG image and video proxy files, are often requested automatically, when required in Alfresco. For example, they are requested when browsing a site's document library or navigating to the document details page.

You can explicitly request a rendition by clicking the **+** icon in the **Renditions** panel of the document details page. See [Viewing media](LINK) for more information about the Renditions panel.

You can perform an ad hoc format transformation in a number of ways; for example, create a rule with a Transform and Copy Content action. See [Applying rules to folders](LINK) for more information about setting up rules.

## Publishing media

Alfresco Media Management provides publishing options in Alfresco.

1. In the Document Library, click the title of the file you want to view.

2. Select Publish from the Document Actions panel and choose the channel you want to publish to (for example, CloudFront. You can optionally add a message).

    This option allows you to publish content to CloudFront, as long as your Alfresco administrator has set up a publishing channel.

3. The Publishing History panel in the preview screen updates with the version of the media and the channel that you selected to publish the media.

## Using an Alfresco dark site theme

Alfresco Media Management provides a black background (dark theme) for Share, that mutes elements until they are required, and makes it easier to work with rich media content. If you're a site administrator you can enable this theme.

For more information about using themes in general, see [Share themes](LINK). Only an administrator can enable a theme.

1. From the Alfresco Content Services toolbar, select Admin Tools and click Application in the Tools list.

    The Options page appears.

2. Select Dark Theme from the menu.

    The new theme now displays every time that you use Alfresco unless you choose to change it again.
