---
title: Config Archiver
---

The Config Archiver makes moving ACA config files to, from, and between any OpenContent repository easy. It is located in the "Tools" section within ACA admin.

## Exporting Configs

Use the export config section to export the current ACA configurations as a zip file.  When exporting configs, all Trac user preferences files are automatically archived since these files contain public saved searches.  By default, the archiver does not include individual user's preferences files in the archive, but this can be controlled by the `Include User Preferences` slider.

Clicking the export button will begin the export.  The name of the zip that is downloaded will be `default.zip`.

## Importing Configs

To import configs, simply access the Import section of the Config Archiver and drag the `default.zip` file containing the archived configs into the drop zone and click the `Import` button.

The name of the archive file is important - the import tool assumes the file you upload is named: `default.zip`.

The import will handle this zip in one of two ways:

1. If the default configs folder already exists, any existing config files will be versioned
2. If the default config folder does not exist, the folder will be created and all configs in the zip will be placed into this folder.
