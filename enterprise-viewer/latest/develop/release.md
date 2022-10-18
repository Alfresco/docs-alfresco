---
title: Creating a Release
---

## AEV Release Procedure

Below are the steps that one should follow to create a new AEV Release.

### Step 1 - Create Release Candidate (RC) Branches

These release candidate branches will be the starting point for testing, and be the home of any release-specific changes to each component that are required for the release.

- Create a new SVN Release branch for each OA and OC in the corresponding `.../release_branches/` path for each repository.  For a major/minor release, these branches should be made off of trunk, for patch releases these should be branched from last release tag for the version being patched.  NOTE: While in the past OA has made 3 separate branches for the App, Integrations, and SocketServer, going forward there should only be a single branch at a high enough level to capture all three.

- Create a new Git Release branch for each OAV and OAT.  These branches For a major/minor release, these branches should be made off of trunk, for patch releases these should be branched from last release tag for the version being patched.  NOTE: While in the past OA has made 3 separate branches for the App, Integrations, and SocketServer, going forward there should only be a single branch at a high enough level to capture all three.

- Once checked out, navigate to the code folder and remove all the build.properties and setenv files that are not your personal files.  Make sure your files have the correct information in them.

### Step 2 - Package Artifacts for Testing

For each combination of OS, repository & version that will be supported for the release, we will create a artifact package:

- Installation Documentation: IQ(s) for AEV and each available integration point, as well as OAT and the User Guide.  The most up-to-date versions of these documents should be kept in `http://svn.tsgrp.com/repos/annotationtool/trunk/documentation/controlled`.  Ideally this documentation will eventually be synced to the main Docs site, at which point this step may be removed.

- WARs: OC, OA, OAT, and OAV.  
  - OpenAnnotate : Build using the `alf-product` overlay for Alfresco builds, and no overlay for any other repository.  Ensure there are no properties in the final .war's `overrides-placeholder.properties`, as these will interfere with externalized properties.
  - OpenContent: For Alfresco builds, this will be `tsgrp-opencontent.amp` rather the typical `OpenContent.war`.  For Alfresco build with the `acsX-accelerator-base` project that corresponds to the target ACS version.  For Documentum builds use the `oaDctm` project.
  - OpenAnnotateVideo : For all releases going forward the OAV should be automatically embedded in the `OpenAnnotate.war`, but you should confirm this.
  - OAT : Build war as normal.

- External Dependencies: Currently only includes `ffmpeg-4.2.2-win64-static.zip` for Windows builds.  Previously may have (and in the future may) include other executable dependencies like ImageMagick or Ghostscript.

- Integrations: For Alfresco these are either the ADF component zip (`adf-aev.zip`) or Share integrations (`oa-alfresco.amp`, `oa-share-external-launcher.amp`,  `oa-share-webpreview.amp`).  For Documentum these include the Webtop and D2 integrations.  All integrations listed reside in SVN and should be built fresh (`http://svn.tsgrp.com/repos/annotationtool/trunk/external-integrations`)
  - If the Share integrations have changed since the last release, be sure to bump the amp module version numbers

- Socket Server: The collaboration server located at `http://svn.tsgrp.com/repos/annotationtool/trunk/socket-servers/node` is included along with its dependencies to avoid customers having issues pulling them down.  In this directory run `npm install`, and zip up the entire directory, removing any Windows-specific files for a Linux deployment.

- Naming convention: The final group of artifacts and documentation should be zipped and named : "AEV vX.X.X.XXXX for {REPO} v{VERSION} on {OS}.zip"

A typical Alfresco release will include packages for each major ACS version (5.x, 6.x, etc.), with support for Windows and Linux.  From a support perspective, we should also test with the latest Documentum, Hyland Flex, and OnBase available as well.

### Step 2.5 - Security and Third Party Scanning

- Before preceding to testing, submit packaged artifacts for security and third party software scans.  These scans may have a code impact, requiring additional development.  If changes are required to a specific artifact, repeat the **Step 2** for that artifact updating the package, before submitting again or proceeding with testing.

### Step 3 - Testing

- For each RC Package created, create a test environment from scratch for that OS, Repository and Version following provided documentation and confirm that the documentation is correct.

