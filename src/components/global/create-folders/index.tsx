type Props = {
  workSpaceId: string;
};
const CreateFolders = (props: Props) => {
  // TODO: WIP for optimistic ui update and watching folders

  const workSpaceId = props.workSpaceId;
  console.log("@createFolders, workSpaceId: ", workSpaceId);

  return <div>CreateFolders</div>;
};

export default CreateFolders;
