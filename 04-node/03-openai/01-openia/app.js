require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const main = async () => {
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "listame  los  primeros restos humanos prehistóricos encontrados en el Perú ",
    max_tokens: 2048,
  });

  console.log(completion.data.choices[0].text);
  // console.log(completion.data.choices);
};

main();
