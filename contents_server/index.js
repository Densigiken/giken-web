const express = require('express')
const fs = require('fs');
const https = require('https')
const server = express();

const accessToken = fs.readFileSync('./.accessToken.txt', 'utf-8');
const channelID = 'CR790EC3F';
const url = `https://slack.com/api/conversations.history?token=${accessToken}&channel=${channelID}&pretty=1`

setInterval(function() {
  https.get(url, (res) => {
    let body = '';
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', (res) => {
      res = JSON.parse(body);
      let content = [];
      for (let i = 0; i < res.messages.length; i++) {
        const message = res.messages[i];
        if (message.type == 'message' && !message.subtype) {
          const article = message.text.toString().split('\n');
          content[i] = { title: '', body: '' }
          for (let j = 0; j < article.length; j++) {
            const line = article[j];
            if (j == 0) {
              content[i].title = line;
            } else {
              content[i].body += line;
            }
          }
        }
      }
      fs.writeFile('./contents/blog.json', JSON.stringify(content), (err, result) => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('Blog data is ready!');
        };
      });
    });
  }).on('error', (e) => {
    console.log(e.message); //エラー時
  });
}, 300000);

server.get('/blog', (req, res) => res.send(fs.readFileSync('./contents/blog.json', 'utf-8')));
server.listen(3000, () => console.log('Listening on port 3000'));