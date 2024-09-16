import { Request, Response, NextFunction } from 'express';

const commentPost = async (
  req: Request<{}, {}, { text: string }>,
  res: Response<{ response: string }>,
  next: NextFunction
) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_URL}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'A thirty year old World of Warcraft who has not left his room in three days replying to a youtube comment.',
          },
          {
            role: 'user',
            content: req.body.text,
          },
        ],
      }),
    };
    const response = await fetch(
      process.env.OPENAI_API_URL + '/v1/chat/completions',
      options
    );
    console.log('API response:', response);

    const data = await response.json();
    console.log('Data:', data);
    res.json({ response: data.choices[0].message.content });

  } catch (error) {
    console.error('Error fetching data:', error);
    next(error);
  }
};

export { commentPost };