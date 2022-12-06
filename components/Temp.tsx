import axios from "axios";
import { TemplateHandler } from "easy-template-x";
import { useEffect, useState } from "react";

interface TemplateData {
  name: string;
  age: number;
}

interface IProps {
  data: TemplateData;
}

interface Image {
  isImage: true;
  url: any;
  width: Number;
  height: Number;
}

function saveFile(filename, blob) {
  // see: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

  // get downloadable url from the blob
  const blobUrl = URL.createObjectURL(blob);

  // create temp link element
  let link = document.createElement("a");
  link.download = filename;
  link.href = blobUrl;

  // use the link to invoke a download
  document.body.appendChild(link);
  link.click();

  // remove the link
  setTimeout(() => {
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
    link = null;
  }, 0);
}

const kaka: any = {
  first: "loremipsum",
  second: "asdqwe123",
  leckmi: { isImage: true, url: "frame1.png", width: 200, height: 200 },
  posts: [
    { author: "Alon Bar", text: "Very important\ntext here!", im: { isImage: true, url: "frame1.png", width: 200, height: 200 } },
    { author: "Alon Bar", text: "Forgot to mention that...", im: { isImage: true, url: "frame1.png", width: 200, height: 200 } },
  ],
};

function Temp({ data }: IProps) {
  const checkType = (item: any) => {
    const type = Object.prototype.toString.call(item);

    switch (type) {
      case "[object Array]":
        return "loop";

      case "[object Object]":
        if (item.isImage) {
          return "image";
        } else {
          return "item";
        }

      case "[object String]":
        return "item";

      default:
        return "";
    }
  };

  const reroll = async () => {

    let newkaka: any = {...kaka};

    const layer1Keys = Object.keys(kaka);

    await Promise.all(
      layer1Keys.map(async (layer1Key) => {
        const layer1Value = kaka[layer1Key];
        const type1 = checkType(layer1Value);

        switch (type1) {
          case "image":
            newkaka[layer1Key] = await loadImage(layer1Value);
            break;

          case "loop":
            await Promise.all(
              layer1Value.map(async (layer2Object: any, index:any) => {
                const layer2Keys = Object.keys(layer2Object);

                await Promise.all(layer2Keys.map(async (layer2Key) => {
                  const layer2Value = layer2Object[layer2Key]
                  const type2 = checkType(layer2Value);

                  switch (type2) {
                    case 'image':
                      newkaka[layer1Key][index][layer2Key] = await loadImage(layer2Value);
                      break;

                  
                    default:
                      break;
                  }

                }))

              })
            );

            break;

          default:
            break;
        }
      })
    );

    console.log(newkaka);
  };

  const [datas, setData] = useState({});

  const handler = new TemplateHandler();

  const loadTemplate = async () => {
    const response = await fetch("test.docx");
    const template = await response.blob();

    console.log(template);
    return template;
  };

  const loadImage = async (data: Image) => {
    const response = await fetch(data.url);
    const img = await response.blob();

    return {
      _type: "image",
      source: img,
      format: img.type,
      width: data.width,
      height: data.height,
    };
  };

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  const generate = async () => {

    const templateFile = await loadTemplate();

    const doc = await handler.process(templateFile, rdydata);

    saveFile("myTemplate - output.docx", doc);
  };

  return (
    <div>
      <div>tetmmet</div>
      <button onClick={() => reroll()}>reroll</button>
      <button onClick={() => generate()}>gen</button>
    </div>
  );
}

export default Temp;
