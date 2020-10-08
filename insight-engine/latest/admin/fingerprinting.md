---
title: Document Fingerprints
---
Alfresco Content Services 6.2 provides support for Document Fingerprints to find related documents. Document Fingerprinting is performed by algorithms that map data, such as documents and files to shorter text strings, also known as fingerprints. This feature is exposed as a part of the Alfresco Full Text Search Query Language.

Document Fingerprints can be used to find similar content in general or biased towards containment. The language adds a new `FINGERPRINT` keyword:

```bash
FINGERPRINT:<DBID | NODEREF | UUID>
```

By default, this will find documents that have any overlap with the source document. The `UUID` option is likely to be the most useful as `UUID` is present in the public API. To specify a minimum amount of overlap, use:

```bash
FINGERPRINT:<DBID | NODEREF | UUID>_<%overlap>
FINGERPRINT:<DBID | NODEREF | UUID>_<%overlap>_<%probability>
```

To find documents that have 20% overlap with the document 1234, use:

```bash
FINGERPRINT:1234_20
```

To execute a faster query that will be 80% confident anything brought back will overlap by 20%, use:

```bash
FINGERPRINT:1234_20_80
```

To support fingerprint queries, additional information is added to the Solr 6 index using the rerank template. This makes the indexes approximately 15% bigger. Document Fingerprint can only be disabled by changing the schema.

## **Similarity and Containment**

Document similarity covers duplicate detection, near duplicate detection, and finding different renditions of the same content. This is important to find and reduce redundant information. Fingerprints can provide a distance measure to other documents, often based on Jaccard distance/ similarity coefficient, to support *more like this* and clustering. The distance can also be used as a basis for graph traversal.

The Jaccard similarity coefficient is a commonly used indicator of the similarity between two sets. For sets *A* and *B* it is defined to be the ratio of the amount of common content to the total content of two documents, as defined here:

![]({% link insight-engine/images/union.png %})

This distance can be used to compare the similarity of any two documents with any other pair of documents.

Containment is a related concept but is more about inclusion. For example, many email threads include parts or all of previous messages. Containment is not symmetrical like the measure of similarity above, and is defined as:

![]({% link insight-engine/images/containment.png %})

It represents how much of the content of a given document is common to another document. This distance can be used to compare a single document (A) to any other document.

## Minhashing

Minhashing is a technique for quickly estimating how similar two sets of documents are. It is an example of a text processing pipeline.

First, the text is split into a stream of words. These words are then combined into five word sequences, known as shingles, to produce a stream of shingles. The 5-word shingles are then hashed, for example, in 512 different ways; keeping the lowest hash value for each hash. This results in 512 repeatably random samples of 5-word sequences from the text represented by the hash of the shingle. The same text will generate the same set of 512 minhashes. Similar text will generate many of the same hashes. It turns out that if 10% of all the min hashes from two documents overlap then it is a great estimator that `J(A,B) = 0.1`.

* ***Why 5 word sequences?***: Word embedding suggests 5 or more words are enough to describe the context and meaning of a central word. Based on the distribution of words for 2 word shingles, 3 word shingles, 4 word shingles, and 5 word shingles found on the web, it was found that at 5 word shingles, the frequency distribution flattens and broadens compared with the trend seen for 1, 2, 3 and 4 word shingles.
* ***Why 512 hashes?***: With a well distributed hash function this should give good hash coverage for 2,500 words and around 10% for 25,000, or something like 100 pages of text. We used a 128-bit hash to encode both the hash set position (see later) and hash value to minimise collision compared with a 64 bit encoding including bucket/set position.

***Example 1***

A document contains a single sentence of *The quick brown fox jumps over the lazy dog*, that would be broken down into the following 5-word long shingles:

   1. The quick brown fox jumps
   2. quick brown fox jumps over
   3. brown fox jumps over the
   4. fox jumps over the lazy
   5. jumps over the lazy dog

So, our document as a set looks like:

```bash
Set A = new Set(["The quick brown fox jumps", "quick brown fox jumps over", "brown fox jumps over the", "fox jumps over the lazy", "jumps over the lazy dog"]);
```

These sets of shingles can then be compared for similarity using the Jaccard Coefficient.

![]({% link insight-engine/images/minhash.png %})

***Example 2***

Here are two summaries of the 1.0 and 1.1 CMIS specification. It demonstrates, amongst other things, how sensitive the measure is to small changes. Adding a single word affects 5 shingles.

![]({% link insight-engine/images/minhash-example.png %})

The content overlap of the full 1.0 CMIS specification found in the 1.1 CMIS specification, C(1.0, 1.1) is approximately 52%.
