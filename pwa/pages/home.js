import HomeTemplate from "../components/templates/HomeTemplate";
import MovieList from "../components/organisms/MovieList";

export default function Home() {
  return (
    <HomeTemplate>
      <MovieList />
    </HomeTemplate>
  );
}
