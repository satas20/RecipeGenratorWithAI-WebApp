const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const OpenAI = require("openai").OpenAI;


const openai = new OpenAI({
    apiKey: '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',
});

//setup express
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
    
    if(!prompt){prompt="there is no prompt" ;
    return;
}
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo-0125",
      });
    console.log (completion.choices[0].message.content);
    res.send(completion.choices[0].message.content);
    
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});