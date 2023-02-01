import { TemplateHandler } from "easy-template-x";

interface IProps {
  data: any;
  outputFileName: String,
  wordFileUrl: any,
  render?: React.FC
}

interface Image {
  isImage: true;
  url: any;
  width: Number;
  height: Number;
}

function saveFile(filename: string, blob: Blob) {
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
  }, 0);
}



function Temp({ data, render, outputFileName="default", wordFileUrl="default"  }: IProps) {

  const renderer = render || (()=> <button>Gen</button>)

  const checkType = (item: any) => {
    const type = Object.prototype.toString.call(item);

    switch (type) {
      case "[object Array]":
        return "loop";

      case "[object Object]":
        if (item.isImage) {
          return "image";
        } else {
          return "";
        }

      default:
        return "";
    }
  };

  const reroll = async () => {
    let newData: any = { ...data };

    const layer1Keys = Object.keys(data);

    await Promise.all(
      layer1Keys.map(async (layer1Key) => {
        const layer1Value = newData[layer1Key as keyof typeof newData];
        const type1 = checkType(layer1Value);

        switch (type1) {
          case "image":
            newData[layer1Key] = await loadImage(layer1Value);
            break;

          case "loop":
            await Promise.all(
              layer1Value.map(async (layer2Object: any, index: any) => {
                const layer2Keys = Object.keys(layer2Object);

                await Promise.all(
                  layer2Keys.map(async (layer2Key) => {
                    const layer2Value = layer2Object[layer2Key];
                    const type2 = checkType(layer2Value);

                    switch (type2) {
                      case "image":
                        newData[layer1Key][index][layer2Key] = await loadImage(
                          layer2Value
                        );
                        break;

                      default:
                        break;
                    }
                  })
                );
              })
            );

            break;

          default:
            break;
        }
      })
    );

    return newData;
  };


  const handler = new TemplateHandler();

  const loadTemplate = async () => {
    const response = await fetch(wordFileUrl);
    const template = await response.blob();
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


  const generate = async () => {
    const templateFile = await loadTemplate();
    const rdydata = await reroll();

    const doc = await handler.process(templateFile, rdydata);

    saveFile(`${outputFileName}.docx`, doc);
  };

  return <>
  <div onClick={() => generate()}>{renderer({})}</div>
  </>
}


export default Temp;
