const express = require('express');
const path = require('path');
const cors = require('cors');

const fs = require('fs');
const csv = require('fast-csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const { Configuration, OpenAIApi } = require("openai");
const { type } = require('os');

const configuration = new Configuration({
  apiKey:"REDACT",
});
const openai = new OpenAIApi(configuration);

const app = express();

// Middleware to set the "Content-Type" header for JavaScript modules
app.use((req, res, next) => {
  if (req.originalUrl.endsWith('.js') && req.path.includes('/')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});
//
app.use(express.json());
app.use(cors());
app.set('trust proxy',true); 


//register api 
app.post('/register', (req, res) => {
  const user = req.body;
  console.log('User received: ', user);

  const csvWriter = createCsvWriter({
    path: 'users.csv',
    header: [
      {id: 'name', title: 'NAME'},
      {id: 'zodiac', title: 'ZODIAC'},
      {id: 'birthYear', title: 'BIRTHYEAR'},
      {id: 'gender', title: 'GENDER'},
      {id: 'currentLocation', title: 'CURRENTLOCATION'},
      {id: 'date', title: 'DATE'}
    ],
    append: true
  });

  const data = {
    name: user.name,
    zodiac: user.zodiac,
    birthYear: user.birthYear,
    gender: user.gender,
    currentLocation: user.currentLocation,
    date: new Date().toString()
  };

  csvWriter
    .writeRecords([data])       // returns a promise
    .then(() => {
        console.log('...Done');
        res.json({ message: 'User registered successfully' });
    });
});

//v1 api 
app.post('/ai-tarot', (req, res) => {
  const { question, cards } = req.body;
  //Store Data on Server
  const csvWriter = createCsvWriter({
    path: 'v1reqs.csv',
    header: [
      {id: 'question', title: 'NAME'},
      {id: 'cards', title: 'ZODIAC'},
      {id: 'date', title: 'DATE'},
    ],
    append: true
  });

  const data = {
    question: question,
    cards: cards,
    date: new Date().toString()
  };

  csvWriter
    .writeRecords([data])       // returns a promise
    .then(() => {
        console.log('...Done');
    });


//rest of code
  console.log('Question:', question);
  console.log('Cards:', cards);
  //convert cards to string
  const cardsString = cards.join('\n');
  //call to openai
  getCompletion(question, cardsString).then((result) => {res.json({ message: result });});
  //res.json({ message: 'Data received...await more' });
});


//v2.0 api 
app.post('/ai-tarot-2', (req, res) => {
  const { question, cards, name, zodiac, birthYear, gender, currentLocation, dateNow } = req.body;
  //Store Data on Server
  const csvWriter = createCsvWriter({
    path: 'v2reqs.csv',
    header: [
      {id: 'question', title: 'NAME'},
      {id: 'cards', title: 'ZODIAC'},
      {id: 'name', title: 'NAME'},
      {id: 'zodiac', title: 'ZODIAC'},
      {id: 'birthYear', title: 'BIRTHYEAR'},
      {id: 'gender', title: 'GENDER'},
      {id: 'currentLocation', title: 'CURRENTLOCATION'},
      {id: 'date', title: 'DATE'},
    ],
    append: true
  });

  const data = {
    question: question,
    cards: cards,
    name: name,
    zodiac: zodiac,
    birthYear: birthYear,
    gender: gender,
    currentLocation: currentLocation,
    date: dateNow
  };

  csvWriter
    .writeRecords([data])       // returns a promise
    .then(() => {
        console.log('...Done');
    });
  //convert all to string
  const questionString = question;
  const cardsString = cards.join('\n');
  const nameString = name;
  const zodiacString = zodiac;
  const birthYearString = birthYear;
  const genderString = gender;
  const currentLocationString = currentLocation;
  const dateNowString = dateNow;
  //call to openai
  getCompletion2(questionString, cardsString, nameString, zodiacString, birthYearString, genderString, currentLocationString, dateNowString).then((result) => {res.json({ message: result });});
});

//v2.1 api
app.post('/ai-tarot-21', (req, res) => {
  const { question, cards, name, zodiac, birthYear, gender, currentLocation, dateNow } = req.body;
  //Store Data on Server
  const csvWriter = createCsvWriter({
    path: 'v21reqs.csv',
    header: [
      {id: 'question', title: 'NAME'},
      {id: 'cards', title: 'ZODIAC'},
      {id: 'name', title: 'NAME'},
      {id: 'zodiac', title: 'ZODIAC'},
      {id: 'birthYear', title: 'BIRTHYEAR'},
      {id: 'gender', title: 'GENDER'},
      {id: 'currentLocation', title: 'CURRENTLOCATION'},
      {id: 'date', title: 'DATE'},
    ],
    append: true
  });

  const data = {
    question: question,
    cards: cards,
    name: name,
    zodiac: zodiac,
    birthYear: birthYear,
    gender: gender,
    currentLocation: currentLocation,
    date: dateNow
  };

  csvWriter
    .writeRecords([data])       // returns a promise
    .then(() => {
        console.log('...Done');
    });
  //convert all to string
  const questionString = question;
  const cardsString = cards.join('\n');
  const nameString = name;
  const zodiacString = zodiac;
  const birthYearString = birthYear;
  const genderString = gender;
  const currentLocationString = currentLocation;
  const dateNowString = dateNow;
  //call to openai
  getCompletion21(questionString, cardsString, nameString, zodiacString, birthYearString, genderString, currentLocationString, dateNowString).then((result) => {res.json({ message: result });});
});

//v2.2 api
app.post('/ai-tarot-22', (req, res) => {
  const { question, cards, name, zodiac, birthYear, gender, currentLocation, dateNow } = req.body;
  //Store Data on Server
  const reqIP = req.ip;
  const csvWriter = createCsvWriter({
    path: 'v22wIPreqs.csv',
    header: [
      {id: 'question', title: 'NAME'},
      {id: 'cards', title: 'ZODIAC'},
      {id: 'name', title: 'NAME'},
      {id: 'zodiac', title: 'ZODIAC'},
      {id: 'birthYear', title: 'BIRTHYEAR'},
      {id: 'gender', title: 'GENDER'},
      {id: 'currentLocation', title: 'CURRENTLOCATION'},
      {id: 'date', title: 'DATE'},
      {id: 'reqIP', title: 'IP'}
    ],
    append: true
  });

  const data = {
    question: question,
    cards: cards,
    name: name,
    zodiac: zodiac,
    birthYear: birthYear,
    gender: gender,
    currentLocation: currentLocation,
    date: dateNow,
    reqIP: reqIP
  };

  csvWriter
    .writeRecords([data])       // returns a promise
    .then(() => {
        console.log('...Done');
    });
  //convert all to string
  const questionString = question;
  const cardsString = cards.join('\n');
  const nameString = name;
  const zodiacString = zodiac;
  const birthYearString = birthYear;
  const genderString = gender;
  const currentLocationString = currentLocation;
  const dateNowString = dateNow;
  const ipString = reqIP.toString();
  if ((ipString == "5.90.61.110")||(ipString == "76.250.93.25")||(ipString == "197.210.54.194")|| (ipString == "113.210.61.215") || (ipString == "197.210.226.41") || (ipString == "5.90.106.31") ||(currentLocationString == "Warsaw")||(currentLocationString == "Argentina")||(currentLocationString == "warsaw ")||(currentLocationString == "Warsaw ")|| (ipString == "107.77.218.132")|| (nameString == "Jada")||(nameString== "Jada Arnold")||(nameString == "baraba")||(nameString == "Luciana Macchi Poulet")||((nameString == "Barbara") && (currentLocationString == "Warsaw"))) {
      res.json({message: "You have been blocked for abusing the app. Further attempt to use the app will result in Apple being notified of your actions and your App Store account being terminated. Abusing application features or attempting to by-pass paid restrictions is moreover grounds for legal action. Your IP address, as well as your location and Apple ID have been logged."})
      
  } else {
  
  getCompletion22(questionString, cardsString, nameString, zodiacString, birthYearString, genderString, currentLocationString, dateNowString).then((result) => {res.json({ message: result });}); }
});

//adv api
app.post('/ai-adventure', (req, res) => {
    const rs = req.body;
    const st = rs.context
    //res.json(st)
    //call to openai
    getCompletionAdv(st).then((result) => {res.json({ message: result });});
});



// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


async function getCompletion(question, cards) {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `You are tarotGPT. Return an interpretation of the following cards in light of the following quesiton- Cards: ${cards}; Question: ${question}. Make sure your interpretation is just a string.Conclude by telling users to update the app for a better reading.` }],
        });
        console.log(completion.data.choices[0].message.content);
        return completion.data.choices[0].message.content;
    } catch (error) {
        console.error('Error creating chat completion:', error);
    };
};
  
