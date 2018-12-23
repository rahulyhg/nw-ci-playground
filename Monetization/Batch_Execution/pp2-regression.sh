environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..
    
node nightwatch.js "Monetization/Tests/Payment_Cart/regression_creditcard_JusPay.js" --shd_ab=CUG
node nightwatch.js "Monetization/Tests/Payment_Cart/regression_creditcard.js"
node nightwatch.js "Monetization/Tests/Payment_Cart/regression_debitcard.js"
node nightwatch.js "Monetization/Tests/Payment_Cart/regression_EMI.js"
node nightwatch.js "Monetization/Tests/Payment_Cart/regression_orderSummary_redesign.js"
node nightwatch.js "Monetization/Tests/Payment_Cart/regression_orderSummary_redesign.js" --shd_ab=CUG


