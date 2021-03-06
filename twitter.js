var database = require('./database');
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: 'GbQC5ofeJBTEQ9462NQ5vfPyF',
    consumer_secret: 'zg3rG31oMOb38dhRlgI54cFhDFlYgKHe0SlDks9NX7dzxPGVWB',
    access_token_key: '726057548520939520-3HiVGnGLZtBcnEx4An2ueznBinDOW5Q',
    access_token_secret: 'hmei78uWVQLwwDrEOIL05eYGPD55tCF26xyMlDBFAoRt6'
});

function processTweets(tweets) {
    if (tweets.length > 0) {
        var tweet = tweets.pop();
        var user = tweet.user.screen_name;
        var message = tweet.text;
        var createdAt = tweet.created_at;
        if (CheckEntryTime(createdAt))
        {
            database.isUserQueuedOrProcessed(user, function (queuedOrProcessed) {
                if (!queuedOrProcessed) {
                    database.updateQueue(user, message, function () {
                        console.log('Updated queue with ' + user);
                        processTweets(tweets);
                    });

                } else {
                    console.log('Skipping user ' + user + ' this person already tweeted');
                    processTweets(tweets);
                }
            });
        } else {
            console.log('Skipping user ' + user + ' this entry has expired.');
        }
    }
}

function CheckEntryTime(createdAt) {
    var contestStartTime = new Date();
    contestStartTime.setHours(contestStartTime.getHours() - 1);
    if (new Date(createdAt) > contestStartTime)
    {
        return true;
    } else
    {
        return false;
    }
}

exports.startPolling = function () {
    var config = {q: '#GMRHackBox', count: 100, since_id: 727580059289014300};
    setInterval(function () {
        console.log('Querying Tweets');
        client.get('search/tweets', config, function (error, tweets, response) {
            console.log('Found %d tweets ', tweets.statuses.length);
            processTweets(tweets.statuses);
        });
    }, 6000);
};
