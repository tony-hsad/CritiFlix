import HomeTemplate from "../components/templates/HomeTemplate";
import UsersList from "../components/organisms/UsersList";

export default function Home() {
  return (
    <HomeTemplate>
      <UsersList />
    </HomeTemplate>
  );
}
