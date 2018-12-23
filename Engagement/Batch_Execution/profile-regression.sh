environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..

node nightwatch.js "Engagement\Tests\Profile\regression_profile_block.js"
node nightwatch.js "Engagement\Tests\Profile\regression_profile_ignore.js"
node nightwatch.js "Engagement\Tests\Profile\regression_profile_reportMisuse.js"
node nightwatch.js "Engagement\Tests\Profile\regression_profile.js"

node nightwatch.js "Engagement\Tests\Profile\profile.js"