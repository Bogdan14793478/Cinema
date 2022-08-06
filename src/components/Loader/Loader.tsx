import "./Loader.css";

const Loader = () => {
  return (
    <div className="my-loader">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
export default Loader;
