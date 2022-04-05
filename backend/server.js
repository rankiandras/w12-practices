const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9000;

app.get('/', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})
app.get('/kismacska', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
})

app.get('/something', (req, res, next) => {
    console.log('Request received for something endpoint.');
    res.send('Thank you for your request! This is our response for something endpoint.')
})



app.get('/api/v1/users', (req, res, next) => {
    console.log('Request received for users endpoint.');
/*     const users = [
        {
            name: 'John',
            surname: 'Doe',
            status: 'active'
        },
        {
            name: 'Jane',
            surname: 'Smith',
            status: 'passive'
        }
    ]
    res.send(JSON.stringify(users))
 */
    res.sendFile(path.join(`${__dirname}/../frontend/users.json`));
})

const userFile = path.join(`${__dirname}/../frontend/users.json`)

app.get('/api/v1/users/active', (req, res, next) => {
    fs.readFile(/* "../frontend/users.json" */ userFile, (error, data) => {
        if (error) {
            res.send('Error just happened')
        } else {
            const users = JSON.parse(data)
            
            // const activeUsers = users.filter(user => user.status === 'active');
            res.send(users.filter(user => user.status === 'active'));
        }
    })
})

app.get('/api/v1/users/passive', (req, res, next) => {
    fs.readFile(/* "../frontend/users.json" */ userFile, (error, data) => {
        if (error) {
            res.send('Error just happened')
        } else {
            const users = JSON.parse(data)
            // const passiveUsers = users.filter(user => user.status === 'passive');
            res.send(users.filter(user => user.status === 'passive'));
        }
    })

})



app.use('/public', express.static(`${__dirname}/../frontend/public`));

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});