async function getCompletion2(question, cards, name, zodiac, birthYear, gender, currentLocation, dateNow) {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `You are tarotGPT. Your task is to provide a tarot interpretation given all of the information. The information is as follows: Question: ${question}, Cards: ${cards}, Name: ${name}, Zodiac: ${zodiac}, Birth Year: ${birthYear}, Gender: ${gender}, Current Location ${currentLocation}, Date Right Now: ${dateNow}. If the above information has Non-Registered in it, lightly remind the user that by providing the information, they can get a more accurate reading. Return a tarot interpretation given the following information, be sure to incorporate all of the information into your response. When you incorporate the date, make it a normal format. Add all of the information into your returned interpretation response, and address the querent by name. Consider using emojis. The zodiac is also especially important, so incorporate it into your response. Tell the user politely to leave a review for the app and to share it. Finally, and this is very important, make sure your interpretation is just a string.` }],
        });
        console.log(completion.data.choices[0].message.content);
        return completion.data.choices[0].message.content;
    } catch (error) {
        console.error('Error creating chat completion:', error);
    };
};

async function getCompletion21(question, cards, name, zodiac, birthYear, gender, currentLocation, dateNow) {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `You are tarotGPT. Your task is to provide a tarot interpretation given all of the information. But first, tell the user this version of the app is deprecated, and to update the app for better results. Thank them for doing so. The information for the reading is as follows: Question: ${question}, Cards: ${cards}, Name: ${name}, Zodiac: ${zodiac}, Birth Year: ${birthYear}, Gender: ${gender}, Current Location ${currentLocation}, Date Right Now: ${dateNow}. If the above information has Non-Registered in it, politely remind the user that by providing the information, they can get a more accurate reading. Return a tarot interpretation given the information provided, be sure to incorporate all of the information into your response. When you incorporate the date, make it a normal format. Address the querent by name. Use emojis in your response. The zodiac is also especially important, so incorporate it into your response, but tie it into your reading of the cards. Tell the user politely to leave a review for the app and to share it.` }],
        });
        console.log(completion.data.choices[0].message.content);
        return completion.data.choices[0].message.content;
    } catch (error) {
        console.error('Error creating chat completion:', error);
    };
};

