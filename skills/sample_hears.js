/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/
const request = require('request');

let answers = [];

// request("https://slack.com/api/chat.postMessage?token=xoxp-616767169504-605277361219-618578769559-26a7236e448e9383bec6357d814ccf48&channel=CJ6GXEXMM&text=Hello&pretty=1",
//     function optionalCallback(err, httpResponse, body) {
//         if (err) {
//             return console.error("upload failed: ", err);
//         }
//         console.log("Upload successful!  Server responded with: ", body);
// });



const url = 'https://slack.com/api/chat.postMessage?';
const token = 'xoxp-616767169504-605277361219-617535185568-3a9da8236dcc8f39801190cf51d9d209';
const channel = 'CJ6GXEXMM';
const text = 'Hello Armine';
const username = 'armine';


request(`${url}token=${token}&channel=${channel}&text=${text}&username=${username}&pretty=1`,
 function optionalCallback(err, httpResponse, body) {
    if (err) {
        return console.error("upload failed: ", err);
    }
    console.log("Upload successful!  Server responded with: ", body);
})



// const token = '';
// const channel = '';
// const text = ''
// request.post({
//     url: 'https://slack.com/api/chat.postMessage',
//     token: 'xoxp-616767169504-605277361219-618578769559-26a7236e448e9383bec6357d814ccf48',
//     channel: 'CJ6GXEXMM',
//     text: 'Hello Armine'
// }, function optionalCallback(err, httpResponse, body) {
//     if (err) {
//         return console.error('upload failed:', err);
//     }
//     console.log('Upload successful!  Server responded with:', body);
// });


module.exports = function (controller) {

    controller.hears(['^hello$'], 'direct_message,direct_mention', function(bot, message) {
        bot.startPrivateConversation({user: bot.config.createdBy}, function (err, convo) {
            // const member = convo.members();
            // console.log('member::::', convo);
            convo.activate();

            const userID = convo.context.user;

            // console.log("-------", bot.api);
            // bot.api.users.list({}, function (err, list) {
            //     bot.reply(message, "polo");
            //     console.log(list);
            //     const user = list.members.filter((user) => user.id === userID)[0];

            //     console.log("user:::",user);
            // })
            
            bot.api.channels.list({}, function (err, list) {
                // bot.reply(message, "polo");
                console.log('list::::::::',list);
                // const user = list.members.filter((user) => user.id === userID)[0];

                // console.log("user:::", user);
            })

            let obj = {};
            if (err) {
                console.log(err);
            } else {
                convo.ask("What have you done?", (response, convo) => {
                    console.log("///////////", response);
                    if(response.event.text) {
                        console.log("here");
                        obj.userId = response.event.user;
                        obj.question1 = response.question;
                        obj.response1 = response.event.text;
                        // convo.ask("What are you going to do today?", (response, convo) => {
                        //     answers.set("What are you going to do today?", response.text);
                        // })
                    }
                    convo.next();
                    convo.ask("What are you going to do today?", (res, convo) => {
                        obj.question2 = res.question;
                        obj.response2 = res.event.text;
                        convo.next();
                        convo.ask("ok, any obstacles?", (res, convo) => {
                            obj.question3 = res.question;
                            obj.response3 = res.event.text;
                            convo.say('Thank you, that is all for now');
                            convo.next();
                            answers.push(obj);

                            console.log("convo>>>>>>>>>>>>>", convo);
                            // bot.send({
                            //     channel: 'general',
                            //     user: userID,
                            //     text: JSON.stringify(obj)
                            // });    
                             
                        })
                    })
                })
            }
            
        });    

        // bot.reply(message, "Hi there, you're on workspace: " + message.team)      
    });

    // const bot = controller.spawn({token: 'xoxp-616767169504-605277361219-618578769559-26a7236e448e9383bec6357d814ccf48', retry: true}, function(bot) {
//         console.log("zxkum");
        

//   });
  
};



















// const SlackBot = require('slackbots');

// const postBot = new SlackBot({
//     token: 'xoxb-616767169504-618910721078-3DYat0E4PykdTi0eL5ex3jkd',
//     name: 'train'
// });

// postBot.on('start', function () {
//     // more information about additional params https://api.slack.com/methods/chat.postMessage
//     // var params = {
//     //     icon_emoji: ':cat:'
//     // };

//     // // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
//     // bot.postMessageToChannel('general', 'meow!', params);

//     // // define existing username instead of 'user_name'
//     // bot.postMessageToUser('user_name', 'meow!', params);

//     // // If you add a 'slackbot' property, 
//     // // you will post to another user's slackbot channel instead of a direct message
//     // bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });

//     // // define private group instead of 'private_group', where bot exist
//     // bot.postMessageToGroup('private_group', 'meow!', params);

//     let users;
//     postBot.getUsers()
//         .then(res => {
//             users = res.members;
//         })
//         .catch((e) => {
//             console.log(e)
//         })

// });

