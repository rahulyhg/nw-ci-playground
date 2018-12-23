environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..
    
node nightwatch.js "Monetization/Tests/Payment_Cart/sanity_JusPay.js" --shd_ab=CUG
node nightwatch.js "Monetization/Tests/Payment_Cart/sanity_non_JusPay.js"