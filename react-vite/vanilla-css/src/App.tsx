import "./App.css";
import movies from "./movies.json";

type CardProps = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};
function Card({ image, title, subtitle, description }: CardProps) {
  return (
    <div className="card">
      <div
        className="image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="info">
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="page">
      <div className="layout">
        <main className="container">
          <h1>Main</h1>
          <Card {...movies[0]} />
          <Card {...movies[1]} />
          <Card {...movies[2]} />
        </main>
        <article className="container">
          <h2>article</h2>

          <Card {...movies[0]} />
          <Card {...movies[1]} />
          <Card {...movies[2]} />
        </article>
      </div>
    </div>
  );
}

export default App;
