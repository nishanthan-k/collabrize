import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { addId } from "./features/user/user.actions";
import { UserIdEnum } from "./lib/global/types/global.types";
import useToggleTheme from "./lib/hooks/useToggleTheme.hook";
import Button from "./ui/Button";

function App() {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const toggleTheme = useToggleTheme();

console.log(userState);

return (
  <div className="w-screen h-screen bg-background space-x-10 space-y-10">
    <Button content="Click me" variant="primary" />
    <Button onClick={toggleTheme} variant="secondary" className="text-black dark:text-white">Toggle Dark Mode</Button>

    <Button content="Add UserId" onClick={() => dispatch(addId({key: UserIdEnum.userId, value: 1}))}/>
    <Button content="Add EmpId" onClick={() => dispatch(addId({key: UserIdEnum.empId, value: 1}))}/>
    <Button content="Add OrgId" onClick={() => dispatch(addId({key: UserIdEnum.orgId, value: 1}))}/>
  </div>
);
}

export default App;
