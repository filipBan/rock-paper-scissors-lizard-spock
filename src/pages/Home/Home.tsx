import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <iframe
        className="h-auto w-full md:max-w-[80%] aspect-video"
        src="https://www.youtube.com/embed/pIpmITBocfM?si=9vOSBlI3T_9iABv4"
        title="Rock paper scissors lizard spock"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen={false}
      ></iframe>

      <button className="text-2xl btn btn-primary">
        <Link to="/game">Let's play!</Link>
      </button>
    </div>
  )
}
