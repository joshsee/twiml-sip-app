const {accountSid, authToken, destinationSIP, callerID, randomNumbers} = require('../twilioConfig.js')
const moment = require('moment')
// const CronJob = require('cron').CronJob;

const randomSay = ['Ahoy there.', 'Ahoy there. You understand what I am saying.', 'If you’re interested in building with WebRTC, look no further than Twilio Client. Everything you need to build a complete solution is packaged in one JavaScript file', 'Twilio Client is powered by Twilio\'s global, elastically scalable platform, low latency media relay, and intelligent call control. You don’t need to build out the server side components', 'Can you please answer the phone. It\'s quite urgent']

// Init Twilio
const client = require('twilio')(accountSid, authToken);

// Sleep Function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Call Out Function
const callOut = async () => {
  while (true) {
    const randomBoolean = Math.random() >= 0.6;
    const randomNumberPicker = Math.floor(Math.random() * 5)
    const randomSayPicker = Math.floor(Math.random() * 5)

    if(randomBoolean){
      const callNumber = randomNumbers[randomNumberPicker]
      const sayWord = randomSay[randomSayPicker]
      
      client.calls
            .create({
              twiml: '<Response><Say>' + sayWord + '</Say></Response>',
              to: destinationSIP.replace('destination', callNumber),
              from: callerID,
              timeout: 120
            }).then(call => console.log('['+ moment().format()+'] Initiate call ' + call.sid + ' to:' + callNumber));
    } else {
      // console.log('['+ moment().format()+'] Do not initiate call')
    }

    // console.log('Taking a 5 Sec break...');
    await sleep(10000);
  }  
}

callOut()