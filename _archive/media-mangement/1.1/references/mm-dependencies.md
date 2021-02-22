---
author: Alfresco Documentation
source: 
audience: [, ]
category: Development
option: Transform
---

# Feature to dependency mapping

You need a number of components to use all the Media Management capabilities. This information maps each feature with its dependencies.

|Feature|Software to implement|Distributed by Alfresco?|
|-------|---------------------|------------------------|
|IPTC metadata extraction|[FFmpeg](https://www.ffmpeg.org/)   
 and MM Java

|No|
|PBCore technical video metadata|[FFmpeg](https://www.ffmpeg.org/)|No|
|Custom XMP metadata|[ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/)|No|
|Metadata embedding|[ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/)|No|
|Video thumbnails|[FFmpeg](https://www.ffmpeg.org/)|No|
|Local video transcoding|[FFmpeg](https://www.ffmpeg.org/)|No|
|Remote video transcoding|[FFmpeg](https://www.ffmpeg.org/),    
 [Zencoder](https://github.com/bitzeche/zencoder-java)  
 and AWS \(SDK through content services node\)

|Yes|
|Video trim \(transformation\)|[FFmpeg](https://www.ffmpeg.org/)|No|
|Image crop and rotate \(transformation\)|[ImageMagick](http://www.imagemagick.org/)|No|
|Back end components|[Content services node](https://github.com/Alfresco/gytheio)|Yes|
|HTML5 video player|[video.js](https://github.com/videojs/video.js)|Yes|
|Video timeline comments|[videojs-markers](https://github.com/spchuang/videojs-markers)|Yes|
|Video storyboard thumbnails|[videojs-thumbnails](https://github.com/brightcove/videojs-thumbnails)|Yes|
|Video trim UI|[rangeslider-videojs](https://github.com/danielcebrian/rangeslider-videojs)|Yes|
|Image rotate UI|[Icons](http://findicons.com/icon/474073/rotate?id=485645)|Yes|
|Image pan and zoom|[imgAreaSelect](http://odyniec.net/projects/imgareaselect/)|Yes|
|Dark site theme|[jquery.panzoom](https://github.com/timmywil/jquery.panzoom)|-|
|UI utilities|CSS|Yes|
|AWS CloudFront integration|AWS \(SDK using content services node\)|Yes|
|Brightcove video cloud integration|Brightcove Java libraries: [Java-Commons](https://github.com/BrightcoveOS/Java-Commons) and [Java-MAPI-Wrapper](https://github.com/BrightcoveOS/Java-MAPI-Wrapper)|Yes|

**Parent topic:**[Media Management Reference](../concepts/mm-references.md)

