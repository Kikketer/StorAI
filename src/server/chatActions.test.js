//import { parseRoomDescription } from './chatActions'

const parseRoomDescription = ({ description }) => {
  let cleanedDescription = description?.replace(/%/g, '').replace(/\n/g, '')
  let options =
    cleanedDescription?.match(
      /(do\w*?}?)\?(.*)\{?\w?Something else.?}?/
    )?.[2] ?? ''
  cleanedDescription =
    cleanedDescription.replace(options, '').replace(/\{.*}/, ' ') ?? ''
  const imageDescription = cleanedDescription

  // split into array of options
  let optionList = options.split(/\d[.:]?/)
  // remove whitespace
  optionList = optionList.map((option) => option.trim())
  // remove any empty strings
  optionList = optionList.filter((option) => option !== '')

  return {
    description: cleanedDescription,
    options: optionList,
    imageDescription,
  }
}

const mockDescription = `"%You wake up in your cramped quarters on the USS Buttknuckle. The room is small with just enough space for a bunk bed and a metal closet. The bunk bed is neatly made and your belongings are neatly stowed away in the closet. The only light in the room is coming from a small lamp on the metal desk next to your bed.% 

{ What do you do? }

Option 1: Get dressed and leave the room
Option 2: Look around the room
Option 3: Go back to sleep
{ Something else }"`
// '"%You wake up in your quarters on the USS Buttknuckle. The room is small and cluttered with your belongings. The hum of the ship\'s engines fills the air. What do you do?%\n' +
// '\n' +
// 'Option 1: Get dressed\n' +
// 'Option 2: Look out the window\n' +
// 'Option 3: Check your messages\n' +
// '{ Something else }"'
// '%You wake up to find yourself in a small bunk room. The room is sparse, with only a narrow cot and a small locker for your belongings. The room is swaying back and forth gently, signaling that you’re aboard a moving vessel. You see a small porthole in the wall, offering you a view of space outside.% \\n\\n{What do you do?}\\n\\nOption 1: Get dressed and leave the room.\\nOption 2: Take a look through the porthole.\\nOption 3: Rumage through your locker.\\n{Something else}'

console.log(parseRoomDescription({ description: mockDescription }))
