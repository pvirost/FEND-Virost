/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //  DONE: This test ensures each feed has a URL and that it is defined.

        it('url present', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        //  DONE: This test ensures each feed has a Name and that it is defined.

        it('named url', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });



    //  DONE: This test ensures the menu is hidden when the page loads.

    describe('The menu', function () {

        it('starts hidden', function () {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        //  DONE: This test ensures the menu toggles when clicked.

        it('toggle when clicked', function () {
            document.querySelector('a.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).not.toBe(true);

            document.querySelector('a.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });




    //  DONE: This test ensures the feed container is not empty

    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(1, done);
        });

        it('Feed container has content', function () {
            expect(document.querySelectorAll('article.entry').length).toBeGreaterThan(0);
        });
    });

    //  DONE: This test ensures each updates and is unique.

    describe('New Feed Selection', function () {

        beforeEach(function (done) {
            loadFeed(3, function () {
                checkerOne = document.querySelector('div.feed').innerText;
                loadFeed(2, function () {
                    checkerTwo = document.querySelector('div.feed').innerText;
                    done();
                });
            });
        });

        it('Feeds upade', function () {
            expect(checkerOne).not.toBe(checkerTwo);
        });
    });
}());