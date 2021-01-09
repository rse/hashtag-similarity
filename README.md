
HashTag-Similarity
==================

Similarity Clustering of HashTags

<img src="sample/screenshot.png" alt=""/>

<p/>
<img src="https://nodei.co/npm/hashtag-similarity.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/hashtag-similarity.png" alt=""/>

About
-----

*HashTag-Similarity* is small JavaScript function (for use in Node.js
and Browser environments) for similarity clustering of hashtags. It is
intended for use in applications which have to group/cluster similar
hashtags received from users. For detecting the similarity of hashtags
weighted decisions are used, based on both the Double-Metaphone and
Dice-Coefficient algorithms.

Installation
------------

```shell
$ npm install hashtag-similarity
```

Example
-------

```js
const similarity = require("hashtag-similarity")
const expect = require("chai").expect

expect(similarity([ "foo", "foo!", "bar", "foo", "baz", "peoples", "people", "peoples" ]))
    .to.be.deep.equal([[ "bar" ], [ "baz" ], [ "foo", "foo!" ], [ "peoples", "people" ]])

expect(similarity({ foo: 2, "foo!": 1, bar: 1, baz: 2, peoples: 2, people: 1 }))
    .to.be.deep.equal([ { bar: 1 }, { baz: 2 }, { foo: 2, "foo!": 1 }, { people: 1, peoples: 2 } ])
```

License
-------

Copyright &copy; 2020-2021 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

