---
title: API and Javadoc
---

OpenAnnotate uses [JSDoc](http://usejsdoc.org/index.html) for source code documentation.

## Generating updated documentation

To generate updated documentation, first make sure you have the OpenAnnotate source pulled down. If you don't yet have the source, please read [Building and Deploying OpenAnnotate](https://github.com/tsgrp/OpenAnnotate/wiki/Building-and-Deploying-OpenAnnotate) for setting up your local development environment.

To use JSDoc, you first need to install it through `npm`. To do so, open a command prompt in the root directory of your local copy of OpenAnnotate and run the following command:

    npm install

Once you've installed JSDoc, navigate to the following location: `OA_ROOT\node_modules\.bin`. Inside that directory there is a `jsdoc.cmd` file that can be run to generate the documentation. Open a command prompt in this directory and run the following command:

    jsdoc -p -R ../../jsdoc/README.md -c ../../jsdoc/conf/conf.json -d ../../jsdoc/out

For more information on what all the command line arguments above mean and for a full list of options, read [http://usejsdoc.org/about-commandline.html](http://usejsdoc.org/about-commandline.html).

After running the above command, all the documentation will be generated in the form of HTML pages in the `OA_ROOT/jsdoc/out` directory. An `index.html` page will exist in that directory which can be opened in a browser to view the generated documentation.
