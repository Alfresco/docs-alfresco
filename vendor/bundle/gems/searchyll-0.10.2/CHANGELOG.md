# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).



## v0.10.2 - 2018-06-30
### Added
- Version bump: v0.10.2., by Allison Zadrozny <allison@zadrozny.com>, [7930a3e](https://github.com/omc/searchyll/commit/7930a3e)   
- Add & backfill the Changelog., by Allison Zadrozny <allison@zadrozny.com>, [cafe45c](https://github.com/omc/searchyll/commit/cafe45c)   
- Merge pull request #30 from omc/allizad/remove-elasticsearch-ruby, by Allison Zadrozny <allison@zadrozny.com>, [e05d874](https://github.com/omc/searchyll/commit/e05d874)   
- Remove unecessary elasticsearch-ruby dependency., by Allison Zadrozny <allison@zadrozny.com>, [354b58b](https://github.com/omc/searchyll/commit/354b58b)   
- Merge pull request #29 from omc/nz/reindex-cadence, by Allison Zadrozny <allison@zadrozny.com>, [9de8214](https://github.com/omc/searchyll/commit/9de8214)   
- reindex with a cadence and a dynamic batch size, by Nick Zadrozny <nick@beyondthepath.com>, [a4aa544](https://github.com/omc/searchyll/commit/a4aa544)   
- Rubocop and some light refactoring, by Nick Zadrozny <nick@beyondthepath.com>, [150ea0d](https://github.com/omc/searchyll/commit/150ea0d)   
- Merge pull request #28 from omc/robsears-patch-2, by Allison Zadrozny <allison@zadrozny.com>, [ffd360c](https://github.com/omc/searchyll/commit/ffd360c)   
- Increment the version, by Rob Sears <secure@robsears.com>, [c4ee100](https://github.com/omc/searchyll/commit/c4ee100)   
- Don't break site generation if the Elasticsearch URL is missing, by Rob Sears <secure@robsears.com>, [9ddd016](https://github.com/omc/searchyll/commit/9ddd016)   
- Merge pull request #26 from omc/robsears-patch-1, by Allison Zadrozny <allison@zadrozny.com>, [bce8974](https://github.com/omc/searchyll/commit/bce8974)   
- Fix a silly spelling error., by Rob <rc.sears@gmail.com>, [b280436](https://github.com/omc/searchyll/commit/b280436)   
- Auth should be optional, by Rob <rc.sears@gmail.com>, [d7d694e](https://github.com/omc/searchyll/commit/d7d694e)  

## v0.10.0 - 2018-06-07
### Added
- version bump to 0.10.0, by Nick Zadrozny <nick@beyondthepath.com>, [097ddb9](https://github.com/omc/searchyll/commit/097ddb9)   
- Merge pull request #24 from omc/collections, by Dru Sellers <dru@drusellers.com>, [7d1f044](https://github.com/omc/searchyll/commit/7d1f044)   
- Index collections as well as posts, by Dru Sellers <dru@drusellers.com>, [2cdaaa8](https://github.com/omc/searchyll/commit/2cdaaa8)   
- Merge pull request #18 from omc/v5-accept-json, by Allison Zadrozny <allison@zadrozny.com>, [ee7e309](https://github.com/omc/searchyll/commit/ee7e309)   
- Merge pull request #19 from matthewdu/fix-index-creation, by Allison Zadrozny <allison@zadrozny.com>, [0d34bb9](https://github.com/omc/searchyll/commit/0d34bb9)   
- Use PUT instead of POST, by Matthew Du <du.matthew@gmail.com>, [b905d73](https://github.com/omc/searchyll/commit/b905d73)   
- provide an Accept header with all requests, for v5 compat, by Nick Zadrozny <nick@beyondthepath.com>, [2f28fae](https://github.com/omc/searchyll/commit/2f28fae)   
- Merge pull request #16 from omc/add-print-statement, by Allison Zadrozny <allison@zadrozny.com>, [e236c54](https://github.com/omc/searchyll/commit/e236c54)   
- Skip index deletion if there are no old indices, by Allison Zadrozny <allison@zadrozny.com>, [b33546e](https://github.com/omc/searchyll/commit/b33546e)   
- Add print statement to indexer, by Allison Zadrozny <allison@zadrozny.com>, [9af6f13](https://github.com/omc/searchyll/commit/9af6f13)  

## v0.9.0 - 2018-05-07
### Added
- license, by Nick Zadrozny <nick@beyondthepath.com>, [b221803](https://github.com/omc/searchyll/commit/b221803)   
- Ignore the packaged gem, by Nick Zadrozny <nick@beyondthepath.com>, [04a9764](https://github.com/omc/searchyll/commit/04a9764)   
- GPLv3 license, by Nick Zadrozny <nick@beyondthepath.com>, [150f6ed](https://github.com/omc/searchyll/commit/150f6ed)   
- Update gemspec, readme and version for first publish of the gem, by Nick Zadrozny <nick@beyondthepath.com>, [e30ba44](https://github.com/omc/searchyll/commit/e30ba44)   
- Change version number, by Allison Zadrozny <allison@zadrozny.com>, [9cf886e](https://github.com/omc/searchyll/commit/9cf886e)   
- Make searchyll into a hook, by Allison Zadrozny <allison@zadrozny.com>, [46d0232](https://github.com/omc/searchyll/commit/46d0232)   
- Merge pull request #12 from nz/rename-searchyll, by Allison Zadrozny <allison@zadrozny.com>, [d6270d4](https://github.com/omc/searchyll/commit/d6270d4)   
- Change Searchyou to Searchyll, by Rob Sears <secure@robsears.com>, [72466b9](https://github.com/omc/searchyll/commit/72466b9)   
- Merge pull request #11 from nz/fresh-configs, by Nick Zadrozny <nick@onemorecloud.com>, [26d9cf5](https://github.com/omc/searchyll/commit/26d9cf5)   
- Move configuration into its own file, by Rob Sears <secure@robsears.com>, [a008f11](https://github.com/omc/searchyll/commit/a008f11)   
- Move the config options around, by Rob Sears <secure@robsears.com>, [485495c](https://github.com/omc/searchyll/commit/485495c)   
- Implement notes from Nick, by Rob Sears <secure@robsears.com>, [0951991](https://github.com/omc/searchyll/commit/0951991)   
- New configuration settings are in a Configuration class, additional documentation included, by Rob Sears <secure@robsears.com>, [4c00cc3](https://github.com/omc/searchyll/commit/4c00cc3)   
- better index cleanup with more precise enumeration of old indices, by Nick Zadrozny <nick@beyondthepath.com>, [1d6d807](https://github.com/omc/searchyll/commit/1d6d807)   
- Merge pull request #2 from allizad/edit-indexer0-content, by Nick Zadrozny <nick@onemorecloud.com>, [9149cdf](https://github.com/omc/searchyll/commit/9149cdf)   
- Update generator.rb, by Allison Zadrozny <allison@zadrozny.com>, [76b650d](https://github.com/omc/searchyll/commit/76b650d)   
- Edit indexer content, by Allison Zadrozny <allison@zadrozny.com>, [157f981](https://github.com/omc/searchyll/commit/157f981)   
- more helper methods and cleanup, by Nick Zadrozny <nick@beyondthepath.com>, [e0913ad](https://github.com/omc/searchyll/commit/e0913ad)   
- get the code pretty much to working, by Nick Zadrozny <nick@beyondthepath.com>, [5550a28](https://github.com/omc/searchyll/commit/5550a28)   
- add some comments, by Nick Zadrozny <nick@beyondthepath.com>, [0be5381](https://github.com/omc/searchyll/commit/0be5381)   
- make it run, by Nick Zadrozny <nick@beyondthepath.com>, [afa05a7](https://github.com/omc/searchyll/commit/afa05a7)   
- start testing! with some refactoring, by Nick Zadrozny <nick@beyondthepath.com>, [8e63e9f](https://github.com/omc/searchyll/commit/8e63e9f)  
- sketching a jekyll indexer for ES, by Nick Zadrozny <nick@beyondthepath.com>, [9f4c3be](https://github.com/omc/searchyll/commit/9f4c3be)
