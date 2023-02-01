import Temp from '../components/Temp'


export default function Home() {

  const data: any = {
    first: "loremipsum",
    second: "asdqwe123",
    leckmi: { isImage: true, url: "frame1.png", width: 200, height: 200 },
    posts: [
      {
        author: "Alon Bar",
        text: "Very important\ntext here!",
        im: { isImage: true, url: "frame1.png", width: 10, height: 10 },
      },
      {
        author: "Alon Bar",
        text: "Forgot to mention that...",
        im: { isImage: true, url: "frame1.png", width: 10, height: 10 },
      },
    ],
  };

  return (
    <>
      <Temp wordFileUrl="test.docx" outputFileName="alder"  data={data} render={()=>(<button>fdsfdsfds</button>)} />
    </>
  )
}
