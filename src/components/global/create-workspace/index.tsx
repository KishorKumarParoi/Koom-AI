import { getWorkSpaces } from "@/actions/workspace";
import useQueryData from "@/hooks/useQueryData";

const CreateWorkSpace = () => {
    const {data} = useQueryData(['user-workspaces'], getWorkSpaces)
  return <div>CreateWorkSpace</div>;
};

export default CreateWorkSpace;
