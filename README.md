
# Web Test framework (using Nightwatch) 
This repository contains nightwatch testing framework for Web UI testing.

Some cool feature are,
* Easy API to write code than vanilla selenium
* In-built logger and reporter
* Screenshots when errors
* Ease to configure team project 

## Content
- [Tutorial](#tutorial)
- [Pre requisite](#pre-requisite)
- [Installation](#installation)
- [Execute](#execute)
- [Cross Browser](#cross-browser)
- [Folder Structure](#folder-structure)

- [Tips](#tips)

## Tutorial
Below are few tutorials if required.

**Javascript**
* [Javacscript info](https://javascript.info)  _(only fundamental chapter)_   [1-2 days]
* [tutorials point](https://www.tutorialspoint.com/es6/index.htm) [1-2 days]
* [OOP in Javascript](https://codeburst.io/javascript-object-oriented-programming-using-es6-3cd2ac7fbbd8) [2-3 hours]

**Fun Quiz on Javascript**
* [Quiz 1](http://davidshariff.com/js-quiz/)
* [Quiz 2](https://www.javatpoint.com/javascript-quiz)
* [Quiz 3](https://thejsquiz.com/)

**Node**
* [tutorials point](https://www.tutorialspoint.com/nodejs/index.htm) _(chap 1-7, File Systems, Global Objects)_

**Automation**
* [What is Page-Object Model](https://www.guru99.com/page-object-model-pom-page-factory-in-selenium-ultimate-guide.html)
* [CSS selector example](https://www.w3schools.com/CSSref/css_selectors.asp)
* [XPath article](https://www.guru99.com/xpath-selenium.html)
* [NightWatch](http://nightwatchjs.org/guide)
* [Site to Practice on Nightwatch](https://example.cypress.io)  _(Cypress example site)_

## Pre-requisite

- [x] Node.js
- [x] Visual Studio code

 Below are few VS code extension I use -
  _html-snippets, path-intellisense, vscode-eslint, docthis, indent-rainbowtrailing-spaces, stylelint, open-in-browser, vscode-import-cost, html-css-class-completion, Run as._
 
 ## Installation
1. Create empty Folder ::
`D:\> mkdir Apollo`
2. Clone the repository ::
`D:\Apollo> git clone https://github.com/peopleGroup/Nightwatch-Web-Testing.git`
3. Change directory ::
`cd Nightwatch-web-Testing`
4. Install dependencies (2-5 min, one time setup) ::
 `npm install`
## Test Execute Command
- syntax : `node nightwatch.js {path to filename .js}`

- To run the sample test,
`npm run sample-acquisition`

`npm run sample-engagement`

`npm run sample-monetization`

## Cross Browser
- Chrome : `node nightwatch.js {path to filename .js}`
- Firefox : `node nightwatch.js --env=firefox {path to filename .js}`
- IE : `node nightwatch.js --env=ie {path to filename .js}`


### Tips
 - To pause for indefinite period, use - `browser.pause()`
 - To stop execution on error use - `browser.assert......`
 - To continue execution on error use - `browser.verify.....`
 - To perform _down_ key operation, - `browser.keys('\uE015')` [key list](https://www.w3.org/TR/webdriver/#keyboard-actions) .
 - To move cursor and click , 
 ```
 browser
 .moveToElement('#ddOptHolder_maritalstatus', 500, 10)
 .mouseButtonDown(0) 
 ```
 - Iterate multiple elements in Nightwatch

``` 
'test 1' : (browser) => {

      var ids = [];
      browser.Navigate(browser,"https://example.cypress.io/commands/traversal");
        browser.elements('css selector', '.traversal-list > li', function(item) {
        
          for(let i=0;i < item.value.length;i++){
            ids.push(item.value[i].ELEMENT);
            browser.elementIdText(ids[i],(res) =>{
              console.log(res.value);
            });
        }
    }
}
```
