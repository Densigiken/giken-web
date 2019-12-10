const app = require('express')();
const fs = require('fs');
const request = require('request')

const accessToken = process.env.accessToken;
const channelID = 'CR790EC3F';
const blog_url = `https://slack.com/api/conversations.history?token=${accessToken}&channel=${channelID}&pretty=1`
const user_url = `https://slack.com/api/users.list?token=${accessToken}&pretty=1`

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res
    .send('Hi! Are you lost? Visit <a href="https://densigiken.github.io/giken-web/index.html">our website</a>')
});


const getjson = url => {
  return new Promise((resolve, reject) => {
    request({ url: url, method: 'GET', json: true }, (error, res, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

app.get('/contents-refresh', (req, res) => {
  let contents = [];
  getjson(user_url).then(users => {
    getjson(blog_url).then(response => {
      for (let i = 0; i < response.messages.length; i++) {
        const message = response.messages[i];
        if (message.type == 'message' && !message.subtype) {
          contents[i] = { title: '', author: '', body: [] };
          for (let j = 0; j < users.members.length; j++) {
            if (users.members[j].id == message.user) {
              console.log(users.members[j].display_name);
              contents[i].author = users.members[j].profile.display_name;
              break;
            }
          }
          const article = message.text.toString().split('\n');
          for (let j = 0; j < article.length; j++) {
            if (j == 0) {
              contents[i].title = article[j];
            } else {
              contents[i].body[j - 1] = article[j];
            }
          }
        }
      }
      contents = contents.filter(v => v);
      fs.writeFile('/tmp/blog.json', JSON.stringify(contents), (err, result) => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('Blog data is ready!');
          console.log(contents);
        }
      });
    });
  });
  res
    .status(202)
    .send('Refresh process has been started.');
  }).on('error', (e) => {
    console.log(e.message);
});

app.get('/blog', (req, res) => res.status(200).send(fs.readFileSync('/tmp/blog.json', 'utf-8')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));