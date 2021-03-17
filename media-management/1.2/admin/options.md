---
title: Transform options
---

Media Management provides additional transform options for images and video.

The tables give details of registered file types with information about their available transform options.

You can also view more information about file types and the proxies used to transform them by using the browser command:

```html
localhost:8080/alfresco/service/mimetypes?mimetype=*
```

where `localhost:8080` is the host and port number of your active Alfresco Content Services instance.

Audio and video files are transformable using FFmpeg. Image files are transformable using ImageMagick. The formats listed are in addition to the standard formats as specified in [Standard Transform Options]({% link content-services/6.0/admin/transformations.md %}#standard-transform-options).

```text
application/eps - eps, image/bmp - bmp, image/cgm - cgm, image/gif - gif, image/ief - ief, image/jp2 - jp2, image/jpeg - jpg, image/png - png, image/tiff - tiff, image/vnd.adobe.photoshop - psd, image/vnd.adobe.premiere - ppj, image/x-dwg - dwg, image/x-dwt - dwt, image/x-portable-anymap - pnm, image/x-portable-bitmap - pbm, image/x-portable-graymap - pgm, image/x-portable-pixmap - ppm, image/x-raw-adobe - dng, image/x-raw-canon - cr2, image/x-raw-fuji - raf, image/x-raw-hasselblad - 3fr, image/x-raw-kodak - k25, image/x-raw-leica - rwl, image/x-raw-minolta - mrw, image/x-raw-nikon - nef, image/x-raw-olympus - orf, image/x-raw-panasonic - rw2, image/x-raw-pentax - pef, image/x-raw-red - r3d, image/x-raw-sigma - x3f, image/x-raw-sony - arw, image/x-rgb - rgb, image/x-xpixmap - xpm and image/x-xwindowdump - xwd
```

|Format|Transformable from:|
|------|-------------------|
|video/mp2t|X|
|video/mp4|X|
|video/mpeg|X|
|video/ogg|X|
|video/quicktime|X|
|video/webm|X|
|video/x-flv|X|
|video/x-m4v|X|
|video/x-ms-asf|X|
|video/x-ms-wmv|X|
|video/x-msvideo|X|

```text
audio/basic - au, audio/mp4 - m4a, audio/mpeg - mp3, audio/ogg - oga, audio/vorbis - ogg, audio/x-aiff - aiff, audio/x-flac - flac, audio/x-ms-wma - wma, audio/x-wav - wav
```

All file types are transformable into and from the following formats, excepting themselves (i.e. audio/mp4 is not transformable into audio/mp4, or from audio/mp4).

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/mxf| |X|
|audio/basic|X|X|
|audio/mp4|X|X|
|audio/mpeg|X|X|
|audio/ogg|X|X|
|audio/vorbis|X|X|
|audio/x-aiff|X|X|
|audio/x-flac|X|X|
|audio/x-ms-wma|X|X|
|audio/x-wav|X|X|
|video/mp2t| |X|
|video/mp4| |X|
|video/mpeg| |X|
|video/ogg| |X|
|video/quicktime| |X|
|video/webm| |X|
|video/x-flv| |X|
|video/x-m4v| |X|
|video/x-ms-asf| |X|
|video/x-ms-wmv| |X|
|video/x-msvideo| |X|

```text
audio/vnd.adobe.soundbooth - asnd, video/3gpp - 3gp, video/3gpp2 - 3g2, video/mpeg2 - mpeg2, video/x-rad-screenplay - avx, video/x-sgi-movie - movie and x-world/x-vrml - wrl
```

> **Note:** These formats cannot be transformed into, or generated from, any other format.

```text
video/mp2t - ts, video/mp4 - mp4, video/mpeg - mpg, video/ogg - ogv, video/quicktime - mov, video/x-msvideo - avi, video/webm - webm, video/x-flv - flv, video/x-m4v - m4v, video/x-ms-asf - asf, video/x-ms-wmv - wmv, and video/x-msvideo - avi
```

All file types are transformable into and from the following formats, excepting themselves (i.e. video/mp4 is not transformable into video/mp4, or from video/mp4).

|Format|Transformable to:|Transformable from:|
|------|-----------------|-------------------|
|application/eps|X| |
|audio/basic|X| |
|audio/mp4|X| |
|audio/mpeg|X| |
|audio/ogg|X| |
|audio/vorbis|X| |
|audio/x-aiff|X| |
|audio/x-flac|X| |
|audio/x-ms-wma|X| |
|audio/x-wav|X| |
|image/bmp|X| |
|image/cgm|X| |
|image/gif|X| |
|image/ief|X| |
|image/jp2|X| |
|image/jpeg|X| |
|image/png|X| |
|image/tiff|X| |
|image/vnd.adobe.photoshop|X| |
|image/vnd.adobe.premiere|X| |
|image/x-cmu-raster|X| |
|image/x-dwt|X| |
|image/x-portable-anymap|X| |
|image/x-portable-bitmap|X| |
|image/x-portable-graymap|X| |
|image/x-portable-pixmap|X| |
|image/x-raw-adobe|X| |
|image/x-raw-canon|X| |
|image/x-raw-fuji|X| |
|image/x-raw-hasselblad|X| |
|image/x-raw-kodak|X| |
|image/x-raw-leica|X| |
|image/x-raw-minolta|X| |
|image/x-raw-nikon|X| |
|image/x-raw-olympus|X| |
|image/x-raw-panasonic|X| |
|image/x-raw-pentax|X| |
|image/x-raw-red|X| |
|image/x-raw-sigma|X| |
|image/x-raw-sony|X| |
|image/x-rgb|X| |
|image/x-xbitmap|X| |
|image/x-xpixmap|X| |
|image/x-xwindowdump|X| |
|video/mp2t|X|X|
|video/mp4|X|X|
|video/mpeg|X|X|
|video/ogg|X|X|
|video/quicktime|X|X|
|video/webm|X|X|
|video/x-flv|X|X|
|video/x-m4v|X|X|
|video/x-ms-asf|X|X|
|video/x-ms-wmv|X|X|
|video/x-msvideo|X|X|
