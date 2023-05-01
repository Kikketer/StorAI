//import { parseRoomDescription } from './chatActions'

const parseRoomDescription = ({ description }) => {
  const cleanedDescription = description?.match(/%(.*)%/)?.[1] ?? ''
  let options = description?.match(/\{What.*}(.*)\{Something.*}/)?.[1] ?? ''
  const imageDescription = cleanedDescription

  // remove new lines
  options = options.replace(/\\n/g, '')
  // split into array of options
  options = options.split(/Option \d:/)
  // remove any empty strings
  options = options.filter((option) => option !== '')
  // remove whitespace
  options = options.map((option) => option.trim())

  return {
    description: cleanedDescription,
    options,
    imageDescription,
  }
}

const mockDescription =
  '%You wake up to find yourself in a small bunk room. The room is sparse, with only a narrow cot and a small locker for your belongings. The room is swaying back and forth gently, signaling that you’re aboard a moving vessel. You see a small porthole in the wall, offering you a view of space outside.% \\n\\n{What do you do?}\\n\\nOption 1: Get dressed and leave the room.\\nOption 2: Take a look through the porthole.\\nOption 3: Rumage through your locker.\\n{Something else}'

console.log(parseRoomDescription({ description: mockDescription }))
