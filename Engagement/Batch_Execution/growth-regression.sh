environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..

node nightwatch.js "Engagement\Tests\Growth\2wayRemoval.js"
node nightwatch.js "Engagement\Tests\Growth\regression_matches.js"
node nightwatch.js "Engagement\Tests\Growth\regression_profile_sku.js"
node nightwatch.js "Engagement\Tests\Growth\saveDraft.js"