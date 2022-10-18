---
title: Alfresco Enterprise Viewer Slide Viewer
---

OpenAnnotate includes support for viewing images using the slide viewer. The slide viewer uses the [OpenSeadragon viewing library](https://openseadragon.github.io/). Slide viewer supports both images that are "tiled" and images that are not "tiled". For more information on "tiling", see the section below. If you do not need tiled images, read the configuration section at the bottom of this article.

## Tiling Images for OpenSeadragon

The OpenSeadragon viewing library works by serving many "tiles" to the browser using the [Deep Zoom](http://en.wikipedia.org/wiki/Deep_Zoom) specification. This works similarly to Google Maps - instead of serving one gigantic image of the Earth and all its streets, Google Maps will return sections of the map to the user as they are requested. You can think of these sections, or "tiles", as being defined by their latitude and longitude. Most importantly, they are also defined at different levels; the streets shown at the city level are not shown at the country level. Like Google Maps, OpenSeadragon requests different "tiles" depending on the current zoom of the user and what point on the image the user is currently viewing.

### Generating Tiles

For our purposes, the "tiles" are generated ahead of time using [VIPS](http://www.vips.ecs.soton.ac.uk/index.php?title=VIPS), a command line tool. Perform the following steps to generate a tile pyramid for your image **on Windows**:

1. Download the VIPS command line tool [here](http://www.vips.ecs.soton.ac.uk/supported/current/win32/). You will want the `vips-dev-7.42.0.zip` ZIP (use the most recent ZIP file - this was the most recent version at the time of this writing).
1. Extract the downloaded ZIP file to a location on your computer.
1. Navigate to `VIPS_HOME/bin` (where the `vips.exe` executable is located) and open a command prompt.
1. Run the following command, which will generate the tiles for the image located at `ABSOLUTE_LOCATION_OF_IMAGE` in the location specified by `ABSOLUTE_LOCATION_TO_CREATE_TILE_DIRECTORY` (for more information on the following command and its performance, [click here](http://libvips.blogspot.com/2013/03/making-deepzoom-zoomify-and-google-maps.html)):

        vips dzsave ABSOLUTE_LOCATION_OF_IMAGE ABSOLUTE_LOCATION_TO_CREATE_TILE_DIRECTORY

1. Download the latest OpenSlide binaries for Windows [here](http://openslide.org/download/).
1. Extract the downloaded binaries to a location on your computer.
1. Navigate to `OPEN_SLIDE_TOOLS_HOME/bin` (where the `openslide-show-properties.exe` executable is located) and open a command prompt.
1. Run the following command and note the value of `openslide.objective-power` as `SLIDE_POWER`:

        openslide-show-properties ABSOLUTE_LOCATION_OF_IMAGE

1. Create an empty `JSON` file like the following (replace `SLIDE_POWER` with the value for the slide power you found in the above step):

        {
            power: SLIDE_POWER
        }

1. The `ABSOLUTE_LOCATION_TO_CREATE_TILE_DIRECTORY` directory that was created by the VIPS command as well as the `.dzi` file and the `JSON` file in the above step should be put in a directory that can be served through HTTP to OpenAnnotate (see the next section for information on serving these files).

Keep in mind that this is not the only way to generate these tiles - there are many possible options for generating these tiles depending on environment and use-case.

### Serving Tiles

Generating your pyramidal tile structure should result in two pieces: a `.dzi` file for OpenSeadragon to read, and the  image's tiles in a `_tiles` directory. These should be served from Apache as an HTTP Directory, so OpenSeadragon can access the tiles via a URL. For some examples of how to point OpenSeadragon to your HTTP Directory, please see the OpenSeadragon DZI page [here.](https://openseadragon.github.io/examples/tilesource-dzi/)

**NOTE:** Relative paths are important. If you're serving a `.dzi` file at `http://localhost/slides/test/test.dzi`, then your tile directory should sit next to it at `http://localhost/slides/test/test_files`.

## Configuring OpenAnnotate to Use Slide Viewer

In order to utilize the slide viewer features, you must configure OpenAnnotate and OpenContent to support it. Specifically, you must list the supported mimetypes for slide viewer in OpenContent and if you're using "tiles" for images, you must tell OpenAnnotate where the root directory is with the pre-generated "tiles".

### OpenAnnotate Properties

The one property that is used in OpenAnnotate for slide viewer is the `slideViewerTileDirectoryRoot` property. For more information on this property and how to set properties in general, read [OA Configuration Files](https://github.com/tsgrp/OpenAnnotate/wiki/OA-Configuration-Files).

### OpenContent Properties

The two properties that must be set in OpenContent for slide viewer are the `annotation.tiledSlideViewerMimetypes` and `annotation.nonTiledSlideViewerMimetypes` properties. For more information on how to properly edit a property, see [OC-Configuration-Files](https://github.com/tsgrp/OpenContent/wiki/OC-Configuration-Files).

#### annotation.tiledSlideViewerMimetypes

This property tells OpenContent which mimetypes should be treated as slide viewer **"tiled"** mimetypes. We need this so that when the document content is requested when OpenAnnotate requests the document information, we don't stream the content if the mimetype is in this list. This should be a comma separated list of mimetype values.

Default Value: `image/tiff,image/tiff-aperio`

#### annotation.nonTiledSlideViewerMimetypes

This property tells OpenContent which mimetypes should use the slide viewer but **are not tiled** mimetypes. You can list any mimetype here, but each object must have either a JPG, GIF or PNG rendition to be able to use the non-tiled slide viewer "legacy" viewer.

Default Value: `image/jpeg,image/png,image/gif`
