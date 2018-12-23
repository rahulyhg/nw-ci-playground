environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..

node nightwatch.js "Engagement\Tests\Search\regression_adv_search_male.js"
node nightwatch.js "Engagement\Tests\Search\regression_adv_search.js"

node nightwatch.js "Engagement\Tests\Search\search_advance.js"
node nightwatch.js "Engagement\Tests\Search\search_basic.js"
node nightwatch.js "Engagement\Tests\Search\search_online_now.js"
node nightwatch.js "Engagement\Tests\Search\search_special_cases.js"
