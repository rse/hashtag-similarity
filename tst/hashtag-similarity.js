/*
**  HashTag-Similarity -- Similarity Clustering of HashTags
**  Copyright (c) 2020-2024 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global describe: false */
/* global it: false */
/* global expect: false */
/* global require: false */
/* jshint -W030: false */

const similarity = require("../lib/hashtag-similarity.node.js")

describe("HashTag-Similarity Library", function () {
    it("should expose its official API", function () {
        expect(similarity).to.be.a("function")
    })
    it("some functionality", function () {
        expect(similarity([ "foo", "foo!", "bar", "foo", "baz", "peoples", "people", "peoples" ]))
            .to.be.deep.equal([[ "bar" ], [ "baz" ], [ "foo", "foo!" ], [ "peoples", "people" ]])
        expect(similarity({ foo: 2, "foo!": 1, bar: 1, baz: 2, peoples: 2, people: 1 }))
            .to.be.deep.equal([ { bar: 1 }, { baz: 2 }, { foo: 2, "foo!": 1 }, { people: 1, peoples: 2 } ])
    })
})

