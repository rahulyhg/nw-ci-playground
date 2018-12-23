environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..

node nightwatch.js "Engagement\Tests\Inbox\regression_accepted.js"
node nightwatch.js "Engagement\Tests\Inbox\regression_deleted.js"
node nightwatch.js "Engagement\Tests\Inbox\regression_invitations.js"
node nightwatch.js "Engagement\Tests\Inbox\regression_request.js"
node nightwatch.js "Engagement\Tests\Inbox\regression_sent.js"

node nightwatch.js "Engagement\Tests\Inbox\filters_checkboxes.js"
