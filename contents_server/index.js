const app = require('express')();
const fs = require('fs');
const https = require('https')

const accessToken = process.env.accessToken || fs.readFileSync(__dirname+'/.accessToken.txt', 'utf-8');
const channelID = 'CR790EC3F';
const url = `https://slack.com/api/conversations.history?token=${accessToken}&channel=${channelID}&pretty=1`

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res
    .send('Hi! Are you lost? Visit <a href="https://densigiken.github.io/giken-web/index.html">our website</a>')
});

app.get('/contents-refresh', (req, res) => {
  https.get(url, (res) => {
    let body = '';
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', (res) => {
      res = JSON.parse(body);
      let contents = [];
      for (let i = 0; i < res.messages.length; i++) {
        const message = res.messages[i];
        if (message.type == 'message' && !message.subtype) {
          const article = message.text.toString().split('\n');
          contents[i] = { title: '', body: [] };
          for (let j = 0; j < article.length; j++) {
            if (j == 0) {
              contents[i].title = article[j];
            } else {
              contents[i].body[j-1] = article[j];
            }
          }
        }
      }
      fs.writeFile(__dirname+'/contents/blog.json', JSON.stringify(content), (err, result) => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('Blog data is ready!');
        };
      });
    });
  }).on('error', (e) => {
    console.log(e.message);
  });
  res
    .status(202)
    .send('Refresh process has been started.');
});

app.get('/blog', (req, res) => res.status(200).send(contents));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));