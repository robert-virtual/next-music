import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("acdc");
  useEffect(() => {
    buscar();
  }, []);
  async function buscar() {
    let endpoint = `https://music-hn.herokuapp.com/api.v2/videos?q=${search}`;
    if (search.includes("https:")) {
      console.log("link");
      endpoint = `https://music-hn.herokuapp.com/api.v2/videos?url=${search}`;
    }
    const data = await fetch(endpoint);
    const res = await data.json();
    console.log(res);
    setVideos(res.videos);
  }
  function download(url, format) {
    location.href = `https://music-hn.herokuapp.com/api.v2/videos/download?url=${url}&format=${format}`;
  }
  return (
    <div>
      <Head>
        <title>Music App</title>
        <meta
          name="description"
          content="app para descargar musica de youtube"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="sm:hidden fixed p-2 top-0 z-50 bg-neutral-800 flex items-center justify-center w-full">
        <div className="flex items-center justify-center w-full text-white">
          <div className="flex bg-gradient-to-r from-blue-500 to-violet-600 p-2 rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <span className="ml-1">Music</span>
          </div>
        </div>
      </nav>
      <nav className="bottom-0 fixed p-2 sm:top-0 sm:bottom-auto z-50 bg-neutral-800 flex items-center justify-center w-full">
        <div className="hidden sm:flex items-center justify-start w-1/3 text-white">
          <div className="flex bg-gradient-to-r from-blue-500 to-violet-600 p-2 rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <span className="ml-1">Music</span>
          </div>
        </div>
        <div className="justify-center w-full sm:w-2/3 flex items-center sm:justify-start">
          <input
            className="w-96 p-2 bg-black  text-white outline-none border-2 border-black focus:border-blue-400"
            type="text"
            onKeyUp={({ key }) => {
              if (key == "Enter") {
                buscar();
              }
            }}
            placeholder="Buscar..."
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <button
            onClick={buscar}
            className=" bg-[#FFFFFF14] text-white py-[10px] px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </nav>
      <main className="p-4 mt-20 text-white">
        <div className={styles.mygrid}>
          {videos.map(({ id, title, bestThumbnail, url, duration }) => (
            <div key={id} className="group relative">
              <button
                onClick={() => download(url, "mp4")}
                className={
                  "absolute flex opacity-0  p-2 top-1 transition-all right-1 bg-white text-black group-hover:opacity-100 hover:text-blue-500 " +
                  styles.group2
                }
              >
                <span className={styles.pop}>Video</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                  />
                </svg>
              </button>
              <button
                onClick={() => download(url, "mp3")}
                className={
                  "absolute flex opacity-0  p-2 top-14 transition-all right-1 bg-white text-black group-hover:opacity-100 hover:text-blue-500 " +
                  styles.group2
                }
              >
                <span className={styles.pop}>Audio</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                  />
                </svg>
              </button>
              <img src={bestThumbnail.url} alt={title} />
              <span className="bg-black absolute bottom-7 right-2 px-1">
                {duration}
              </span>
              <p>{title.substring(0, 40)}...</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="text-2xl text-gray-500 p-6 flex flex-col justify-center items-center">
        <p>
          Created by <span>Roberto Castillo </span>
          web developer
        </p>
        <p>
          Email: <span>robetocastillo945@gmail.com</span>{" "}
        </p>
        <p>
          Phone: <span>+504 88137603</span>{" "}
        </p>
        <details>
          <summary>Technologies used</summary>
          <p>Framework: Nextjs</p>
          <p>CSS: Tailwindcss</p>
          <p>API(backend): Nodejs</p>
        </details>
      </footer>
    </div>
  );
}

export async function getStaticProps(context) {
  console.log(context);
  const data = await fetch(
    "https://music-hn.herokuapp.com/api.v2/videos?q=acdc"
  );
  const res = await data.json();
  return {
    props: {
      videos: res.videos,
    },
  };
}
