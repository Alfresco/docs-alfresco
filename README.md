


## Variables

### Site variables

| Name | Description | Usage | 
| ---- | ----------- | ----- | 
| `site.url` | Base URL of the site. | | 


## Front matter
Front matter is the metadata for each file and is captured at the top of a file between two sets of hyphens: 

```
---
var: Shiny Page
---
```

Setting front matter allows the values to be used as variables within the file content. For example using `{{page.var}}` in a file will write `Shiny Page` when the site is built.  

Rather than having to manually write or copy and paste this front matter onto every page, default values can be set in the `_config.yml` file. The scope that the default values apply to are set using `scope` and `path`, with values declared under `values`: 

```
scope:
  path: /content/
values:
  var: Shiny Page
```

In the above example, all files in the `content` directory will have `var` available to them and `var` will have a value of `Shiny Page`. It won't appear in the front matter of the files in the content directory, but can still be used in the same way: `{{page.var}}`. 

### Defaults
The following defaults have been created in the `_config.yml` and are used to build the site: 

| Name | Description | Usage | 
| ---- | ----------- | ----- | 
| `layout` | Sets which layout a set of pages will use. Layouts are stored in the `_layouts` directory. | |
| `product` | Sets the full product name, for example "Alfresco Content Services". | | 
| `location` | The directory the product is stored in. The name of the table of contents file needs to match this value. | |
| `versions` | The list of versions a product currently supports. | |
| `version` | The version of the product the content is for. | | 
| `latest` |  A Boolean value of whether the `version` is the latest supported version. | |
| `audience` | The audience the content is aimed at, for example `user`, `admin`, `developer`. This value needs to match the entries in the table of contents file for a product so that the correct one is generated. | | 

```
-
  scope:
    path: 'content'
  values:
    layout: 'docs'
    location: 'content'
    product 'Alfresco Content Services'
    versions:
      - 5.2
      - 6.0
      - 6.1
      - 6.2
   
-
  scope:
    path: 'content/latest'
  values:
    version: 6.2
    latest: true
    
-
  scope:
    path: 'content/latest/user'
  values:
    audience: user
    
...

-
  scope: 
    path: 'content/6.1'
  values:
    version: 6.1
    
-
  scope:
    path: 'content/6.1/user'
  values:
    audience: user

...
```

### In-page
The following **need** to be added to each page as individual front matter:

| Name | Description | Usage | 
| ---- | ----------- | ----- | 
| `title` | The title of the page. This will appear on the page as the H1 and also in the page title in a browser tab. H1 itself shouldn't be used within the content of a page. | | 