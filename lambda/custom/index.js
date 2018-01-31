'use strict';

const Alexa = require('alexa-sdk');
const data = require('../../data/grandSlams.json');

exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(startHandlers, questionHandlers);
  alexa.execute();
};

const states = {
  QUESTIONMODE: '_QUESTIONMODE',
  STARTMODE: '_STARTMODE'
};

const startHandlers = {
  'LaunchRequest': function() {
    this.response.speak("Welcome to Tennis Facts. What's your favorite tennis equipment brand?");
    this.handler.state = states.STARTMODE;
    this.emit(':responseReady');
  },

  'BrandIntent': function() {
    this.handler.state = states.QUESTIONMODE;

    this.attributes.brand = this.event.request.intent.slots.brand.value;

    this.response.speak(this.attributes.brand + ' is a great brand!');
    this.emit(':responseReady');
  },

  'AMAZON.StopIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  'AMAZON.CancelIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  'Unhandled': function() {
    this.response.speak("Sorry, I didn't get that.");
    this.emit(':responseReady');
  },

  'SessionEndedRequest': function() {
    console.log('Session ended with reason: ' + this.event.request.reason);
  }
};

const questionHandlers = Alexa.CreateStateHandler(states.QUESTIONMODE, {
  'NumberOfGrandSlamsIntent': function() {
    this.response.speak(this.event.request.intent.slots.player.value + ' has won ' + data[this.event.request.intent.slots.player.value].totalWins + ' grand slams.');
    this.emit(':responseReady');
  },

  'AMAZON.HelpIntent': function() {
    this.response.speak('Try asking how many grand slams Roger Federer has won.');
    this.emit(':responseReady');
  },

  'AMAZON.StopIntent': function() {
    this.response.speak('Enjoy your favorite brand ' + this.attributes.brand);

    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  'AMAZON.CancelIntent': function() {
    this.response.speak('Enjoy your favorite brand ' + this.attributes.brand);

    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  'Unhandled': function() {
    this.response.speak("Sorry, I didn't get that.");
    this.emit(':responseReady');
  }
});
