import movies from "./movies.json";

type CardProps = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};
function Card({ image, title, subtitle, description }: CardProps) {
  return (
    <div className="@xl:grid @xl:grid-cols-[1fr_3fr] mb-2">
      <div
        className="bg-no-repeat bg-cover bg-center h-64 min-h-full rounded-t-3xl @xl:rounded-tr-none @xl:rounded-l-3xl"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="p-2">
        <h2 className="mb-2 text-3xl font-bold">{title}</h2>
        <h4 className="mb-2 italic">{subtitle}</h4>
        <p className="hidden @xl:block">{description}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="max-w-6xl mx-auto @container">
      <div className="@4xl:grid @4xl:grid-cols-[3fr_1fr] gap-4">
        <main className="@container">
          <h1 className="text-5xl font-bold underline">Main</h1>
          <Card {...movies[0]} />
          <Card {...movies[1]} />
          <Card {...movies[2]} />
        </main>
        <article className="@container">
          <h2 className="text-2xl font-bold">article</h2>

          <Card {...movies[0]} />
          <Card {...movies[1]} />
          <Card {...movies[2]} />
        </article>
      </div>
    </div>
  );
}

export default App;
