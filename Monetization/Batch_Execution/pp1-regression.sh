environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..
    
node nightwatch.js "Monetization/Tests/Payment_Plan/regression_plan_features_phase1.js"
node nightwatch.js "Monetization/Tests/Payment_Plan/regression_plan_features_phase2.js" --shd_ab=CUG

node nightwatch.js "Monetization/Tests/Payment_Plan/sanity_orderSummary.js"
node nightwatch.js "Monetization/Tests/Payment_Plan/sanity_orderSummary.js" --shd_ab=CUG