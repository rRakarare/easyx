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

const kaka = {
  posts: [
    { author: "rene", text: "asdqwe123" },
    { author: "ewq", text: "asdqwe123231213" },
  ],

  image: { isImage: true, url: "frame1.png", width: 200, height: 200 },
};

function Temp({ data }: IProps) {


  const reroll = () => {
    const newkaka = {}

    const layer1Keys = Object.keys(kaka)

    layer1Keys.forEach(layer1Key => {

    })

  }
  

  const [datas, setData] = useState({});

  const handler = new TemplateHandler();

  const loadTemplate = async () => {
    const response = await fetch("test.docx");
    const template = await response.blob();

    console.log(template);
    return template;
  };

  const loadData = async () => {
    const response = await fetch("frame1.png");
    const img = await response.blob();

    setData({
      image1: {
        _type: "image",
        source: img,
        format: img.type,
        width: 200,
        height: 200,
      },
    });

    return {
      image1: {
        _type: "image",
        source: img,
        format: img.type,
        width: 200,
        height: 200,
      },
    };
  };

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  const generate = async () => {
    const rdydata = await loadData();

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
