var debug = require('debug')('botkit:incoming_webhooks');
// const SlackBot = require('slackbots');

module.exports = function(webserver, controller) {

    debug('Configured /slack/receive url');
    webserver.post('/slack/receive', function(req, res) {

        // NOTE: we should enforce the token check here
        console.log("req", req.body);
        // const bot = new SlackBot({
        //     token: 'xoxb-616767169504-618910721078-3DYat0E4PykdTi0eL5ex3jkd',
        //     name: 'train'
        // });
        // bot.postMessageToChannel('general', ` ${req.body.event.text}`);

        // respond to Slack that the webhook has been received.
        res.status(200);

        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res);

    });

}
