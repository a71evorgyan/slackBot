var debug = require('debug')('botkit:onboarding');
// const SlackBot = require('slackbots');

// const postBot = new SlackBot({
//     token: 'xoxb-616767169504-618910721078-3DYat0E4PykdTi0eL5ex3jkd',
//     name: 'train'
// });

// let answers = new Map();
module.exports = function (controller) {

    controller.on('onboard', function (bot) {

        debug('Starting an onboarding experience!');

        bot.startPrivateConversation({user: bot.config.createdBy}, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.ask("What have you done?", (response, convo) => {
                    if(response.text) {
                        console.log("here");
                        
                        answers.set("What have you done?", response.text);
                        convo.ask("What are you going to do today?", (response, convo) => {
                            answers.set("What are you going to do today?", response.text);
                        })
                    }
                })
            }
        });
    });

}