- For each test environment, execute each script located at `http://svn.tsgrp.com/repos/annotationtool/trunk/documentation/controlled/system test/scripts`.  Be sure to note the exact AEV Version, OS, Repository and Repository Version being tested in the `Build Information` field on each test script sheet.

- For each failed test mark it on the sheet, document the failure on a Trello list, classifying it with one of the following distinctions:
  - Existing Failure : This same test failed in the preceding release (check SVN), and it has a corresponding issue on Github.  In this case link the existing Github issue in the failure comment on the test script.
  - New Failure : A failure that did not exist in the preceding release's test results, and does not have an existing Github issue.

- Review each failure with the Product Manager and/or Release Stakeholders.  When reviewing with the PM and/or Stakeholders, they may further classify each failure as:
  - Fatal Failure : The failure of this test is not acceptable for this release, and it must be resolved before proceeding.
  - Non-Fatal Failure : The failure of this test is acceptable for this release, as it's impact is not significant or can be mitigated in some fashion.  The PM should be prepared to defend such a decision, and it should be documented on Github, and the issue should be linked in the failure comment on the test script.
  - Script Wording Update Required: The behavior of the application has changed since the last test script run and the development team failed to properly update the test script to reflect the new behavior.  These wording updates can include addition of new tests, and editing or removal of existing tests .  Such updates should be both made in the working test script and the trunk SVN blank version of the test script.

### Step 3.5 Required Changes and Documenting Results

- In the event any code changes were made in response to test results from **Step 3**, repeat **Steps 2, 2.5, 3, 3.5**for any affected artifacts before proceeding to **Step 4**.

- After testing is complete and successful for the release, create a PDF of each executed test script, and have both the tester and approver digital sign the completed scripts.  Finally the completed scripts should be uploaded to SVN in the proper subdirectory of : `http://svn.tsgrp.com/repos/annotationtool/trunk/documentation/controlled/system test/results`.

### Step 4 - Final Tagging and Packaging

- For each Release Candidate branch created in **Step 1**, Tag the branch using the naming convention `REL-AEV-X.X.X.XXXX`.  

- Repeat Step 2 to re-build the final artifacts packages.

- Additionally, for the `tsgrp-opencontent.amp` we'll need to modify the `com.tsgrp.opencontent` moduleId to match the moduleId of the latest ACA build.  Using 7zip (or a similar tool) modify the `module.properties` at the root level of the `tsgrp-opencontent.amp`, changing the `module.version` to match ACA.

### Step 5 - Upload Final Deliverables

- At this time, most release deliverables are sent to the Release Manager for final upload to the shelf.

## PaaS Release Procedure

Below are the steps that one should follow to create a new PaaS release. This section assumes you have followed the above steps to create a release deliverable zip file:

### Step 1 - Add In SSO Artifacts

- Visit the "paas-tsg" alfresco share site and pull down the last release deliverable and extract it: <https://collab.alfresco.com/share/page/site/paas-tsg/documentlibrary#filter=path%7C%2FAEV%7C&page=1>
- Inside you will find a file called `aev-sso-artifacts.zip`. Add this zip to the deliverable zip you created in the last section.

### Step 2 - Update OpenAnnotateShare.war

If no code changes were made to AEV, you may skip this step.

- Inside `aev-sso-artifacts.zip` you will find a war called `OpenAnnotateShare.war`. Replace this war by making a copy of the `OpenAnnotate.war` file you just built and renaming it. You can replace this war file by opening the zip file in 7-Zip.
- Open the newly replaced `OpenAnnotateShare.war` in 7-Zip and navigate to `WEB-INF/classes/oa-spring.xml`. Edit this file and change the classpath that points to `openannotate-override-placeholders.properties` to point to `openannotate-share-override-placeholders.properties` instead. Save and update the zip file when prompted by 7-Zip.

### Step 3 - Upload Final Deliverables to Alfresco Share Site

- At this time, the deliverable can now be uploaded to the "paas-tsg" alfresco share site.
- After upload is complete, contact the PaaS team via the alfresco slack workspace and inform them you need a new release with the deliverable you just uploaded
- if you do not see the slack channel "paas-tsg", ask your manager to add you to it.
