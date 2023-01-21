// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

type Data = {
  photo: any
}


// const users: User[] = [{ id: 1 }, { id: 2 }, { id: 3 }]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { query } = req.body;
  console.log(query)

  const aiResponse = await openai.createImage({
    prompt: query,
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
  });

  const image = aiResponse.data.data[0].b64_json;
  res.status(200).json({ photo: image});
}
