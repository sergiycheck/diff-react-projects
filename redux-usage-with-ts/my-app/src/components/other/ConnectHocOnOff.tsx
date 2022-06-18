import { connect, ConnectedProps } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setOnOffVal, selectOnOffVal } from "./usersSlice";

const mapState = (state: RootState) => ({
  onOff: state.users.value,
});

const mapDispatchToProps = () => ({
  toggleOnClick: setOnOffVal,
});

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  backgroundColor: string;
};
const MyComponentToggler = (props: Props) => {
  const dispatch = useAppDispatch();
  const onOrOff = useAppSelector(selectOnOffVal);

  return (
    <div style={{ backgroundColor: props.backgroundColor, padding: "1rem", borderRadius: "2px" }}>
      <button
        onClick={() => {
          dispatch(props.toggleOnClick(!onOrOff));
        }}
      >
        Toggle is {props.onOff ? "On" : "Off"}
      </button>
    </div>
  );
};

export default connector(MyComponentToggler);
