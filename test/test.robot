*** Variables ***
${URL}            http://cusku.starck.fi
${BROWSER}        %{BROWSER}

*** Settings ***
Documentation     A simple test to test tests
Library           Selenium2Library
Test Setup        Open test browser
Suite Teardown    Close all browsers

*** Keywords ***
Open test browser
  Open Browser  ${URL}  ${BROWSER}
  Maximize Browser Window

Cusku Should Be Open
  Title Should Be  \#cusku > login

*** Test cases ***
Test Testing Test
  Cusku Should Be Open
