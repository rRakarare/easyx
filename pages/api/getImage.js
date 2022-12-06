import fs from 'fs'
import path from 'path'

export default (req, res) => {
  // Let's say your json is in /public/assets/my-json.json
  const filePath = path.resolve('./public', 'frame1.png');
  const json = fs.readFileSync(filePath);

  res.statusCode = 200
  res.json(json);
}