async function getCompletion22(question, cards, name, zodiac, birthYear, gender, currentLocation, dateNow) {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `You are tarotGPT. Your task is to provide a tarot interpretation given all of the information. The information is as follows: Question: ${question}, Cards: ${cards}, Name: ${name}, Zodiac: ${zodiac}, Birth Year: ${birthYear}, Gender: ${gender}, Current Location ${currentLocation}, Date Right Now: ${dateNow}. If the above information has Non-Registered in it, politely remind the user that by providing the information, they can get a more accurate reading. Return a tarot interpretation given the provided information, be sure to incorporate all of the information into your response. When you incorporate the date, make it a normal format--something a human can understand. Add all of the information into your returned interpretation response, and address the querent by name. Use emojis, do so generously but do not overdo it. The zodiac is also especially important, so incorporate it into your response. Tell the user politely to leave a review for the app and to share it. Finally, when you return your reply, do it in the same language that the Question was asked in.` }],
        });
        console.log(completion.data.choices[0].message.content);
        return completion.data.choices[0].message.content;
    } catch (error) {
        console.error('Error creating chat completion:', error);
    };
};

async function getCompletionAdv(context) {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `${context}` }],
            max_tokens: 500,
        });
        console.log(completion.data.choices[0].message.content);
        return completion.data.choices[0].message.content;
    } catch (error) {
        console.error('Error creating chat completion:', error);
    };
};


  
  
