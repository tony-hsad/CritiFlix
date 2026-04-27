import Div from "../atoms/Div";
import Button from "../atoms/Button";

function NavActions() {
  return (
    <Div classname="flex items-center gap-2">
      <Button variant="ghost">Se connecter</Button>
      <Button variant="primary">Se déconnecter</Button>
    </Div>
  );
}

export default NavActions;
