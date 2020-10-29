const {accountSid, authToken, destinationSIP, callerID} = require('../twilioConfig.js')
const moment = require('moment')
const CronJob = require('cron').CronJob;
console.log('['+ moment().format()+'] Before job instantiation');
var job = new CronJob('0 * * * * *', function() {
    // console.log('Every Two Minute:', moment().format());
    const random_boolean = Math.random() >= 0.6;
    if(random_boolean){
      const client = require('twilio')(accountSid, authToken);
      client.calls
            .create({
              twiml: '<Response><Say>Ahoy there.</Say></Response>',
              to: destinationSIP,
              from: callerID,
              timeout: 120
            }).then(call => console.log('['+ moment().format()+'] Initiate call ' + call.sid));
    } else {
      console.log('['+ moment().format()+'] Do not initiate call')
    }
});
console.log('['+ moment().format()+'] After job instantiation');
job.start();
console.log('['+ moment().format()+'] is job running? ', job.running);