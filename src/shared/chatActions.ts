// import fetch from 'node-fetch'

export const generateImage = async ({
  description: _description,
}: {
  description: string
}) => {
  console.log('Do nothing')
  // await fetch(
  //   'https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Stability-Client-ID': 'StorAI',
  //       Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       text_prompts: [
  //         {
  //           text: 'dungeons and dragons, battlemap, overhead view, combat grid, square grid, single room, a table in the center of the room, statues around the edges of the room, 8k, high resolution',
  //           weight: 1,
  //         },
  //       ],
  //     }),
  //   }
  // )
}
