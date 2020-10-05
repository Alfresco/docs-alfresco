---
title: Feature dependency mapping to component
---

You need a number of components to use all the Media Management capabilities. This information maps each feature with its dependencies.

|Feature|Software to implement|Distributed by Alfresco?|
|-------|---------------------|------------------------|
|IPTC metadata extraction|[FFmpeg](https://www.ffmpeg.org/){:target="_blank"} and MM Java|No|
|PBCore technical video metadata|[FFmpeg](https://www.ffmpeg.org/){:target="_blank"}|No|
|Custom XMP metadata|[ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/){:target="_blank"}|No|
|Metadata embedding|[ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/){:target="_blank"}|No|
|Video thumbnails|[FFmpeg](https://www.ffmpeg.org/){:target="_blank"}|No|
|Local video transcoding|[FFmpeg](https://www.ffmpeg.org/){:target="_blank"}|No|
|Remote video transcoding|[FFmpeg](https://www.ffmpeg.org/){:target="_blank"},[Zencoder](https://github.com/bitzeche/zencoder-java){:target="_blank"} and AWS (SDK through content services node)|Yes|
|Video trim (transformation)|[FFmpeg](https://www.ffmpeg.org/){:target="_blank"}|No|
|Image crop and rotate (transformation)|[ImageMagick](http://www.imagemagick.org/){:target="_blank"}|No|
|Back end components|[Content services node](https://github.com/Alfresco/gytheio){:target="_blank"}|Yes|
|HTML5 video player|[video.js](https://github.com/videojs/video.js){:target="_blank"}|Yes|
|Video timeline comments|[videojs-markers](https://github.com/spchuang/videojs-markers){:target="_blank"}|Yes|
|Video storyboard thumbnails|[videojs-thumbnails](https://github.com/brightcove/videojs-thumbnails){:target="_blank"}|Yes|
|Video trim UI|[rangeslider-videojs](https://github.com/danielcebrian/rangeslider-videojs){:target="_blank"}|Yes|
|Image rotate UI|[Icons](http://findicons.com/icon/474073/rotate?id=485645){:target="_blank"}|Yes|
|Image pan and zoom|[imgAreaSelect](http://odyniec.net/projects/imgareaselect/){:target="_blank"}|Yes|
|Dark site theme|[jquery.panzoom](https://github.com/timmywil/jquery.panzoom){:target="_blank"}|-|
|UI utilities|CSS|Yes|
|AWS CloudFront integration|AWS (SDK using content services node)|Yes|
