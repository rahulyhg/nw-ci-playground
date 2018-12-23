environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..

node nightwatch.js "Engagement\Tests\Matches\moreMatches.js"
node nightwatch.js "Engagement\Tests\Matches\regression_DR_local.js"
node nightwatch.js "Engagement\Tests\Matches\regression_gamification.js"
node nightwatch.js "Engagement\Tests\Matches\regression_listing_page_block.js"
node nightwatch.js "Engagement\Tests\Matches\regression_listing_page_ignore.js"
node nightwatch.js "Engagement\Tests\Matches\regression_listing_page_reportMisuse.js"
node nightwatch.js "Engagement\Tests\Matches\regression_listing_page_Shortlist.js"
node nightwatch.js "Engagement\Tests\Matches\regression_listing_page.js"
node nightwatch.js "Engagement\Tests\Matches\regression_refineSearch_divorce.js"

node nightwatch.js "Engagement\Tests\Matches\matches_refine_search.js"
node nightwatch.js "Engagement\Tests\Matches\my_matches_listing.js"
