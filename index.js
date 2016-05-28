/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask RVA Facts for a Richmond fact"
 *  Alexa: "Here's your Richmond Virginia fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.f95135b0-f6b3-455f-bece-a420496677f7";

/**
 * Array containing RVA facts.
 */
var RVA_FACTS = [
    "Richmond is located on the James River where it was first settled in 1607 by Christopher Newport and Captain John Smith after they traveled ten days up the James River from Jamestown.",
    "Richmond served as a meeting place for the Continental Congress as well as the capital for the Confederate States of America during the Civil War.",
    "Richmond was named the Confederate Capital on May 21, 1861.",
    "In 1992 the University of Richmond hosted the first ever town hall style presidential debate between H. Ross Perot, George H.W. Bush and Bill Clinton.",
    "In 1888, the country's first successful trolley system opened in Richmond.",
    "Two U.S. Presidents, Monroe and Tyler, Confederate President Davis and more than 18,000 Civil War soldiers and officers are buried in Richmond's Hollywood Cemetery.",
    "Richmond elected Douglas Wilder as the first African-American governor in America. A grandson of former slaves, Wilder was sworn in as governor of the State of Virginia in 1990.",
    "Richmond is fast-becoming known for its food scene, with several restaurants in the Fan, Church Hill, Jackson Ward and elsewhere around the city generating regional and national attention for their fare.",
    "Craft beer is rapidly growing in the Richmond, with over twelve micro-breweries in city proper and the oldest is Legend Brewery, founded in 1994.",
    "Richmond is gaining attention from the film and television industry, with several high-profile films shot in the metro region in the past few years, including the major motion picture Lincoln which led to Daniel Day-Lewis's third Oscar,",
    "Richmond operates one of the oldest municipal park systems in the country. The park system began when the city council voted in 1851 to acquire 7.5 acres, now known as Monroe Park. Today, Monroe Park sits adjacent to the Virginia Commonwealth University campus.",
    "There are over 35 private schools in the city of Richmond.  Some of the best schools include Saint Bridget School, Benedictine College Preparatory, and Saint Gertrude School."
];
/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * RichmondFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var RichmondFacts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
RichmondFacts.prototype = Object.create(AlexaSkill.prototype);
RichmondFacts.prototype.constructor = RichmondFacts;

RichmondFacts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("RichmondFacts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

RichmondFacts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("RichmondFacts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
RichmondFacts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("RichmondFacts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

RichmondFacts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask RVA Facts tell me a Richmond Virginia fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random RVA fact from the RVA facts list
    var factIndex = Math.floor(Math.random() * RVA_FACTS.length);
    var fact = RVA_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Richmond Virginia fact: " + fact;

    response.tellWithCard(speechOutput, "RichmondFacts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the RichmondFacts skill.
    var richmondfacts = new RichmondFacts();
    richmondfacts.execute(event, context);
};
