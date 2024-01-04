

const index = ({onClick, checked }) => {
  return (
    <div>
      <div className="switch-button">
        <input onChange={onClick} checked={checked} className="switch-button-checkbox" type="checkbox"></input>
        <label className="switch-button-label" >
          <span className="switch-button-label-span">Select</span>
        </label>
      </div>
    </div>
  );
};

export default index;
