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



// const url = 'https://slack.com/api/chat.postMessage?';
// const token = 'xoxp-616767169504-605277361219-617476328917-65f268d290eac5894084c4311b91dda7';
// const channel = 'CJ6GXEXMM';
// const text = 'Hello Varik';
// const username = 'Varik';


// request(`${url}token=${token}&channel=${channel}&text=${text}&username=${username}&pretty=1`,
//  function optionalCallback(err, httpResponse, body) {
//     if (err) {
//         return console.error("upload failed: ", err);
//     }
//     console.log("Upload successful!  Server responded with: ", body);
// })



// request.post('https://slack.com/api/chat.postMessage',{
//     form:{
//         token: 'xoxp-616767169504-605277361219-617476328917-65f268d290eac5894084c4311b91dda7',
//         channel: 'CJ6GXEXMM',
//         text: 'Hello Armine'
//     }
// }, function optionalCallback(err, httpResponse, body) {
//     if (err) {
//         return console.error('upload failed:', err);
//     }
//     console.log('Upload successful!  Server responded with:', body);
// });


module.exports = function (controller) {

    controller.hears(['^daily$'], 'direct_message,direct_mention', function(bot, message) {

        bot.startPrivateConversation({user: message.user}, function (err, convo) {
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

            const findUser = (userID) => {
                
              return new Promise (res => {
                bot.api.users.list({}, function (err, list) {
                    userName = list.members.find((user) => user.id === userID).profile.real_name;
                    res(userName);
                 })
              })
                

                // console.log("user:::", user);

                // console.log("afterrrrrrrrrr", userName);
                
            }
          

            let obj = {};
            if (err) {
                console.log(err);
            } else {
                convo.ask("What have you done?", (response, convo) => {
                    // console.log("///////////", response);
                    if(response.event.text) {
                        console.log("here+++", response.event.user);
                        obj.userId = response.event.user;
                        obj.question1 = response.question;
                        obj.response1 = response.event.text;
                        // findUser(response.event.user);
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
                            // answers.push(obj);

                            console.log("convo>>>>>>>>>>>>>", convo);
                            // bot.send({
                            //     channel: 'general',
                            //     user: userID,
                            //     text: JSON.stringify(obj)
                            // }); 
                         
                            // let userName = findUser('UHT85AM6F');
                            const allTranscript = convo.transcript.filter(currentTranscript => currentTranscript.token);
                            const length = allTranscript.length;
                            const questions = allTranscript.map(curr => curr.question);
                            const answers = allTranscript.map(curr => curr.text);
                            let convertsation = '';
                            for(let i = 0; i < length; i++){
                                convertsation += `\n *${questions[i]}* \n ${answers[i]} `;
                            }

                            console.log(convertsation)
                            let text = `> *${obj.question1}* \n>  ${obj.response1} \n> *${obj.question2}* \n> ${obj.response2} \n> *${obj.question3}* \n> ${obj.response3}`  

                            findUser(obj.userId).then(username => {

                                request.post('https://slack.com/api/chat.postMessage',{
                                    form:{
                                        token: 'xoxp-616767169504-605277361219-617476328917-65f268d290eac5894084c4311b91dda7',
                                        channel: 'CJ6GXEXMM',
                                        text: convertsation,
                                        username,
                                    }
                                    }, function optionalCallback(err, httpResponse, body) {
                                        if (err) {
                                            return console.error('upload failed:', err);
                                        }
                                        console.log('Upload successful!  Server responded with:', body);
                                    });


                            });
                            
     
                                
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

